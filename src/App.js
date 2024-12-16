import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; // Import your dashboard component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard */}
            </Routes>
        </Router>
    );
};

export default App;
