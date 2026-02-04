import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isOnLogin = req.nextUrl.pathname.startsWith("/login")

    if (isOnDashboard) {
        if (isLoggedIn) return
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (isOnLogin) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        return
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
