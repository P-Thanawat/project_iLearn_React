import React from 'react';
import { Bar } from 'react-chartjs-2';


function StatisticChart({ percentComplete }) {

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const thisMonth = new Date().getMonth()

  console.log(`thisMonth`, monthNames[thisMonth])

  const data = {
    labels: [`${monthNames[thisMonth - 1]} (${percentComplete?.[0]?.[1]}%)`, `${monthNames[thisMonth]} (${percentComplete?.[1]?.[1]}%)`, `${monthNames[thisMonth + 1]} (${percentComplete?.[2]?.[1]}%)`],
    datasets: [
      {
        label: '#Completed Lessons',
        data: [percentComplete?.[0]?.[0] + 1, percentComplete?.[1]?.[0] + 1, percentComplete?.[2]?.[0]],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],

  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return <>
    <Bar data={data} options={options} />
  </>
}

export default StatisticChart;