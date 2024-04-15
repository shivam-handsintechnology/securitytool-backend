import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Generate random data using faker for demonstration
const data = [
    { name: 'January', dataset1: Math.floor(Math.random() * 100), dataset2: Math.floor(Math.random() * 100), dataset3: Math.floor(Math.random() * 100) },
    { name: 'February', dataset1: Math.floor(Math.random() * 100), dataset2: Math.floor(Math.random() * 100), dataset3: Math.floor(Math.random() * 100) },
    { name: 'March', dataset1: Math.floor(Math.random() * 100), dataset2: Math.floor(Math.random() * 100), dataset3: Math.floor(Math.random() * 100) },
    { name: 'April', dataset1: Math.floor(Math.random() * 100), dataset2: Math.floor(Math.random() * 100), dataset3: Math.floor(Math.random() * 100) },
    { name: 'May', dataset1: Math.floor(Math.random() * 100), dataset2: Math.floor(Math.random() * 100), dataset3: Math.floor(Math.random() * 100) },
    { name: 'June', dataset1: Math.floor(Math.random() * 100), dataset2: Math.floor(Math.random() * 100), dataset3: Math.floor(Math.random() * 100) },
    { name: 'July', dataset1: Math.floor(Math.random() * 100), dataset2: Math.floor(Math.random() * 100), dataset3: Math.floor(Math.random() * 100) },
];

const Chart5 = () => {
    return (
        <div className='border'>
            <div className='bg-primary p-1'> <h3>Stacked Bar Chart </h3></div>

            <BarChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="dataset1" stackId="a" fill="rgb(255, 99, 132)" />
                <Bar dataKey="dataset2" stackId="a" fill="rgb(75, 192, 192)" />
                <Bar dataKey="dataset3" stackId="a" fill="rgb(53, 162, 235)" />
            </BarChart>
        </div>
    );
};

export default Chart5;