import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EcoTracking = () => {
    const [trackingData, setTrackingData] = useState([]);
    const [formData, setFormData] = useState({
        energy_usage: '',
        carbon_footprint: '',
        recycling_habits: ''
    });

    const fetchTrackingData = async () => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('${process.env.REACT_APP_SERVER_URL}/api/eco-tracking/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTrackingData(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        await axios.post('${process.env.REACT_APP_SERVER_URL}/api/eco-tracking/', formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchTrackingData();  // Refresh the data
    };

    useEffect(() => {
        fetchTrackingData();
    }, []);

    return (
        <div>
            <h1>Eco Tracking System</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Energy Usage (kWh):
                    <input
                        type="number"
                        name="energy_usage"
                        value={formData.energy_usage}
                        onChange={(e) => setFormData({ ...formData, energy_usage: e.target.value })}
                    />
                </label>
                <label>
                    Carbon Footprint (kg CO2):
                    <input
                        type="number"
                        name="carbon_footprint"
                        value={formData.carbon_footprint}
                        onChange={(e) => setFormData({ ...formData, carbon_footprint: e.target.value })}
                    />
                </label>
                <label>
                    Recycling Habits:
                    <textarea
                        name="recycling_habits"
                        value={formData.recycling_habits}
                        onChange={(e) => setFormData({ ...formData, recycling_habits: e.target.value })}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            <div>
                <h2>Previous Tracking Data</h2>
                {trackingData.map((data, index) => (
                    <div key={index}>
                        <p>Date: {data.date}</p>
                        <p>Energy Usage: {data.energy_usage} kWh</p>
                        <p>Carbon Footprint: {data.carbon_footprint} kg CO2</p>
                        <p>Recycling Habits: {data.recycling_habits}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EcoTracking;
