
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

type command = "miningStatus";

interface channelWroker {
  cmd: command;
  data: any[];
}

const channelWrokerListenName = "toFrontEnd";
const profileVerChannel = new BroadcastChannel(channelWrokerListenName);

export const listeningMiningHook = (
  miningHook: React.Dispatch<React.SetStateAction<any[]>>
) => {
  profileVerChannel.addEventListener("message", (e) =>
    profileVerChannelListening(e, miningHook)
  );
};

const profileVerChannelListening = (
  e: MessageEvent<any>,
  miningHook: React.Dispatch<React.SetStateAction<any[]>> | null = null
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

    default: {
      return console.log(
        `profileVerChannelListening unknow command [${cmd.cmd}] from backend [${cmd.data}]`
      );
    }
  }
};

function App() {

  const { path, setPrivateKey, setWalletAddress, walletAddress, mining, setMining, setOnlineMiners, setMiningRate } = useFlappyBirdContext();

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
