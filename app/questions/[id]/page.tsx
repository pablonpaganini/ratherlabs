'use client'
import Question from "@/components/question"
import { useGlobalContext } from "@/contexts/store"
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';

const QUESTIONS = [
  {
    "id": 0,
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
    "id": 1,
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
    "id": 2,
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
  const params = useParams();

  const [actualQuestion, setActualQuestion] = useState(null as any);
  const { answers, setAnswers } = useGlobalContext();

  useEffect(() => {
    if (params?.id)
      setActualQuestion(QUESTIONS[Number(params.id)]);
  })

  const handleOnClick = (questionId: number, option: number) => {
    if (actualQuestion.id != questionId)
      return;
    answers[questionId] = option;
    setAnswers(answers);
    if (actualQuestion.id + 1 < QUESTIONS.length)
      router.push(`/questions/${actualQuestion.id + 1}`);
    else
      router.push('/complete');
  }

  return (
    <div className="container">
      {
        (actualQuestion != null) &&
        (
          <Question
            id={actualQuestion.id}
            image={actualQuestion.image}
            text={actualQuestion.text}
            options={actualQuestion.options}
            timeLeft={actualQuestion.lifetimeSeconds}
            onSelectOption={handleOnClick}
          />
        )
      }
    </div>
  )
}