import BackButton from '@/components/backButton';
import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import PageWrapper from '@/components/pageWrapper';
import { ButtonClick } from '@/shared/assets';
import { Img } from '@/utilitiy/images';
import { Difficulty, useGameContext } from '@/utilitiy/providers/GameProvider';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';

const difficulties: Difficulty[] = ["easy", "normal", "hard"];

export default function Settings() {
  const {
    setRouter,
    difficulty,
    setDifficulty,
    musicVolume,
    setMusicVolume,
    effectsVolume,
    setEffectsVolume,
  } = useGameContext();

  const musicRef = useRef<any>();
  const effectsRef = useRef<any>();

  const { load, setVolume } = useAudioPlayer();

  function updateTrackColor(element: HTMLInputElement | undefined, value: string) {
    if (!element) return;

    element.style.setProperty('--track-width', `${value}%`);
  }

  function handleClickOff() {
    localStorage.setItem('conet_effects_volume', `${effectsVolume}`);
    localStorage.setItem('conet_music_volume', `${musicVolume}`);
  }

  useEffect(() => {
    updateTrackColor(musicRef.current, String(musicVolume));
    updateTrackColor(effectsRef.current, String(effectsVolume));
  }, [effectsVolume, musicVolume]);

  useEffect(() => {
    setVolume(effectsVolume || effectsVolume === 0 ? effectsVolume / 100 : 1);
  }, [effectsVolume, setVolume])

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Settings" />

      <FlexDiv $direction="column" $align="center">
        <P $alignSelf="flex-start" $fontSize="24px">Game mode</P>
        <Image width={260} height={260} alt="Conetian" src={Img.SettingsConetian} />
        <FlexDiv $gap="16px" $width="100%">
          {
            difficulties.map((currDifficulty) => (
              <Button
                key={currDifficulty}
                $padding="12px"
                $radius="16px"
                $border={currDifficulty === difficulty ? "1px solid #04DAE8" : "1px solid #787679"}
                $flex={1}
                $fontSize="18px"
                onClick={() => setDifficulty?.(currDifficulty)}
              >
                {currDifficulty.toUpperCase()}
              </Button>
            ))
          }
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $padding="16px" $direction="column" $gap="12px" $border="1px solid rgba(255, 255, 255, .1)" $radius="16px">
        <P $fontSize="22px">Sounds</P>
        <FlexDiv $padding="12px 0" $align="center" $gap="8px">
          <FlexDiv $gap="8px" $align="center" $width="100px">
            <Image width={32} height={32} alt="Arrow" src={effectsVolume && effectsVolume > 0 ? Img.SoundOn : Img.SoundOff} />
            <P $fontSize="13px">EFFECTS</P>
          </FlexDiv>
          <input
            ref={effectsRef}
            className="range-input"
            type="range"
            min={0} max={100} step={1}
            value={effectsVolume} onChange={(e) => {
              setEffectsVolume?.(Number(e.target.value));
              updateTrackColor(effectsRef.current, e.target.value);
            }}
            onMouseUp={handleClickOff}
            style={{ flex: 1 }}
          />
        </FlexDiv>
        <FlexDiv $padding="12px 0" $align="center" $gap="8px">
          <FlexDiv $gap="8px" $align="center" $width="100px">
            <Image width={32} height={32} alt="Arrow" src={musicVolume && musicVolume > 0 ? Img.SoundOn : Img.SoundOff} />
            <P $fontSize="13px">MUSIC</P>
          </FlexDiv>
          <input
            ref={musicRef}
            className="range-input"
            type="range"
            min={0} max={100} step={1}
            value={musicVolume} onChange={(e) => {
              setMusicVolume?.(Number(e.target.value));
              updateTrackColor(musicRef.current, e.target.value);
            }}
            onMouseUp={handleClickOff}
            style={{ flex: 1 }}
          />
        </FlexDiv>
      </FlexDiv>
      <Button $padding="18px" $radius="32px" $border="1px solid #04DAE8" onClick={() => setRouter?.("/about")}>
        About The CoNETian
      </Button>
    </PageWrapper>
  )
}