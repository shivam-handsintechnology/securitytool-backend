import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart2 = () => {
    const data = [
        { name: 'January', dataset1: 10, dataset2: 20, filledLine: 15 },
        { name: 'February', dataset1: 25, dataset2: 15, filledLine: 10 },
        { name: 'March', dataset1: 13, dataset2: 28, filledLine: 20 },
        { name: 'April', dataset1: 18, dataset2: 22, filledLine: 25 },
        { name: 'May', dataset1: 30, dataset2: 10, filledLine: 12 },
    ];

    return (
        <div className='border'>
            <div className='bg-primary p-1'> <h3>Line Chart </h3></div>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="dataset1" stroke="blue" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="dataset2" stroke="red" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="filledLine" stroke="green" strokeWidth={2} dot={false} fill="rgba(0, 255, 0, 0.5)" />
            </LineChart>
        </div>
    );
};

export default Chart2;
