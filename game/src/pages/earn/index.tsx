import toast from 'react-hot-toast';
import BackButton from '@/components/backButton';
import CurrentBalance from '@/components/currentBalance';
import GuardianCard from '@/components/guardianCard';
import PageWrapper from '@/components/pageWrapper';
import { useEffect, useRef, useState } from 'react';
import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Task, taskCategories, TaskCategory } from '../../shared/earnTasks';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import Modal from '@/components/modal';
import { Button } from '@/components/button';
import "./styles.css";
import DailyClaim from './page-components/DailyClaim';
import CommonTask from './page-components/CommonTask';
import DailyQuiz from './page-components/DailyQuiz';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { checkSocialMedias, checkTwitter } from '@/API';
import { fetchCheckPartner, fetchCheckTelegram, fetchCheckTwitter, fetchClaimDailyReward } from '@/API/getData';
import copy from 'copy-to-clipboard';
import { selectPartner } from '@/shared/functions';

export default function Earn() {
  const [tasks, setTasks] = useState<TaskCategory[]>(taskCategories);
  const [choosenTask, setChoosenTask] = useState<Task>();
  const [chosenTaskCategory, setChosenTaskCategory] = useState<TaskCategory>()
  const [userName, setUserName] = useState<string>('')
  const [telegramId, setTelegramId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [completedTaskCategory, setCompletedTaskCategory] = useState<TaskCategory>();
  const [isTodayRewardTaken, setIsTodayRewardTaken] = useState<boolean>(false)
  const [completedStabilityAi, setCompletedStabilityAi] = useState<boolean[]>([])

  const { profile, dailyClaimInfo } = useGameContext();

  let gameLink: string = "";

  if (typeof window !== 'undefined')
    gameLink = window?.location?.origin + "/?referrer=";

  const tgBotLink = "https://t.me/conetian_bot/?start=";

  useEffect(() => {
    const isTaken = profile?.dailyClaimWeek?.find((el: any, i: any) => i === dailyClaimInfo?.todayDayOfWeek)

    setIsTodayRewardTaken(isTaken)

    if (isTaken) {
      const tasksCopy = [...tasks]
      tasksCopy[1].tasks[0].completed = true
      setTasks(tasksCopy)
    }
  }, [dailyClaimInfo])

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile?.keyID)

      const tasksCopy = [...tasks]

      if (res[1][0][0].length === 0) {
        tasksCopy[2].tasks[0].completed = false
        tasksCopy[2].tasks[1].completed = false
        tasksCopy[2].tasks[2].completed = false
        tasksCopy[5].tasks[0].completed = false

        return
      }

      if (res[1][0][0].includes('2')) {
        tasksCopy[2].tasks[0].completed = true
      } else {
        tasksCopy[2].tasks[0].completed = false
      }

      if (res[1][0][0].includes('3')) {
        tasksCopy[2].tasks[1].completed = true
      } else {
        tasksCopy[2].tasks[1].completed = false
      }

      if (res[1][0][0].includes('4')) {
        tasksCopy[5].tasks[0].completed = true
      } else {
        tasksCopy[5].tasks[0].completed = false
      }

      setTasks?.(tasksCopy)
    }

    fetchSocialMedias()
  }, [profile])

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile?.keyID)

      const tasksCopy = [...tasks]

      if (res[1][0][0].length === 0) {
        tasksCopy[6].tasks[0].completed = false
        tasksCopy[6].tasks[1].completed = false

        return
      }

      if (res[1][0][0].includes('5')) {
        tasksCopy[6].tasks[0].completed = true
        tasksCopy[6].tasks[1].completed = true
      } else {
        tasksCopy[6].tasks[0].completed = false
        tasksCopy[6].tasks[1].completed = false
      }

      setTasks?.(tasksCopy)
    }

    fetchSocialMedias()
  }, [])

  function copyReferralLink(text: string) {
    if (!text) return;

    //Copy and Toast
    copy(text);

    toast.success("Referral Link copied to the clipbboard!", {
      position: "bottom-center",
      duration: 2000,
    });
  }

  async function checkTwitterAccount() {
    setIsLoading(true)

    const res = await fetchCheckTwitter(profile.keyID, userName)

    if (res.response.isFollow === true && res.response.isRetweet === true) {
      const tasksCopy = [...tasks]
      tasksCopy[2].tasks[0].completed = true
      setTasks(tasksCopy)
      toast.success("Task completed! Check your rewards in the Earn Page", {
        position: "bottom-center",
        duration: 2000,
      });
    } else if (res.response.protected === true) {
      toast.error("Your account is private. Please make it public to claim your reward.", {
        position: "bottom-center",
        duration: 2000,
      });
    }
    else {
      toast.error("Unable to confirm. Check if you have completed the tasks", {
        position: "bottom-center",
        duration: 2000,
      });
    }

    setIsLoading(false)
  }

  async function checkTelegramAccount() {
    setIsLoading(true)

    const res = await fetchCheckTelegram(profile.keyID, telegramId)

    if (res.response.isInTGGroup === true) {
      const tasksCopy = [...tasks]
      tasksCopy[2].tasks[1].completed = true
      setTasks(tasksCopy)
      toast.success("Task completed! Check your rewards in the Earn Page", {
        position: "bottom-center",
        duration: 2000,
      });
      return
    }

    if (res.response.isusedByOtherWallet === true) {
      toast.error("Account already used by other wallet.", {
        position: "bottom-center",
        duration: 2000,
      });
    }
    else {
      toast.error("Unable to confirm. Check if you have completed the tasks", {
        position: "bottom-center",
        duration: 2000,
      });

    }

    setIsLoading(false)
  }

  const handlePartnerCheckButton = async () => {
    window.open(choosenTask?.resource, "_blank");

    setTimeout(async () => {
      if (choosenTask?.completed) return;
      if (!choosenTask?.resource) return;

      const tasksCopy = tasks ? [...tasks] : []

      if (chosenTaskCategory?.categoryId) {
        const selectedPartnerId = selectPartner(chosenTaskCategory?.categoryId)

        let auxArr = [...completedStabilityAi]

        if (selectedPartnerId.toString().includes('5')) {
          auxArr.push(true)
          setCompletedStabilityAi(auxArr)

          if (choosenTask?.taskId === 'stability-world-ai_task-1') {
            tasksCopy[6].tasks[0].completed = true
          } else {
            tasksCopy[6].tasks[1].completed = true
          }

          if (auxArr.length < 2) return
        }

        const res = await fetchCheckPartner(profile?.keyID, selectedPartnerId.toString())

        if (res) {

          if (selectedPartnerId.toString().includes('4')) {
            tasksCopy[5].tasks[0].completed = true
          }

          if (selectedPartnerId.toString().includes('5')) {
            tasksCopy[6].tasks[0].completed = true
            tasksCopy[6].tasks[1].completed = true
          }

          setTasks?.(tasksCopy)

          toast.success("Task completed! Check your rewards in the Earn Page", {
            position: "bottom-center",
            duration: 2000,
          });
        } else if (res.response.protected === true) {
          toast.error("Your account is private. Please make it public to claim your reward.", {
            position: "bottom-center",
            duration: 2000,
          });
        }
        else {
          toast.error("Unable to confirm. Check if you have completed the tasks", {
            position: "bottom-center",
            duration: 2000,
          });
        }
      }
    }, 10000);
  }

  const handleClaim = async () => {
    const res = await fetchClaimDailyReward(profile.keyID)

    if (res.response.result === true) {
      const tasksCopy = [...tasks]
      tasksCopy[1].tasks[0].completed = true
      setTasks(tasksCopy)

      toast.success("Task completed! Check your rewards in the Earn Page", {
        position: "bottom-center",
        duration: 2000,
      });

      return
    }

    else {
      toast.error("You can only claim once per day. Please try again tomorrow", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  }

  function chooseTask(task: Task, category: TaskCategory) {
    setChoosenTask(task);
    setChosenTaskCategory(category)
  }

  function closeTask() {
    setChoosenTask(undefined);
  }

  function buttonAction() {
    if (!choosenTask) return;

    if (choosenTask.claim) {
      handleClaim();
      return;
    }

    if (choosenTask.referral) {
      copyReferralLink(choosenTask.referral ? tgBotLink + profile?.keyID : "")
      return;
    }

    if (!choosenTask.resource) return;

    window.open(choosenTask.resource, "_blank");
  }

  useEffect(() => {
    let completedCategory: TaskCategory | undefined = undefined;

    tasks.filter((task) => task.reward && !task.completed).forEach((category) => {
      const anyUncompletedTask = category.tasks.find((task) => !task.completed);

      if (!anyUncompletedTask) {
        completedCategory = category;
      }
    })

    completedCategory &&
      setCompletedTaskCategory(completedCategory);
  }, [tasks]);

  return (
    <>
      <PageWrapper margin="32px 16px 160px 16px">
        <BackButton text="Earn" />
        <CurrentBalance small />
        <GuardianCard />
        {
          tasks.filter((category) => !!category.tasks.find((task) => task.active)).map((category) => (
            <FlexDiv $direction="column" key={category.title} $gap="12px" className="task-category">
              <FlexDiv $direction="column" $gap="8px">
                <FlexDiv $gap="5px" $align="center">
                  {category.icon && <Image alt={category.title} width={24} height={24} src={category.icon} />}
                  <P $fontSize="24px">{category.title}</P>
                </FlexDiv>
                {(category.reward && !category.completed) && (<P $fontSize="14px">Complete all tasks and receive {category.reward} {category.rewardAsset}</P>)}
              </FlexDiv>

              {
                category.tasks.filter((task) => task.active).map((task) => (
                  task.comingSoon ? (
                    <div key={task.title} style={{ position: 'relative', width: '100%', height: '104px', cursor: 'not-allowed', display: 'flex', border: '1px solid #535254', alignItems: 'center', borderRadius: '16px', backgroundColor: '#262527', justifyContent: 'space-between', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '14px' }}>
                        <Image src={task?.logo?.uri || ''} alt="Coming Soon" width={50} height={50} />
                        <div>
                          <p style={{ color: '#ADAAAD', fontSize: '24px', lineHeight: '28px' }}>{task.title}</p>
                          <p style={{ color: '#ADAAAD', fontSize: '12px', lineHeight: '20px' }}>Coming soon</p>
                        </div>
                      </div>
                      <Image src={Img.Lock} alt='lock' width={30} height={30} />
                    </div>
                  ) :
                    (
                      <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task ${task.completed && !task.claim ? 'completed' : ''}`} onClick={() => chooseTask(task, category)}>
                        {
                          task.logo && (
                            <FlexDiv $width="60px" $height="60px" $background={task.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
                              {task.logo.uri && (
                                <Image src={task.logo.uri} alt="Task" width={task.logo.color ? 28 : 48} height={task.logo.color ? 28 : 48} style={{ "borderRadius": "8px" }} />
                              )}
                            </FlexDiv>
                          )
                        }
                        <FlexDiv className="text-content" $direction="column" $gap="4px">
                          <P $fontSize="24px">{task.title}</P>
                        </FlexDiv>
                        {
                          task.completed ? (
                            <Image src={Img.TaskCheck} alt="Proceed" width={24} height={24} />
                          ) : (
                            <Image src={Img.RightArrowImg} alt="Proceed" width={28} height={28} />
                          )
                        }
                      </FlexDiv>
                    )
                ))
              }
            </FlexDiv>
          ))
        }
        {
          choosenTask && (
            <Modal align="flex-end" close={closeTask}>
              <FlexDiv $background="#111113E5" $width="100%" $padding="24px" className="modal-content" $direction="column" $align="center" $position="relative" $gap="24px">
                <Button className="close" onClick={closeTask}>X</Button>
                <P $fontSize="20px">{choosenTask.title}</P>
                {
                  choosenTask.claim ? (
                    <DailyClaim
                      handleClaim={handleClaim}
                    />
                  ) : choosenTask.quiz ? (
                    <DailyQuiz />
                  ) : (
                    <CommonTask
                      choosenTask={choosenTask}
                      categoryId={chosenTaskCategory?.categoryId}
                      handlePartnerCheckButton={handlePartnerCheckButton}
                    />
                  )
                }

                {
                  choosenTask.completed ? (
                    <FlexDiv $padding="10px 16px" $background="#79F8FF26" className="check" $width="100%" $radius="999px" $align="center" $gap="12px">
                      <Image src={Img.TaskCheck} alt="Proceed" width={24} height={24} />
                      <FlexDiv $direction="column" $gap="2px">
                        <P $color="#79F8FF" >Task completed!</P>
                        <P>Check your rewards in the Earn Page</P>
                      </FlexDiv>
                    </FlexDiv>
                  ) : (choosenTask?.referral || choosenTask?.type === 'social') && (
                    choosenTask?.cta === 'Open X' ? (
                      <div>
                        <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={buttonAction} $padding="18px" style={{ marginBottom: '16px' }}>
                          <FlexDiv $align="center" $gap="8px">
                            {
                              !choosenTask?.claim && (
                                <Image src={choosenTask?.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                              )
                            }
                            <P>{choosenTask?.referral ? "Copy referral link" : choosenTask?.cta}</P>
                          </FlexDiv>
                        </Button>

                        <label style={{ color: '#FFFFFF' }}>Enter your X username to confirm interaction tasks</label>
                        <input style={{ color: '#FFFFFF', borderRadius: '16px', display: 'block', width: '100%', padding: '14px 16px', height: '56px', marginTop: '16px', backgroundColor: isLoading ? '#1B1B1D' : '#63636366', border: 'none', fontSize: '16px' }} disabled={isLoading} className='import-input' value={userName.toLowerCase()} placeholder='Username without @' onChange={(e) => setUserName(e.target.value.toLowerCase())} />

                        <button style={{ color: '#FFFFFF', padding: '16px 24px', borderRadius: '32px', width: '100%', marginTop: '16px', marginBottom: '16px', border: isLoading ? '1px solid #fff' : 'none', backgroundColor: isLoading ? '#363E59' : '#17181F' }} disabled={isLoading} onClick={() => checkTwitterAccount()}>{isLoading ? 'Confirming...' : 'Confirm username'}</button>
                      </div>
                    ) :
                      choosenTask.cta === 'Open Telegram' && choosenTask?.type === 'social' ? (
                        <div>
                          <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={buttonAction} $padding="18px" style={{ marginBottom: '16px' }}>
                            <FlexDiv $align="center" $gap="8px">
                              {
                                !choosenTask.claim && (
                                  <Image src={choosenTask.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                                )
                              }
                              <P>{choosenTask.referral ? "Copy referral link" : choosenTask.cta}</P>
                            </FlexDiv>
                          </Button>

                          <label style={{ color: '#FFFFFF' }}>Send a private message with /id to <a href='https://t.me/conetGameUserBot' target='_blank' rel='noreferrer' style={{ color: '#8DA8FF', textDecoration: 'underline' }}>conetGameUserBot</a>, to get your telegram id, then input it in the field.</label>
                          <input style={{ color: '#FFFFFF', borderRadius: '16px', display: 'block', width: '100%', padding: '14px 16px', height: '56px', marginTop: '40px', backgroundColor: isLoading ? '#1B1B1D' : '#63636366', border: 'none', fontSize: '16px' }} disabled={isLoading} className='import-input' value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />

                          <button style={{ color: '#FFFFFF', padding: '16px 24px', borderRadius: '32px', width: '100%', marginTop: '32px', border: isLoading ? '1px solid #fff' : 'none', backgroundColor: isLoading ? '#363E59' : '#17181F' }} disabled={isLoading} onClick={() => checkTelegramAccount()}>{isLoading ? 'Confirming...' : 'Confirm ID'}</button>
                        </div>
                      ) :
                        (
                          <>
                            <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" disabled={choosenTask.claim && isTodayRewardTaken} onClick={buttonAction} $padding="18px">
                              <FlexDiv $align="center" $gap="8px">
                                {
                                  !choosenTask.claim && (
                                    <Image src={choosenTask.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                                  )
                                }
                                <P>{choosenTask.referral ? "Copy Telegram Game Referral Link" : choosenTask.cta}</P>
                              </FlexDiv>
                            </Button>

                            {choosenTask.referral &&
                              <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={() => copyReferralLink(choosenTask.referral ? gameLink + profile?.keyID : "")} $padding="18px">
                                <FlexDiv $align="center" $gap="8px">
                                  <Image src={Img.CopyImg} alt="Open External" width={24} height={24} />
                                  <P>Copy Game Referral Link</P>
                                </FlexDiv>
                              </Button>
                            }
                          </>
                        )
                  )
                }
              </FlexDiv>
            </Modal>
          )
        }
      </PageWrapper>
    </>
  )
}