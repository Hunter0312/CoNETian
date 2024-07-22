import PropTypes from 'prop-types';
import { createContext, useContext, useState, ReactNode } from 'react';

type FlappyBirdContextBird = {
  // Define the shape of your context value here
  // For example:
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
    }}>
      {children}
    </FlappyBird.Provider>
  );
}

FlappyBirdProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
