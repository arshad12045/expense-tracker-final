import React from 'react'

export default function ExpenseTable({ expenses, onDelete }) {
  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, idx) => (
            <tr key={e.id || idx}>
              <td>{e.date}</td>
              <td>{e.category}</td>
              <td>{e.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>
              <td>{e.description || ''}</td>
              <td>
                <button onClick={() => onDelete && onDelete(e)} style={{ backgroundColor: '#e74c3c' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
