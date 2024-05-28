import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

// Register the components with ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Finance = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBit = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
          params: {
            vs_currency: 'eur',
            days: '10'
          }
        });
        const pricesBit = responseBit.data.prices;
        setChartData({
          labels: pricesBit.map(price => new Date(price[0]).toLocaleDateString()),
          datasets: [
            {
              label: 'Bitcoin Price',
              data: pricesBit.map(price => price[1]),
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false
            },
          ]
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the data', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <Line data={chartData} />
      </div>
  );
};

export default Finance;
