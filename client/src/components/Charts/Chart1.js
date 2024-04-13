import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
const Chart1 = ({ data, title,url }) => {
   const navigate=useNavigate()
    const handleToggle = () => {
       navigate(url)
    };
    return (
        <div className='border'>
            <div className='bg-primary p-1'>
                <h3>{title || "Pie Chart"}</h3>
                {
                    url  &&   <button onClick={handleToggle}>
                    { "Show More Info"}
                </button>
                }
              
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="labels" interval={0} textAnchor="middle" angle={-45} height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="values" fill="rgba(75, 192, 192, 0.5)" />
                </BarChart>
            </ResponsiveContainer>
          
        </div>
    );
};

export default Chart1;
