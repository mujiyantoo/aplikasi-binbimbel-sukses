
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <section className="pt-24 pb-12 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-background to-muted/20">
            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                        Platform Baru ✨
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
                        Solusi Terpadu Manajemen <span className="text-primary">Bimbingan Belajar</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
                        Kelola data siswa, jadwal akademik, keuangan, hingga raport dalam satu platform yang terintegrasi, modern, dan mudah digunakan.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/login">
                        <Button size="lg" className="gap-2 h-12 px-8 text-base">
                            Mulai Sekarang <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                            Pelajari Fitur
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
