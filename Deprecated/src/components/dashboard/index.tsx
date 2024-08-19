import React, { useEffect, useState } from 'react';
import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import { useConetianHighFire, useConetianLowFire, useConetianMediumFire } from '../../hooks/useConetianHooks';
import { formatToken, slice } from "../../shared/functions";
import { loading } from '../../shared/assets';
import { audioImage, arbitrumLogo, AstronautSkins, ChinaAstronaut, ItalyAstronaut, BrazilAstronaut, BackgroundPlatform } from '../../shared/assets';
import { ProfileImg, BackgroundAstronaut, AstronautMain, CNTPEarned } from '../../shared/assets';

const buttonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "2rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "240px"
}

const linkStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "12px",
  padding: "8px 16px",
  borderRadius: "15px",
  textDecoration: "none",
  fontWeight: "700"
}

const skinsLinkStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "12px",
  borderRadius: "15px",
  textDecoration: "none",
  fontWeight: "700",
  height: "45px",
  display: "flex"
}

const Dashboard: React.FC = () => {
  const { setPath, profile, setGameStatus, miningError, miningRate, onlineMiners, mining, audio, setAudio, gameDifficulty } = useFlappyBirdContext();

  const [bird, setBird] = useState<number>(0);

  const conetianHighFireImage = useConetianHighFire();
  const conetianMediumFireImage = useConetianMediumFire();
  const conetianLowFireImage = useConetianLowFire();
  const [progress, setProgress] = useState(0);

  const [astronautSelection, setAstronaut] = useState(3)

  const astronautCarrousel = [AstronautMain, ChinaAstronaut, ItalyAstronaut, BrazilAstronaut]

  const hScore = localStorage.getItem('hScore');
  const skinPos = localStorage.getItem('skinPos');

  useEffect(() => {
    if (skinPos) {
      setAstronaut(parseInt(skinPos));
    } else {
      // Handle the case where skinPos is not a number (e.g., set a default value)
      setAstronaut(0); // Replace with an appropriate number
    }
  }, [skinPos]);

  useEffect(() => {
    const init = setInterval(() => {
      setBird(prev => prev + 1)
    }, 100);

    return () => {
      clearInterval(init);
    };
  }, [])

  useEffect(() => {
    console.log(profile)
  }, [])

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setProgress(186);
    }, 100); // Delay before the animation starts

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);


  return (
    <div style={{ height: "calc(100% - 64px)", width: "100%", background: "#1B1B1D", backgroundImage: `url(${BackgroundPlatform})`, padding: "32px 0px", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
      <div>
        <div>

          {
            !profile || profile?.keyID === '' ?
              <div className='info-message'>
                <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                  <img src={loading} style={{ width: "15px" }} />
                  <p>Fetching Wallet Data</p>
                </div>
              </div> :
              mining ?
                <div className='info-message' style={{ display: "flex", flexDirection: "row", fontSize: "12px", justifyContent: "space-between", padding: "0 16px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#05A21E", marginRight: "4px" }} />
                    <span>Mining Up</span>
                  </div>
                  <p>Mining Rate: {miningRate.toFixed(7)}</p>
                  <p>Online Miners: {onlineMiners}</p>
                </div> : (!miningError ? <div className='info-message'>
                  <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                    <img src={loading} style={{ width: "15px" }} />
                    <p>Initiating Mining</p>
                  </div>
                </div> : <div className={'info-message blink_me'} >
                  <p>Failed to start mining</p>
                </div>
                )
          }

        </div>



        {/* First Row */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 16px", marginTop: "16px" }}>
          <div style={{ display: "flex" }}>
            <img src={ProfileImg} style={{ width: "32px", height: "32px" }} />
            <div style={{ marginLeft: "4px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ color: "white", textAlign: "left", fontSize: "14px", fontWeight: "700" }}>The CoNETian</span>
              <span style={{ color: "#B1B1B2", textAlign: "left", fontSize: "12px" }}>{profile && profile?.keyID ? slice(profile?.keyID) : "Loading"}</span>
            </div>
          </div>
          <a target="_blank" style={linkStyle} className='startButton' href='https://platform.conet.network'>Open Platform</a>
        </div>

        {/* Second Row */}
        <div style={{ display: "flex", marginTop: "32px", justifyContent: "space-between", padding: "0px 16px" }}>
          <div className='startButton' style={skinsLinkStyle} onClick={() => setPath('/skins')} >
            <span style={{ fontWeight: '900', lineHeight: "45px", fontSize: "14px", marginLeft: "16px" }}>Skins</span>
            <img src={AstronautSkins} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", }}>
            <span style={{ color: "white", fontWeight: "700", textAlign: "right", fontSize: "12" }}>My Highest Score</span>
            <span style={{ color: "#B1B1B2", fontSize: "24px", textAlign: "right" }}>{hScore}</span>
          </div>
        </div>

        {/* Third Row */}
        <div style={{ display: "flex", padding: "0 16px", marginTop: "16px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "white", lineHeight: "22px" }}>Cadet</span>
              <span style={{ color: "#B1B1B2", fontSize: "12px", lineHeight: "22px" }}>1/12</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" id="progressBar" style={{ width: progress }}></div>
            </div>

          </div>

          <span style={{ color: "white", fontSize: "14px", lineHeight: "27px", textAlign: "right" }}>See leaderboard</span>

        </div>
      </div>

      {/* Fourth Row */}
      <div style={{ position: "relative", width: "100%", maxWidth: "500px", margin: '0 auto', height: "366px" }}>
        <img
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%", // Adjust as needed
            height: "auto", // Adjust as needed
          }}
          src={BackgroundAstronaut}
          alt="Background"
        />
        <img
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "50%", // Adjust as needed
            height: "auto",
            animation: "float 6s ease-in-out infinite",
          }}
          src={astronautCarrousel[astronautSelection]}
          alt="Astronaut"
        />
      </div>

      {/* Fify Row */}

      <div style={{ display: "flex", marginTop: "32px", padding: "0 16px" }}>
        <div style={{ background: "#404041", width: "264px", height: "56px", border: "1px solid #5c5c5c", borderRadius: "32px", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <img src={CNTPEarned} />
          <span style={{ color: "white", textAlign: "left" }}>CNTP<br />Earned</span>
          <span style={{ color: "white" }}>{formatToken(profile?.tokens?.cCNTP?.balance || 0)} CTNP</span>
        </div>
      </div>

    </div>
  )
}

export default Dashboard;