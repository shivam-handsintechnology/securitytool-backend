import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Chart3 = ({ data }) => {
    // Check if all values are zero
    const allZero = data.every(entry => entry.value === 0);

    if (allZero) {
        return (
            <div className='border'>
                <div className='bg-primary p-1'> <h3> Doughnut Chart</h3></div>
                <p>No data available for graph</p>
            </div>
        );
    }

    return (
        <div className='border'>
            <div className='bg-primary p-1'> <h3> Doughnut Chart</h3></div>

            <PieChart width={500} height={300}>
                <Pie
                    data={data}
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
                    minAngle={1} // Adjust minAngle to ensure small slices are visible
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