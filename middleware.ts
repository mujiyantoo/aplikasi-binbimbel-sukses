import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const pathname = req.nextUrl.pathname
    const isOnLogin = pathname.startsWith("/login")
    const isOnDashboard = pathname.startsWith("/dashboard")

    // Jika belum login dan coba akses halaman dashboard, redirect ke login
    if (!isLoggedIn) {
        if (isOnDashboard) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        return
    }

    // Jika sudah login tapi masih di halaman login, redirect ke dashboard
    if (isOnLogin) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Ambil role dari session (format: Owner, Admin, Pegawai)
    const role = (req.auth?.user as { role?: string })?.role ?? ""

    // ================================================================
    // ROLE: Owner — boleh akses SEMUA halaman dashboard
    // ================================================================
    if (role === "Owner") {
        return
    }

    // ================================================================
    // ROLE: Admin — boleh semua KECUALI halaman khusus Owner
    // ================================================================
    if (role === "Admin") {
        const ownerOnlyPaths = [
            "/dashboard/pimpinan",
            "/dashboard/akuntansi",
            "/dashboard/laporan",
            "/dashboard/pengaturan",
            "/dashboard/payroll",
        ]
        const isOwnerOnly = ownerOnlyPaths.some((p) => pathname.startsWith(p))
        if (isOwnerOnly) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        return
    }

    // ================================================================
    // ROLE: Pegawai — HANYA boleh akses halaman kinerja
    // ================================================================
    if (role === "Pegawai") {
        if (isOnDashboard) {
            const pegawaiAllowed =
                pathname.startsWith("/dashboard/kinerja-saya") ||
                pathname.startsWith("/dashboard/kinerja")

            if (!pegawaiAllowed) {
                return NextResponse.redirect(
                    new URL("/dashboard/kinerja-saya", req.url)
                )
            }
        }
        return
    }

    // Role tidak dikenal, redirect ke login
    if (isOnDashboard) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
