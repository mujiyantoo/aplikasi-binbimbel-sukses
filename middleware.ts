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

    // Ambil role dari session
    const role = (req.auth?.user as { role?: string })?.role ?? ""

    // ================================================================
    // PATH KHUSUS PIMPINAN/OWNER — hanya PIMPINAN yang boleh akses
    // ================================================================
    const pimpinanOnlyPaths = [
        "/dashboard/pimpinan",
        "/dashboard/akuntansi",
    ]

    // ================================================================
    // PATH YANG BOLEH DIAKSES GURU/PEGAWAI
    // ================================================================
    const pegawaiAllowedPaths = [
        "/dashboard/akademik",
        "/dashboard/kesiswaan",
    ]

    // ================================================================
    // ROLE: PIMPINAN (Owner) — boleh akses semua halaman dashboard
    // ================================================================
    if (role === "PIMPINAN") {
        return
    }

    // ================================================================
    // ROLE: ADMIN — boleh semua kecuali halaman khusus PIMPINAN
    // ================================================================
    if (role === "ADMIN") {
        const isPimpinanOnly = pimpinanOnlyPaths.some((p) =>
            pathname.startsWith(p)
        )
        if (isPimpinanOnly) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        return
    }

    // ================================================================
    // ROLE: GURU, AKADEMIK, KESISWAAN — hanya bisa akses halaman mereka
    // ================================================================
    if (["GURU", "AKADEMIK", "KESISWAAN"].includes(role)) {
        if (isOnDashboard) {
            const isAllowed = pegawaiAllowedPaths.some((p) =>
                pathname.startsWith(p)
            )
            if (!isAllowed) {
                // Redirect ke halaman pertama yang sesuai untuk role ini
                return NextResponse.redirect(
                    new URL("/dashboard/akademik", req.url)
                )
            }
        }
        return
    }

    // ================================================================
    // ROLE: KEUANGAN, AKUNTANSI, HRD
    // ================================================================
    const keuanganAllowedPaths = ["/dashboard/keuangan", "/dashboard/laporan"]
    const hrdAllowedPaths = ["/dashboard/kepegawaian"]

    if (role === "KEUANGAN") {
        if (isOnDashboard) {
            const isAllowed = keuanganAllowedPaths.some((p) =>
                pathname.startsWith(p)
            )
            if (!isAllowed) {
                return NextResponse.redirect(
                    new URL("/dashboard/keuangan", req.url)
                )
            }
        }
        return
    }

    if (role === "HRD") {
        if (isOnDashboard) {
            const isAllowed = hrdAllowedPaths.some((p) =>
                pathname.startsWith(p)
            )
            if (!isAllowed) {
                return NextResponse.redirect(
                    new URL("/dashboard/kepegawaian", req.url)
                )
            }
        }
        return
    }

    if (role === "AKUNTANSI") {
        if (isOnDashboard) {
            const isAllowed =
                pathname.startsWith("/dashboard/akuntansi") ||
                pathname.startsWith("/dashboard/keuangan") ||
                pathname.startsWith("/dashboard/laporan")

            if (!isAllowed) {
                return NextResponse.redirect(
                    new URL("/dashboard/akuntansi", req.url)
                )
            }
        }
        return
    }

    // Role tidak dikenal atau SISWA, redirect ke login
    if (isOnDashboard) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
