import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { Task } from '../../../shared/earnTasks';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

interface Props {
  choosenTask: Task;
  referral?: string;
}

export default function CommonTask({ choosenTask, referral }: Props) {

  function copyReferralLink() {
    if (!referral) return;

    //Copy and Toast
    copy(referral);

    toast.success("Referral Link copied to the clipbboard!", {
      position: "bottom-center",
      duration: 2000,
    });
  }

  return (
    <>
      <FlexDiv $gap="12px" $align="center">
        {
          choosenTask?.logo && (
            <FlexDiv $width="100px" $height="100px" $background={choosenTask?.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
              {choosenTask?.logo?.uri && (
                <Image src={choosenTask?.logo?.uri} alt="Task" width={28} height={28} />
              )}
            </FlexDiv>
          )
        }
        <FlexDiv $flex={1} $direction="column" $gap="12px">
          <P $fontSize="14px">{choosenTask?.caption}</P>
          {choosenTask?.reward ?
            <FlexDiv $gap="5px" $align="center">
              <Image src={Img.Tickets} alt="Tickets" width={32} height={32} />
              <P $fontSize="14px">+{choosenTask?.reward} Tickets</P>
            </FlexDiv> : ""
          }
        </FlexDiv>
      </FlexDiv>
      {
        referral && choosenTask?.referral && (
          <FlexDiv $width="100%" $direction="column">
            <P $color="#C8C6C8" $fontSize="18px">Your referral link:</P>
            <FlexDiv $justify="space-between" $padding="8px 16px">
              <P className="text-overflow">{referral}</P>
              <Button onClick={copyReferralLink}>
                <Image src={Img.CopyImg} alt="Copy" width={24} height={24} />
              </Button>
            </FlexDiv>
          </FlexDiv>
        )
      }
    </>
  )
}