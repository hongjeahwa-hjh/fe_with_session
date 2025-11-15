import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null); // 전역 사용자 정보 상태
  const [loading, setLoading] = useState(true); // 세션 확인 중인지 여부

  // 컴포넌트 마운트 시 세션 정보 확인
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get('/api/user/session', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // 쿠키를 포함하여 요청
      });
      
      console.log('세션 확인 성공:', response.data);
      
      // 세션 정보가 있으면 사용자 정보 저장
      if (response.data && response.data.status === 'success' && response.data.data) {
        const userData = response.data.data;
        setUser({
          id: userData.id,
          email: userData.email,
          nick_name: userData.nick_name
        });
      }
    } catch (error) {
      console.log('세션 없음 또는 만료됨');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출 (필요한 경우)
      await axios.post('/api/user/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      setUser(null);
    }
  };

  function Home() {
    const navigate = useNavigate();
    
    // 로그인된 상태일 때
    if (user) {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          width: '100%',
          backgroundColor: '#f5f5f5'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <h1 style={{ 
              margin: 0,
              color: '#333',
              fontSize: '2rem',
              textAlign: 'center'
            }}>
              {user.nick_name}님 환영합니다!
            </h1>
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%'
            }}>
              <button 
                onClick={() => navigate('/signup')} 
                style={{ 
                  padding: '0.75em 2em',
                  borderRadius: '8px',
                  border: '1px solid #646cff',
                  backgroundColor: '#646cff',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: '500',
                  transition: 'background-color 0.3s, border-color 0.3s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#535bf2';
                  e.target.style.borderColor = '#535bf2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#646cff';
                  e.target.style.borderColor = '#646cff';
                }}
              >
                회원가입
              </button>
              <button 
                onClick={handleLogout}
                style={{ 
                  padding: '0.75em 2em',
                  borderRadius: '8px',
                  border: '1px solid #646cff',
                  backgroundColor: '#646cff',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: '500',
                  transition: 'background-color 0.3s, border-color 0.3s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#535bf2';
                  e.target.style.borderColor = '#535bf2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#646cff';
                  e.target.style.borderColor = '#646cff';
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 로그인되지 않은 상태일 때
    return(
      <>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          width: '100%',
          backgroundColor: '#f5f5f5'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <h1 style={{ 
              margin: 0,
              color: '#333',
              fontSize: '2rem',
              textAlign: 'center'
            }}>
              환영합니다!
            </h1>
            <p style={{ 
              fontSize: '1.2em', 
              margin: 0,
              color: '#666',
              textAlign: 'center'
            }}>
              로그인하거나 회원가입하여 시작하세요
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%'
            }}>
              <button 
                onClick={() => navigate('/login')} 
                style={{ 
                  padding: '0.75em 2em',
                  borderRadius: '8px',
                  border: '1px solid #646cff',
                  backgroundColor: '#646cff',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: '500',
                  transition: 'background-color 0.3s, border-color 0.3s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#535bf2';
                  e.target.style.borderColor = '#535bf2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#646cff';
                  e.target.style.borderColor = '#646cff';
                }}
              >
                로그인
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                style={{ 
                  padding: '0.75em 2em',
                  borderRadius: '8px',
                  border: '1px solid #646cff',
                  backgroundColor: '#646cff',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: '500',
                  transition: 'background-color 0.3s, border-color 0.3s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#535bf2';
                  e.target.style.borderColor = '#535bf2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#646cff';
                  e.target.style.borderColor = '#646cff';
                }}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // 로딩 중일 때
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login user={user} setUser={setUser} />}></Route>
    </Routes>
  )
}

export default App
