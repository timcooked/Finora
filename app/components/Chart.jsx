"use client"
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useMoney } from '../context.js/MoneyContext'

const Chart = () => {
        const {Transactions} = useMoney()
        const COLORS = [
  "#7BFF00", // Radioactive Green
  "#39FF14", // Laser Green
  "#00FFB3", // Neon Mint
  "#00FFD5", // Bright Turquoise
  "#00CFFF", // Sky Neon Blue
  "#0088FF", // Electric Azure
  "#3366FF", // Hyper Blue
  "#6A00FF", // Deep Neon Purple
  "#8F00FF", // Ultraviolet
  "#C000FF", // Bright Orchid
  "#E100FF", // Neon Fuchsia
  "#FF00CC", // Electric Pink
  "#FF1493", // Deep Pink
]
        const TodaysDate = new Date().toLocaleDateString('en-CA')
        const TodaysMonth = TodaysDate.split("-")[1]
    
    const TodaysTransactions = Transactions.filter(t => (t.date.split("-")[1]) === TodaysMonth)
        const GroupedData = TodaysTransactions.filter(t => (t.amount < 0)).reduce((acc,curr) => {
            const found = acc.find(item => item.name === curr.category)
            if(found){
                found.value += Math.abs(curr.amount)
            }
            else{
                  acc.push({ name: curr.category, value: Math.abs(Number(curr.amount)) });
            }

            return acc
        }, [])
        return (
            
            <PieChart width={400} height={500} >
                <Pie data={GroupedData}
                cx="50%" 
                cy="50%" 
                outerRadius={180}
                // innerRadius={150}
                dataKey={"value"}
                nameKey={"name"}>
                    {GroupedData.map((entry, index) => (
                        <Cell key={index} fill={COLORS [index % COLORS.length]} stroke='#000' strokeWidth={2}/>
                    ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: "black",opacity: 0.9, border: "2px solid white"}} itemStyle={{color: "white"}}/>
                <Legend/>
            </PieChart>
        )
    }


    export default Chart
