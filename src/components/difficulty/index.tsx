import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useFlappyBirdContext } from "../../providers/FlappyBirdProvider";
import { createOrGetWallet, registerReferrer } from "../../API";
import { loading } from "../../shared/assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectDifficulty: React.FC = () => {
  const { hasReferrer, setGameDifficulty, setPath, walletAddress } = useFlappyBirdContext();
  const [referrerAddress, setReferrerAddress] = useState<string>('')
  const [validAdd, setValidAdd] = useState<boolean>(false)

  useEffect(() => {
    function validateAddress(add: string): void{
      setValidAdd(ethers.isAddress(add))
    }
    validateAddress(referrerAddress)
  },[referrerAddress])

  const buttonStyle = {
    cursor: "pointer",
    border: "0",
    marginTop: "-40px",
    backgroundColor: "white",
    color: "black",
    fontSize: "2rem",
    padding: "10px 20px",
    borderRadius: "15px",
    width: "240px",
  };

  const importButtonStyle = {
    border: "0",
    backgroundColor: "white",
    color: "black",
    fontSize: "1rem",
    padding: "10px 10px",
    borderRadius: "15px",
    width: "80px",
  };

  const importInputStyle = {
    border: "0",
    backgroundColor: "white",
    color: "black",
    fontSize: "1rem",
    padding: "10px 20px",
    borderRadius: "15px",
  };

  async function createReferrer(){
    const res = await registerReferrer(referrerAddress)
    console.log(res)
    if(res[0] !== 'SUCCESS'){
      toast.error('An error occured')
    } else {
      toast.success('Success to referrer your wallet')
      await createOrGetWallet()
    }
  }

  return (
    <div
      style={{ height: "100%", gap: "20px", color: "white" }}
      className="flex flex-col justify-between items-center"
    >
      <div
        className="flex flex-col justify-between"
        style={{ paddingTop: "7rem" }}
      >
        <p style={{ fontSize: "2.5rem", marginBottom: "100px" }}>
          Select your Difficulty
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p
            style={buttonStyle}
            onClick={() => {
              setGameDifficulty(1);
              setPath("/");
            }}
          >
            Easy
          </p>
          <p
            style={buttonStyle}
            onClick={() => {
              setGameDifficulty(2);
              setPath("/");
            }}
          >
            Normal
          </p>
          <p
            style={buttonStyle}
            onClick={() => {
              setGameDifficulty(3);
              setPath("/");
            }}
          >
            Hard
          </p>
          {/* input for create referrer */}
          {walletAddress === '' ? (
                      <div
                      className="flex justify-center items-center"
                      style={{ gap: "5px", marginTop: "10rem" }}
                    >
                      <img src={loading} style={{ width: "30px" }} />
                      <p style={{ fontSize: "2rem" }}>Fetching Wallet Data</p>
                    </div>
          ) : hasReferrer ? (
            <p>Wallet refferer: {hasReferrer}</p>
          ) : (
            <div
              style={{
                marginBottom: "4rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p style={{ fontSize: "2rem", margin: 0 }}>Referrer Wallet</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={importInputStyle}
                  type="text"
                  placeholder="Enter Wallet Address"
                  value={referrerAddress}
                  onChange={(e) => setReferrerAddress(e.target.value)}
                />
                {validAdd && 
                (
                  <button style={importButtonStyle} onClick={createReferrer} disabled={!validAdd}>Referrer</button>
                )
                }
              </div>
                {!validAdd && referrerAddress.length > 0 && <p style={{marginTop: "-10px"}}>Insert a valid wallet address</p>}
            </div>
          )}

          <div style={{ marginTop: "50px" }}>
            <p
              style={buttonStyle}
              onClick={() => {
                setPath("/");
              }}
            >
              Back to Menu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDifficulty;
