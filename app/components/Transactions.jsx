
"use client"

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useMoney } from '../context.js/MoneyContext'
import Chart from './Chart'

const Transactions = () => {
    const { Transactions, setTransactions, DatedTransactions, setDatedTransactions } = useMoney()
    const [EditIdx, setEditIdx] = useState(null)
    useEffect(() => {
        const history = localStorage.getItem("Transactions")
        if (history) {
            setTransactions(JSON.parse(history))
        }

    }, [])

    useEffect(() => {
        localStorage.setItem("Transactions", JSON.stringify(Transactions))
    }, [Transactions])

    useEffect(() => {
        console.log("DatedTransaction was changed to: ", DatedTransactions)
    }, [DatedTransactions])


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm()

    useEffect(() => {
        const DateGrouping =
            Transactions.reduce((acc, curr) => {
                const found = acc.find(item => item.date === curr.date)
                if (found) {
                    if (curr.amount < 0) {
                        found.Spent += Math.abs(curr.amount)
                    }
                    else {
                        found.Earned += Math.abs(curr.amount)
                    }
                }

                else {
                    if (curr.amount < 0) {
                        acc.push({ date: curr.date, Spent: Math.abs(curr.amount), Earned: 0 })
                    }

                    else {
                        acc.push({ date: curr.date, Earned: Math.abs(curr.amount), Spent: 0 })
                    }
                }

                return acc
            }, [])

        setDatedTransactions(DateGrouping)
    }, [Transactions])


    const TodaysDate = new Date().toLocaleDateString('en-CA')
    console.log("todaysdate: ", TodaysDate)
    const currMonth = TodaysDate.split("-")[1]
    const ThisMonthTransactions = Transactions.filter(t => t.date.split("-")[1] === currMonth)
    console.log("thismonthtransaction", ThisMonthTransactions)



    const onsubmit = (data) => {
        const CurrDate = new Date().toLocaleDateString('en-CA')
        if (EditIdx != null) {

            const EditedTransactions = [...Transactions]
            EditedTransactions[EditIdx] = { id: data.id, Transaction: data.Transaction, amount: Number(data.amount), category: (data.category), date: CurrDate }

            setEditIdx(null)
            setTransactions(EditedTransactions)


        }

        else {
            const NewTransactions = [...Transactions, { id: uuidv4(), Transaction: data.Transaction, amount: Number(data.amount), category: (data.category), date: CurrDate }]
            setTransactions(NewTransactions)
            Moneyhandler(data)
        }




    }

    const edithandler = (index) => {
        reset(Transactions[index])
        setEditIdx(index)
        // console.log("edithandler was clicked and value of editidx is: ", EditIdx)
    }


    const removehandler = (data) => {
        const updatedTransactions = Transactions.filter(Transaction => Transaction.id != data.id)
        setTransactions(updatedTransactions)
        // console.log(data)
    }






    return (
        <div>
            <div className="transactions">
                <div className='w-[65vw] flex items-center justify-center'>
                    <form onSubmit={handleSubmit(onsubmit)} className=''>
                        <div className="namecont text-center font-bold text-2xl mt-6">Enter your Transaction</div>
                        <div className='flex gap-2'>
                            <div className="inputbox w-[30vw] flex flex-col gap-2 my-4">
                                <input type="text" placeholder='Transaction' {...register("Transaction", { required: { value: true, message: "this filed is required" }, minLength: { value: 3, message: "the Transaction should be atleast 3 characters long" } })} className='name border-2 border-white px-4 rounded-2xl py-2 w-[30vw] bg-gray-800' />
                                {errors.name && <div> {errors.name.message}</div>}

                                <div>
                                    <input type="number" placeholder='Amount(+ for earned and - for spent)'{...register("amount", { required: { value: true, message: "this filed is required" }, minLength: { value: 1, message: "please enter an amount" } })} className='name border-2 border-white px-4 rounded-2xl py-2  w-[30vw] bg-gray-800' />
                                    {errors.name && <div> {errors.name.message}</div>}

                                </div>
                            </div>

                            <div className='selectbox w-[25vw] flex flex-col gap-2 my-4'>
                                <select defaultValue="" {...register("category", { required: { value: true, message: "this field is required" } })} className='w-[25vw] border-2 border-white px-4 py-2 rounded-2xl bg-gray-800'>
                                    <option value="" disabled hidden>Select a category</option>
                                    <option value="groceries">🛒 Groceries</option>
                                    <option value="rent">🏠 Rent / Housing</option>
                                    <option value="utilities">💡 Utilities</option>
                                    <option value="transportation">🚌 Transportation</option>
                                    <option value="dining">🍽️ Dining Out</option>
                                    <option value="shopping">🛍️ Shopping</option>
                                    <option value="entertainment">🎬 Entertainment</option>
                                    <option value="healthcare">💊 Healthcare</option>
                                    <option value="education">📚 Education</option>
                                    <option value="insurance">🛡️ Insurance</option>
                                    <option value="miscellaneous">✨ Miscellaneous</option>
                                </select>
                                <button className='w-[25vw] border-2 bg-gray-800 border-white px-4 py-2 rounded-2xl hover:bg-green-500'>Add</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center items-center '>
                    <div className='h-[50vh] overflow-y-auto w-[27vw] '>

                        {ThisMonthTransactions.map((element, index) => {
                            return (

                                <div key={element.id}>
                                    <div className="flex w-[25vw] justify-between items-end border-b border-gray-300">

                                        <span>{element.Transaction}</span>

                                        <span className='m-2'>

                                            {element.amount < 0 ? <span className='text-red-500'>-${-(element.amount)}</span> : <span className='text-green-500'>${element.amount}</span>}
                                            <button onClick={() => removehandler(element)} className='border-2 border-white ml-4 mx-2 py-0.5 px-2 rounded-2xl'>remove</button>
                                            <button onClick={() => edithandler(index)} className='border-2 border-white py-0.5 px-2 rounded-2xl'>edit</button>
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div >
                    <Chart />
                </div>
            </div>
        </div>
    )
}

export default Transactions
