import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from "./components/Dashboard";
import Analysis from './components/Analysis';
import History from './components/History';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="history" element={<History />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="add-income" element={<AddIncome />} />
        </Route>
      </Routes>
  );
}

export default App;
