import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = ({ usersArray = [] }) => {
  const labels = getLastYearMonths();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Users',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: usersArray,
        borderColor: 'rgba(107,70,193,0.5)',
      },
    ],
  };

  return <Line options={options} data={data}></Line>;
};

function getLastYearMonths() {
  const labels = [];

  const months = [
    'january',
    'febuary',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  const currentMonth = new Date().getMonth();

  for (let i = currentMonth; i < months.length; i--) {
    const element = months[i];
    labels.unshift(element);
    if (i === 0) {
      break;
    }
  }
  for (let i = 11; i > currentMonth; i--) {
    if (i === currentMonth) break;
    const element = months[i];
    labels.unshift(element);
  }
  return labels;
}

getLastYearMonths();
