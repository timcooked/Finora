"use client"
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useMoney } from '../context.js/MoneyContext'

const Chart = () => {
        const {Transactions} = useMoney()
        const COLORS = [
  "#00FF88", // Neon Green
  "#00FFF7", // Aqua Cyan
  "#AA00FF", // Violet Purple
  "#FF00FF", // Magenta Pink
  "#FF0088", // Hot Pink
  "#FF0033", // Neon Red
  "#FF6600", // Neon Orange
  "#FFEE00", // Neon Yellow
  "#AAFF00", // Acid Lime
  "#00FFCC", // Minty Teal
  "#00AAFF", // Electric Blue
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
