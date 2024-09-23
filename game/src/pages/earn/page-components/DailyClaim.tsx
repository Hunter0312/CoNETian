import { FlexDiv } from '@/components/div';
import { P } from '../../../components/p';
import { useState } from 'react';
import { dailyClaims } from '../../../shared/earnTasks';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';

interface Props {
  claimStreak: number;
  handleClaim: () => void;
}

const dailyClaimTypeImage: Record<string, any> = {
  "CNTP": {
    uri: Img.Coin,
    size: 36
  },
  "TICKET": {
    uri: Img.Tickets,
    size: 26
  },
  "KEY": {
    uri: Img.NormalKey,
    size: 32
  },
}

export default function DailyClaim({ claimStreak, handleClaim }: Props) {
  const [dailyClaimOptions, setDailyClaimOptions] = useState(dailyClaims);

  return (
    <FlexDiv $direction="column" $gap="24px">
      <P>Claim daily rewards and earn CNTPs by logging in each day without skipping!</P>

      <div className="daily-claim-grid">
        {
          dailyClaimOptions.map((option) => (
            <FlexDiv
              className={option.day === claimStreak + 1 ? "current" : ""}
              onClick={() => option.day === claimStreak + 1 && handleClaim()}
              $position="relative" key={option.day}
              $padding="12px"
              $border={`1px solid ${claimStreak >= option.day ? "#79F8FF26" : "#61C6CC"}`}
              $background={claimStreak >= option.day ? "#79F8FF26" : "#17181F"}
              $direction="column" $align="center" $justify="space-between" $radius="16px"
            >
              <P className="label">Day {option.day}</P>
              {
                claimStreak >= option.day
                  ? (
                    <Image src={Img.CheckImg} alt="Reward Taken" width={24} height={24} className="reward-taken" />
                  )
                  : (
                    <Image src={dailyClaimTypeImage[option.type].uri} alt="Reward" width={dailyClaimTypeImage[option.type].size} height={dailyClaimTypeImage[option.type].size} />
                  )
              }
              <P>{option.reward} {option.type}</P>
              {
                option.day > claimStreak + 1 && (
                  <FlexDiv className="blocked" $justify="center" $align="center" $background="#1B1B1D1A" $radius="17px">
                    <Image src={Img.Lock} alt="Blocked" width={36} height={36} />
                  </FlexDiv>
                )
              }
            </FlexDiv>
          ))
        }
      </div>
    </FlexDiv>
  )
}