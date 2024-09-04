import BackButton from '@/components/backButton';
import CurrentBalance from '@/components/currentBalance';
import GuardianCard from '@/components/guardianCard';
import PageWrapper from '@/components/pageWrapper';
import { useState } from 'react';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Task, taskCategories, TaskCategory } from './data';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';

import "./styles.css";
import Modal from '@/components/modal';
import { Button } from '@/components/button';

export default function Earn() {
  const [tasks, setTasks] = useState<TaskCategory[]>(taskCategories);
  const [choosenTask, setChoosenTask] = useState<Task>();

  //! Should change later to proper current user referral link
  const userReferralLink = "https://t.me/conetianLearn_bot/?start=0xad1fd987e70e4fce4f9e1ba023e57ccbe191424c";

  function chooseTask(task: Task) {
    if (task.completed) return;

    setChoosenTask(task);
  }

  function closeTask() {

    setChoosenTask(undefined);
  }

  function copyReferralLink() {
    //Copy and Toast
    navigator.clipboard.writeText(userReferralLink);
  }

  function buttonAction() {
    if (!choosenTask) return;

    if (choosenTask.referral) {
      // Open Telegram Contact List

      return;
    }

    if (!choosenTask.resource) return;

    window.open(choosenTask.resource, "_blank");
  }

  return (
    <PageWrapper margin="32px 16px 160px 16px">
      <BackButton text="Earn" />
      <CurrentBalance small />
      <GuardianCard />
      {
        tasks.map((category) => (
          <FlexDiv $direction="column" key={category.title} $gap="12px" className="task-category">
            <FlexDiv $gap="5px">
              <P $fontSize="24px">{category.title}</P>
            </FlexDiv>
            {
              category.tasks.map((task) => (
                <FlexDiv key={task.title} $gap="16px" $padding="16px" $border="1px solid #FFFFFF1A" $radius="16px" $align="center" className={`task ${task.completed ? 'completed': ''}`} onClick={() => chooseTask(task)}>
                  {
                    task.logo && (
                      <FlexDiv $width="60px" $height="60px" $background={task.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
                        {task.logo.uri && (
                          <Image src={task.logo.uri} alt="Task" width={28} height={28} />
                        )}
                      </FlexDiv>
                    )
                  }
                  <FlexDiv className="text-content" $direction="column" $gap="4px">
                    <P $fontSize="24px">{task.title}</P>
                    <FlexDiv $gap="5px" $align="center">
                      <Image src={Img.Coin} alt="CNTP" width={32} height={32} />
                      <P $fontSize="14px">+{task.reward} CNTPs</P>
                    </FlexDiv>
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
        choosenTask && (
          <Modal align="flex-end" close={closeTask}>
            <FlexDiv $background="#111113E5" $width="100%" $padding="24px" className="modal-content" $direction="column" $align="center" $position="relative" $gap="24px">
              <Button className="close" onClick={closeTask}>X</Button>
              <P $fontSize="20px">{choosenTask.title}</P>
              <FlexDiv $gap="12px" $align="center">
                {
                  choosenTask.logo && (
                    <FlexDiv $width="100px" $height="100px" $background={choosenTask.logo.color || "transparent"} $radius="8px" $justify="center" $align="center">
                      {choosenTask.logo.uri && (
                        <Image src={choosenTask.logo.uri} alt="Task" width={28} height={28} />
                      )}
                    </FlexDiv>
                  )
                }
                <FlexDiv $flex={1} $direction="column" $gap="12px">
                  <P $fontSize="14px">{choosenTask.caption}</P>
                  <FlexDiv $gap="5px" $align="center">
                      <Image src={Img.Coin} alt="CNTP" width={32} height={32} />
                      <P $fontSize="14px">+{choosenTask.reward} CNTPs</P>
                    </FlexDiv>
                </FlexDiv>
              </FlexDiv>
              {
                choosenTask.referral && (
                  <FlexDiv $width="100%" $direction="column">
                    <P $color="#C8C6C8" $fontSize="18px">Your referral link:</P>
                    <FlexDiv $justify="space-between" $padding="8px 16px">
                      <P className="text-overflow">{userReferralLink}</P>
                      <Button onClick={copyReferralLink}>
                        <Image src={Img.CopyImg} alt="Copy" width={24} height={24} />
                      </Button>
                    </FlexDiv>
                  </FlexDiv>
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
                ) : (
                  <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={buttonAction} $padding="18px">
                    <FlexDiv $align="center" $gap="8px">
                      <Image src={choosenTask.referral ? Img.Share : Img.OpenExternal} alt="Open External" width={24} height={24} />
                      <P>{choosenTask.referral ? "Share referral link" : choosenTask.cta}</P>
                    </FlexDiv>
                  </Button>
                )
              }
            </FlexDiv>
          </Modal>
        )
      }
    </PageWrapper>
  )
}