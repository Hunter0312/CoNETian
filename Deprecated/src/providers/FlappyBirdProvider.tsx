import Leaderboard from '@/components/leaderboard/types';
import { fetchRegisterReferrer, fetchStartMining } from '../API/getData';
import PropTypes from 'prop-types';
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

type FlappyBirdContextBird = {
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
  leaderboard: Leaderboard,
  setLeaderboard: (e: Leaderboard) => void,
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
  walletAddress: string,
  miningErrorTimeout: React.MutableRefObject<NodeJS.Timeout | null>
};

const FlappyBird = createContext<FlappyBirdContextBird | undefined>(undefined);

export function useFlappyBirdContext() {
  const context = useContext(FlappyBird);
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }
  return context;
}

type FlappyBirdProps = {
  children: ReactNode;
};

export function FlappyBirdProvider({ children }: FlappyBirdProps) {
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
  const [leaderboard, setLeaderboard] = useState<Leaderboard>({
    allTime: [],
    weekly: [],
    daily: [],
    monthly: [],
  })
  const [audio, setAudio] = useState<boolean>(false);
  const [miningError, setMiningError] = useState<boolean>(false);
  const [referrerAddress, setReferrerAddress] = useState<string>('');
  const [profile, setProfile] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [games, setGames] = useState<object>({
    gameSpeed: 0,
    gameFrame: 100,
    gravity: 0.6,
    bird: { x: 30, y: 30, width: 50, height: 50, dy: 0 },
    pipes: [],
    ground: { x1: 0, x2: window.innerWidth, y: window.innerHeight - 100, width: window.innerWidth, height: 100, speed: 4 },
    frame: 0,
    score: 0,
  })
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
          setMiningError(true);

          if (miningErrorTimeout.current)
            clearTimeout(miningErrorTimeout.current);

          miningErrorTimeout.current = setTimeout(() => init(walletAddress), 15000);
        }
      }
    }

    if (profile?.keyID && profile?.keyID !== walletAddress) {
      setWalletAddress(profile?.keyID)

      const url = window.location.search

      const splitUrl = url.split('referrer=')

      if (splitUrl.length > 1) {
        const referrer = splitUrl[1]
        if (referrer)
          fetchRegisterReferrer(referrer);
      }

      init(profile?.keyID);
    }
  }, [profile])

  return (
    <FlappyBird.Provider value={{
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
      leaderboard,
      setLeaderboard,
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
    }}>
      {children}
    </FlappyBird.Provider>
  );
}

FlappyBirdProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
