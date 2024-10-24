import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { keys, KeyType } from '../../../shared/boxes';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/button';
import ConfirmOrder from './confirm-order';
import Supplies from '@/components/supplies';
import BackButton from '@/components/backButton';
import { Img } from '@/utilitiy/images';
import OrderProcess from './order-process';

interface Props {
  closeKeys: () => void;
}

export default function Keys({ closeKeys }: Props) {
  //! Gather from profile after
  const [userKeys, setUserKeys] = useState<Record<string, number>>({
    normal: 0,
    special: 0,
    conet: 0,
  })

  const [choosenKey, setChoosenKey] = useState<KeyType>();
  const [transactionState, setTransactionState] = useState<"confirm" | "progress" | "success">();

  function handleBuyKey() {
    if (!choosenKey) return;

    setTransactionState("confirm");
  }

  if (transactionState && choosenKey) {
    switch (transactionState) {
      case "confirm":
        return (
          <>
            <BackButton text="Confirm your order" action={() => setTransactionState(undefined)} />
            <ConfirmOrder currentKey={choosenKey} />
            <FlexDiv $direction="column" $align="center" $gap="8px">
              <Button
                $width="80%" $radius="999px"
                $background="#17181F"
                $border="1px solid #79F8FF"
                $padding="18px" onClick={() => setTransactionState("progress")}
              >
                Confirm payment
              </Button>
              <FlexDiv className="confirm-payment" $gap="4px" $align="center">
                <Image src={Img.Lock} alt="Secure" width={16} height={16} />
                <P $fontSize="12px" >Secure payment</P>
              </FlexDiv>
            </FlexDiv>
          </>
        )

      case "progress":
        return (
          <>
            <OrderProcess inProgress={true} finish={() => setTransactionState("success")} choosenKey={choosenKey} />
            <FlexDiv $direction="column" $align="center" $gap="8px">
              <Button
                $width="80%" $radius="999px"
                $background="#363E59"
                $padding="18px" onClick={() => setTransactionState("progress")}
              >
                <FlexDiv $align="center" $justify="center" $gap="10px">
                  <Image src={Img.Progress} alt="Processing" width={20} height={20} className="animate-rotate" />
                  <P>Processing</P>
                </FlexDiv>
              </Button>
              <FlexDiv className="confirm-payment" $gap="4px" $align="center">
                <Image src={Img.Lock} alt="Secure" width={16} height={16} />
                <P $fontSize="12px" >Secure payment</P>
              </FlexDiv>
            </FlexDiv>
          </>
        )

      case "success":
        return (
          <>
            <OrderProcess inProgress={false} choosenKey={choosenKey} fee="0.12345" networkCost="100" />
            <FlexDiv $direction="column" $align="center" $gap="8px">
              <Button
                $width="80%" $radius="999px"
                $background="#17181F"
                $border="1px solid #79F8FF"
                $padding="18px" onClick={() => {
                  setTransactionState(undefined);
                  setChoosenKey(undefined);
                }}
              >
                Back to Shop
              </Button>
              <FlexDiv className="confirm-payment" $gap="4px" $align="center">
                <Image src={Img.Lock} alt="Secure" width={16} height={16} />
                <P $fontSize="12px" >Secure payment</P>
              </FlexDiv>
            </FlexDiv>
          </>
        )
    }
  }

  return (
    <FlexDiv $direction="column" $gap="24px">
      <BackButton text="Buy Key" action={closeKeys} />
      <Supplies />
      <Div className="split" />
      <FlexDiv $direction="column" $gap="12px">
        <P $fontSize="24px">Keys for the boxes</P>
        <P $color="#C8C6C8" className="text-max-width">Choose wisely the right key for the right box.</P>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="12px">
        {
          keys.map((key) => (
            <FlexDiv
              key={key.name} $gap="28px" $padding="10px 24px"
              $border={`1px solid ${choosenKey?.name === key.name ? "#79F8FF" : "#535254"}`}
              $radius="16px" $background="#17181F" $height="70px"
              onClick={() => setChoosenKey(key)}
            >
              <FlexDiv $align="center" $gap="24px">
                <Image src={key.icon} alt={`${key.name} Key`} width={28} height={28} />
                <P $fontSize="12px"><strong style={{ color: "#79F8FF", fontSize: "20px" }}>{userKeys[key.name]}</strong> OWNED</P>
              </FlexDiv>
              <Div className="vertical-split" />
              <FlexDiv $gap="4px" $direction="column" $justify="center">
                <P $fontSize="12px" $color="#ADAAAD">{key.name.charAt(0).toUpperCase() + key.name.slice(1)} key costs:</P>
                <P>{key.cost.cntp} CNTP + {key.cost.tickets} Tickets</P>
              </FlexDiv>
            </FlexDiv>
          ))
        }
      </FlexDiv>
      <Button
        $width="100%" $radius="999px"
        $background={choosenKey ? "#17181F" : "#474648"}
        $border={`1px solid ${choosenKey ? "#79F8FF" : "#535254"}`}
        $padding="18px" onClick={handleBuyKey}
        disabled={!choosenKey}
      >
        Buy Key
      </Button>
    </FlexDiv>
  )
}