"use client"

import { forwardRef } from "react"
import { track } from "@vercel/analytics"
import type { Concept } from "@/lib/navigator-data"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, RotateCcw } from "lucide-react"

type RecommendationResultsProps = {
  recommendations: Concept[]
  onStartOver: () => void
}

export const RecommendationResults = forwardRef<HTMLElement, RecommendationResultsProps>(
  function RecommendationResults({ recommendations, onStartOver }, ref) {
    return (
      <section ref={ref} aria-labelledby="results-heading" tabIndex={-1} className="scroll-mt-6 outline-none">
        <div className="mb-5">
          <h2 id="results-heading" className="text-balance text-xl font-bold text-foreground sm:text-2xl">
            Your 3 recommended starting points
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            These are recommended starting points based on your answers, not a definitive assessment. Explore them in
            any order.
          </p>
        </div>

        <ol className="grid gap-4">
          {recommendations.map((concept, i) => (
            <li key={concept.id}>
              <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-pretty text-base font-semibold leading-6 text-card-foreground sm:text-lg">
                      {concept.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{concept.why}</p>

                    {concept.resourceUrl ? (
                      <a
                        href={concept.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("learning_resource_click", { concept: concept.name })}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Start Exploring
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">(opens {concept.resourceName} in a new tab)</span>
                      </a>
                    ) : (
                      <div className="mt-4">
                        <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-dashed border-border px-3.5 py-2 text-sm font-medium text-muted-foreground">
                          Start Exploring
                        </span>
                        <p className="mt-1.5 text-xs italic text-muted-foreground">
                          Resource link coming soon — a URL has not been provided for this concept yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <Button variant="outline" onClick={onStartOver} className="gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Start Over
          </Button>
        </div>
      </section>
    )
  },
)
