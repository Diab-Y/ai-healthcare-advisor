"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { getRecommendations, QUESTIONS, type Answers, type Concept } from "@/lib/navigator-data"
import { ASSESSMENT_STORAGE_KEY } from "@/lib/navigator-storage"
import { RecommendationResults } from "@/components/recommendation-results"

function readAnswers(): Answers | null {
  try {
    const raw = sessionStorage.getItem(ASSESSMENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Answers
    // Require a valid, complete assessment before showing recommendations.
    const complete = QUESTIONS.every((q) => typeof parsed?.[q.id] === "number")
    return complete ? parsed : null
  } catch {
    return null
  }
}

export function ResultsView() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<Concept[] | null>(null)
  const resultsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const answers = readAnswers()
    if (!answers) {
      // Direct visits without a completed assessment are sent back home.
      router.replace("/")
      return
    }
    setRecommendations(getRecommendations(answers))
  }, [router])

  useEffect(() => {
    if (recommendations) {
      resultsRef.current?.focus()
    }
  }, [recommendations])

  function handleStartOver() {
    try {
      sessionStorage.removeItem(ASSESSMENT_STORAGE_KEY)
    } catch {
      // Ignore storage errors; navigation still resets the flow.
    }
    router.push("/")
  }

  if (!recommendations) return null

  return <RecommendationResults ref={resultsRef} recommendations={recommendations} onStartOver={handleStartOver} />
}
