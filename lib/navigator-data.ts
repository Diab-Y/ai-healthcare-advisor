// AI Healthcare Learning Navigator
// All data and deterministic scoring logic runs entirely in the browser.

export type ConceptId =
  | "C1"
  | "C2"
  | "C3"
  | "C4"
  | "C5"
  | "C6"
  | "C7"
  | "C8"
  | "C9"

export type Concept = {
  id: ConceptId
  name: string
  why: string
  resourceName: string
  // If a URL was not supplied, this stays null and renders as a clearly
  // marked placeholder rather than an invented link.
  resourceUrl: string | null
}

// Nine supplied concepts, with descriptions and resource links (exact wording/URLs).
export const CONCEPTS: Record<ConceptId, Concept> = {
  C1: {
    id: "C1",
    name: "AI & Machine Learning Fundamentals",
    why: "Build a foundation for understanding how AI and machine learning systems work.",
    resourceName: "Google Machine Learning",
    resourceUrl: "https://developers.google.com/machine-learning",
  },
  C2: {
    id: "C2",
    name: "Machine Learning Problem Framing",
    why: "Learn how to translate a real-world problem into a machine-learning problem.",
    resourceName: "Google Problem Framing",
    resourceUrl: "https://developers.google.com/machine-learning/problem-framing",
  },
  C3: {
    id: "C3",
    name: "Data for AI in Healthcare",
    why: "Understand why healthcare data, data quality, and appropriate datasets matter for AI.",
    resourceName: "Google Machine Learning Crash Course",
    resourceUrl: "https://developers.google.com/machine-learning/crash-course",
  },
  C4: {
    id: "C4",
    name: "Generative AI & Large Language Models",
    why: "Explore how generative AI and large language models work and where they can be applied.",
    resourceName: "Google Large Language Models",
    resourceUrl: "https://developers.google.com/machine-learning/crash-course/llm",
  },
  C5: {
    id: "C5",
    name: "Prompt Engineering",
    why: "Learn practical techniques for communicating effectively with generative AI systems.",
    resourceName: "Resource link coming soon",
    resourceUrl: null,
  },
  C6: {
    id: "C6",
    name: "Medical Imaging AI",
    why: "Explore how AI and deep learning are applied to medical images and imaging workflows.",
    resourceName: "MONAI",
    resourceUrl: "https://monai.io/",
  },
  C7: {
    id: "C7",
    name: "AI in Clinical Applications",
    why: "Explore how AI can support healthcare and clinical applications.",
    resourceName: "WHO Artificial Intelligence for Health",
    resourceUrl: "https://www.who.int/publications/m/item/artificial-intelligence-for-health",
  },
  C8: {
    id: "C8",
    name: "AI Implementation & Deployment",
    why: "Understand the journey from an AI prototype toward implementation and deployment in real-world settings.",
    resourceName: "Google Machine Learning Crash Course",
    resourceUrl: "https://developers.google.com/machine-learning/crash-course",
  },
  C9: {
    id: "C9",
    name: "Responsible AI in Healthcare",
    why: "Understand important considerations around safety, ethics, governance, bias, and responsible use of AI in healthcare.",
    resourceName: "WHO Ethics and Governance of Artificial Intelligence for Health",
    resourceUrl: "https://www.who.int/publications/i/item/9789240029200",
  },
}

// Fixed tie-breaking order.
export const CONCEPT_ORDER: ConceptId[] = [
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "C9",
]

export type Option = {
  label: string
  // Score deltas applied when this option is selected.
  scores: Partial<Record<ConceptId, number>>
}

export type Question = {
  id: string
  prompt: string
  options: Option[]
}

