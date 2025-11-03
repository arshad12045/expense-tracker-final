import React from 'react'

export default function Filters({ category, setCategory, startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div style={{ marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Other</option>
      </select>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <span>to</span>
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
    </div>
  )
}
