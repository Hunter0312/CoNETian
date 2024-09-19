import toast from 'react-hot-toast';
import BackButton from '@/components/backButton';
import CurrentBalance from '@/components/currentBalance';
import GuardianCard from '@/components/guardianCard';
import PageWrapper from '@/components/pageWrapper';
import { useEffect, useState } from 'react';
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
import { fetchCheckTelegram, fetchCheckTwitter } from '@/API/getData';
import copy from 'copy-to-clipboard';

export default function Earn() {
  const [tasks, setTasks] = useState<TaskCategory[]>(taskCategories);
  const [choosenTask, setChoosenTask] = useState<Task>();
  const [userName, setUserName] = useState<string>('')
  const [telegramId, setTelegramId] = useState<string>('')
  const [claimStreak, setClaimStreak] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0)
  const [completedTaskCategory, setCompletedTaskCategory] = useState<TaskCategory>();

  const { profile } = useGameContext();
  const tgBotLink = "https://t.me/conetiantest_bot/?start=";

  useEffect(() => {
    async function fetchSocialMedias() {
      const res = await checkSocialMedias(profile.keyID)
      if (res[1][0][0].length === 0) return
      const tasksCopy = [...tasks]
      if (res[1][0][0].includes('2')) {
        tasksCopy[2].tasks[0].completed = true
      }
      if (res[1][0][0].includes('3')) {
        const tasksCopy = [...tasks]
        tasksCopy[2].tasks[1].completed = true

      }
      if (res[1][0][0].includes('4')) {
        tasksCopy[2].tasks[2].completed = true
      }
      setTasks(tasksCopy)
    }
    fetchSocialMedias()
  }, [profile])

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
    } else {
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
    } if (res.response.isusedByOtherWallet === true) {
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

  function chooseTask(task: Task) {
    if (task.completed) return;
    setChoosenTask(task);
  }

  function closeTask() {
    setChoosenTask(undefined);
    setStep(0)
  }

  function buttonAction() {
    if (!choosenTask) return;

    if (choosenTask.claim) {
      handleClaim();
      setStep(1)
      return;
    }

    if (choosenTask.referral) {
      copyReferralLink(choosenTask.referral ? tgBotLink + profile?.keyID : "")
      return;
    }

    if (!choosenTask.resource) return;

    window.open(choosenTask.resource, "_blank");
    setStep(1)
  }

  function handleClaim() {
    // process the claim;

    setClaimStreak((prev) => prev === 7 ? 0 : prev + 1);
  }

  function handleCompleteTaskCategory() {
    // complete task category
    if (!completedTaskCategory) return;

    setTasks((prev) => prev.map((category) => category.title === completedTaskCategory.title ? ({
      ...category,
      completed: true,
    }) : category))

    setCompletedTaskCategory(undefined);
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
                {(category.reward && !category.completed) && (<P $fontSize="14px">Complete all tasks and receive the reward</P>)}
              </FlexDiv>
              {
                category.tasks.filter((task) => task.active).map((task) => (
                  <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" $height="95px" className={`task ${task.completed ? 'completed' : ''}`} onClick={() => chooseTask(task)}>
                    {
                      task.logo && (
                        <FlexDiv $width="60px" $height="60px" $background={task.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
                          {task.logo.uri && (
                            <Image src={task.logo.uri} alt="Task" width={task.logo.color ? 28 : 48} height={task.logo.color ? 28 : 48} />
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
                ))
              }
            </FlexDiv>
          ))
        }
        {
          completedTaskCategory && (
            <Modal align="flex-end" close={() => setCompletedTaskCategory(undefined)}>
              <FlexDiv $background="#111113E5" $width="100%" $padding="24px" className="modal-content" $direction="column" $align="center" $position="relative" $gap="24px">
                <Button className="close" onClick={() => setCompletedTaskCategory(undefined)}>X</Button>
                <P $fontSize="20px">Tasks Completed</P>
                <FlexDiv $align="center" $gap="24px" >
                  <FlexDiv $justify="center" $align="center" $radius="18px" $border="1px solid #999999" $background="#1B1B1D" $width="108px" $height="108px" $position="relative">
                    <Div $width="40px" $height="30px" $radius="999px" $position="absolute" className="quiz-backdrop" $boxShadow="0px 0px 40px 0px #04DAE8"></Div>
                    <Image src={Img.Tickets} alt="Tickets" width={60} height={60} />
                  </FlexDiv>
                  <FlexDiv $flex={1}>
                    <P>You have completed all the tasks, claim your reward!</P>
                  </FlexDiv>
                </FlexDiv>
                <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={handleCompleteTaskCategory} $padding="18px">
                  <FlexDiv $align="center" $gap="8px">
                    <P>Claim Reward</P>
                  </FlexDiv>
                </Button>
              </FlexDiv>
            </Modal>
          )
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
                      claimStreak={claimStreak} handleClaim={handleClaim}
                    />
                  ) : choosenTask.quiz ? (
                    <DailyQuiz />
                  ) : (
                    step === 0 && <CommonTask
                      choosenTask={choosenTask}
                      referral={choosenTask.referral ? tgBotLink + profile?.keyID : ""}
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
                  ) : (choosenTask.referral || choosenTask.cta) && (
                    (choosenTask.cta === 'Open X' && step === 1) ? (
                      <div>
                        <label>Enter your X username to confirm interaction tasks</label>
                        <input style={{ borderRadius: '16px', display: 'block', width: '100%', padding: '14px 16px', height: '56px', marginTop: '40px', backgroundColor: isLoading ? '#1B1B1D' : '#63636366', border: 'none', fontSize: '16px' }} disabled={isLoading} className='import-input' value={userName} onChange={(e) => setUserName(e.target.value)} />

                        <button style={{ padding: '16px 24px', borderRadius: '32px', width: '100%', marginTop: '40px', border: isLoading ? '1px solid #fff' : 'none', backgroundColor: isLoading ? '#363E59' : '#17181F' }} disabled={isLoading} onClick={() => checkTwitterAccount()}>{isLoading ? 'Checking...' : 'Confirm'}</button>
                      </div>
                    ) :
                      (choosenTask.cta === 'Open Telegram' && step === 1) ? (
                        <div>
                          <label>Enter your telegram ID to confirm interaction tasks</label>
                          <input style={{ borderRadius: '16px', display: 'block', width: '100%', padding: '14px 16px', height: '56px', marginTop: '40px', backgroundColor: isLoading ? '#1B1B1D' : '#63636366', border: 'none', fontSize: '16px' }} disabled={isLoading} className='import-input' value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />

                          <button style={{ padding: '16px 24px', borderRadius: '32px', width: '100%', marginTop: '40px', border: isLoading ? '1px solid #fff' : 'none', backgroundColor: isLoading ? '#363E59' : '#17181F' }} disabled={isLoading} onClick={() => checkTelegramAccount()}>{isLoading ? 'Checking...' : 'Confirm'}</button>
                        </div>
                      ) :
                        (<Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={buttonAction} $padding="18px">
                          <FlexDiv $align="center" $gap="8px">
                            {
                              !choosenTask.claim && (
                                <Image src={choosenTask.referral ? Img.CopyImg : Img.OpenExternal} alt="Open External" width={24} height={24} />
                              )
                            }
                            <P>{choosenTask.referral ? "Copy referral link" : choosenTask.cta}</P>
                          </FlexDiv>
                        </Button>)
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