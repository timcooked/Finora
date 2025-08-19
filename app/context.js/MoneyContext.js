"use client"

import { createContext, useState, useContext } from "react";

const MoneyContext = createContext();

export function Moneyprovider({ children }) {

  const [Transactions, setTransactions] = useState([])

  const [SelectedDate, setSelectedDate] = useState()
  const [ThisMonth, setThisMonth] = useState()
  const [Budget, setBudget] = useState(0)
  const [DatedTransactions, setDatedTransactions] = useState([])
  const [Progress, setProgress] = useState(0)

  return (
    <MoneyContext.Provider value={{ Budget, setBudget, Transactions, setTransactions, DatedTransactions, setDatedTransactions, SelectedDate, setSelectedDate, ThisMonth, setThisMonth, Progress, setProgress }}>
      {children}
    </MoneyContext.Provider>
  )
}

export function useMoney() {
  return useContext(MoneyContext);
}


// { id: 1, Transaction: "Groceries", amount: 450, category: "Food", date: "2025-08-06" },
//   { id: 2, Transaction: "Uber Ride", amount: 120, category: "Transport", date: "2025-08-07" },
//   { id: 3, Transaction: "Electricity Bill", amount: 1800, category: "Utilities", date: "2025-08-08" },
//   { id: 4, Transaction: "Movie Tickets", amount: 400, category: "Entertainment", date: "2025-08-09" },
//   { id: 5, Transaction: "Coffee", amount: 150, category: "Food", date: "2025-08-10" },
//   { id: 6, Transaction: "Gym Membership", amount: 2000, category: "Health", date: "2025-08-11" },
//   { id: 7, Transaction: "Book Purchase", amount: 320, category: "Education", date: "2025-08-12" },
//   { id: 8, Transaction: "Pet Food", amount: 500, category: "Pets", date: "2025-08-13" },
//   { id: 9, Transaction: "Fuel", amount: 900, category: "Transport", date: "2025-08-14" },
//   { id: 10, Transaction: "Dinner Out", amount: 1100, category: "Food", date: "2025-08-15" },