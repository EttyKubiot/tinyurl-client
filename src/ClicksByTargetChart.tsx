import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);


interface ClicksData {
  labels: string[];
  values: number[];
}

interface ClicksByTargetChartProps {
  linkId: string;
  type?: 'bar' | 'pie';
}

const ClicksByTargetChart: React.FC<ClicksByTargetChartProps> = ({ linkId, type = 'bar' }) => {
  console.log('linkId:', linkId);

  const API_URL = `http://localhost:3000/api/links/${linkId}/clicks-by-target`;
  const [data, setData] = useState<ClicksData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Record<string, number>>(API_URL)
      .then((res) => {
        const raw = res.data;
        const labels = Object.keys(raw);
        const values = Object.values(raw);
  
        console.log('raw:', raw);
        console.log('labels:', labels);
        console.log('values:', values);
  
        setData({ labels, values });
      })
      .catch((err) => {
        console.error('שגיאה בבקשת axios:', err);
        setError('שגיאה בטעינת הנתונים');
      });
  }, []);
  
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  if (!data) {
    return <div>טוען נתונים...</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'כמות קליקים',
        data: data.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'קליקים לפי יעד' },
    },
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      {type === 'pie' ? (
        <Pie data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default ClicksByTargetChart;
