import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import D1 from '../components/D1';
import D2 from '../components/D2';
import D3 from '../components/D3';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view the dashboard');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
        localStorage.removeItem('token');
      }
    };

    fetchUser();
  }, []);

  let DashboardComponent = D3; // Default to D3
  if (user?.email === 'alex@example.com') {
    DashboardComponent = D1;
  } else if (user?.email === 'tony@example.com') {
    DashboardComponent = D2;
  }

  return (
    <div className="dashboard">
      <Navbar2 />
      <div className="dashboard-content">
        {error ? (
          <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
        ) : user ? (
          <DashboardComponent userName={user.name} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;