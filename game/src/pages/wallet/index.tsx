import BackButton from '@/components/backButton';
import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import MiningStatus from '@/components/miningStatus';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import Image from 'next/image';
import { useState } from 'react';

export default function Wallet() {
  const [newWallet, setNewWallet] = useState<string>('');

  return (
    <FlexDiv $direction="column" $gap="32px" $margin="32px 16px 140px 16px">
      <MiningStatus />

      <BackButton text="My Wallet" />

      <FlexDiv $direction="column" $gap="12px" $width="100%">
        <FlexDiv $gap="8px" $align="center">
          <Image src={Img.LogoImg} width={32} height={32} alt="Conet" />
          <P $fontSize="24px">Current balance</P>
        </FlexDiv>
        <FlexDiv $gap="8px" $align="center" $justify="space-between">
          <P $fontSize="28px">1645.000645</P>
          <P $fontSize="12px">CNTP EARNED</P>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $direction="column" $gap="8px" $width='100%'>
        <FlexDiv $direction="column" $gap="16px" $height="200px" $width="100%" $padding="14px 24px" $border="1px solid rgba(255, 255, 255, .1)" $radius="16px">
          <P $fontSize="24px">Your CoNETian Wallet</P>
          <FlexDiv $direction="column" $gap="16px">
            <FlexDiv $direction="column" $gap="12px">
              <P $color="#C8C6C8">Wallet Address</P>
              <FlexDiv $padding="0 16px" $justify="space-between">
                <P>0x00e...fcdf0</P>
                <Button>
                  <Image height={24} width={24} alt="Copy" src={Img.CopyImg} />
                </Button>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv $direction="column" $gap="12px">
              <P $color="#C8C6C8">Private key</P>
              <FlexDiv $padding="0 16px" $justify="space-between">
                <P>0xela...68b96</P>
                <Button>
                  <Image height={24} width={24} alt="Copy" src={Img.CopyImg} />
                </Button>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv $gap="8px" $align="center" $padding='0 0 0 24px'>
          <P $fontSize="14px" $color="#C8C6C8">Your inviter:</P>
          <P $fontSize="12px">0x305...05c4d</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="18px">
        <FlexDiv $direction="column" $gap="8px">
          <P $fontSize="24px">Import Another Wallet</P>
          <P $color="#C8C6C8">Import a wallet from CoNET platform into CoNETian for easier management and boosted benefits!</P>
        </FlexDiv>
        <input
          value={newWallet}
          onChange={(e) => setNewWallet(e.target.value)}
          placeholder="Enter Private Key"
          style={{
            padding: "14px 16px",
            fontSize: "16px",
            background: "rgba(99, 99, 99, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
          }}
        />
        <Button $padding="18px" $radius="32px" $border="1px solid #04DAE8">
          Import Wallet
        </Button>
      </FlexDiv>
    </FlexDiv>
  )
}