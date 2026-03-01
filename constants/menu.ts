import {
    Users,
    GraduationCap,
    Banknote,
    BookOpen,
    BarChart3,
    FileText,
    LayoutDashboard,
    ShieldCheck,
    TrendingUp
} from "lucide-react";

export const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["Admin", "Owner"]
    },
    {
        title: "Kesiswaan",
        href: "/dashboard/kesiswaan",
        icon: Users,
        roles: ["Admin", "Owner"]
    },
    {
        title: "Akademik",
        href: "/dashboard/akademik",
        icon: GraduationCap,
        roles: ["Admin", "Owner"]
    },
    {
        title: "Kepegawaian",
        href: "/dashboard/kepegawaian",
        icon: ShieldCheck,
        roles: ["Admin", "Owner"]
    },
    {
        title: "Keuangan",
        href: "/dashboard/keuangan",
        icon: Banknote,
        roles: ["Admin", "Owner"]
    },
    {
        title: "Kinerja",
        href: "/dashboard/kinerja",
        icon: TrendingUp,
        roles: ["Owner", "Pegawai"]
    },
    {
        title: "Kinerja Saya",
        href: "/dashboard/kinerja-saya",
        icon: TrendingUp,
        roles: ["Pegawai"]
    },
    {
        title: "Akuntansi",
        href: "/dashboard/akuntansi",
        icon: BookOpen,
        roles: ["Owner"]
    },
    {
        title: "Laporan",
        href: "/dashboard/laporan",
        icon: FileText,
        roles: ["Owner"]
    },
    {
        title: "Pimpinan",
        href: "/dashboard/pimpinan",
        icon: BarChart3,
        roles: ["Owner"]
    },
];
