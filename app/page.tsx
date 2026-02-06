
import { LandingNavbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero"
import { FeatureSection } from "@/components/landing/feature-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <a href="#" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Bimbel Integrated</a>.
            The source code is unavailable.
          </p>
        </div>
      </footer>
    </div>
  )
}
