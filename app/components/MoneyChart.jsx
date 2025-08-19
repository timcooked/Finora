import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, AreaChart, Area } from 'recharts'
import { useMoney } from '../context.js/MoneyContext'

const MoneyChart = () => {
  const {DatedTransactions} = useMoney()
  console.log("datedTransaction", DatedTransactions)
  const TodaysDate = new Date().toLocaleDateString('en-CA')
   const TodaysMonth = TodaysDate.split("-")[1]
  const ThisMonthTransaction = DatedTransactions.filter(t => t.date.split("-")[1] === TodaysMonth)

  console.log("2",ThisMonthTransaction)
  return (
    <div>
      <AreaChart width={900} height={300} data={ThisMonthTransaction}>
  <defs>
    <linearGradient id="earnGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#00ffcc" stopOpacity={0.8}/>
      <stop offset="50%" stopColor="#00ff88" stopOpacity={0.5}/>
      <stop offset="100%" stopColor='#00cc44' stopOpacity={0}/>
    </linearGradient>

    <linearGradient id="spentGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ff1a1a" stopOpacity={0.8}/>
      <stop offset="50%" stopColor="#ff0044" stopOpacity={0.5}/>
      <stop offset="100%" stopColor='#ff3366' stopOpacity={0}/>
    </linearGradient>
  </defs>

  <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
  <Area
    type="monotone"
    dataKey="Earned"
    name="Earned"
    stroke="#00ffcc"
    fill="url(#earnGradient)" // match the ID exactly
    fillOpacity={1}
  />
  <Area
    type="monotone"
    dataKey="Spent"
    name="Spent"
    stroke="#ff4444"
    fill="url(#spentGradient)" // match the ID exactly
    fillOpacity={1}
  />
  <XAxis dataKey="date" />
  <YAxis />
  <Legend />
  <Tooltip contentStyle={{backgroundColor: "black", opacity: 0.8, border: "2px solid white", borderRadius: "12px", filter: "blur"}}/>
</AreaChart>


    </div>
  )
}

export default MoneyChart
