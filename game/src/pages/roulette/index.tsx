import BackButton from '@/components/backButton';
import PageWrapper from '@/components/pageWrapper';
import { useState } from 'react';
import PageState1 from './page-state-1';
import PageState2 from './page-state-2';
import { fetchRouletteResult } from '@/API/getData';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { doubleData, rouletteResultMapping, wheelData } from '@/shared/wheelVars';
import { toast } from 'react-toastify';

export default function Roulette() {

  // 1 - idle roulette
  // 2 - lost roulette
  // 3 - won roulette, show double page
  // 4 - lost double, show roulette page
  // 5 - won double, show roulette page
  const [pageState, setPageState] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [doubleFinished, setDoubleFinished] = useState<boolean>(false);
  const [doubleRunning, setDoubleRunning] = useState<boolean>(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [doubleImageState, setDoubleImageState] = useState<"off" | "win" | "lose">("off");
  const [isSpinning, setIsSpinning] = useState(false);

  const { profile } = useGameContext();

  async function handleSpin() {
    setPageState(1);
    setIsSpinning(true);

    // if (audio)
    //   load(ButtonClick, {
    //     autoplay: true,
    //   });

    if (!mustSpin && !isSpinning && profile?.keyID) {
      const rouletteResult = await fetchRouletteResult(profile?.keyID);

      if (rouletteResult && !rouletteResult?.error) {
        // if (audio)
        //   load(RouletteSpin, {
        //     autoplay: true
        //   })

        setPrizeNumber(rouletteResult.valueWon);
        setMustSpin(true);

        rouletteResultMapping['0'] = 0;

        // map the possible values received from the backend to the positions of the wheel
        if (rouletteResult.possibleValues) {
          let roulettePosition = 1;

          for (let i = 0; i < rouletteResult.possibleValues.length; i++) {
            const value = rouletteResult.possibleValues[i];

            if (value)
              rouletteResultMapping[value.toString()] = roulettePosition;

            roulettePosition += 2;
          }
        }

        setTimeout(() => {
          const mappedResult = rouletteResultMapping[rouletteResult.valueWon.toString()];

          if (wheelData[mappedResult] && wheelData[mappedResult]?.option !== "Lose") {
            setPageState(3);
          } else {
            setPageState(2);
          }

          setMustSpin(false);
          setIsSpinning(false);
        }, 7000);
      } else {
        toast.error(rouletteResult?.message, { autoClose: 2000 });
        setPageState(2);
        setMustSpin(false);
        setIsSpinning(false);
      }
    } else {
      setMustSpin(false);
      setIsSpinning(false);
    }
  }

  async function handleDouble() {
    let count = 0;
    let timerSpeedDown = 100;
    let doublePointsTimeout: NodeJS.Timeout;
    setDoubleImageState('off')
    setDoubleFinished(false);
    setPageState(3);
    setDoubleRunning(true);

    if (profile && profile?.keyID) {
      const rouletteResult = await fetchRouletteResult(profile?.keyID);

      if (rouletteResult && !rouletteResult?.error) {
        // if (audio)
        //   load(RouletteSpin, {
        //     autoplay: true
        //   })

        setPrizeNumber(rouletteResult.valueWon);

        const alternateWinLose = () => {
          if (count % 2 === 0) {
            // double === 1 means the user won
            setDoubleImageState("win");
          }
          else {
            // double === 2 means the user lost
            setDoubleImageState("lose");
          }
          count++;

          if (count >= 20)
            timerSpeedDown += 100;

          doublePointsTimeout = setTimeout(alternateWinLose, timerSpeedDown);
        };

        alternateWinLose();

        setTimeout(() => {
          clearTimeout(doublePointsTimeout);

          const mappedResult = rouletteResult.valueWon > 0 ? 1 : 0;

          if (doubleData[mappedResult].option !== "Lose") {
            // Show the "lose" text first so the user thinks he lost, then show the win page.
            setDoubleImageState("lose");

            // wait 500ms to show the win text and build expectation on the user
            setTimeout(() => {
              setDoubleImageState("win")
              setDoubleFinished(true);
              setPageState(5);
              setDoubleRunning(false);
            }, 500);
          } else {
            // Show the "win" text first so the user thinks he won, then show the lose page.
            setDoubleImageState("win");

            // wait 500ms to show the lose text and build expectation on the user
            setTimeout(() => {
              setDoubleImageState("lose")
              setDoubleFinished(true);
              setPageState(4);
              setDoubleRunning(false);
            }, 500);
          }
        }, 6000);
      } else {
        toast.error(rouletteResult?.message, { autoClose: 2000 });
        setDoubleImageState("lose");
        setDoubleFinished(true);
        setPageState(4);
        setDoubleRunning(false);
      }
    }
  }

  function backToRoulette() {
    setDoubleImageState("off");
    setDoubleFinished(false);
    setDoubleRunning(false);
    setPageState(1);
    setMustSpin(false);
  }

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Roulette" to="/shopping" />
      {
        pageState <= 2
          ? <PageState1 pageState={pageState} isSpinning={isSpinning} handleSpin={handleSpin} mustSpin={mustSpin} setMustSpin={setMustSpin} prizeNumber={prizeNumber} />
          : <PageState2
            pageState={pageState}
            doubleImageState={doubleImageState}
            prizeNumber={prizeNumber}
            handleDouble={handleDouble}
            backToRoulette={backToRoulette}
            doubleFinished={doubleFinished}
            doubleRunning={doubleRunning}
          />
      }
    </PageWrapper>
  )
}