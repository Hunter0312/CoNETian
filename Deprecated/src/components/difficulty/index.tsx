import React, { useEffect, useState } from "react";

import { useFlappyBirdContext } from "../../providers/FlappyBirdProvider";

const SelectDifficulty: React.FC = () => {
  const { setGameDifficulty, setPath } = useFlappyBirdContext();

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
