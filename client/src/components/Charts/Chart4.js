import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const Chart4 = ({data,title}) => {
 

    return (
        <div className='border'>
        <div className='bg-primary p-1'><h3>{title ||"Pie Chart"}</h3></div>
        <PieChart width={500} height={300}>
            <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
            >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))
                }
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </div>
    );
};

export default Chart4;