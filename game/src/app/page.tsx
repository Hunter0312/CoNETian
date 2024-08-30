"use client";
import { Button } from "@/components/button";
import { FlexDiv } from "@/components/div";
import styled from "styled-components";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { initializeWorkerService } from "@/services/workerService";
import Home from "@/pages/home";
import Menu from "@/components/menu";
import { useEffect } from "react";
import Profile from "@/pages/profile";

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

export const listeningProfileHook = (
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

export default function App() {
  const { router, setProfile, setLeaderboard } = useGameContext();

  listeningProfileHook((response: any) => {
    try {
      const [profile, leaderboard] = response;
      setProfile(profile);
      setLeaderboard(leaderboard);
    } catch (error) {
      console.error("Error parsing balance data", error);
    }
  });

  useEffect(() => {
    initializeWorkerService();
  }, []);
  console.log(router)
  return (
    <>
      <S.Main>{router === "/" && <Home /> || router === '/profile' && <Profile />}</S.Main>
      <Menu />
    </>
  );
}
