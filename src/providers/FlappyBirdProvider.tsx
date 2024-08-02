import { fetchStartMining } from '../API/getData';
import PropTypes from 'prop-types';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

type FlappyBirdContextBird = {
  path: string;
  setPath: (path: string) => void;
  walletAddress: string;
  setWalletAddress: (key: string) => void;
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
  gameStatus: number,
  setGameStatus: (e: number) => void,
  lotteryBalance: number,
  setLotteryBalance: (e: number) => void,
  audio: boolean,
  setAudio: (e: boolean) => void,
  setGameDifficulty: (num: number) => void,
  gameDifficulty: number,
  setHasReferrer: (e: boolean) => void,
  hasReferrer: boolean
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
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [mining, setMining] = useState<boolean>(false);
  const [onlineMiners, setOnlineMiners] = useState<number>(0);
  const [miningRate, setMiningRate] = useState<number>(0);
  const [lottery, setLottery] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<number>(0);
  const [gameDifficulty, setGameDifficulty] = useState<number>(1)
  const [lotteryBalance, setLotteryBalance] = useState<number>(0);
  const [audio, setAudio] = useState<boolean>(false);
  const [miningError, setMiningError] = useState<boolean>(false);
  const [hasReferrer, setHasReferrer] = useState<boolean>(false);
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

  useEffect(() => {
    const init = async (walletAddress: string) => {
      if (walletAddress) {
        const result = await fetchStartMining(walletAddress);
        if (result && !result?.error) {
          setOnlineMiners(result?.online);
          setMiningRate(result?.rate);
          setMining(true);
          setMiningError(false);
        } else {
          if (path !== '/start') {
            toast.error(result?.message, { autoClose: 5000 });
          }

          setMiningError(true);
          setTimeout(() => init(walletAddress), 15000);
        }
      }
    }

    init(walletAddress);
  }, [walletAddress])

  return (
    <FlappyBird.Provider value={{
      path,
      setPath,
      walletAddress,
      setWalletAddress,
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
      audio,
      setAudio,
      setGameDifficulty, 
      gameDifficulty,
      setHasReferrer,
      hasReferrer
    }}>
      {children}
    </FlappyBird.Provider>
  );
}

FlappyBirdProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
