"use client"

import { useRef, useState } from "react"
import { QUESTIONS, getRecommendations, type Answers, type Concept } from "@/lib/navigator-data"
import { QuestionCard } from "@/components/question-card"
import { RecommendationResults } from "@/components/recommendation-results"
import { Button } from "@/components/ui/button"

export function Navigator() {
  const [answers, setAnswers] = useState<Answers>({})
  const [recommendations, setRecommendations] = useState<Concept[] | null>(null)
  const resultsRef = useRef<HTMLElement>(null)

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== undefined).length
  const allAnswered = answeredCount === QUESTIONS.length

  function handleSelect(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!allAnswered) return
    const result = getRecommendations(answers)
    setRecommendations(result)
    // Move focus to the results after they render so trainees see them immediately.
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      resultsRef.current?.focus()
    })
  }

  function handleStartOver() {
    setAnswers({})
    setRecommendations(null)
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {QUESTIONS.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            selectedIndex={answers[question.id]}
            onSelect={(optionIndex) => handleSelect(question.id, optionIndex)}
          />
        ))}

        <div className="sticky bottom-4 z-10 mt-2 rounded-xl border border-border bg-card/95 p-4 backdrop-blur">
          <Button type="submit" disabled={!allAnswered} className="h-12 w-full text-base font-semibold">
            Get My 3 Learning Recommendations
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground" aria-live="polite">
            {allAnswered
              ? "All five questions answered — you're ready."
              : `Answer all five questions to continue (${answeredCount}/${QUESTIONS.length} done).`}
          </p>
        </div>
      </form>

      {recommendations ? (
        <div className="mt-10 border-t border-border pt-8">
          <RecommendationResults ref={resultsRef} recommendations={recommendations} onStartOver={handleStartOver} />
        </div>
      ) : null}
    </>
  )
}
