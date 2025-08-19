"use client"
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import BudgetGoals from "./components/BudgetGoals";
import MyCalendar from "./components/MyCalendar"
import DateTransaction from "./components/DateTransaction"
import  Chart  from "./components/Chart";
import MoneyChart from "./components/MoneyChart";
export default function Home() {
  return (
    <>
   
    <div className="border-2 bg-gray-900 rounded-2xl w-[65vw] p-4 mx-auto mb-4">
    
    <Dashboard />
    <Transactions/>
    {/* <BudgetGoals /> */}
    <div className="flex items-center w-[65vw] m-4">
    <BudgetGoals width={"60vw"}/>
    </div>
    <div className="text-center mt-12 mb-4">Transactions This Month</div>
    <MoneyChart/>
    </div>
    </>
  );
}
