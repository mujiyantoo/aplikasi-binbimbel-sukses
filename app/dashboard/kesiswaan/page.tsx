import { PSBForm } from "./psb-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { getStudents } from "@/app/actions/student"

export default async function KesiswaanPage() {
    const students = await getStudents()

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Kesiswaan</h2>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Formulir Pendaftaran Siswa Baru (PSB)</h3>
                        <p className="text-sm text-muted-foreground">Silahkan isi data diri calon siswa dengan lengkap.</p>
                    </div>
                    <PSBForm />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Siswa Terbaru</CardTitle>
                        <CardDescription>Daftar siswa yang telah melakukan pendaftaran.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Program</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                                                Belum ada data siswa.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">
                                                <div>{student.namaLengkap}</div>
                                                <div className="text-xs text-muted-foreground">{format(student.createdAt, 'dd MMM yyyy')}</div>
                                            </TableCell>
                                            <TableCell>{student.programBimbel}</TableCell>
                                            <TableCell>
                                                <Badge variant={student.status === 'AKTIF' ? 'default' : 'secondary'}>
                                                    {student.status.replace('_', ' ')}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
