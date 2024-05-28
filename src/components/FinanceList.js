import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoList = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 100,
                        page: 1,
                        sparkline: false
                    }
                });
                setCryptos(response.data);
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
            <h2 className="text-2xl font-bold mb-4">Cryptocurrency List</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {cryptos.map((crypto) => (
                    <tr key={crypto.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{crypto.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{crypto.symbol.toUpperCase()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${crypto.current_price.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${crypto.market_cap.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoList;
