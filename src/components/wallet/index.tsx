import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { fetchCNTPBalance } from '../../API/getData';
import { slice } from '../../shared/functions';
import copy from "copy-to-clipboard";
import { IoCopySharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { loading } from '../../shared/assets';

const Wallet: React.FC = () => {

  const { setPath, publicKey, privateKey, setBalance, balance } = useFlappyBirdContext();

  const [publicK, setPublicK] = useState<boolean>(false);
  const [privateK, setPrivateK] = useState<boolean>(false);

  useEffect(() => {
    const init = async (address: string) => {
      const response = await fetchCNTPBalance(address);
      if (response && response.length >= 2) {
        if (response[0] === 'SUCCESS') {
          setBalance(response[1][0]);
        }
      }
    }
    if (publicKey && privateKey) {
      init(publicKey);
    }
  }, [publicKey, privateKey]);

  const copyText = (text: string, type: string) => {
    copy(text);
    if (type === "walletAddress") {
      setPublicK(true);
    } else if (type === "walletPrivateKey") {
      setPrivateK(true);
    }
  }

  return (
    <div style={{ height: "100%", gap: "20px", color: "white" }} className='flex flex-col justify-between'>
      <div className='flex flex-col justify-between' style={{ paddingTop: "7rem" }}>
        {
          publicKey === '' ?
            <div className='flex justify-center items-center' style={{gap: "5px", marginTop: "10rem"}}>
              <img src={loading} style={{width: "30px"}} />
              <p style={{fontSize: "2rem"}}>fetching wallet data</p>
            </div> :
            <>
              <div style={{ marginBottom: "4rem" }}>
                <p style={{ fontSize: "2rem", margin: 0 }}>Public key</p>
                <p className='flex items-center justify-center' style={{ fontSize: "2.5rem", margin: 0, gap: "5px", cursor: "pointer" }} onClick={() => copyText(publicKey, "walletAddress")}>
                  {slice(publicKey)}
                  {
                    publicK === true ?
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