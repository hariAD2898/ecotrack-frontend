import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import the CSS

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        const url = isLogin
            ? '${process.env.REACT_APP_SERVER_URL}/api/accounts/login/' // Adjust your API URL
            : '${process.env.REACT_APP_SERVER_URL}/api/accounts/register/'; // Adjust your API URL

        try {
            const response = await axios.post(url, formData);
            console.log('Response:', response.data);

            if (response.data.access) {
                localStorage.setItem('accessToken', response.data.access); // Save token
                navigate('/dashboard'); // Redirect to dashboard
            }
        } catch (error) {
            setError(error.response?.data?.detail || 'Something went wrong'); // Show error message
            console.error('Error:', error.response?.data);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                {!isLogin && (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Error message */}
            <button className="switch-button" onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        </div>
    );
};

export default Auth;
