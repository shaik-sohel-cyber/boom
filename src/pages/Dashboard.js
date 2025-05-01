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
        const response = await axios.get('https://deploy-mern-app-1-api.vercel.app/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        localStorage.setItem('userEmail', response.data.email); // Save for later if needed
      } catch (err) {
        setError('Failed to fetch user data');
        localStorage.removeItem('token');
      }
    };

    fetchUser();
  }, []);

  const email = user?.email || localStorage.getItem('userEmail');

  let DashboardComponent = D3;
  if (email === 'alex@example.com') {
    DashboardComponent = D1;
  } else if (email === 'tony@example.com') {
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
          <div style={{ textAlign: 'center' }}>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
