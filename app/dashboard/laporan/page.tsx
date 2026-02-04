import { ReportsClient } from "./reports-client"
import { getStudents } from "@/app/actions/student"
import { getInvoicesList } from "@/app/actions/dashboard"

export default async function ReportsPage() {
    // Fetch data concurrently
    const [students, invoices] = await Promise.all([
        getStudents(),
        getInvoicesList()
    ])

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ReportsClient students={students} invoices={invoices} />
        </div>
    )
}
