import React, { useState } from 'react';
import axios from 'axios';

const EcoTrackingForm = ({ onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        carbon_footprint: '',
        energy_consumption: '',
        water_usage: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post('${process.env.REACT_APP_SERVER_URL}/api/eco-tracking/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            onSubmitSuccess(response.data); // Callback to update the chart data
            setFormData({
                carbon_footprint: '',
                energy_consumption: '',
                water_usage: '',
            });
        } catch (error) {
            console.error('Error submitting eco data:', error);
            setError('Failed to submit data. Please try again.');
        }
    };

    return (
        <div className="eco-tracking-form">
            <h3>Enter Your Eco Data</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Carbon Footprint:
                    <input
                        type="number"
                        name="carbon_footprint"
                        value={formData.carbon_footprint}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Energy Consumption:
                    <input
                        type="number"
                        name="energy_consumption"
                        value={formData.energy_consumption}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Water Usage:
                    <input
                        type="number"
                        name="water_usage"
                        value={formData.water_usage}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EcoTrackingForm;
