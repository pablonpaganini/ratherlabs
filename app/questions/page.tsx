'use client'
import Question from "@/components/question"
import { useGlobalContext } from "@/contexts/store"
import { useState } from "react";
import { useRouter } from 'next/navigation';

const QUESTIONS = [
  {
    "text": "Question 1",
    "image": "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
    "lifetimeSeconds": 10,
    "options": [
      {
        "text": "Option 1 - Question 1"
      },
      {
        "text": "Option 2 - Question 1"
      },
      {
        "text": "Option 3 - Question 1"
      }
    ]
  },
  {
    "text": "Question 2",
    "image": "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
    "lifetimeSeconds": 15,
    "options": [
      {
        "text": "Option 1 - Question 2"
      },
      {
        "text": "Option 2 - Question 2"
      },
      {
        "text": "Option 3 - Question 2"
      }
    ]
  },
  {
    "text": "Question 3",
    "image": "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
    "lifetimeSeconds": 5,
    "options": [
      {
        "text": "Option 1 - Question 3"
      },
      {
        "text": "Option 2 - Question 3"
      },
      {
        "text": "Option 3 - Question 3"
      }
    ]
  }
]

export default () => {
  const router = useRouter();
  const [actualQuestion, setActualQuestion] = useState(0);
  const {answers, setAnswers} = useGlobalContext();

  const handleOnClick = (questionId: number, option: number) => {
    if(actualQuestion != questionId)
      return;
    answers[actualQuestion] = option;
    setAnswers(answers);
    if (actualQuestion + 1 < QUESTIONS.length)
      setActualQuestion(actualQuestion + 1);
    else 
      router.push('/complete');
  }

  return (
    <div className="container">
      <Question
        id={actualQuestion}
        image={QUESTIONS[actualQuestion].image}
        text={QUESTIONS[actualQuestion].text}
        options={QUESTIONS[actualQuestion].options}
        timeLeft={QUESTIONS[actualQuestion].lifetimeSeconds}
        onSelectOption={handleOnClick}
      />
    </div>
  )
}