"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// --- Kepegawaian Stats ---

export async function getKepegawaianStats() {
    const employeeCount = await prisma.user.count({
        where: {
            role: {
                not: "SISWA"
            }
        }
    })

    // Calculate total teaching hours from schedules
    // Assuming each schedule is 1.5 hours (90 mins) for simplicity, or parsing time string
    // For now, simple count * 1.5
    const scheduleCount = await prisma.schedule.count()
    const totalJamMengajar = scheduleCount * 1.5

    return {
        totalPegawai: employeeCount,
        hadirHariIni: Math.floor(employeeCount * 0.9), // Mock: 90% attendance
        izinCuti: Math.ceil(employeeCount * 0.1), // Mock: 10% absent
        totalJamMengajar: totalJamMengajar
    }
}

export async function getEmployeesList() {
    return await prisma.user.findMany({
        where: {
            role: { not: "SISWA" }
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            // phone is not in User model yet, returned as undefined or mock
        }
    })
}

// --- Keuangan Stats ---

export async function getKeuanganStats() {
    // Count students based on payment status
    // Assuming 'AKTIF' means Paid, 'MENUNGGU_PEMBAYARAN' means Pending

    // const totalSiswa = await prisma.student.count()


    const unpaidCount = await prisma.student.count({
        where: { status: "MENUNGGU_PEMBAYARAN" }
    })

    const paidCount = await prisma.student.count({
        where: { status: "AKTIF" }
    })

    // Mock revenue calculation: Paid * 500.000 (Avg Tuition)
    const totalPemasukan = paidCount * 500000
    const totalTagihan = unpaidCount * 500000

    return {
        totalPemasukan,
        tagihanBelumLunasCnt: unpaidCount,
        tagihanBelumLunasAmt: totalTagihan,
        cashFlowMasuk: totalPemasukan, // Simplified
        cashFlowKeluar: 4500000 // Mock fixed expense
    }
}

export async function getInvoicesList() {
    // Mapping Students to Invoices
    const students = await prisma.student.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
    })

    return students.map((student: any) => ({

        id: `INV-${student.id.substring(0, 6).toUpperCase()}`,
        student: student.namaLengkap,
        program: student.programBimbel,
        amount: "Rp 500.000", // Flat rate for now
        dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // Due in 7 days
        status: student.status === "AKTIF" ? "Paid" : "Pending",
        datePaid: student.status === "AKTIF" ? formatBin(student.updatedAt) : "-"
    }))
}

function formatBin(date: Date) {
    return date.toISOString().split('T')[0]
}
