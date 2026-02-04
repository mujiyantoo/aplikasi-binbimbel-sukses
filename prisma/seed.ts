import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10)

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@bimbel.com' },
        update: {},
        create: {
            email: 'admin@bimbel.com',
            name: 'Super Admin',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    // Create Student User
    const student = await prisma.user.upsert({
        where: { email: 'siswa@bimbel.com' },
        update: {},
        create: {
            email: 'siswa@bimbel.com',
            name: 'Budi Siswa',
            password: hashedPassword, // admin123
            role: 'SISWA',
        },
    })

    console.log({ admin, student })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
