import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import useAuth from './hooks/useAuth';

// 🔥 App 바깥으로 이동
function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button onClick={() => navigate('/')} className="nav-link">Home</button>
        <button onClick={() => navigate('/product')} className="nav-link">Product</button>
        <button onClick={() => navigate('/service')} className="nav-link">Service</button>
        <button onClick={() => navigate('/about')} className="nav-link">About</button>
      </div>

      <div className="nav-right">
        {user && <span>{user.nick_name || user.email}</span>}
        {user ? (
          <button onClick={logout} className="logout">Logout</button>
        ) : (
          <button onClick={() => navigate('/login')} className="login">Login</button>
        )}
      </div>
    </nav>
  );
}

function App() {
  const location = useLocation();

  // 로그인/회원가입 페이지에서는 네비게이션 숨김
  const hideNavigation = ['/signup', '/login'].includes(location.pathname);

  return (
    <>
      {!hideNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;