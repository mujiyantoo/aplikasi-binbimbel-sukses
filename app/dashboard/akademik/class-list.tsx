"use client"

import { useState } from "react"
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
import { Plus, Trash2, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { createClass, deleteClass } from "@/app/actions/akademik"
import { useRouter } from "next/navigation"

interface ClassListProps {
    data: any[]
}

export function ClassList({ data }: ClassListProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        program: "",
        level: "",
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await createClass(formData)
            if (res.success) {
                setIsOpen(false)
                setFormData({ name: "", program: "", level: "" })
                router.refresh()
            } else {
                alert(res.error)
            }
        } catch (error) {
            alert("Error creating class")
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Hapus kelas ini?")) return;
        await deleteClass(id)
        router.refresh()
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Daftar Kelas Aktif</h3>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Tambah Kelas</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Buat Kelas Baru</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Nama Kelas</Label>
                                <Input
                                    placeholder="Contoh: 12 IPA 1"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Jenjang</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, level: val })} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Jenjang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SD">SD</SelectItem>
                                        <SelectItem value="SMP">SMP</SelectItem>
                                        <SelectItem value="SMA">SMA</SelectItem>
                                        <SelectItem value="ALUMNI">Alumni</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Program</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, program: val })} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Reguler">Reguler</SelectItem>
                                        <SelectItem value="Intensif">Intensif</SelectItem>
                                        <SelectItem value="Privat">Privat</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Kelas</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead>Jenjang</TableHead>
                            <TableHead>Wali Kelas</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">Belum ada kelas.</TableCell>
                            </TableRow>
                        )}
                        {data.map((cls) => (
                            <TableRow key={cls.id}>
                                <TableCell className="font-medium">{cls.name}</TableCell>
                                <TableCell>{cls.program}</TableCell>
                                <TableCell>{cls.level}</TableCell>
                                <TableCell>{cls.teacher?.name || "-"}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{cls.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(cls.id)}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
