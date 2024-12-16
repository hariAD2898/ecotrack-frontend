import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EcoChart from './EcoChart';  // Assuming this chart handles general eco data
import DailyProgressChart from './DailyProgressChart';  // New chart for daily progress
import EcoTrackingForm from './EcoTrackingForm';

const Dashboard = () => {
    const [ecoData, setEcoData] = useState([]);
    const [dailyProgress, setDailyProgress] = useState([]); // State for daily progress data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const recordActivity = (activity) => {
        console.log('Recording activity:', activity);
    };

    const fetchAllData = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            navigate('/auth');
            return;
        }

        try {
            // Fetching general eco data
            const ecoResponse = await axios.get('${process.env.REACT_APP_SERVER_URL}/api/eco-tracking/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEcoData(ecoResponse.data);

            // Fetching daily progress data
            const dailyProgressResponse = await axios.get('${process.env.REACT_APP_SERVER_URL}/api/eco-tracking/daily-progress/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDailyProgress(dailyProgressResponse.data);

            setLoading(false);  // Set loading to false after both requests succeed
        } catch (error) {
            console.error('Error fetching data:', error);
            handleError(error);
            setLoading(false);  // Stop loading if an error occurs
        }
    };

    const handleError = (error) => {
        recordActivity({
            error: error.response ? error.response.data : 'Unknown error',
            status: error.response ? error.response.status : 'No status',
            message: error.message,
            timestamp: new Date().toISOString(),
        });

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    setError('Session expired. Please log in again.');
                    navigate('/auth');
                    break;
                case 403:
                    setError('Access denied. You do not have permission to view this data.');
                    navigate('/auth');
                    break;
                default:
                    setError('Failed to fetch eco data. Please try again.');
            }
        } else {
            setError('Network error. Please check your connection.');
        }
    };

    useEffect(() => {
        fetchAllData();  // Fetch all data on component mount
    }, [navigate]);

    const handleSubmitSuccess = (newData) => {
        setEcoData((prevData) => [...prevData, newData]);
        fetchAllData(); // Re-fetch all data after new submission
    };

    if (loading) {
        return <div>Loading...</div>;  // Show loading state
    }

    return (
        <div className="dashboard-container">
            <h2>Eco Tracking Dashboard</h2>
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={fetchAllData}>Retry</button>
                </div>
            )}
            {/* Render the general eco chart */}
            <EcoChart ecoData={ecoData} />

            {/* Conditionally render the daily progress chart if data is available */}
            {dailyProgress.length > 0 ? (
                <DailyProgressChart data={dailyProgress} />
            ) : (
                <div>No daily progress data available.</div>
            )}

            {/* Render the form to submit new eco tracking data */}
            <EcoTrackingForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
    );
};

export default Dashboard;
