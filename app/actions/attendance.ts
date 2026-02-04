"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

const prisma = new PrismaClient()

export async function checkIn() {
    const session = await auth()
    if (!session?.user?.id) return { success: false, error: "Unauthorized" }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if already checked in
    const existing = await prisma.attendance.findFirst({
        where: {
            userId: session.user.id,
            date: { gte: today }
        }
    })

    if (existing) return { success: false, error: "Anda sudah melakukan Check-In hari ini" }

    try {
        await prisma.attendance.create({
            data: {
                userId: session.user.id,
                checkIn: new Date(),
                status: "PRESENT",
                // date default is now()
            }
        })
        revalidatePath("/dashboard")
        return { success: true, message: "Berhasil Check-In" }
    } catch (error) {
        return { success: false, error: "Gagal Check-In" }
    }
}

export async function checkOut() {
    const session = await auth()
    if (!session?.user?.id) return { success: false, error: "Unauthorized" }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existing = await prisma.attendance.findFirst({
        where: {
            userId: session.user.id,
            date: { gte: today }
        }
    })

    if (!existing) return { success: false, error: "Belum melakukan Check-In" }
    if (existing.checkOut) return { success: false, error: "Anda sudah Check-Out hari ini" }

    try {
        await prisma.attendance.update({
            where: { id: existing.id },
            data: {
                checkOut: new Date()
            }
        })
        revalidatePath("/dashboard")
        return { success: true, message: "Berhasil Check-Out" }
    } catch (error) {
        return { success: false, error: "Gagal Check-Out" }
    }
}

export async function getAttendanceToday() {
    const session = await auth()
    if (!session?.user?.id) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const attendance = await prisma.attendance.findFirst({
        where: {
            userId: session.user.id,
            date: { gte: today }
        }
    })
    return attendance
}
