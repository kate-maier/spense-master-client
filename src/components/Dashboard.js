import React from 'react';
import { Link } from 'react-router-dom';
import Logotype from './Logotype';
import { useState } from 'react';


function Dashboard() {
    const [calculations, setCalculations] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/calculations');
            const data = await response.json();
            setCalculations(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();

    return (
        <>
            <header>
                <div className='header-container'>
                    <div>
                        <Logotype />
                    </div>
                    <div className="navigation">
                        <Link to="/" className='navigation-disable'>
                            <button>Головна</button>
                        </Link>
                        <Link to="/analysis">
                            <button>Аналіз витрат</button>
                        </Link>
                        <Link to="/history">
                            <button>Історія витрат</button>
                        </Link>
                    </div>
                </div>
            </header>
            <div>
                <div className='data-btns'>
                    <Link to="/add-expense">
                        <button>Додати витрату</button>
                    </Link>
                    <Link to="/add-income">
                        <button>Додати прибуток</button>
                    </Link>
                </div>
                <div className='data-text'>
                    <p>Дохід за місяць: <span>{calculations.monthIncomes}</span></p>
                    <p>Витрачено за місяць: <span>{calculations.monthExpenses}</span></p>
                    <p>Залишок коштів: <span>{calculations.balanceMoney}</span></p>
                </div>
            </div>
        </>
    )
}

export default Dashboard
