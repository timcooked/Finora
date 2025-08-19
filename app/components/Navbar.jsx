"use client"
import React from 'react'
import Xlsx from './Xlsx'
import Link from 'next/link'
import { useMoney } from '../context.js/MoneyContext'
const Navbar = () => {
  const {Transactions} = useMoney()
  return (
    <div className='h-[12vh] w-[100%] bg-black flex justify-between items-center text-white px-4'>
        <div className='left'><Link href="/" className='m-2'><img src="finora.png" height={"180px"} width={"180px"}/></Link></div>
        <div className='right'>
            <ul className='flex gap-4'>
                <li className='text-[20px] hover:cursor-pointer'><Link href="/">Home</Link></li>
                <li className='text-[20px] hover:cursor-pointer'><Link href="/Calendar">Calendar</Link></li>
                <li><Xlsx transactions={Transactions} /></li>
            </ul>
        </div>
      
    </div>
  )
}

export default Navbar
