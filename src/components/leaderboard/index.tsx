import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import React, { useState } from 'react';
import { StarImg } from '../../shared/assets';
import { LeaderSlice } from '../../shared/functions';

const buttonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "2rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "240px"
}

const PointsData = [
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  }
];

const CntpData = [
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 2000000,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  },
  {
    user: "0x7dda1662Eec5f8d20523CC56Bed5DA2130F32591",
    points: 200,
  }
]

const Leaderboard: React.FC = () => {
  const { setPath } = useFlappyBirdContext();
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className='flex flex-col justify-between items-center' style={{ height: "100%" }}>
      <div className='flex flex-col' style={{ height: "80vh", width: "80vw", maxWidth: "362px" }}>
        <p style={{ textAlign: "left", color: "white", fontSize: "40px", marginBottom: 0 }}>Leaderboard</p>
        <div style={{ flexGrow: 1, backgroundColor: "white", borderRadius: "8px", padding: "20px 0" }}>
          <div className='flex flex-col justify-center items-center' style={{ height: "100%" }}>
            <div className='flex justify-center items-center' style={{ gap: "5px" }}>
              <button className={!show ? 'leaderBtn leaderBtnActive' : 'leaderBtn'} onClick={() => setShow(false)}>Points</button>
              <button className={show ? 'leaderBtn leaderBtnActive' : 'leaderBtn'} onClick={() => setShow(true)}>CNTP</button>
            </div>
            <div className='flex flex-col' style={{ color: "#8D4BE1", fontSize: "22px", width: "100%" }}>
              <div className='flex items-center justify-between leaderBtnHeader' style={{ margin: "0 20px", borderBottom: "1px solid black" }}>
                <div className='flex items-center' style={{ gap: "30px" }}>
                  <p>Rank</p>
                  <p>User</p>
                </div>
                <p style={{ width: "70px", textAlign: "left" }}>{!show ? "Points" : "CNTP"}</p>
              </div>
            </div>
            <div style={{ flexGrow: 1, width: "100%" }}>
              <div className='flex flex-col justify-between items-center' style={{ margin: "0 20px", height: "100%" }}>
                {
                  !show ?
                    PointsData.map((data, index) => {
                      return (
                        <div className='flex justify-between leaderBtnBody' style={{ width: "100%" }}>
                          <div className='flex items-center' style={{ gap: "30px" }}>
                            {
                              index === 0 ?
                                <p style={{ width: "39px", textAlign: "left" }} className='flex items-center'>
                                  {index + 1}
                                  <img src={StarImg} style={{ marginLeft: "10px" }} />
                                </p> :
                                <p style={{ width: "39px", textAlign: "left" }}>{index + 1}</p>
                            }
                            <p>{LeaderSlice(data.user)}</p>
                          </div>
                          <p style={{ width: "70px", textAlign: "left" }}>{data.points.toLocaleString()}</p>
                        </div>
                      )
                    }) :
                    CntpData.map((data, index) => {
                      return (
                        <div className='flex justify-between leaderBtnBody' style={{ width: "100%" }}>
                          <div className='flex items-center' style={{ gap: "30px" }}>
                            {
                              index === 0 ?
                                <p style={{ width: "39px", textAlign: "left" }} className='flex items-center'>
                                  {index + 1}
                                  <img src={StarImg} style={{ marginLeft: "10px" }} />
                                </p> :
                                <p style={{ width: "39px", textAlign: "left" }}>{index + 1}</p>
                            }
                            <p>{LeaderSlice(data.user)}</p>
                          </div>
                          <p style={{ width: "70px", textAlign: "left" }}>{data.points.toLocaleString()}</p>
                        </div>
                      )
                    })
                }
              </div>

            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setPath('/')} style={{ ...buttonStyle, marginBottom: "5rem" }}>
        Main Menu
      </button>
    </div>
  )
}

export default Leaderboard;