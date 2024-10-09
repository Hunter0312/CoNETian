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


const Skins: React.FC = () => {
  const { setPath, profile, setGameStatus, miningError, miningRate, onlineMiners, mining, audio, setAudio, gameDifficulty } = useFlappyBirdContext();

  const [bird, setBird] = useState<number>(0);
  const [currentSkin, setCurrentSkin] = useState<number>(0)

  const conetianHighFireImage = useConetianHighFire();
  const conetianMediumFireImage = useConetianMediumFire();
  const conetianLowFireImage = useConetianLowFire();
  const [progress, setProgress] = useState(0);

  const [astronautSelection, setAstronaut] = useState(3)

  const astronautCarrousel = [AstronautMain, ChinaAstronaut, ItalyAstronaut, BrazilAstronaut]

  const hScore = localStorage.getItem('hScore');


  const changeSkin = (index: number) => {
    localStorage.setItem('skinPos', index.toString())
    setCurrentSkin(index)
  }

  useEffect(() => {
    const init = setInterval(() => {
      setBird(prev => prev + 1)
    }, 100);

    return () => {
      clearInterval(init);
    };
  }, [])


  useEffect(() => {
    const skinPos = localStorage.getItem('skinPos');
    if (skinPos) {
      setCurrentSkin(parseInt(skinPos, 10)); // Provide the radix parameter to parseInt
    } else {
      // Handle the case where skinPos is not found (e.g., set a default value)
      setCurrentSkin(0); // Replace with an appropriate default value
    }
  }, []);


  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setProgress(186);
    }, 100); // Delay before the animation starts

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);


  return (
    <div style={{ height: "auto", minHeight: "100%", width: "100%", background: "#1B1B1D", backgroundImage: `url(${BackgroundPlatform})`, padding: "32px 0px", display: "flex", flexDirection: "column" }}>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", textAlign: "right", fontSize: "12px" }}>Balance</span>
            <span style={{ color: "white", textAlign: "right", fontSize: "12px" }}>{formatToken(profile?.tokens?.cCNTP?.balance || 0)} CTNP</span>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "white", fontSize: "32px" }}>Skins</p>


      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        {astronautCarrousel.map((x, index) => {
          return (
            <div style={{ border: currentSkin == index ? "1px solid #b872fe" : "1px solid white", borderRadius: "8px", padding: "16px" }} onClick={() => { changeSkin(index) }}>
              <img
                style={{ height: "120px" }}
                src={x}
                alt="Astronaut"
              />
            </div>
          )
        })}
      </div>


      <div style={{ padding: "8px 16px", maxWidth: "120px", width: "100px", display: "block", margin: "0 auto" }}>
        <div className='startButton' style={{ borderRadius: "8px", margin: "0 auto" }} onClick={() => setPath('/dashboard')} >
          <span style={{ fontWeight: '900', lineHeight: "45px", fontSize: "14px" }}>Back</span>
        </div>
      </div>


    </div>
  )
}

export default Skins;