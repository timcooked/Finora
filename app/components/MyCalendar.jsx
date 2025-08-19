"use client"

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useMoney } from '../context.js/MoneyContext';
const MyCalendar = () => {
  const { DatedTransactions, SelectedDate, setSelectedDate, Transactions, setTransactions, Progress } = useMoney()
  const [SelectedTransaction, setSelectedTransaction] = useState([]);
  useEffect(() => {
    const OldTransactions = JSON.parse(localStorage.getItem("Transactions")) || []
    setTransactions(OldTransactions)
  }, [])


  const changehandler = (e) => {
    const TempDate = e.toLocaleDateString('en-CA'); // YYYY-MM-DD
    setSelectedDate(TempDate);

    const filtered = Transactions.filter((t) => t.date === TempDate);
    setSelectedTransaction(filtered);
  };


  const hue = 120 - (Progress * 120) / 100;
  const colour = `hsl(${hue}, 98%, 50%)`;
  const smallProgress = String(Progress).split(".")[0]


  const renderTileContent = (({ date, view }) => {
    if (view != 'month') return null

    const thisDate = date.toLocaleDateString('en-CA')
    const DayData = DatedTransactions.find(t => t.date === thisDate) || null
    return DayData ? (
      <div>

        <div className='text-green-700'>{DayData.Earned}</div>
        <div className='text-red-500'>-{DayData.Spent}</div>
      </div>
    ) : <div>

      <div className='text-green-700'>0</div>
      <div className='text-red-500'>0</div>
    </div>
  })
  return (
    <div className='bg-gray-900'>
      <div className="p-4 bg-gray-900 rounded-xl shadow flex justify-center items-center">
        <Calendar
          onChange={changehandler}
          value={SelectedDate}
          tileContent={renderTileContent}
          className="rounded-xl !w-[100vw] !bg-gray-900 shadow-lg p-4 !text-[20px]" />
      </div>
      <div className=' absolute w-[100vw] bg-gray-900 p-4'>
        <div className='w-[60
        vw] h-[22vw] overflow-y-auto bg-gray-900 shadow-lg rounded-2xl p-1'>

          {SelectedTransaction && SelectedTransaction.length > 0 ? (
            SelectedTransaction.map((element) => (
              <div key={element.id} className='mx-8'>
                <div className="flex w-[55vw] justify-between">
                  <span>{element.Transaction}</span>
                  <span className='m-2'>
                    {element.amount < 0 ? (
                      <span className='text-red-700'>${element.amount}</span>
                    ) : (
                      <span className='text-green-700'>${element.amount}</span>
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className='text-7xl'>no transactions</div>
          )}
        </div>

        <div className="box absolute right-[120px] bottom-[20px] w-[22vw] h-[22vw] rounded-2xl flex flex-col gap-8" style={{ backgroundColor: `${colour}` }}>
          <div className="num text-9xl font-bold text-white [-webkit-text-stroke:2px_black] mt-12 text-center">{smallProgress}%</div>
          <div className='text-center text-xl font-bold m-4 text-black'>Of your budget has been used</div>
        </div>

      </div>
    </div>
  )
}

export default MyCalendar
