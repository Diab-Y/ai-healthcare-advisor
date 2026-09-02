"use client"

import type { Question } from "@/lib/navigator-data"
import { Check } from "lucide-react"

type QuestionCardProps = {
  question: Question
  index: number
  selectedIndex: number | undefined
  onSelect: (optionIndex: number) => void
}

export function QuestionCard({ question, index, selectedIndex, onSelect }: QuestionCardProps) {
  const groupName = question.id

  return (
    <fieldset className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <legend className="sr-only">{question.prompt}</legend>
      <div className="mb-4 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
        >
          {index + 1}
        </span>
        <h2 className="text-pretty text-base font-semibold leading-6 text-card-foreground sm:text-lg">
          {question.prompt}
        </h2>
      </div>

      <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((option, optionIndex) => {
          const id = `${groupName}-${optionIndex}`
          const checked = selectedIndex === optionIndex
          return (
            <label
              key={id}
              htmlFor={id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                checked
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted"
              }`}
            >
              <input
                type="radio"
                id={id}
                name={groupName}
                value={optionIndex}
                checked={checked}
                onChange={() => onSelect(optionIndex)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  checked ? "border-primary bg-primary" : "border-muted-foreground/40 bg-transparent"
                }`}
              >
                {checked ? <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} /> : null}
              </span>
              <span className="font-medium leading-5">{option.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
