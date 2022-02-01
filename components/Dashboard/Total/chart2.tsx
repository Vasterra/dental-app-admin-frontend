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
import axios from 'axios';
import { API } from '../../../api/AWS-gateway';
import { mockStates } from '../../../mock/yearStat';

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

export const data = {
  labels,
  datasets: [
    {
      label: 'Free Accounts',
      data: mockStates.graphicOfFreeAccounts.map(i => i.count),
      backgroundColor: 'rgba(146, 205, 182, 0.8)',
    },
    {
      label: 'Subscriptions',
      data: mockStates.graphicOfSubscriptions.map(i => i.count),
      backgroundColor: 'rgba(33, 110, 98, 0.8)',
    },
  ],
};

export const Chart = () => {
  return <Bar options={options} data={data} />;
};
