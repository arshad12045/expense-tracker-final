import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function Charts({ expenses }) {
  const catRef = useRef(null)
  const dailyRef = useRef(null)
  const catChartRef = useRef(null)
  const dailyChartRef = useRef(null)

  useEffect(() => {
    const categoryTotals = expenses.reduce((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount
      return acc
    }, {})

    const dailyTotals = expenses.reduce((acc, { date, amount }) => {
      acc[date] = (acc[date] || 0) + amount
      return acc
    }, {})

    const categoryLabels = Object.keys(categoryTotals)
    const categoryData = Object.values(categoryTotals)

    const dailyLabels = Object.keys(dailyTotals).sort()
    const dailyData = dailyLabels.map(d => dailyTotals[d])

    if (catChartRef.current) catChartRef.current.destroy()
    if (dailyChartRef.current) dailyChartRef.current.destroy()

    if (catRef.current) {
      catChartRef.current = new Chart(catRef.current, {
        type: 'pie',
        data: {
          labels: categoryLabels,
          datasets: [
            {
              data: categoryData,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Expenses by Category' },
            legend: { position: 'bottom' }
          }
        }
      })
    }

    if (dailyRef.current) {
      dailyChartRef.current = new Chart(dailyRef.current, {
        type: 'bar',
        data: {
          labels: dailyLabels,
          datasets: [
            {
              label: 'Total Expenses',
              data: dailyData,
              backgroundColor: '#36A2EB'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: { display: true, text: 'Date' }
            },
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Amount ($)' }
            }
          },
          plugins: {
            title: { display: true, text: 'Daily Expenses' },
            legend: { display: false }
          }
        }
      })
    }

    return () => {
      if (catChartRef.current) catChartRef.current.destroy()
      if (dailyChartRef.current) dailyChartRef.current.destroy()
    }
  }, [expenses])

  return (
    <div>
      <h2>Analytics</h2>
      <div className="chart-container">
        <canvas ref={catRef} />
      </div>
      <div className="chart-container">
        <canvas ref={dailyRef} />
      </div>
    </div>
  )
}
