import Image from 'next/image';
import { FlexDiv } from '../div';
import { Img } from '@/utilitiy/images';
import { P } from '../p';
import Skeleton from 'react-loading-skeleton';
import { firstLetterUpperCase, formatToken } from '@/utilitiy/functions';
import { useGameContext } from '@/utilitiy/providers/GameProvider';

type Asset = 'cntp' | 'conet' | 'ticket';

interface Props {
  inline?: boolean;
  asset: Asset;
  secondaryAsset?: Asset;
}

export default function CurrentBalance({ inline = false, asset = 'cntp', secondaryAsset }: Props) {
  const fontSize = inline ? 16 : 20;
  const { profile } = useGameContext();

  const getFormattedBalance = () => {
    if (asset === 'cntp')
      return formatToken(profile?.tokens?.cCNTP?.balance);
    if (asset === 'conet')
      return formatToken(profile?.tokens?.conet?.balance);
    else if (asset === 'ticket')
      return profile.tickets.balance;
  };

  const getFormattedSecondaryBalance = () => {
    if (!secondaryAsset) return '';

    if (secondaryAsset === 'cntp')
      return formatToken(profile?.tokens?.cCNTP?.balance);
    if (secondaryAsset === 'conet')
      return formatToken(profile?.tokens?.conet?.balance);
    else if (secondaryAsset === 'ticket')
      return profile.tickets.balance;
  }

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
              <P $fontSize={`${fontSize}px`}>Current Balance</P>
            </FlexDiv>

            <FlexDiv $gap="8px" $align="flex-start" $direction="column" $justify="flex-start">
              <FlexDiv $align="center" $gap="6px">
                <P $fontSize={`${fontSize + 4}px`}>
                  {profile ? (
                    getFormattedBalance()
                  ) : (
                    <Skeleton width={200} />
                  )}
                </P>
                <P>{asset.toUpperCase()}</P>
              </FlexDiv>
              {
                secondaryAsset && (
                  <FlexDiv $align="center" $gap="6px">
                    <P $fontSize="12px">{getFormattedSecondaryBalance()}</P>
                    <P $fontSize="12px">{secondaryAsset.toUpperCase()}</P>
                  </FlexDiv>
                )
              }
            </FlexDiv>
          </>
        )
      }
    </FlexDiv>
  )
}