import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Board from './pages/Board';  
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
              path="/board" 
              element={Auth.loggedIn() ? <Board /> : <Navigate to="/login" />} 
            />

            <Route 
              path="/create-ticket" 
              element={Auth.loggedIn() ? <CreateTicket /> : <Navigate to="/login" />} 
            />

            <Route path="/" element={<Navigate to="/board" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
