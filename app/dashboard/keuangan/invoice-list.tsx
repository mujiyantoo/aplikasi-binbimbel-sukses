"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

interface InvoiceListProps {
    data: any[]
}

export function InvoiceList({ data }: InvoiceListProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Tagihan SPP Bulan Ini</h3>
                <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" /> Export Data</Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No. Invoice</TableHead>
                            <TableHead>Nama Siswa</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead>Jumlah Tagihan</TableHead>
                            <TableHead>Jatuh Tempo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">Belum ada tagihan.</TableCell>
                            </TableRow>
                        )}
                        {data.map((inv) => (
                            <TableRow key={inv.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {inv.id}
                                    </div>
                                </TableCell>
                                <TableCell>{inv.student}</TableCell>
                                <TableCell>{inv.program}</TableCell>
                                <TableCell>{inv.amount}</TableCell>
                                <TableCell>{inv.dueDate}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            inv.status === "Paid" ? "default" :
                                                inv.status === "Pending" ? "secondary" : "destructive"
                                        }
                                    >
                                        {inv.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Detail</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
