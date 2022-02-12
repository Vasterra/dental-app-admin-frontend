import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const Chart = (props) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Free Accounts',
        data: props.graphicOfFreeAccounts.map(i => i.count),
        backgroundColor: 'rgba(146, 205, 182, 0.8)',
      },
      {
        label: 'Subscriptions',
        data: props.graphicOfSubscriptions.map(i => i.count),
        backgroundColor: 'rgba(33, 110, 98, 0.8)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
