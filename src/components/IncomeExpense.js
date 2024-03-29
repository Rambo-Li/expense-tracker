import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpense = () => {
    const {transactions} = useContext(GlobalContext);
    const income = transactions.filter(transaction => transaction.amount > 0).map(t => t.amount).reduce((acc, item)=>(acc += item), 0).toFixed(2);
    const expense = transactions.filter(transaction => transaction.amount < 0).map(t => Math.abs(t.amount)).reduce((acc, item)=>(acc += item), 0).toFixed(2);

  return (
    <div className='inc-exp-container'>
        <div>
            <h4>Income</h4>
            <p className='money plus'>+${income}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p className='money minus'>-${expense}</p>
        </div>
    </div>
  )
}
