import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyProgressChart = ({ data }) => {
    return (
        <div className="daily-progress-chart">
            <h3>Daily Eco Tracking Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_carbon_footprint" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="total_energy_consumption" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="total_water_usage" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DailyProgressChart;
