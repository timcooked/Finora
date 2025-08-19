"use client"

import {useState, useEffect}  from 'react'
import {  useMoney } from '../context.js/MoneyContext'
const Dashboard = () => {
  const {Transactions} = useMoney()
 const [SpentMoney, setSpentMoney] = useState(0);
const [EarnedMoney, setEarnedMoney] = useState(0);
const [LeftMoney, setLeftMoney] = useState(0);

useEffect(() => {
  let spent = 0;
  let earned = 0;

  for (const element of Transactions) {
    if (element.amount < 0) {
      spent += Math.abs(element.amount);
    } else {
      earned += Math.abs(element.amount);
    }
  }

  setSpentMoney(spent);
  setEarnedMoney(earned);
  setLeftMoney(earned - spent);
}, [Transactions], []);
  
  
  return (
    
    <div className='dashboard-hero flex gap-[2vw] w-[100vw]'>
      <div className="dashboard-right w-[65vw]">
        <div className='flex h-[15vh] w-[65vw] gap-[2vw] justify-center items-center'>
            <div className="expense flex flex-col justify-center items-center border-2 border-white rounded-2xl p-2 w-[13vw] bg-gray-800">
              <div>Expense this Month</div>
              <div className='text-red-500'>${SpentMoney}</div>
            </div>

            <div className="expense flex flex-col justify-center items-center border-2 border-white rounded-2xl p-2 w-[13vw] bg-gray-800">
              <div>Earnings this Month</div>
              <div className='text-green-500'>${EarnedMoney}</div>
            </div>

            <div className="expense flex flex-col justify-center items-center border-2 border-white rounded-2xl p-2 w-[13vw] bg-gray-800 ">
              <div>Money left</div>
              <div className='text-emerald-400'>${LeftMoney}</div>
            </div>


        </div>
      </div>
    </div>
  )
}

export default Dashboard
