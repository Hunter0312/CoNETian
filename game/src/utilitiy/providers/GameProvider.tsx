"use client";

import PropTypes from "prop-types";
import { createContext, useContext, useState, ReactNode, useRef } from "react";

type GameContext = {
  router: string;
  setRouter: (props: string) => void;
  path: string;
  setPath: (path: string) => void;
  privateKey: string;
  setPrivateKey: (key: string) => void;
  balance: number;
  setBalance: (num: number) => void;
  mining: boolean;
  setMining: (e: boolean) => void;
  miningError: boolean;
  setMiningError: (e: boolean) => void;
  onlineMiners: number;
  setOnlineMiners: (num: number) => void;
  miningRate: number;
  setMiningRate: (num: number) => void;
  games: any,
  setGames: (o: any) => void,
  lottery: number,
  setLottery: (e: number) => void,
  // leaderboard: Leaderboard,
  // setLeaderboard: (e: Leaderboard) => void,
  isLeaderboardLoading: boolean,
  setIsLeaderboardLoading: (e: boolean) => void,
  gameStatus: number,
  setGameStatus: (e: number) => void,
  lotteryBalance: number,
  setLotteryBalance: (e: number) => void,
  audio: boolean,
  setAudio: (e: boolean) => void,
  setGameDifficulty: (num: number) => void,
  gameDifficulty: number,
  setReferrerAddress: (e: string) => void,
  referrerAddress: string
  profile: any,
  setProfile: (o: any) => void,
  miningErrorTimeout: React.MutableRefObject<NodeJS.Timeout | null>
  walletAddress: React.MutableRefObject<string>
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
  const [path, setPath] = useState<string>('/');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [mining, setMining] = useState<boolean>(false);
  const [onlineMiners, setOnlineMiners] = useState<number>(0);
  const [miningRate, setMiningRate] = useState<number>(0);
  const [lottery, setLottery] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<number>(0);
  const [gameDifficulty, setGameDifficulty] = useState<number>(1)
  const [lotteryBalance, setLotteryBalance] = useState<number>(0);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(false);
  const [miningError, setMiningError] = useState<boolean>(false);
  const [referrerAddress, setReferrerAddress] = useState<string>('');
  const [profile, setProfile] = useState<any>(null);
  const [games, setGames] = useState<object>({
    gameSpeed: 0,
    gameFrame: 100,
    gravity: 0.6,
    bird: { x: 30, y: 30, width: 50, height: 50, dy: 0 },
    pipes: [],
    frame: 0,
    score: 0,
  })
  const miningErrorTimeout = useRef<NodeJS.Timeout | null>(null);
  const walletAddress = useRef<string>('');

  return (
    <Game.Provider
      value={{
        router,
        setRouter,
        path,
        setPath,
        walletAddress,
        privateKey,
        setPrivateKey,
        balance,
        setBalance,
        mining,
        setMining,
        miningError,
        setMiningError,
        onlineMiners,
        setOnlineMiners,
        miningRate,
        setMiningRate,
        games,
        setGames,
        lottery,
        setLottery,
        gameStatus,
        setGameStatus,
        lotteryBalance,
        setLotteryBalance,
        // leaderboard,
        // setLeaderboard,
        setIsLeaderboardLoading,
        isLeaderboardLoading,
        audio,
        setAudio,
        setGameDifficulty,
        gameDifficulty,
        setReferrerAddress,
        referrerAddress,
        profile,
        setProfile,
        miningErrorTimeout
      }}
    >
      {children}
    </Game.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
