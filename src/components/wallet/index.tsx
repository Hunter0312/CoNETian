import React, { useEffect, useState } from "react";
import { useFlappyBirdContext } from "../../providers/FlappyBirdProvider";
import { fetchImportWallet, fetchRegisterResult, fetchstopMining } from "../../API/getData";
import { formatToken, slice } from "../../shared/functions";
import copy from "copy-to-clipboard";
import { IoCopySharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { loading } from "../../shared/assets";
import { ConfirmToast } from "react-confirm-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const buttonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "2rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "240px",
};

const modalButtonStyle = {
  width: "100px",
  borderRadius: "8px",
  fontWeight: "normal",
};

const importButtonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "1.5rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "180px",
}

const importInputStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "1.5rem",
  padding: "10px 20px",
  borderRadius: "5px",
  fontFamily: "FlappyBird",
}

const Wallet: React.FC = () => {
  const {
    setPath,
    profile,
    setProfile,
  } = useFlappyBirdContext();

  const [walletAddr, setWalletAddr] = useState<boolean>(false);
  const [importWalletPrivateKey, setImportWalletPrivateKey] =
    useState<string>("");
  const [referrer, setReferrer] = useState<string>("");
  const [copiedReferrer, setCopiedReferrer] = useState<boolean>(false);
  const [privateK, setPrivateK] = useState<boolean>(false);
  const [showImportWalletConfirmModal, setShowImportWalletConfirmModal] =
    useState<boolean>(false);

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
    if (copiedReferrer) {
      setTimeout(() => {
        setCopiedReferrer(false);
      }, 4000);
    }
  }, [walletAddr, privateK, copiedReferrer]);

  const copyText = (text: string, type: string) => {
    copy(text);
    if (type === "walletAddress") {
      setWalletAddr(true);
      return;
    }
    if (type === "walletPrivateKey") {
      setPrivateK(true);
      return;
    }
    if (type === "referrer") {
      setCopiedReferrer(true);
      return;
    }
  };

  const handleImportWalletButton = () => {
    if (importWalletPrivateKey) {
      setShowImportWalletConfirmModal(true);
    } else {
      toast.error("Please enter a private key");
    }
  };

  const handleAddReferrerButton = async () => {
    if (referrer) {
      const result = await fetchRegisterResult(referrer)

      if (result && !result?.error) {
        const newProfile = { ...profile, referrer: result }
        setProfile(newProfile)
        toast.success('Adding referrer successful')
      } else {
        toast.error(result?.message)
      }
    } else {
      toast.error("Please enter a wallet address for referrer");
    }
  };

  const handleImportWalletConfirm = async () => {
    if (importWalletPrivateKey) {
      const stopMiningResult = await fetchstopMining(profile?.keyID);

      if (stopMiningResult && !stopMiningResult?.error) {
        const importResult = await fetchImportWallet(importWalletPrivateKey);
        if (importResult && !importResult?.error) {
          setProfile(importResult);
          toast.success("Import Successful!");
        } else {
          toast.error(importResult?.message);
        }
      } else {
        toast.error("Failed to stop mining to import wallet");
      }
    } else {
      toast.error("Please enter a private key");
    }
  };

  return (
    <div style={{ height: "100%", gap: "2rem", color: "white", overflowY: 'auto', justifyContent: 'space-evenly', boxSizing: 'border-box', padding: '20px' }} className='flex flex-col justify-center items-center'>
      <div className='flex flex-col align-center'>
        {
          !profile || profile?.keyID === '' ?
            <div className='flex justify-center items-center'>
              <img src={loading} style={{ width: "30px" }} />
              <p style={{ fontSize: "2rem", marginBlock: '0' }}>Fetching Wallet Data</p>
            </div> :
            <div className='flex flex-col' style={{ rowGap: '2rem' }}>
              <div>
                <p style={{ fontSize: "2rem", margin: 0 }}>Wallet Address</p>
                <p className='flex items-center justify-center' style={{ fontSize: "2.5rem", margin: 0, gap: "5px", cursor: "pointer" }} onClick={() => copyText(profile?.keyID, "walletAddress")}>
                  {slice(profile?.keyID)}
                  {
                    walletAddr === true ?
                      <FaCheck /> :
                      <IoCopySharp />
                  }
                </p>
              </div>

              <div>
                <p style={{ fontSize: "2rem", margin: 0 }}>Private key</p>
                <p className='flex items-center justify-center' style={{ fontSize: "2.5rem", margin: 0, gap: "5px", cursor: "pointer" }} onClick={() => copyText(profile?.privateKeyArmor, "walletPrivateKey")}>
                  {slice(profile?.privateKeyArmor)}
                  {
                    privateK === true ?
                      <FaCheck /> :
                      <IoCopySharp />
                  }
                </p>
              </div>

              <div>
                <p style={{ fontSize: "2rem", margin: 0 }}>CNTP Balance</p>
                <p style={{ fontSize: "2.5rem", margin: 0 }}>{formatToken(profile?.tokens?.cCNTP?.balance || 0)}</p>
              </div>

              {/* input for adding or viewing wallet referrer */}
              {profile && profile?.referrer ?
                (
                  <div>
                    <p style={{ fontSize: "2rem", margin: 0 }}>Referrer's Wallet</p>
                    <p
                      className="flex items-center justify-center"
                      style={{
                        fontSize: "2.5rem",
                        margin: 0,
                        gap: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => copyText(profile?.referrer, "referrer")}
                    >
                      {slice(profile?.referrer)}
                      {copiedReferrer === true ? <FaCheck /> : <IoCopySharp />}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "1.7rem", margin: 0 }}>Add Referrer</p>
                    <input className='import-input' style={importInputStyle} type="text" placeholder="Enter Referrer's Wallet Address" onChange={(e) => setReferrer(e.target.value)} />
                    <button onClick={handleAddReferrerButton} style={importButtonStyle}>
                      Add
                    </button>
                  </div>
                )
              }

              {/* input for importing private key */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: "1.7rem", margin: 0 }}>Import Another Wallet</p>
                <input className='import-input' style={importInputStyle} type="text" placeholder="Enter Private Key" onChange={(e) => setImportWalletPrivateKey(e.target.value)} />
                <button onClick={handleImportWalletButton} style={importButtonStyle}>
                  Import
                </button>
              </div>
            </div>
        }
      </div>
      <button onClick={() => setPath('/')} style={{ ...buttonStyle }}>
        Main Menu
      </button>

      <ConfirmToast
        toastText={
          "If you import a new wallet, you will lose your current one. Are you sure you want to continue?"
        }
        buttonNoText="No"
        buttonYesText="Yes"
        showCloseIcon={false}
        asModal={true}
        customFunction={handleImportWalletConfirm}
        setShowConfirmToast={setShowImportWalletConfirmModal}
        showConfirmToast={showImportWalletConfirmModal}
        buttonYesAttributes={{
          style: {
            ...modalButtonStyle,
            backgroundImage: "linear-gradient(to right, #D775FF, #8DA8FF)",
          },
        }}
        buttonNoAttributes={{
          style: { ...modalButtonStyle, border: "1px solid black" },
        }}
        className="confirm-toast-style"
      />
    </div>
  );
};

export default Wallet;
