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
import { Plus, Trash2, Loader2, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { createGrade, getGradesByClass } from "@/app/actions/grading"
import { useRouter } from "next/navigation"

interface GradingListProps {
    classes: any[]
}

const SUBJECTS = ["Matematika", "Fisika", "Kimia", "Biologi", "Bahasa Indonesia", "Bahasa Inggris"]
const TYPES = ["UH1", "UH2", "UTS", "UAS", "TUGAS"]

export function GradingList({ classes }: GradingListProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // State for filtering/fetching
    const [selectedClassId, setSelectedClassId] = useState("")
    const [grades, setGrades] = useState<any[]>([])

    // Form State
    const [formData, setFormData] = useState({
        studentId: "",
        classId: "",
        subject: "",
        type: "",
        score: "",
        semester: "GANJIL"
    })

    // Mock Students for the selected class (In real app, fetch students by class)
    // For now, we will use a server action if we had getStudentsByClass, but for MVP we might load all students or just text input for now?
    // Actually, we can't easily select student without fetching them. 
    // Let's implement a quick fetch on class selection or just assume passing students list.
    // To keep it simple, I will NOT fetch dynamic students in this client component yet without more server actions.
    // I'll make the form require Manual Input ID or we assume we have data.
    // Better: Let's just create the UI structure first.

    const handleClassChange = async (classId: string) => {
        setSelectedClassId(classId)
        // In a real implementation: const data = await getGradesByClass(classId)
        // setGrades(data)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await createGrade({
                ...formData,
                score: Number(formData.score)
            })
            if (res.success) {
                setIsOpen(false)
                setFormData({ ...formData, score: "" })
                router.refresh()
                alert("Nilai berhasil disimpan")
            } else {
                alert(res.error)
            }
        } catch (error) {
            alert("Error creating grade")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Input Nilai Siswa</h3>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Input Nilai</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Input Nilai Baru</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Kelas</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, classId: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes.map((cls) => (
                                                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Semester</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, semester: val })} defaultValue="GANJIL">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="GANJIL">Ganjil</SelectItem>
                                            <SelectItem value="GENAP">Genap</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Siswa (ID/Nama)</Label>
                                {/* Ideally a Searchable Select */}
                                <Input
                                    placeholder="Masukkan ID Siswa"
                                    value={formData.studentId}
                                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                    required
                                />
                                <p className="text-[10px] text-muted-foreground">Isi dengan ID Siswa (Contoh: STU001) sementara.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Mata Pelajaran</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, subject: val })} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Mapel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SUBJECTS.map((sub) => (
                                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Jenis Nilai</Label>
                                    <Select onValueChange={(val) => setFormData({ ...formData, type: val })} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Jenis" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TYPES.map((t) => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Nilai (0-100)</Label>
                                    <Input
                                        type="number"
                                        min="0" max="100"
                                        value={formData.score}
                                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Simpan Nilai
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center text-muted-foreground">
                <BookOpen className="h-10 w-10 mb-4 opacity-50" />
                <h4 className="text-lg font-medium">Buku Nilai Digital</h4>
                <p className="max-w-sm mt-2">
                    Silahkan pilih kelas untuk melihat daftar nilai siswa, atau klik "Input Nilai" untuk menambahkan data baru.
                </p>
                <div className="mt-6 w-full max-w-xs">
                    <Select onValueChange={handleClassChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelas untuk Melihat Nilai" />
                        </SelectTrigger>
                        <SelectContent>
                            {classes.map((cls) => (
                                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* If we loaded grades, table would go here. For now just the input mechanism */}
        </div>
    )
}
