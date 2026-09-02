"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { QUESTIONS, type Answers } from "@/lib/navigator-data"
import { ASSESSMENT_STORAGE_KEY } from "@/lib/navigator-storage"
import { QuestionCard } from "@/components/question-card"
import { Button } from "@/components/ui/button"

export function Navigator() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Answers>({})

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== undefined).length
  const allAnswered = answeredCount === QUESTIONS.length

  function handleSelect(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!allAnswered) return
    // Store only the temporary assessment answers for this browser session,
    // then navigate to the dedicated results page so it can be measured.
    try {
      sessionStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(answers))
    } catch {
      // If storage is unavailable, still navigate; the results page will guard.
    }
    router.push("/results")
  }

  return (
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
  )
}
