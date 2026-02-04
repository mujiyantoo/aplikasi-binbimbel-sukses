"use server"

import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

const studentSchema = z.object({
    namaLengkap: z.string().min(2),
    nisn: z.string().optional(),
    tempatLahir: z.string().min(2),
    tanggalLahir: z.date(),
    jenisKelamin: z.string(), // "L" | "P"
    alamat: z.string().min(5),
    asalSekolah: z.string().min(2),
    kelas: z.string().min(1),
    namaAyah: z.string().min(2),
    namaIbu: z.string().min(2),
    noHpOrtu: z.string().min(10),
    programBimbel: z.string().min(1),
})

export async function registerStudent(prevState: any, formData: FormData) {
    // Manual parsing because we might receive data differently or want to preprocess
    // But for better type safety with react-hook-form + server actions, 
    // we can also accept the raw JSON object if we weren't using FormData.
    // Here assuming we receive a plain object from the client component calling this action.

    // Wait, standard Server Actions usually accept FormData. 
    // However, since we are using react-hook-form on the client, 
    // it's easier to pass the data object directly if we define this as an async function called from the client,
    // rather than a pure form action.
}

// Rewriting to accept direct object for easier integration with react-hook-form
export async function createStudentAction(data: z.infer<typeof studentSchema>) {
    const validatedFields = studentSchema.safeParse(data)

    if (!validatedFields.success) {
        return {
            success: false,
            error: "Validasi Gagal. Periksa kembali data Anda.",
            details: validatedFields.error.flatten()
        }
    }

    try {
        const student = await prisma.student.create({
            data: validatedFields.data,
        })

        revalidatePath("/dashboard/kesiswaan")
        return { success: true, message: "Pendaftaran Berhasil!", studentId: student.id }
    } catch (error) {
        console.error("Database Error:", error)
        return { success: false, error: "Gagal menyimpan data ke database." }
    }
}

export async function getStudents() {
    try {
        const students = await prisma.student.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return students
    } catch (error) {
        console.error("Fetch Students Error:", error)
        return []
    }
}
