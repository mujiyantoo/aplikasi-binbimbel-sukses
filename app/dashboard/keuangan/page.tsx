import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InvoiceList } from "./invoice-list"
import { Banknote, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { getKeuanganStats, getInvoicesList } from "@/app/actions/dashboard"

export default async function KeuanganPage() {
    const stats = await getKeuanganStats()
    const invoices = await getInvoicesList()

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Keuangan</h2>
                <p className="text-muted-foreground">Monitoring Pembayaran & Arus Kas</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Pemasukan (Bulan Ini)
                        </CardTitle>
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rp {stats.totalPemasukan.toLocaleString('id-ID')}</div>
                        <p className="text-xs text-muted-foreground">
                            Estimasi
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tagihan Belum Lunas
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.tagihanBelumLunasCnt} Siswa</div>
                        <p className="text-xs text-muted-foreground">
                            Total Rp {stats.tagihanBelumLunasAmt.toLocaleString('id-ID')}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cash Flow Masuk</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">+Rp {stats.cashFlowMasuk.toLocaleString('id-ID')}</div>
                        <p className="text-xs text-muted-foreground">
                            Sepanjang Waktu
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cash Flow Keluar</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">-Rp {stats.cashFlowKeluar.toLocaleString('id-ID')}</div>
                        <p className="text-xs text-muted-foreground">
                            Estimasi
                        </p>
                    </CardContent>
                </Card>
            </div>

            <InvoiceList data={invoices} />
        </div>
    );
}
