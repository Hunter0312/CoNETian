import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { fetchImportWallet, fetchStartMining, fetchstopMining } from '../../API/getData';
import { slice } from '../../shared/functions';
import copy from "copy-to-clipboard";
import { IoCopySharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { loading } from '../../shared/assets';

const buttonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "2rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "240px",
}

const importButtonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "1rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "80px",
}

const importInputStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "1rem",
  padding: "10px 20px",
  borderRadius: "15px",
}

const Wallet: React.FC = () => {

  const { setPath, walletAddress, setWalletAddress, privateKey, setPrivateKey, setBalance, balance } = useFlappyBirdContext();

  const [walletAddr, setWalletAddr] = useState<boolean>(false);
  const [importWalletPrivateKey, setImportWalletPrivateKey] = useState<string>('');
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

  const importWallet = async (privateKey: string) => {
    if (privateKey) {
      const result = await fetchImportWallet(privateKey);
      if (result && !result?.error) {
        setBalance(result?.tokens?.cCNTP.balance);
        setWalletAddress(result?.keyID);
        setPrivateKey(result?.privateKeyArmor);
      }
    }
  }

  const handleImportWallet = () => {
    fetchstopMining(walletAddress);
    importWallet(importWalletPrivateKey);
    fetchStartMining(walletAddress);
  }

  return (
    <div style={{ height: "100%", gap: "20px", color: "white" }} className='flex flex-col justify-between items-center'>
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

              {/* input for importing private key */}
              <div style={{ marginBottom: "4rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: "2rem", margin: 0 }}>Import Wallet Private Key</p>

                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
                  <input style={importInputStyle} type="text" placeholder="Enter Private Key" onChange={(e) => setImportWalletPrivateKey(e.target.value)} />
                  <button onClick={handleImportWallet} style={importButtonStyle}>
                    Import
                  </button>
                </div>
              </div>
            </>
        }

      </div>
      <button onClick={() => setPath('/')} style={{ ...buttonStyle, marginBottom: "5rem" }}>
        Main Menu
      </button>
    </div>
  )
}

export default Wallet;