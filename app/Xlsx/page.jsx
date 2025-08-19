"use client"
import  ExportButton  from "../components/Xlsx"
import { useMoney } from "../context.js/MoneyContext"

export default function page() {
    const {Transactions} = useMoney()

    return <ExportButton transactions={Transactions} />
}
