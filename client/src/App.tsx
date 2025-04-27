import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Tickets from './pages/Tickets';
import CreateTicket from './pages/CreateTicket';
import Auth from './utils/auth';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <main>
          <Routes>
                        <Route path="/login" element={<Login />} />
            <Route 
              path="/tickets" 
              element={Auth.loggedIn() ? <Tickets /> : <Navigate to="/login" />} 
            />

                        <Route 
              path="/create-ticket" 
              element={Auth.loggedIn() ? <CreateTicket /> : <Navigate to="/login" />} 
            />

            <Route path="/" element={<Navigate to="/tickets" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
