import { Button } from "@/components/button";

interface SpinButtonProps {
  ticketBalance: string;
  pageState: 1 | 2 | 3 | 4 | 5;
  isTicketUnlocked: boolean;
  isUnlockingTicket: boolean;
  isSpinning: boolean;
  isTicketAmountUpdated: boolean;
  handleSpin: () => void;
  handleTicketUnlock: () => void;
}

const SpinButton = ({ ticketBalance, pageState, isTicketUnlocked, isUnlockingTicket, isSpinning, isTicketAmountUpdated, handleSpin, handleTicketUnlock }: SpinButtonProps) => {

  if (isUnlockingTicket) {
    return <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
      Unlocking Ticket
    </Button>
  }

  if (!isTicketUnlocked) {
    return <Button $width="196px" $height="45px" $index={30} $radius="8px" $border="1px solid #04DAE8" onClick={handleTicketUnlock}>
      Unlock Ticket Use
    </Button>
  }


  if (!isTicketAmountUpdated || ticketBalance === '0') {
    return <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
      {!isTicketAmountUpdated ? "Refreshing Tickets" : pageState === 1 ? "Spin" : "Spin Again"}
    </Button>
  }

  if (isSpinning) {
    return <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" disabled $background={"gray"}>
      Spinning...
    </Button>
  }

  return <Button $width="196px" $height="45px" $index={30} $radius="8px" $border="1px solid #04DAE8" onClick={handleSpin}>
    {pageState === 1 ? "Spin" : "Spin Again"}
  </Button>
}

export default SpinButton;