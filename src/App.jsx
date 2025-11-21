import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import axios from 'axios';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 세션 확인
  const checkSession = async () => {
    try {
      const response = await axios.get('/api/user/session', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data?.status === 'success' && response.data.data) {
        const userData = response.data.data;
        setUser({
          id: userData.id,
          email: userData.email,
          nick_name: userData.nick_name,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log('세션 확인 실패:', error?.response?.status || error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      setUser(null);
    }
  };

  // Home 컴포넌트
  function Home() {
    const navigate = useNavigate();

    if (user) {
      return (
        <div className="app-container">
          <div className="card">
            <h1>{user?.nick_name || user?.email || '사용자'}님 환영합니다!</h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              <button onClick={() => navigate('/signup')} className="button">회원가입</button>
              <button onClick={handleLogout} className="button">로그아웃</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="app-container">
        <div className="card">
          <h1>환영합니다!</h1>
          <p style={{ fontSize: '1.2em', margin: 0, color: '#666', textAlign: 'center' }}>
            로그인하거나 회원가입하여 시작하세요
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <button onClick={() => navigate('/login')} className="button">로그인</button>
            <button onClick={() => navigate('/signup')} className="button">회원가입</button>
          </div>
        </div>
      </div>
    );
  }

  // Navigation 컴포넌트
  function Navigation() {
    const navigate = useNavigate();

    return (
      <nav className="navbar">
        <div className="nav-links">
          <button onClick={() => navigate('/')} className="nav-link">Home</button>
          <button onClick={() => navigate('/product')} className="nav-link">Product</button>
          <button onClick={() => navigate('/service')} className="nav-link">Service</button>
          <button onClick={() => navigate('/about')} className="nav-link">About</button>
        </div>
        <div className="nav-right">
          {user && <span>{user?.nick_name || user?.email || '사용자'}</span>}
          {user ? (
            <button onClick={handleLogout} className="logout">Logout</button>
          ) : (
            <button onClick={() => navigate('/login')} className="login">Login</button>
          )}
        </div>
      </nav>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <p>로딩 중...</p>
      </div>
    );
  }

  const hideNavigation = ['/signup', '/login'].includes(location.pathname);

  return (
    <>
      {!hideNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}

console.log("test git change")

export default App;