import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployeeList } from "./employee-list"
import { Users, UserCheck, UserX, Clock } from "lucide-react"
import { getKepegawaianStats, getEmployeesList } from "@/app/actions/dashboard"

export default async function KepegawaianPage() {
    const stats = await getKepegawaianStats()
    const employees = await getEmployeesList()

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Kepegawaian</h2>
                <p className="text-muted-foreground">Manajemen Data Guru & Karyawan</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Pegawai
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalPegawai} Orang</div>
                        <p className="text-xs text-muted-foreground">
                            Terdaftar di sistem
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Hadir Hari Ini
                        </CardTitle>
                        <UserCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.hadirHariIni} Orang</div>
                        <p className="text-xs text-muted-foreground">
                            Estimasi (90%)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Izin / Cuti</CardTitle>
                        <UserX className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.izinCuti} Orang</div>
                        <p className="text-xs text-muted-foreground">
                            Estimasi (10%)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Jam Mengajar</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalJamMengajar} Jam</div>
                        <p className="text-xs text-muted-foreground">
                            Total Terjadwal
                        </p>
                    </CardContent>
                </Card>
            </div>

            <EmployeeList data={employees} />
        </div>
    );
}
