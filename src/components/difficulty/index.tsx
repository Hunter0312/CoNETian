import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useFlappyBirdContext } from "../../providers/FlappyBirdProvider";
import { loading } from "../../shared/assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchRegisterResult } from "../../API/getData";

const SelectDifficulty: React.FC = () => {
  const { profile, setProfile, setGameDifficulty, setPath } = useFlappyBirdContext();
  const [_referrerAddress, _setReferrerAddress] = useState<string>('')
  const [validAdd, setValidAdd] = useState<boolean>(false)

  useEffect(() => {
    function validateAddress(add: string): void {
      setValidAdd(ethers.isAddress(add))
    }
    validateAddress(_referrerAddress)
  }, [_referrerAddress])

  const buttonStyle = {
    cursor: "pointer",
    border: "0",
    backgroundColor: "white",
    color: "black",
    fontSize: "2rem",
    padding: "10px 20px",
    borderRadius: "15px",
    width: "240px",
    marginBlock: "0"
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

  async function createReferrer() {
    const result = await fetchRegisterResult(_referrerAddress)
    console.log(result)
    if (result && !result?.error) {
      toast.success('Adding referrer successful')
      const newProfile = { ...profile, referrer: result }
      setProfile(newProfile)
    } else {
      toast.error(result?.message)
    }
  }

  return (
    <div
      style={{ height: "100%", color: "white", justifyContent: 'space-evenly', gap: '16px', padding: '20px', boxSizing: 'border-box', overflowY: 'auto' }}
      className="flex flex-col items-center"
    >
      <div>
        <p style={{ fontSize: "2.5rem", marginBlock: "0" }}>
          Select your Difficulty
        </p>
      </div>
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
      </div>

      <div>
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
  );
};

export default SelectDifficulty;
