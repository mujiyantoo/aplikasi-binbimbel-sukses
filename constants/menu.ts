import {
    Users,
    GraduationCap,
    Banknote,
    BookOpen,
    BarChart3,
    FileText,
    LayoutDashboard,
    ShieldCheck
} from "lucide-react";

export const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ADMIN", "PIMPINAN"]
    },
    {
        title: "Kesiswaan",
        href: "/dashboard/kesiswaan",
        icon: Users,
        roles: ["ADMIN", "KESISWAAN", "AKADEMIK", "GURU"]
    },
    {
        title: "Akademik",
        href: "/dashboard/akademik",
        icon: GraduationCap,
        roles: ["ADMIN", "AKADEMIK", "GURU", "SISWA"]
    },
    {
        title: "Kepegawaian",
        href: "/dashboard/kepegawaian",
        icon: ShieldCheck,
        roles: ["ADMIN", "HRD", "PIMPINAN"]
    },
    {
        title: "Keuangan",
        href: "/dashboard/keuangan",
        icon: Banknote,
        roles: ["ADMIN", "KEUANGAN", "PIMPINAN", "AKUNTANSI"]
    },
    {
        title: "Akuntansi",
        href: "/dashboard/akuntansi",
        icon: BookOpen,
        roles: ["ADMIN", "AKUNTANSI", "PIMPINAN"]
    },
    {
        title: "Laporan",
        href: "/dashboard/laporan",
        icon: FileText,
        roles: ["ADMIN", "PIMPINAN", "AKADEMIK", "KEUANGAN"]
    },
    {
        title: "Pimpinan",
        href: "/dashboard/pimpinan",
        icon: BarChart3,
        roles: ["ADMIN", "PIMPINAN"]
    },
];
