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
import { Mail, Phone, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EmployeeListProps {
    data: any[]
}

export function EmployeeList({ data }: EmployeeListProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Data Pegawai & Guru</h3>
                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Tambah Pegawai</Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Pegawai</TableHead>
                            <TableHead>Posisi / Role</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead>Status Aktif</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">Belum ada data pegawai.</TableCell>
                            </TableRow>
                        )}
                        {data.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={emp.image || ""} alt={emp.name || ""} />
                                            <AvatarFallback>{emp.name ? emp.name.substring(0, 2).toUpperCase() : "U"}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{emp.name}</div>
                                            <div className="text-xs text-muted-foreground">{emp.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{emp.role}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {emp.email}</span>
                                        {/* Phone not yet in DB, hidden or dynamic if added later */}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="default">Active</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
