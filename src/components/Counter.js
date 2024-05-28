// src/components/Counter.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Load the count from cookies when the component mounts
        const savedCount = Cookies.get('counter');
        if (savedCount) {
            setCount(parseInt(savedCount, 10));
        }
    }, []);

    useEffect(() => {
        // Save the count to cookies whenever it changes
        Cookies.set('counter', count, { expires: 7 });
    }, [count]);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">MeliCounter: {count}</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={increment}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        +1
                    </button>
                    <button
                        onClick={decrement}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        -1
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Counter;