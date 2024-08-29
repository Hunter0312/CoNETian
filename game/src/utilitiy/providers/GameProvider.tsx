"use client";

import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import Leaderboard from "../types/leaderboard";
import { fetchStartMining } from "@/API/getData";

type GameContext = {
  router: string;
  setRouter: (props: string) => void;
  profile: any;
  setProfile: (o: any) => void;
  leaderboard: Leaderboard;
  setLeaderboard: (e: Leaderboard) => void;
  miningErrorTimeout: React.MutableRefObject<NodeJS.Timeout | null>;
  walletAddress: React.MutableRefObject<string>;
  mining: boolean;
  setMining: (e: boolean) => void;
  miningError: boolean;
  setMiningError: (e: boolean) => void;
  onlineMiners: number;
  setOnlineMiners: (num: number) => void;
  miningRate: number;
  setMiningRate: (num: number) => void;
};

const Game = createContext<GameContext | undefined>(undefined);

export function useGameContext() {
  const context = useContext(Game);
  if (!context) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }
  return context;
}

type GameProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProps) {
  const [router, setRouter] = useState<string>("/");
  const [profile, setProfile] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>({
    allTime: [],
    weekly: [],
    daily: [],
    monthly: [],
  });
  const walletAddress = useRef<string>("");
  const [mining, setMining] = useState<boolean>(false);
  const [onlineMiners, setOnlineMiners] = useState<number>(0);
  const [miningRate, setMiningRate] = useState<number>(0);
  const [miningError, setMiningError] = useState<boolean>(false);
  const miningErrorTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const init = async (walletAddress: string) => {
      if (walletAddress && !mining) {
        const result = await fetchStartMining(walletAddress);

        if (result && !result?.error) {
          setOnlineMiners(result?.online);
          setMiningRate(result?.rate);
          setMining(true);
          setMiningError(false);
        } else {
          // if (path !== "/start") {
          //   toast.clearWaitingQueue({ containerId: "miningError" });
          //   toast.error(result?.message, { toastId: "miningError" });
          // }

          setMiningError(true);

          if (miningErrorTimeout.current)
            clearTimeout(miningErrorTimeout.current);

          miningErrorTimeout.current = setTimeout(
            () => init(walletAddress),
            15000
          );
        }
      }
    };

    if (profile?.keyID && profile?.keyID !== walletAddress.current) {
      walletAddress.current = profile?.keyID;
      init(profile?.keyID);
    }
  }, [profile]);

  return (
    <Game.Provider
      value={{
        router,
        setRouter,
        profile,
        setProfile,
        leaderboard,
        setLeaderboard,
        walletAddress,
        mining,
        setMining,
        onlineMiners,
        setOnlineMiners,
        miningRate,
        setMiningRate,
        miningError,
        setMiningError,
        miningErrorTimeout,
      }}
    >
      {children}
    </Game.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
