import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { slice } from '../../shared/functions';
import copy from "copy-to-clipboard";
import { IoCopySharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { loading } from '../../shared/assets';

const Wallet: React.FC = () => {

  const { setPath, walletAddress, privateKey, setBalance, balance } = useFlappyBirdContext();

  const [walletAddr, setWalletAddr] = useState<boolean>(false);
  const [privateK, setPrivateK] = useState<boolean>(false);

  useEffect(() => {
    if (walletAddr) {
      setTimeout(() => {
        setWalletAddr(false);
      }, 4000);
    }
    if (privateK) {
      setTimeout(() => {
        setPrivateK(false);
      }, 4000);
    }
  }, [walletAddr, privateK])

  const copyText = (text: string, type: string) => {
    copy(text);
    if (type === "walletAddress") {
      setWalletAddr(true);
    } else if (type === "walletPrivateKey") {
      setPrivateK(true);
    }
  }

  return (
    <div style={{ height: "100%", gap: "20px", color: "white" }} className='flex flex-col justify-between'>
      <div className='flex flex-col justify-between' style={{ paddingTop: "7rem" }}>
        {
          walletAddress === '' ?
            <div className='flex justify-center items-center' style={{ gap: "5px", marginTop: "10rem" }}>
              <img src={loading} style={{ width: "30px" }} />
              <p style={{ fontSize: "2rem" }}>Fetching Wallet Data</p>
            </div> :
            <>
              <div style={{ marginBottom: "4rem" }}>
                <p style={{ fontSize: "2rem", margin: 0 }}>Wallet Address</p>
                <p className='flex items-center justify-center' style={{ fontSize: "2.5rem", margin: 0, gap: "5px", cursor: "pointer" }} onClick={() => copyText(walletAddress, "walletAddress")}>
                  {slice(walletAddress)}
                  {
                    walletAddr === true ?
                      <FaCheck /> :
                      <IoCopySharp />
                  }
                </p>
              </div>
              <div style={{ marginBottom: "4rem" }}>
                <p style={{ fontSize: "2rem", margin: 0 }}>Private key</p>
                <p className='flex items-center justify-center' style={{ fontSize: "2.5rem", margin: 0, gap: "5px", cursor: "pointer" }} onClick={() => copyText(privateKey, "walletPrivateKey")}>
                  {slice(privateKey)}
                  {
                    privateK === true ?
                      <FaCheck /> :
                      <IoCopySharp />
                  }
                </p>
              </div>
              <div style={{ marginBottom: "4rem" }}>
                <p style={{ fontSize: "2rem", margin: 0 }}>CNTP Balance</p>
                <p style={{ fontSize: "2.5rem", margin: 0 }}>{balance}</p>
              </div>
            </>
        }

      </div>
      <button onClick={() => setPath('/')} style={{ color: "white", padding: 0, backgroundColor: "transparent", border: 0, fontFamily: "FlappyBird", fontSize: "2.5rem", marginBottom: "4rem" }}>
        Main Menu
      </button>
    </div>
  )
}

export default Wallet;