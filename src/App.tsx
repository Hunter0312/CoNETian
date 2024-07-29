
import './App.css';
import "./fonts.css";
import Playground from './components/playground';
import StartMessage from './components/start';
import Wallet from './components/wallet';
import About from './components/about';
import { useFlappyBirdContext } from './providers/FlappyBirdProvider';
import { useEffect, useState } from 'react';
import { initializeWorkerService } from './services/workerService';
import { fetchStartMining, fetchWalletData } from './API/getData';

type command = "balanceStatus" | "miningStatus";

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

export const listeningMiningHook = (
  miningHook: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  const fun = (e: MessageEvent<any>) =>
    profileVerChannelListening(e, miningHook);
  return listeningManager("listeningMiningHook", fun);
};

export const listeningBalanceHook = (
  balanceHook: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  const fun = (e: MessageEvent<any>) =>
    profileVerChannelListening(e, null, balanceHook);
  return listeningManager("listeningBalanceHook", fun);
};

const profileVerChannelListening = (
  e: MessageEvent<any>,
  miningHook: React.Dispatch<React.SetStateAction<any[]>> | null = null,
  balanceHook: React.Dispatch<React.SetStateAction<any[]>> | null = null
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

    case "balanceStatus": {
      if (balanceHook) {
        return balanceHook(cmd?.data);
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

function App() {

  const { path, setPrivateKey, setWalletAddress, walletAddress, mining, setMining, setOnlineMiners, setMiningRate, setBalance } = useFlappyBirdContext();

  listeningMiningHook((response: any) => {
    try {
      const [data] = response;
      const parsedData = JSON.parse(data);

      setMiningRate(Number(parsedData?.rate));
      setOnlineMiners(parsedData?.online);
    } catch (error) {
      console.error("Error parsing mining data", error);
    }
  });

  listeningBalanceHook((response: any) => {
    try {
      const [data] = response;
      setBalance(parseFloat(data));
    } catch (error) {
      console.error("Error parsing balance data", error);
    }
  });

  useEffect(() => {
    const init = async () => {
      await initializeWorkerService();

      const response = await fetchWalletData();

      if (response && response.length >= 1) {
        if (response[0] === 'SUCCESS') {
          if (response[1][0] !== '')
            setWalletAddress(response[1][0]);
          if (response[1][1] !== '')
            setPrivateKey(response[1][1]);
        }
      }
    }

    init();
  }, [])

  useEffect(() => {
    const init = async (walletAddress: string) => {
      if (walletAddress && mining === false) {
        const response = await fetchStartMining(walletAddress);
        if (response) {
          setOnlineMiners(response?.online);
          setMiningRate(response?.rate);
          setMining(true);
        }
      }
    }

    init(walletAddress);
  }, [walletAddress])

  return (
    <div className="App">
      {
        path === '/' && <StartMessage /> ||
        path === '/start' && <Playground /> ||
        path === '/wallet' && <Wallet /> ||
        path === '/about' && <About />
      }
    </div>
  );
}

export default App;
