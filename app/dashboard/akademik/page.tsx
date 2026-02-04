import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassList } from "./class-list"
import { ScheduleList } from "./schedule-list"
import { GradingList } from "./grading-list"
import { getClasses, getSchedules } from "@/app/actions/akademik"

export default async function AkademikPage() {
    const classes = await getClasses()
    const schedules = await getSchedules()

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Akademik</h2>
                <p className="text-muted-foreground">Manajemen Kegiatan Belajar Mengajar</p>
            </div>

            <Tabs defaultValue="classes" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="classes">Daftar Kelas</TabsTrigger>
                    <TabsTrigger value="schedule">Jadwal Pelajaran</TabsTrigger>
                    <TabsTrigger value="grading">Penilaian Siswa</TabsTrigger>
                </TabsList>
                <TabsContent value="classes" className="space-y-4">
                    <ClassList data={classes} />
                </TabsContent>
                <TabsContent value="schedule" className="space-y-4">
                    <ScheduleList data={schedules} classes={classes} />
                </TabsContent>
                <TabsContent value="grading" className="space-y-4">
                    <GradingList classes={classes} />
                </TabsContent>
            </Tabs>
        </div>
    );
}


