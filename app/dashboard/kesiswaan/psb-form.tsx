"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
// Note: components will be available after installation completes
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    // Data Siswa
    namaLengkap: z.string().min(2, {
        message: "Nama lengkap harus diisi (min 2 karakter).",
    }),
    nisn: z.string().optional(),
    tempatLahir: z.string().min(2, "Tempat lahir wajib diisi"),
    tanggalLahir: z.date().refine((val) => val !== undefined, {
        message: "Tanggal lahir wajib diisi",
    }),
    jenisKelamin: z.enum(["L", "P"]).refine((val) => val !== undefined, {
        message: "Pilih jenis kelamin",
    }),
    alamat: z.string().min(5, "Alamat wajib diisi lengkap"),
    asalSekolah: z.string().min(2, "Asal sekolah wajib diisi"),
    kelas: z.string().min(1, "Kelas wajib diisi"),

    // Data Orang Tua
    namaAyah: z.string().min(2, "Nama ayah wajib diisi"),
    namaIbu: z.string().min(2, "Nama ibu wajib diisi"),
    noHpOrtu: z.string().min(10, "Nomor HP wajib diisi (min 10 digit)"),

    // Program
    programBimbel: z.string().min(1, "Pilih program bimbel"),
})

import { createStudentAction } from "@/app/actions/student"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export function PSBForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            namaLengkap: "",
            nisn: "",
            tempatLahir: "",
            alamat: "",
            asalSekolah: "",
            kelas: "",
            namaAyah: "",
            namaIbu: "",
            noHpOrtu: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const result = await createStudentAction(values)
            if (result.success) {
                alert("Pendaftaran Berhasil! Data siswa telah disimpan.")
                form.reset()
                router.refresh()
            } else {
                alert("Gagal: " + result.error)
            }
        } catch (err) {
            alert("Terjadi kesalahan sistem")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Data Siswa Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Pribadi Siswa</CardTitle>
                        <CardDescription>Masukan informasi lengkap calon siswa.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="namaLengkap"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Lengkap</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama Siswa Sesuai Akta" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nisn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NISN (Opsional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1234567890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jenisKelamin"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="L" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Laki-laki
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="P" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Perempuan
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="tempatLahir"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tempat Lahir</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Kota Lahir" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tanggalLahir"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal Lahir</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pilih tanggal</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="alamat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat Lengkap</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Data Sekolah Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Pendidikan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="asalSekolah"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Asal Sekolah</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama Sekolah Asal" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kelas"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kelas Saat Ini</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih kelas" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Kelas 1 SD</SelectItem>
                                            <SelectItem value="2">Kelas 2 SD</SelectItem>
                                            <SelectItem value="3">Kelas 3 SD</SelectItem>
                                            <SelectItem value="4">Kelas 4 SD</SelectItem>
                                            <SelectItem value="5">Kelas 5 SD</SelectItem>
                                            <SelectItem value="6">Kelas 6 SD</SelectItem>
                                            <SelectItem value="7">Kelas 7 SMP</SelectItem>
                                            <SelectItem value="8">Kelas 8 SMP</SelectItem>
                                            <SelectItem value="9">Kelas 9 SMP</SelectItem>
                                            <SelectItem value="10">Kelas 10 SMA</SelectItem>
                                            <SelectItem value="11">Kelas 11 SMA</SelectItem>
                                            <SelectItem value="12">Kelas 12 SMA</SelectItem>
                                            <SelectItem value="ALUMNI">Alumni / Gap Year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Data Orang Tua Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Orang Tua / Wali</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="namaAyah"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Ayah</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nama Ayah" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="namaIbu"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Ibu</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nama Ibu" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="noHpOrtu"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No HP / WhatsApp Orang Tua</FormLabel>
                                    <FormControl>
                                        <Input placeholder="08xxxxxxxxxx" type="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Program Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pilihan Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="programBimbel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Program Bimbingan</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih program" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="REGULER">Program Reguler (2x Seminggu)</SelectItem>
                                            <SelectItem value="INTENSIF">Program Intensif (4x Seminggu)</SelectItem>
                                            <SelectItem value="PRIVAT">Program Privat (1 on 1)</SelectItem>
                                            <SelectItem value="SNBT">Program Fokus SNBT/UTBK</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Daftarkan Siswa
                </Button>
            </form>
        </Form>
    )
}
