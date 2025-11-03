const form = document.getElementById('expense-form');
const expenseTableBody = document.querySelector('#expense-table tbody');

let expenses = [];

form.addEventListener('submit', e => {
  e.preventDefault();

  const date = form.date.value;
  const category = form.category.value;
  const amount = parseFloat(form.amount.value);
  const description = form.description.value;

  if (!date || !category || !amount || amount <= 0) {
    alert('Please fill out valid details.');
    return;
  }

  const expense = { date, category, amount, description };
  expenses.push(expense);

  form.reset();
  form.category.selectedIndex = 0;

  renderExpenses();
  renderCharts();
});

function renderExpenses() {
  expenseTableBody.innerHTML = '';
  expenses.forEach(({ date, category, amount, description }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${date}</td>
      <td>${category}</td>
      <td>$${amount.toFixed(2)}</td>  <!-- Currency symbol here -->
      <td>${description || ''}</td>
    `;
    expenseTableBody.appendChild(tr);
  });
}

let categoryChart;
let dailyChart;

function renderCharts() {
  const categoryTotals = expenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const dailyTotals = expenses.reduce((acc, { date, amount }) => {
    acc[date] = (acc[date] || 0) + amount;
    return acc;
  }, {});

  const categoryLabels = Object.keys(categoryTotals);
  const categoryData = Object.values(categoryTotals);

  const dailyLabels = Object.keys(dailyTotals).sort();
  const dailyData = dailyLabels.map(date => dailyTotals[date]);

  if (categoryChart) categoryChart.destroy();
  if (dailyChart) dailyChart.destroy();

  const ctxCategory = document.getElementById('categoryChart').getContext('2d');
  categoryChart = new Chart(ctxCategory, {
    type: 'pie',
    data: {
      labels: categoryLabels,
      datasets: [{
        data: categoryData,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0'
        ],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Expenses by Category',
        },
        legend: {
          position: 'bottom',
        }
      }
    }
  });

  const ctxDaily = document.getElementById('dailyChart').getContext('2d');
  dailyChart = new Chart(ctxDaily, {
    type: 'bar',
    data: {
      labels: dailyLabels,
      datasets: [{
        label: 'Total Expenses',
        data: dailyData,
        backgroundColor: '#36A2EB',
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Amount ($)'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Daily Expenses'
        },
        legend: {
          display: false,
        }
      }
    }
  });
}