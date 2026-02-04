"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// In a real app, these would be fetched via Server Component or Server Actions useEffect
// For simplicity in this "Report" view, I'm accepting them as props or creating a Client Wrapper
// But to make it standalone, I will modify this file to be a Server Component that fetches data
// and passes it to a client component for the interactivity (Tabs/Print).
// Actually, let's keep it simple: Client Component that accepts data from the default export async function.

interface ReportProps {
    students: any[]
    invoices: any[]
}

export function ReportsClient({ students, invoices }: ReportProps) {
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between no-print">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Laporan & Export</h2>
                    <p className="text-muted-foreground">Unduh laporan data sistem dalam format PDF.</p>
                </div>
                <Button onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" /> Cetak Laporan
                </Button>
            </div>

            {/* Printable Area Style Injection */}
            <style jsx global>{`
        @media print {
            .no-print { display: none !important; }
            .sidebar, header, nav { display: none !important; } /* Try to hide layout elements if possible via CSS class matching */
            body { background: white; }
            .print-container { padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            h2, h3 { color: black; }
        }
       `}</style>

            <div className="print-container">
                <Tabs defaultValue="siswa" className="space-y-4">
                    <TabsList className="no-print">
                        <TabsTrigger value="siswa">Laporan Siswa</TabsTrigger>
                        <TabsTrigger value="keuangan">Laporan Keuangan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="siswa" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Seluruh Siswa</CardTitle>
                                <CardDescription>Daftar lengkap siswa aktif terdaftar.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Lengkap</TableHead>
                                            <TableHead>NISN</TableHead>
                                            <TableHead>Program</TableHead>
                                            <TableHead>Asal Sekolah</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell>{s.namaLengkap}</TableCell>
                                                <TableCell>{s.nisn || "-"}</TableCell>
                                                <TableCell>{s.programBimbel}</TableCell>
                                                <TableCell>{s.asalSekolah}</TableCell>
                                                <TableCell>{s.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="keuangan" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Laporan Transaksi Keuangan</CardTitle>
                                <CardDescription>Rekap tagihan dan pembayaran siswa.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No. Invoice</TableHead>
                                            <TableHead>Siswa</TableHead>
                                            <TableHead>Program</TableHead>
                                            <TableHead>Jumlah</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Tanggal Bayar</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoices.map((inv) => (
                                            <TableRow key={inv.id}>
                                                <TableCell>{inv.id}</TableCell>
                                                <TableCell>{inv.student}</TableCell>
                                                <TableCell>{inv.program}</TableCell>
                                                <TableCell>{inv.amount}</TableCell>
                                                <TableCell>{inv.status}</TableCell>
                                                <TableCell>{inv.datePaid}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
