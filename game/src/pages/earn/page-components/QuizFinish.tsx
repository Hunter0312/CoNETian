import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import QuizOption from './QuizOption';

interface Props {
  won: boolean;
  answer: string;
  answerIndex: number;
  reward: number;
}

export default function QuizFinish({ won, answer, answerIndex, reward }: Props) {
  return (
    <>
      <FlexDiv $position="relative">
        <Div $width="70px" $height="70px" $radius="999px" $position="absolute" className="quiz-backdrop" $boxShadow={won ? "0px 0px 80px 0px #F3CD6999" : "0px 0px 80px 0px #FF41054D"}></Div>
        <Image src={won ? Img.Coin : Img.QuizMeteor} alt="Quiz" width={won ? 130 : 90} height={won ? 130 : 90} />
      </FlexDiv>
      {
        won
        ? (
          <FlexDiv $direction="column" $gap="8px">
            <P $fontSize="24px" $color="#79F8FF">Right answer!</P>
            <Div
              $width="160px" $height="1px"
              $background="linear-gradient(90.9deg, rgba(121, 248, 255, 0) 0.47%, #79F8FF 50.82%, #D775FF 76%, rgba(215, 117, 255, 0) 101.18%)"
            ></Div>
            <FlexDiv $direction="column" $gap="10px" $align="center" $margin="20px 0 40px">
              <P $fontSize="18px" className="small-dropshadow">Congratulations!</P>
              <P $fontSize="18px" className="small-dropshadow">You won</P>
              <P $fontSize="32px" className="small-dropshadow">{reward} CNTP</P>
            </FlexDiv>
          </FlexDiv>
        ) : (
          <FlexDiv $direction="column" $align="center" $gap="30px" $padding="20px 0">
            <P $fontSize="24px">Sorry! Wrong answer</P>
            <P $align="center" $width="320px">Don’t worry! You can come back tomorrow and try again.</P>
          </FlexDiv>
        )
      }
      <FlexDiv $direction="column" $gap="16px">
        {
          !won && (
            <>
              <P >The correct answer is:</P>
              <QuizOption
                text={answer}
                index={answerIndex}
                state="correct"
              />
            </>
          )
        }
        <FlexDiv $padding="10px 20px" $background="#79F8FF26" className="check" $width="100%" $radius="999px" $align="center" $gap="12px">
          <Image src={Img.TaskCheck} alt="Proceed" width={24} height={24} />
          <FlexDiv $direction="column" $gap="2px">
            <P $color="#79F8FF" >Task completed!</P>
            <P $fontSize="15px">Come back tomorrow to keep earning!</P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </>
  )
}