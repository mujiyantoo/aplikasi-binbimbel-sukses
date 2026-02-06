
import {
    Users,
    BookOpen,
    LayoutDashboard,
    CreditCard,
    FileCheck,
    BarChart
} from "lucide-react"

const features = [
    {
        title: "Manajemen Siswa",
        description: "Data siswa lengkap, riwayat pendaftaran, hingga status aktif/non-aktif.",
        icon: Users,
    },
    {
        title: "Akademik & Jadwal",
        description: "Atur kelas, jadwal, dan guru pengajar dengan mudah dan terstruktur.",
        icon: BookOpen,
    },
    {
        title: "Dashboard Intuitif",
        description: "Pantau performa bimbel dengan grafik dan statistik real-time.",
        icon: LayoutDashboard,
    },
    {
        title: "Keuangan Terpusat",
        description: "Catat pembayaran SPP, tagihan, dan laporan pemasukan otomatis.",
        icon: CreditCard,
    },
    {
        title: "Penilaian & Raport",
        description: "Input nilai siswa dan cetak hasil belajar secara digital.",
        icon: FileCheck,
    },
    {
        title: "Laporan Lengkap",
        description: "Laporan bulanan untuk evaluasi perkembangan bisnis bimbel Anda.",
        icon: BarChart,
    },
]

export function FeatureSection() {
    return (
        <section id="features" className="py-16 md:py-24 bg-muted/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Fitur Unggulan
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Semua yang Anda butuhkan untuk mengelola bimbingan belajar secara profesional.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col p-6 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary mb-4">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
