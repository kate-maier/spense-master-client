import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logotype from './Logotype';


function AddIncome() {
    const [incomeAmount, setincomeAmount] = useState('');
    const [errors, setErrors] = useState({
        amount: '',
        saveError: ''
    });
    const [successMessage, setSuccessMessage] = useState('');


    const changeAmount = (event) => {
        const value = event.target.value;

        setincomeAmount(value);

        if (!(/^[1-9]\d*(\.\d{1,2})?$/.test(value))) {
            setErrors({ ...errors, amount: 'Заповніть коректно поле "Сума"' });
        } else {
            setErrors({ ...errors, amount: '', saveError: '' })
        }
    }

    const addData = (event) => {
        event.preventDefault();

        if (!(/^[1-9]\d*(\.\d{1,2})?$/.test(incomeAmount)) || incomeAmount.trim() === '') {
            setErrors({ ...errors, saveError: 'Заповніть коректно поле сума' })
            return;
        }

        const apiUrl = 'http://localhost:5000/api/add-income';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: incomeAmount }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSuccessMessage('Дані було успішно збережено');
                setTimeout(() => {
                    setSuccessMessage('');
                    setincomeAmount('');
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
                        <input type='text' className='input' placeholder='Cума прибутку...' value={incomeAmount} onChange={changeAmount} />
                    </div>
                    <button type='submit' className='button-save'>Зберегти</button>
                    <div>
                        {errors.amount && <p className='error'>{errors.amount}</p>}
                        {errors.saveError && <p className='error'>{errors.saveError}</p>}
                        {successMessage && <p>{successMessage}</p>}
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddIncome
