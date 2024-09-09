import { FlexDiv } from '@/components/div';
import { P } from '../../../components/p';
import { useState } from 'react';
import { dailyClaims } from '../data';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';

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
    uri: Img.Key,
    size: 52
  },
}

export default function DailyClaim() {
  const [dailyClaimOptions, setDailyClaimOptions] = useState(dailyClaims);

  return (
    <FlexDiv $direction="column" $gap="24px">
      <P>Claim daily rewards and earn CNTPs by logging in each day without skipping!</P>

      <div className="daily-claim-grid">
        {
          dailyClaimOptions.map((option) => (
            <FlexDiv key={option.day} $padding="12px" $border="1px solid #61C6CC" $background="#17181F" $direction="column" $align="center" $justify="space-between" $radius="16px">
              <P>Day {option.day}</P>
              <Image src={dailyClaimTypeImage[option.type].uri} alt="Reward" width={dailyClaimTypeImage[option.type].size} height={dailyClaimTypeImage[option.type].size} />
              <P>{option.reward} {option.type}</P>
            </FlexDiv>
          ))
        }
      </div>
    </FlexDiv>
  )
}