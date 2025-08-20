"use client"

import React, { useEffect } from 'react'
import { useMoney } from '../context.js/MoneyContext'
import { useForm } from 'react-hook-form'
const BudgetGoals = ({width}) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const { Budget, setBudget, Transactions, Progress, setProgress } = useMoney()
   
    useEffect(() => {
        const oldBudget = Number(JSON.parse(localStorage.getItem("Budget")))
        setBudget(Number(oldBudget))
    }, [])

    let Spent = Transactions.reduce((acc, curr) => {
        if(curr.amount < 0) {
            acc += Math.abs(curr.amount)
        }

        return acc
    }, 0)


    const onsubmit = (e) => {
        const NewBudget = e.budget
        setBudget(NewBudget)
        localStorage.setItem("Budget", JSON.stringify(NewBudget))
    }

    useEffect(() => {
  let newProgress = (Spent / Budget) * 100
  if (newProgress > 100) newProgress = 100
  setProgress(newProgress)
  console.log("Updated Progress:", newProgress)
}, [Transactions, Spent, Budget])
    
    const hue = 120 - (Progress * 120) / 100; 
    const colour = `hsl(${hue}, 98%, 50%)`;


    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)} className='my-4'>
                <input type="number" placeholder='Enter your desired budget Goal' {...register("budget")} className='w-[300px] border-2 border-white rounded-2xl py-0.5 px-1.5 g-gray-800' />
                <button className='border-2 border-black mx-4 py-0.5 px-4 rounded-2xl bg-gray-800'>set</button>
                <span>${Spent} used of ${Budget} budget set</span>
            </form>

            <div className='absolute border-2 border-white h-[5vh] rounded-2xl' style={{width: `${width}`, border: `2px solid ${colour}`}}>
                <div className='h-full transition-all duration-300 ease-in-out rounded-2xl' style={{width:`${Progress}%`, backgroundColor: `${colour}`}}></div>
            </div>
        </div>
    )
}

export default BudgetGoals
