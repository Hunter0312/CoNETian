import { FlexDiv } from '@/components/div';
import { P } from '../../../components/p';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { formatToken } from '@/utilitiy/functions';

interface Props {
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

export default function DailyClaim({ handleClaim }: Props) {
  const { profile, dailyClaimInfo } = useGameContext()

  const getTodayAssetImage = () => {
    if (dailyClaimInfo?.todayAsset) {
      return dailyClaimTypeImage[dailyClaimInfo?.todayAsset.asset.toUpperCase()].uri
    }
    return Img.Coin
  }

  const getTodayQuantity = () => {
    if (!dailyClaimInfo?.todayAsset) return 0

    if (dailyClaimInfo?.todayAsset.asset.toLowerCase() === "cntp") {
      return parseInt(formatToken(parseInt(dailyClaimInfo?.todayAsset.quantity)))
    }
    else {
      return parseInt(dailyClaimInfo?.todayAsset.quantity)
    }
  }

  const getTaskImage = (day: number, isTaken: boolean) => {
    if (dailyClaimInfo?.todayDayOfWeek) {
      if (isTaken)
        return <Image src={Img.CheckImg} alt="Reward Taken" width={24} height={24} className="reward-taken" />

      if (day === dailyClaimInfo?.todayDayOfWeek)
        return <Image src={getTodayAssetImage()} alt="Reward" width={24} height={20} />

      if (day < dailyClaimInfo?.todayDayOfWeek)
        <Image src={Img.NotCheckPinkImg} alt="Reward" width={24} height={20} />
    }

    return <Image src={Img.NotCheckPinkImg} alt="Reward" width={24} height={20} />
  }

  const convertNumberToDayOfWeek = (number: number) => {
    const days = ['Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun.']
    return days[number]
  }

  return (
    <FlexDiv $direction="column" $gap="24px">
      <P>Claim daily rewards and earn CNTPs by logging in each day without skipping!</P>

      <div className="daily-claim-grid">
        {
          profile?.dailyClaimWeek?.map((isTaken: boolean, index: number) => (
            <FlexDiv
              className={index === dailyClaimInfo?.todayDayOfWeek ? "current" : ""}
              onClick={() => index === dailyClaimInfo?.todayDayOfWeek && !isTaken && handleClaim()}
              $position="relative" key={index}
              $padding="12px"
              $border={`1px solid ${dailyClaimInfo?.todayDayOfWeek && dailyClaimInfo?.todayDayOfWeek !== index ? "#79F8FF26" : "#61C6CC"}`}
              $background={isTaken || (dailyClaimInfo?.todayDayOfWeek && dailyClaimInfo?.todayDayOfWeek > index) ? "#79F8FF26" : "#17181F"}
              $direction="column"
              $align="center"
              $justify={dailyClaimInfo?.todayDayOfWeek && dailyClaimInfo?.todayDayOfWeek >= index ? "center" : "flex-start"}
              $radius="16px"
              $gap="8px"

              style={{ cursor: index === dailyClaimInfo?.todayDayOfWeek && !isTaken ? "pointer" : "not-allowed" }}
            >
              <P className="label">{convertNumberToDayOfWeek(index)}</P>

              {getTaskImage(index, isTaken)}

              {index === dailyClaimInfo?.todayDayOfWeek &&
                <P>{getTodayQuantity()} {dailyClaimInfo?.todayAsset?.asset.toUpperCase()}</P>
              }

              {
                dailyClaimInfo?.todayDayOfWeek && dailyClaimInfo?.todayDayOfWeek < index && (
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