// Five-question assessment with exact wording and the supplied scoring rules.
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "What best describes your technical background?",
    options: [
      { label: "Non-technical", scores: { C1: 3, C3: 1 } },
      { label: "Basic technical skills", scores: { C1: 2, C3: 2 } },
      { label: "Programming experience", scores: { C2: 2, C3: 2, C8: 1 } },
      { label: "IT / Software background", scores: { C2: 2, C8: 2, C3: 1 } },
      { label: "Data / AI technical background", scores: { C2: 2, C8: 2, C3: 2 } },
    ],
  },
  {
    id: "q2",
    prompt: "How would you describe your experience implementing AI?",
    options: [
      { label: "No experience", scores: { C1: 3, C7: 1 } },
      { label: "AI tools only", scores: { C1: 2, C4: 2, C5: 1 } },
      { label: "Learning / experimenting", scores: { C2: 2, C4: 2, C8: 1 } },
      { label: "Built an AI project", scores: { C2: 2, C8: 3, C9: 1 } },
      { label: "Implemented AI in a real setting", scores: { C8: 3, C9: 3, C2: 1 } },
    ],
  },
  {
    id: "q3",
    prompt: "What best describes your healthcare background?",
    options: [
      { label: "No healthcare background", scores: { C3: 3, C7: 2 } },
      { label: "Healthcare student / trainee", scores: { C3: 2, C7: 2 } },
      { label: "Physician / clinical professional", scores: { C7: 3, C9: 2, C3: 1 } },
      { label: "Other healthcare professional", scores: { C7: 3, C9: 2, C3: 1 } },
      { label: "Healthcare technology / administration", scores: { C8: 2, C9: 2, C3: 2 } },
    ],
  },
  {
    id: "q4",
    prompt: "Which area of AI in healthcare interests you most right now?",
    options: [
      { label: "AI Fundamentals", scores: { C1: 4 } },
      { label: "Generative AI", scores: { C4: 4, C5: 2 } },
      { label: "Medical Imaging", scores: { C6: 5, C3: 1 } },
      { label: "Healthcare Data", scores: { C3: 5 } },
      { label: "Clinical Applications", scores: { C7: 5 } },
      { label: "AI Implementation", scores: { C8: 5 } },
      { label: "Healthcare Automation", scores: { C8: 3, C4: 2 } },
    ],
  },
  {
    id: "q5",
    prompt: "What do you most want to achieve from the DEPI AI in Healthcare track?",
    options: [
      { label: "Understand AI", scores: { C1: 4 } },
      { label: "Build AI solutions", scores: { C2: 3, C8: 3 } },
      { label: "Apply AI to healthcare", scores: { C7: 3, C3: 2 } },
      { label: "Implement AI in real workflows", scores: { C8: 5, C9: 2 } },
      { label: "Build a career in AI", scores: { C1: 2, C2: 2, C8: 2 } },
      { label: "Explore and discover", scores: { C1: 3, C7: 1 } },
    ],
  },
]

export type Answers = Record<string, number | undefined>

/**
 * Deterministic scoring:
 * - Start every concept at 0.
 * - Add the deltas for each selected option.
 * - Sort by descending score; break ties with the fixed CONCEPT_ORDER.
 * - Return the top three concepts.
 */
export function getRecommendations(answers: Answers): Concept[] {
  const scores: Record<ConceptId, number> = {
    C1: 0,
    C2: 0,
    C3: 0,
    C4: 0,
    C5: 0,
    C6: 0,
    C7: 0,
    C8: 0,
    C9: 0,
  }

  for (const question of QUESTIONS) {
    const selectedIndex = answers[question.id]
    if (selectedIndex === undefined) continue
    const option = question.options[selectedIndex]
    if (!option) continue
    for (const [conceptId, delta] of Object.entries(option.scores)) {
      scores[conceptId as ConceptId] += delta ?? 0
    }
  }

  const sorted = [...CONCEPT_ORDER].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a]
    // Tie-break: earlier position in the fixed order wins.
    return CONCEPT_ORDER.indexOf(a) - CONCEPT_ORDER.indexOf(b)
  })

  return sorted.slice(0, 3).map((id) => CONCEPTS[id])
}
