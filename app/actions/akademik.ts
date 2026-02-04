"use server"

import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

// --- Validation Schemas ---

const classSchema = z.object({
    name: z.string().min(2, "Nama kelas wajib diisi"),
    program: z.string().min(1, "Program wajib dipilih"),
    level: z.string().min(1, "Jenjang wajib dipilih"),
    teacherId: z.string().optional(),
})

const scheduleSchema = z.object({
    classId: z.string().min(1, "Kelas wajib dipilih"),
    day: z.string().min(1, "Hari wajib dipilih"),
    startTime: z.string().min(1, "Jam mulai wajib diisi"),
    endTime: z.string().min(1, "Jam selesai wajib diisi"),
    subject: z.string().min(2, "Mata pelajaran wajib diisi"),
    room: z.string().optional(),
    teacherId: z.string().optional(),
})

// --- Class Actions ---

export async function getClasses() {
    try {
        const classes = await prisma.class.findMany({
            include: {
                teacher: { select: { name: true } },
                _count: { select: { schedules: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
        return classes
    } catch (error) {
        console.error("Failed to fetch classes:", error)
        return []
    }
}

export async function createClass(data: z.infer<typeof classSchema>) {
    const validated = classSchema.safeParse(data)
    if (!validated.success) {
        return { success: false, error: "Validasi Gagal" }
    }

    try {
        await prisma.class.create({
            data: validated.data
        })
        revalidatePath("/dashboard/akademik")
        return { success: true, message: "Kelas berhasil dibuat" }
    } catch (error) {
        console.error("Create Class Error:", error)
        return { success: false, error: "Gagal membuat kelas" }
    }
}

export async function deleteClass(id: string) {
    try {
        await prisma.class.delete({ where: { id } })
        revalidatePath("/dashboard/akademik")
        return { success: true, message: "Kelas berhasil dihapus" }
    } catch (error) {
        return { success: false, error: "Gagal menghapus kelas" }
    }
}

// --- Schedule Actions ---

export async function getSchedules() {
    try {
        const schedules = await prisma.schedule.findMany({
            include: {
                class: { select: { name: true } },
                teacher: { select: { name: true } }
            },
            orderBy: { day: 'asc' } // Simplistic ordering, ideally mapping days to numbers
        })
        return schedules
    } catch (error) {
        console.error("Failed to fetch schedules:", error)
        return []
    }
}

export async function createSchedule(data: z.infer<typeof scheduleSchema>) {
    const validated = scheduleSchema.safeParse(data)
    if (!validated.success) {
        return { success: false, error: "Validasi Gagal" }
    }

    try {
        await prisma.schedule.create({
            data: validated.data
        })
        revalidatePath("/dashboard/akademik")
        return { success: true, message: "Jadwal berhasil dibuat" }
    } catch (error) {
        console.error("Create Schedule Error:", error)
        return { success: false, error: "Gagal membuat jadwal" }
    }
}

export async function deleteSchedule(id: string) {
    try {
        await prisma.schedule.delete({ where: { id } })
        revalidatePath("/dashboard/akademik")
        return { success: true, message: "Jadwal berhasil dihapus" }
    } catch (error) {
        return { success: false, error: "Gagal menghapus jadwal" }
    }
}
