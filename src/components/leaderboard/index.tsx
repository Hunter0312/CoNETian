import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import React, { useMemo, useState } from 'react';
import { StarImg } from '../../shared/assets';
import { LeaderSlice } from '../../shared/functions';
import { LeaderboardArrayItem } from './types';

const buttonStyle = {
  border: "0",
  backgroundColor: "white",
  color: "black",
  fontSize: "2rem",
  padding: "10px 20px",
  borderRadius: "15px",
  width: "240px"
}

export type LeaderboardType = 'all-time' | 'weekly' | 'daily' | 'monthly';

export type LeaderboardOption = {
  label: string;
  value: string;
  current: boolean;
  items: LeaderboardArrayItem[] | null;
}

const Leaderboard: React.FC = () => {
  const { leaderboard, setPath, isLeaderboardLoading } = useFlappyBirdContext();

  const [choosenLeaderboard, setChoosenLeaderboard] = useState<LeaderboardType>('all-time');

  const leaderboardOptions = useMemo<LeaderboardOption[]>(() => ([
    {
      label: 'All Time',
      value: 'all-time',
      current: choosenLeaderboard === 'all-time',
      items: leaderboard.allTime,
    }, {
      label: 'Monthly',
      value: 'monthly',
      current: choosenLeaderboard === 'monthly',
      items: leaderboard.monthly,
    }, {
      label: 'Weekly',
      value: 'weekly',
      current: choosenLeaderboard === 'weekly',
      items: leaderboard.weekly,
    }, {
      label: 'Daily',
      value: 'daily',
      current: choosenLeaderboard === 'daily',
      items: leaderboard.daily,
    },
  ]), [choosenLeaderboard, leaderboard]);

  const currentList = leaderboardOptions.find((option) => option.value === choosenLeaderboard)?.items?.slice(0, 10);

  return (
    <div className='flex flex-col items-center' style={{ height: "100%" }}>
      <div className='flex flex-col' style={{ width: "80vw", maxWidth: "362px", marginBottom: "10px" }}>
        <p style={{ textAlign: "left", color: "white", fontSize: "40px", marginBottom: "10px" }}>Leaderboard</p>
        <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px 0" }}>
          <div className='flex flex-col items-center' style={{ height: "100%" }}>
            <div className='flex custom-scrollbar' style={{ gap: "5px", maxWidth: "90%", overflow: "auto", padding: "0px 3px 6px" }}>
              {
                leaderboardOptions.map((option) => (
                  <button
                    className={option.current ? 'leaderBtn leaderBtnActive' : 'leaderBtn'}
                    onClick={() => setChoosenLeaderboard(option.value as LeaderboardType)}
                    disabled={!option.items?.length}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {option.label}
                  </button>
                ))
              }
            </div>
            <div className='flex flex-col' style={{ color: "#8D4BE1", fontSize: "22px", width: "100%" }}>
              <div className='flex items-center justify-between leaderBtnHeader' style={{ margin: "0 20px", borderBottom: "1px solid black" }}>
                <div className='flex items-center' style={{ gap: "30px" }}>
                  <p>Rank</p>
                  <p>User</p>
                </div>
                <p style={{ width: "70px", textAlign: "left" }}>CNTP</p>
              </div>
            </div>
            <div style={{ width: "100%", height: "47vh", overflow: "auto" }}>
              <div style={{ margin: "0 20px" }}>
                {
                  isLeaderboardLoading ? (
                    <p>Fetching data...</p>
                  ) : currentList ? (
                    currentList.map((item, index) => {
                      return (
                        <div className='flex justify-between leaderBtnBody' style={{ width: "100%" }}>
                          <div className='flex items-center' style={{ gap: "30px" }}>
                            {
                              index === 0 ?
                                <p style={{ width: "39px", textAlign: "left" }} className='flex items-center'>
                                  {index + 1}
                                  <img src={StarImg} style={{ marginLeft: "10px" }} alt="star" />
                                </p> :
                                <p style={{ width: "39px", textAlign: "left" }}>{index + 1}</p>
                            }
                            <p>{LeaderSlice(item.wallet)}</p>
                          </div>
                          <p style={{ width: "70px", textAlign: "left" }}>{item.win_cntp.toLocaleString()}</p>
                        </div>
                      )
                    })
                  ) : (
                    <p>No data</p>
                  )
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