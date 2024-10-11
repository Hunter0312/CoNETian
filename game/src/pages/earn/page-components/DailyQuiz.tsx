import { useState } from 'react';
import { dailyQuiz as dailyQuizOptions, Quiz } from '../../../shared/earnTasks';
import { FlexDiv } from '@/components/div';
import QuizStart from './QuizStart';
import QuizFinish from './QuizFinish';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';
import QuizQuestions from './QuizQuestions';

export default function DailyQuiz() {
  const [quizState, setQuizState] = useState<'start' | 'started' | 'finished'>('start');
  const [currentQuizQuestion, setQuizQuestion] = useState<number>(0);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [dailyQuiz, setDailyQuiz] = useState<Quiz>(dailyQuizOptions);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);

  function startQuiz() {
    setQuizState("started");
  }

  function answerQuiz(answer: string) {
    setQuestionAnswered(true);
    const isCorrect = answer === dailyQuiz.questions[0].options[dailyQuiz.questions[0].answerIndex];

    if (isCorrect) {
      setRightAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      setQuestionAnswered(false);
      setQuizState('finished');
    }, 1000);
  }

  return (
    <FlexDiv $direction="column" $align="center" $gap="16px">
      {
        quizState === "start" && (
          <QuizStart
            title={dailyQuiz.title}
            caption={dailyQuiz.caption}
            reward={dailyQuiz.reward}
            start={startQuiz}
          />
        )
      }
      {
        quizState === "started" && (
          <QuizQuestions
            questions={dailyQuiz.questions}
            answered={questionAnswered}
            answer={answerQuiz}
            timeout={() => setQuizState("finished")}
          />
        )
      }
      {
        quizState === "finished" && (
          <QuizFinish
            won={rightAnswers >= dailyQuiz.questions.length}
            answer={dailyQuiz.questions[0].options[dailyQuiz.questions[0].answerIndex]}
            answerIndex={dailyQuiz.questions[0].answerIndex}
            reward={dailyQuiz.reward}
          />
        )
      }
    </FlexDiv>
  )
}