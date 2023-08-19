import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Logotype from './Logotype';

ChartJS.register(ArcElement, Tooltip, Legend);

function Analysis() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState('');
  const [expensesData, setExpensesData] = useState([]);
  const [yearsData, setYearsData] = useState([]);
  const [choosedMonth, setChoosedMonth] = useState('');
  const [choosedYear, setChoosedYear] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analysis');
        const data = await response.json();
        setExpensesData(data[0]);
        setYearsData(data[1]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])


  
  function saveMonth(event) {
    const value = event.target.value;

    setChoosedMonth(value)
  }

  function saveYear(event) {
    const value = event.target.value;

    setChoosedYear(value)
  }


  function addData(event) {
    event.preventDefault();

    if (choosedMonth === '' || choosedYear === '') {
      setError('Оберіть рік та місяць')
      return;
    }

    fetch('http://localhost:5000/api/analysis-new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ month: choosedMonth, year: choosedYear }),
    })
      .then(response => response.json())
      .then(processedData => {
        setExpensesData(processedData)
      })
      .catch((error) => console.error('Error: ', error))
  }


  useEffect(() => {
    setChartData({
      labels: ['Одяг', 'Побут', 'Гаджети', 'Їжа', 'Розваги', 'Інше'],
      datasets: [
        {
          data: expensesData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
      }
    })
  }, [expensesData]);


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
            <Link to="/analysis" className='navigation-disable'>
              <button>Аналіз витрат</button>
            </Link>
            <Link to="/history">
              <button>Історія витрат</button>
            </Link>
          </div>
        </div>
      </header>

      <div className='analyse'>
        <h2>Аналіз витрат за весь період</h2>
        <div className='analyse-diagram'>
          <Pie options={chartOptions} data={chartData} />
        </div>
      </div>
      <form onSubmit={addData} className='analyse-form'>
        <h2>Проаналізувати витрати за місяць:</h2>
        <div className='analyse-select'>
          <select onChange={saveMonth}>
            <option value="default">Обрати місяць</option>
            <option value="january">Січень</option>
            <option value="february">Лютий</option>
            <option value="march">Березень</option>
            <option value="april">Квітень</option>
            <option value="may">Тривень</option>
            <option value="june">Червень</option>
            <option value="july">Липень</option>
            <option value="august">Серпень</option>
            <option value="september">Вересень</option>
            <option value="october">Жовтень</option>
            <option value="november">Листопад</option>
            <option value="december">Грудень</option>
          </select>
          <select onChange={saveYear}>
            <option value="default">Обрати рік</option>
            {yearsData && yearsData.map((year, index) => (
              <option key={index} value={year}
              >{year}
              </option>
            ))}
          </select>
          <button type='submit'>Вивести дані</button>
          {error && <p className='error'>{error}</p>}
        </div>
      </form>
    </>
  )
}

export default Analysis
