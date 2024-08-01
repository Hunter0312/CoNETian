import React, { useRef, useEffect, useState } from "react";
import {
  birdImg,
  groundImage,
  backgroundImage,
  pipeBottomImg,
  pipeTopImg,
  birdFly,
} from "../../shared/assets";
import { useFlappyBirdContext } from "../../providers/FlappyBirdProvider";

const SelectDifficulty: React.FC = () => {
  const { setGameDifficulty, setPath } = useFlappyBirdContext();

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
            gap: '16px',
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
