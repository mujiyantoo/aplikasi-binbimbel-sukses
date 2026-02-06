
"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, GraduationCap } from "lucide-react"

const formSchema = z.object({
    email: z.string().email({
        message: "Email tidak valid.",
    }),
    password: z.string().min(1, {
        message: "Password wajib diisi.",
    }),
})

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        setError(null)

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            })

            if (res?.error) {
                setError("Email atau password salah.")
            } else {
                router.push("/dashboard")
                router.refresh()
            }
        } catch (err) {
            setError("Terjadi kesalahan sistem.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50/50 p-4 font-sans">
            <Card className="w-full max-w-sm border-0 shadow-lg sm:rounded-xl">
                <CardHeader className="space-y-4 text-center pb-2">
                    <div className="bg-primary mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg shadow-primary/30">
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Bimbel Management</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">
                            Sistem Manajemen Bimbingan Belajar
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {error && (
                                <Alert variant="destructive" className="py-2">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="font-semibold text-slate-700">Email</FormLabel>
                                        <FormControl>
                                            <Input className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="admin@bimbel.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="font-semibold text-slate-700">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="Masukkan password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full h-11 text-base font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Masuk
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center pb-8">
                    <div className="rounded-lg bg-slate-50 p-3 text-center w-full border border-slate-100">
                        <p className="text-xs font-semibold text-slate-900 mb-1">Demo Account:</p>
                        <p className="text-xs text-slate-500">
                            Email: admin@bimbel.com <br />
                            Password: admin123
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
