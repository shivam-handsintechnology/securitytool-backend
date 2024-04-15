import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Chart3 = ({data}) => {
    const coursesData = [
        { name: 'Python', value: 30, color: '#FF6384' },
        { name: 'JavaScript', value: 20, color: '#36A2EB' },
        { name: 'Java', value: 15, color: '#FFCE56' },
        { name: 'C++', value: 10, color: '#4CAF50' },
        { name: 'Data Structures', value: 25, color: '#9C27B0' },
    ];

    return (
        <div className='border'>
            <div className='bg-primary p-1'> <h3> Doughnut Chart</h3></div>

            <PieChart width={500} height={300}>
                <Pie
                    data={data }
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60} // Adjust innerRadius for doughnut effect
                    outerRadius={80}
                    fill="#8884d8"
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={5}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default Chart3;