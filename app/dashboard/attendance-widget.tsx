"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, LogOut } from "lucide-react"
import { checkIn, checkOut } from "@/app/actions/attendance"
import { useRouter } from "next/navigation"

interface AttendanceWidgetProps {
    initialData: any
}

export function AttendanceWidget({ initialData }: AttendanceWidgetProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    async function handleCheckIn() {
        if (loading) return
        setLoading(true)
        const res = await checkIn()
        if (res.success) {
            router.refresh()
        } else {
            alert(res.error)
        }
        setLoading(false)
    }

    async function handleCheckOut() {
        if (loading) return
        setLoading(true)
        const res = await checkOut()
        if (res.success) {
            router.refresh()
        } else {
            alert(res.error)
        }
        setLoading(false)
    }

    const isCheckedIn = !!initialData
    const isCheckedOut = !!initialData?.checkOut

    return (
        <Card className="col-span-1 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Absensi Hari Ini
                </CardTitle>
                <CardDescription>
                    {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4 py-2">
                    <div className="text-4xl font-bold tracking-tighter text-blue-900 dark:text-blue-100">
                        {currentTime.toLocaleTimeString('id-ID', { hour12: false })}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2">
                        <Button
                            className="w-full"
                            variant={isCheckedIn ? "outline" : "default"}
                            disabled={isCheckedIn || loading}
                            onClick={handleCheckIn}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {isCheckedIn ?
                                `Masuk: ${new Date(initialData.checkIn).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`
                                : "Check In"}
                        </Button>

                        <Button
                            className="w-full"
                            variant={isCheckedOut ? "outline" : (isCheckedIn ? "destructive" : "secondary")}
                            disabled={!isCheckedIn || isCheckedOut || loading}
                            onClick={handleCheckOut}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            {isCheckedOut ?
                                `Pulang: ${new Date(initialData.checkOut).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`
                                : "Check Out"}
                        </Button>
                    </div>

                    {isCheckedOut && (
                        <p className="text-xs text-center text-green-600 font-medium">
                            Terima kasih, hati-hati di jalan!
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
