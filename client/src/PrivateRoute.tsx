import { Navigate } from 'react-router-dom';
import Auth from './auth'; 

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return Auth.loggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
