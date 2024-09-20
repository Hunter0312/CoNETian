"use client";

import { Img } from "@/utilitiy/images";
import Image from "next/image";

export default function Loading() {
  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        height: "100vh",
        backgroundImage: "url(/bg-splashscreen.png)",
        backgroundSize: "100% 100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          gap: "5px",
        }}
      >
        <Image className="rotateRight" src={Img.SplashConetImg} height={35} width={35} alt="conet" />
        <p style={{ fontSize: "18px", color: "white" }}>Loading...</p>
      </div>
      <div>
        <p style={{ fontSize: "56px", textAlign: "center", color: "white" }}>
          The CoNETian
        </p>
        <p style={{ fontSize: "24px", textAlign: "center", color: "#929092" }}>
          Mining MiniGame
        </p>
      </div>
      <div>
        <p style={{ fontSize: "18px", textAlign: "center", color: "#929092" }}>
          Stay tuned
        </p>
        <p style={{ fontSize: "18px", textAlign: "center", color: "white" }}>
          Follow our official channels
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
            gap: "10px",
          }}
        >
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Image
              src={Img.SplashTeleImg}
              width={32}
              height={32}
              alt="telegram"
            />
          </button>
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Image src={Img.SplashXImg} width={32} height={32} alt="telegram" />
          </button>
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Image
              src={Img.SplashDisImg}
              width={32}
              height={32}
              alt="telegram"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
