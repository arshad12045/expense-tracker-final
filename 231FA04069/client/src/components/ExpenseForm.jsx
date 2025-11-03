import React, { useState } from 'react'

export default function ExpenseForm({ onAdd }) {
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  function submit(e) {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!date || !category || !value || value <= 0) return
    onAdd({ date, category, amount: value, description })
    setDate('')
    setCategory('')
    setAmount('')
    setDescription('')
  }

  return (
    <form onSubmit={submit}>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="" disabled>Select Category</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>
      <input type="number" placeholder="Amount" min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
      <input type="text" placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Add Expense</button>
    </form>
  )
}
