import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { Task } from '../../../shared/earnTasks';

interface Props {
  choosenTask: Task;
  categoryId?: string;
  handlePartnerCheckButton: () => Promise<void>;
}

export default function CommonTask({ choosenTask, categoryId, handlePartnerCheckButton }: Props) {
  return (
    <>
      <FlexDiv $gap="12px" $align="center">
        {
          choosenTask?.logo && (
            <FlexDiv $width="100px" $height="100px" $background={choosenTask?.logo?.color || "transparent"} $radius="8px" $justify="center" $align="center">
              {choosenTask?.logo?.uri && (
                <Image src={choosenTask?.logo?.uri} alt="Task" width={choosenTask?.logo?.size || 100} height={choosenTask?.logo?.size || 100} style={{ "borderRadius": "8px" }} />
              )}
            </FlexDiv>
          )
        }

        <FlexDiv $flex={1} $direction="column" $gap="12px">
          <P $fontSize="14px">{choosenTask?.caption}</P>

          {choosenTask?.extraInstruction && <P $fontSize="10px" $color="#ADAAAD">{choosenTask?.extraInstruction}</P>}

          {choosenTask?.reward ?
            <FlexDiv $gap="5px" $align="center">
              <Image src={Img.Tickets} alt="Tickets" width={32} height={32} />
              <P $fontSize="14px">+ {choosenTask?.reward} Tickets</P>
            </FlexDiv> : ""
          }
        </FlexDiv>
      </FlexDiv>

      {choosenTask?.type === 'partner' && (
        <FlexDiv $width='100%' $justify="center" $align="center" $gap="12px">
          <Button $width="100%" $radius="999px" $background="#17181F" $border="1px solid #04DAE8" onClick={handlePartnerCheckButton} $padding="18px">
            <FlexDiv $align="center" $gap="8px">
              <Image src={Img.OpenExternal} alt="Open External" width={24} height={24} />
              <P>{choosenTask.cta}</P>
            </FlexDiv>
          </Button>
        </FlexDiv>
      )}
    </>
  )
}