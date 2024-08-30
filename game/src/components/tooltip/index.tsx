import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { Button } from '../button';

interface Props {
  message: string;
}

export default function Tooltip({ message }: Props) {
  return (
    <Button $background="#474648" $padding="4px" $radius="999px">
      <Image src={Img.Tooltip} alt={message} width={24} height={24} />
    </Button>
  )
}