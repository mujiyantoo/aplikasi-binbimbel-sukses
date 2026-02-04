"use server"

import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

// --- Validation Schemas ---

const gradeSchema = z.object({
    studentId: z.string().min(1, "Siswa wajib dipilih"),
    classId: z.string().min(1, "Kelas wajib dipilih"),
    subject: z.string().min(1, "Mata Pelajaran wajib diisi"),
    type: z.string().min(1, "Jenis Nilai wajib dipilih"), // UH, UTS, UAS
    score: z.coerce.number().min(0).max(100),
    semester: z.string().default("GANJIL")
})

// --- Actions ---

export async function createGrade(data: z.infer<typeof gradeSchema>) {
    const validated = gradeSchema.safeParse(data)
    if (!validated.success) {
        return { success: false, error: "Validasi Gagal" }
    }

    try {
        await prisma.grade.create({
            data: validated.data
        })
        revalidatePath("/dashboard/akademik")
        return { success: true, message: "Nilai berhasil disimpan" }
    } catch (error) {
        console.error("Create Grade Error:", error)
        return { success: false, error: "Gagal menyimpan nilai" }
    }
}

export async function getGradesByClass(classId: string, subject?: string) {
    try {
        const grades = await prisma.grade.findMany({
            where: {
                classId,
                ...(subject ? { subject } : {})
            },
            include: {
                student: { select: { namaLengkap: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
        return grades
    } catch (error) {
        console.error("Fetch Grades Error:", error)
        return []
    }
}
