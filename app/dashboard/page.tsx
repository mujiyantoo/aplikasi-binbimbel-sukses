import { getAttendanceToday } from "@/app/actions/attendance"
import { AttendanceWidget } from "./attendance-widget"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default async function DashboardPage() {
    const attendance = await getAttendanceToday()

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button>Download</Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Widget Absensi - Top Priority */}
                <AttendanceWidget initialData={attendance} />

                <Card className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Siswa</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">0</div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
