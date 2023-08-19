import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logotype from './Logotype';


function AddExpense() {
    const [expensesCategory, setExpensesCategory] = useState('default');
    const [expensesAmount, setExpensesAmount] = useState('');
    const [errors, setErrors] = useState({
        amount: '',
        category: '',
        error: ''
    });
    const [successMessage, setSuccessMessage] = useState('');


    const changeAmount = (event) => {
        const value = event.target.value;

        setExpensesAmount(value);

        if (!(/^[1-9]\d*(\.\d{1,2})?$/.test(value))) {
            setErrors({ ...errors, amount: 'Заповніть коректно поле "Сума"' });
        } else {
            setErrors({ ...errors, amount: '', error: '' })
        }
    }

    const changeCategory = (event) => {
        const value = event.target.value;

        setExpensesCategory(value);

        if (value === 'default') {
            setErrors({ ...errors, category: 'Оберіть категорію' })
        } else {
            setErrors({ ...errors, category: '', error: '' })
        }
    }

    const addData = (event) => {
        event.preventDefault();

        if (!(/^[1-9]\d*(\.\d{1,2})?$/.test(expensesAmount)) || expensesAmount.trim() === '' || expensesCategory === 'default') {
            setErrors({ ...errors, error: 'Заповніть поле сума та оберіть категорію' })
            return;
        }

        const apiUrl = 'http://localhost:5000/api/add-expense';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: expensesCategory, amount: expensesAmount }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSuccessMessage('Дані було успішно збережено');
                setTimeout(() => {
                    setSuccessMessage('');
                    setExpensesAmount('');
                }, 500)
            })
            .catch((error) => console.error('Error: ', error))

    }


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
            <form onSubmit={addData}>
                <div className='input-wrapper'>
                    <div>
                        <input type='text' className='input' placeholder='витрачена сума...' value={expensesAmount} onChange={changeAmount} />
                        <select className='select-categories' onChange={changeCategory}>
                            <option value="default">Оберіть категорію</option>
                            <option value="clothes">Одяг</option>
                            <option value="household">Побут</option>
                            <option value="gadgets">Гаджети</option>
                            <option value="food">Іжа</option>
                            <option value="entertainment">Розваги</option>
                            <option value="other">Інше</option>
                        </select>
                    </div>
                    <button type='submit' className='button-save'>Зберегти</button>
                    <div>
                    {errors.amount && <p className='error'>{errors.amount}</p>}
                    {errors.category && <p className='error'>{errors.category}</p>}
                    {errors.error && <p className='error'>{errors.error}</p>}
                    {successMessage && <p>{successMessage}</p>}
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddExpense
