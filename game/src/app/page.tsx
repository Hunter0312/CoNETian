"use client";
import styled from "styled-components";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { initializeWorkerService } from "@/services/workerService";
import Home from "@/pages/home";
import Playground from "@/pages/playground";
import Menu from "@/components/menu";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import Leaderboard from "@/pages/leaderboard";
import Wallet from "@/pages/wallet";
import About from "@/pages/about";
import Settings from "@/pages/settings";
import Profile from "@/pages/profile";
import Shopping from "@/pages/shopping";
import Roulette from "@/pages/roulette";
import Earn from "@/pages/earn";
import { Toaster } from "react-hot-toast";
import { BackgroundAudio, ButtonClick } from '../shared/assets';
import { playAudio, stopAudio } from "@/shared/functions";
import { useAudioPlayer } from "react-use-audio-player";

const S = {
  Main: styled.div`
    max-width: 430px;
    margin: 0 auto;
  `,
};

type command = "profileVer" | "miningStatus";

interface channelWroker {
  cmd: command;
  data: any[];
}

const channelWrokerListenName = "toFrontEnd";
const profileVerChannel = new BroadcastChannel(channelWrokerListenName);

const listeningPool: Map<string, (e: MessageEvent<any>) => void> = new Map();

const listeningManager = (key: string, fun: (e: MessageEvent<any>) => void) => {
  const listening = listeningPool.get(key);
  if (listening) {
    profileVerChannel.removeEventListener("message", listening);
  }
  listeningPool.set(key, fun);
  profileVerChannel.addEventListener("message", fun);
};

const listeningProfileHook = (
  profileHook: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const fun = (e: MessageEvent<any>) =>
    profileVerChannelListening(e, null, profileHook);
  return listeningManager("listeningProfileHook", fun);
};

const profileVerChannelListening = (
  e: MessageEvent<any>,
  miningHook: React.Dispatch<React.SetStateAction<any[]>> | null = null,
  profileHook: React.Dispatch<React.SetStateAction<any[]>> | null = null
) => {
  let cmd: channelWroker;
  try {
    cmd = JSON.parse(e.data);
  } catch (ex) {
    return console.log(
      `profileVerChannel JSON.parse(e.data[${e.data}]) Error!`
    );
  }

  switch (cmd.cmd) {
    case "miningStatus": {
      if (miningHook) {
        return miningHook(cmd?.data);
      }
      return "";
    }

    case "profileVer": {
      if (profileHook) {
        return profileHook(cmd?.data);
      }
      return "";
    }

    default: {
      return console.log(
        `profileVerChannelListening unknow command [${cmd.cmd}] from backend [${cmd.data}]`
      );
    }
  }
};

const listeningMiningHook = (
  miningHook: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const fun = (e: MessageEvent<any>) =>
    profileVerChannelListening(e, miningHook);
  return listeningManager("listeningMiningHook", fun);
};

function CurrentPage() {
  const { router } = useGameContext();

  const pages: Record<string, ReactNode> = {
    "/": <Home />,
    "/leaderboard": <Leaderboard />,
    "/wallet": <Wallet />,
    "/about": <About />,
    "/settings": <Settings />,
    "/shopping": <Shopping />,
    "/earn": <Earn />,
    "/roulette": <Roulette />,
    "/profile": <Profile />,
    "/playground": <Playground />,
  };

  return pages[router as keyof typeof pages] ?? null;
}

export default function App() {
  const {
    router,
    setProfile,
    setLeaderboard,
    setMiningRate,
    setOnlineMiners,
    leaderboard,
    audio,
  } = useGameContext();

  const backAudioRef = useRef<HTMLAudioElement | null>(null);

  const { load } = useAudioPlayer();

  useEffect(() => {
    if (audio)
      playAudio(backAudioRef);
    else stopAudio(backAudioRef);
  }, [audio])

  listeningMiningHook((response: any) => {
    try {
      const [data] = response;
      const parsedData = JSON.parse(data);

      setMiningRate?.(Number(parsedData?.rate));
      setOnlineMiners?.(parsedData?.online);
    } catch (error) {
      console.error("Error parsing mining data", error);
    }
  });

  listeningProfileHook((response: any) => {
    try {
      const [profile, leader] = response;
      setProfile?.(profile);
      if (leaderboard?.allTime.length === 0) setLeaderboard?.(leader);
    } catch (error) {
      console.error("Error parsing balance data", error);
    }
  });


  useEffect(() => {
    initializeWorkerService();
  }, []);

  useEffect(() => {
    const playClickAudio = () => {
      if (audio) {
        load(ButtonClick, {
          autoplay: true,
        })
      }
    }

    const buttons = Array.from(document.getElementsByTagName("button"));

    buttons.map((button) => {
      button.removeEventListener("click", playClickAudio);
      button.addEventListener("click", playClickAudio);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", playClickAudio);
      });
    };
  }, [audio, router]);

  return (
    <>
      <Toaster />
      <S.Main>
        <CurrentPage />
      </S.Main>
      {router !== "/playground" && <Menu />}
      {router !== "/playground" && <audio src={BackgroundAudio} ref={backAudioRef} loop />}
    </>
  );
}
