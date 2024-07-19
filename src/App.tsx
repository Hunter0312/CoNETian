
import './App.css';
import "./fonts.css";
import Playground from './components/playground';
import StartMessage from './components/start';
import Wallet from './components/wallet';
import About from './components/about';
import { useFlappyBirdContext } from './providers/FlappyBirdProvider';
import { useEffect } from 'react';
import { initializeWorkerService } from './services/workerService';
import { fetchWalletData } from './API/getData';

function App() {

  const { path, setPrivateKey, setPublicKey } = useFlappyBirdContext();

  useEffect(() => {
    const init = async () => {
      await initializeWorkerService();
      const response = await fetchWalletData();
      if(response && response.length >= 1) {
        if(response[0] === 'SUCCESS') {
          if(response[1][0] !== '')
            setPublicKey(response[1][0]);
          if(response[1][1] !== '')
            setPrivateKey(response[1][1]);
        }
      }
    }
    init();
  }, [])

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
