import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logotype from './Logotype';


const History = () => {
    const [expensesData, setExpensesData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/history');
                const data = await response.json();
                setExpensesData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

   
    return (
        <>
            <header>
                <div className='header-container'>
                    <div>
                        <Logotype />
                    </div>
                    <div className="navigation">
                        <Link to="/">
                            <button>Головна</button>
                        </Link>
                        <Link to="/analysis">
                            <button>Аналіз витрат</button>
                        </Link>
                        <Link to="/history" className='navigation-disable'>
                            <button>Історія витрат</button>
                        </Link>
                    </div>
                </div>
            </header>
            <h2>Історія витрат</h2>
            <ul className='expenses-list'>
                {expensesData && expensesData.map((expense) => (
                    <li key={expense.id}>
                        <p className='expense-date' >Дата: {expense.date}</p>
                        <p>Категорія: {expense.category}</p>
                        <p>Витрачена сума: {expense.amount}</p>
                    </li>
                ))}
            </ul>
        </>
    )

}

export default History
