import Image from 'next/image';
import { FlexDiv } from '../div';
import { Img } from '@/utilitiy/images';
import { P } from '../p';
import Skeleton from 'react-loading-skeleton';
import { firstLetterUpperCase, formatToken } from '@/utilitiy/functions';
import { useGameContext } from '@/utilitiy/providers/GameProvider';

interface Props {
  inline?: boolean;
  asset: 'cntp' | 'ticket';
}

export default function CurrentBalance({ inline = false, asset = 'cntp' }: Props) {
  const fontSize = inline ? 16 : 20;
  const { profile } = useGameContext();

  const getFormattedBalance = () => {
    if (asset === 'cntp')
      return formatToken(profile?.tokens?.cCNTP?.balance);
    else if (asset === 'ticket')
      return profile.tickets.balance;

  };

  return (
    <FlexDiv $direction="column" $gap="12px" $width="100%">
      {
        inline ? (
          <FlexDiv $gap="8px" $align="center">
            <P $fontSize={`${fontSize}px`}>{firstLetterUpperCase(asset)} Balance: </P>

            <P $fontSize={`${fontSize + 4}px`}>
              {profile ? (
                getFormattedBalance()
              ) : (
                <Skeleton width={200} />
              )}
            </P>
          </FlexDiv>
        ) : (
          <>
            <FlexDiv $gap="8px" $align="center">
              <Image src={Img.LogoImg} width={32} height={32} alt="Conet" />
              <P $fontSize={`${fontSize}px`}>{firstLetterUpperCase(asset)} Balance</P>
            </FlexDiv>

            <FlexDiv $gap="8px" $align="center" $justify={inline ? "flex-start" : "space-between"}>
              <P $fontSize={`${fontSize + 4}px`}>
                {profile ? (
                  getFormattedBalance()
                ) : (
                  <Skeleton width={200} />
                )}
              </P>
            </FlexDiv>
          </>
        )
      }
    </FlexDiv>
  )
}