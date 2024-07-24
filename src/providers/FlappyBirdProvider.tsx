import PropTypes from 'prop-types';
import { createContext, useContext, useState, ReactNode } from 'react';

type FlappyBirdContextBird = {
  // Define the shape of your context value here
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
  onlineMiners: number;
  setOnlineMiners: (num: number) => void;
  miningRate: number;
  setMiningRate: (num: number) => void;
  games: any,
  setGames: (o: any) => void,
  lottery: boolean,
  setLottery: (e: boolean) => void
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
  const [lottery, setLottery] = useState<boolean>(false);

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
      onlineMiners,
      setOnlineMiners,
      miningRate,
      setMiningRate,
      games,
      setGames,
      lottery,
      setLottery,
    }}>
      {children}
    </FlappyBird.Provider>
  );
}

FlappyBirdProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
