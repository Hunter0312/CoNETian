import BackButton from '@/components/backButton';
import PageWrapper from '@/components/pageWrapper';
import { useState } from 'react';
import PageState1 from './page-state-1';
import PageState2 from './page-state-2';

export default function Roulette() {

  // 1 is Roulette, 2 is Double
  const [pageState, setPageState] = useState<1 | 2>(1);

  const [doubleFinished, setDoubleFinished] = useState<boolean>(false);
  const [doubleFailed, setDoubleFailed] = useState<boolean>(false);

  function handleSpin() {
    // handle Spin
    setPageState(2);
  }

  function handleDouble() {
    // handle Double
    setDoubleFinished(true);
    setDoubleFailed(false);
  }

  function backToRoulette() {
    setDoubleFinished(false);
    setPageState(1);
  }

  return (
    <PageWrapper margin="32px 16px 140px 16px">
      <BackButton text="Roullet" />
      {
        pageState === 1
          ? <PageState1 handleSpin={handleSpin} />
          : <PageState2
              handleDouble={handleDouble}
              backToRoulette={backToRoulette}
              doubleFinished={doubleFinished}
              doubleFailed={doubleFailed}
            />
      }
    </PageWrapper>
  )
}