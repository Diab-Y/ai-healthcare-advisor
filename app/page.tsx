import { Navigator } from "@/components/navigator"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8">
          <p className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            DEPI Round 5 · Industry Track · AI in Healthcare
          </p>
          <h1 className="text-balance text-2xl font-bold leading-tight text-foreground sm:text-4xl">
            AI Healthcare Learning Navigator
          </h1>
          <p className="mt-3 text-pretty text-lg font-medium text-foreground sm:text-xl">
            Find the 3 AI in Healthcare concepts you should learn first
          </p>
          <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
            Answer five quick questions about your background, experience, interests, and goals. Get three concepts
            recommended as your starting point.
          </p>
        </header>

        <Navigator />

        <footer className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-5 text-muted-foreground">
            These recommendations are suggested starting points to help you decide where to begin. They are not a
            definitive assessment and are not medically authoritative or professionally certified.
          </p>
        </footer>
      </div>
    </main>
  )
}
