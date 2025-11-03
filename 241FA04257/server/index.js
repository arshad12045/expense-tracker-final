const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
let expenses = [];

app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const { date, category, amount, description } = req.body || {};
  if (!date || !category || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid expense payload' });
  }
  const expense = { id: Date.now().toString(), date, category, amount, description: description || '' };
  expenses.push(expense);
  res.status(201).json(expense);
});

app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params
  const before = expenses.length
  expenses = expenses.filter(e => e.id !== id)
  if (expenses.length === before) return res.status(404).json({ error: 'Not found' })
  res.json({ id })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
