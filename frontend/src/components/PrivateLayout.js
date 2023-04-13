
import { Outlet, Navigate } from 'react-router-dom';

const PrivateLayout = () => {
  const isLoggedIn = localStorage.getItem('authToken');

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateLayout;
