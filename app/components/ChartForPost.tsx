'use client';

import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);
const preSet = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      fill: true,
      label: '진담 추세',
      lineTension: 0.1,
      backgroundColor: '#434C8B',
      barThickness: 2,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const ChartForPost = ({ data, cond }: { data: {}; cond: string }) => {
  const dataSet = {
    ...preSet,
    labels: Object.keys(data),
    datasets: [
      {
        ...preSet.datasets[0],
        label: `${cond} 추세`,
        data: [...Object.values(data)],
      },
    ],
  };
  return (
    <div className="bg-chart-blue sm:p-2">
      <Bar
        id="barChart"
        // @ts-ignore
        data={dataSet}
        width={300}
        height={200}
      />
    </div>
  );
};

export default ChartForPost;
