import React, { useEffect, useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseTable from './components/ExpenseTable.jsx'
import Charts from './components/Charts.jsx'
import Filters from './components/Filters.jsx'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/expenses')
        const data = await res.json()
        setExpenses(Array.isArray(data) ? data : [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function addExpense(expense) {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    })
    const saved = await res.json()
    setExpenses(prev => [...prev, saved])
  }

  async function deleteExpense(exp) {
    if (!exp.id) return
    await fetch(`/api/expenses/${exp.id}`, { method: 'DELETE' })
    setExpenses(prev => prev.filter(e => e.id !== exp.id))
  }

  function isWithin(dateStr) {
    if (startDate && dateStr < startDate) return false
    if (endDate && dateStr > endDate) return false
    return true
  }

  const filtered = expenses.filter(e =>
    (!category || e.category === category) && isWithin(e.date)
  )

  const total = filtered.reduce((sum, e) => sum + (e.amount || 0), 0)

  return (
    <div>
      <h1>Expense Tracker</h1>
      <Filters
        category={category}
        setCategory={setCategory}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <ExpenseForm onAdd={addExpense} />
      {loading ? null : (
        <div style={{ marginBottom: 16 }}>
          <strong>{filtered.length}</strong> items ·{' '}
          <strong>{total.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</strong>
        </div>
      )}
      {loading ? null : <ExpenseTable expenses={filtered} onDelete={deleteExpense} />}
      {loading ? null : <Charts expenses={filtered} />}
    </div>
  )
}
