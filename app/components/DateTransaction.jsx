import React from 'react'
import { useMoney } from '../context.js/MoneyContext'
import { PieChart, Pie,Cell, CartesianGrid, XAxis, YAxis, Legend, Tooltip, AreaChart, Area } from 'recharts'

const DateTransaction = () => {
    const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AF19FF"];
    const {SelectedDate, Transactions, DatedTransactions} = useMoney()
    const TransactionList = Transactions.filter(item => item.date === SelectedDate)
    const EarnedList = TransactionList.reduce((acc, curr) => {
        if(curr.amount > 0){
            acc += curr.amount
        }
        return acc
    }, 0)
    // console.log(EarnedList)

    const SpentList = TransactionList.reduce((acc, curr) => {
        if(curr.amount < 0){
            acc += Math.abs(curr.amount)
        }

        return acc
    }, 0)

    const TotalList = [{name: "Earned", value: EarnedList}, {name: "Spent", value: SpentList}]
    // console.log(SpentList)

  return (
    <div>
  {TransactionList.length > 0 ? (
    TransactionList.map((e, idx) => (
      <div key={idx}>
        <div>
          <span>{e.Transaction}</span>
          <span>{e.amount}</span>
        </div>
      </div>
    ))
  ) : (
    <div>No transactions</div>
  )}

  <PieChart width={400} height={400}>
                  <Pie data={TotalList}
                  cx="50%" 
                  cy="50%" 
                  outerRadius={150}
                  dataKey={"value"}
                  nameKey={"name"}>
                      {TotalList.map((entry, index) => (
                          <Cell key={index} fill={COLORS [index % COLORS.length]} />
                      ))}
                  </Pie>
                  <Tooltip/>
                  <Legend/>
              </PieChart>
</div>
    
  )
}

export default DateTransaction
