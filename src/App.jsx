import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
      // 페이지 새로고침 시 세션 정보 확인
      const response = await axios.get('/api/user/session', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // 쿠키를 포함하여 요청
      });
      
      console.log('세션 확인 성공:', response.data);
      
      // 세션 정보가 있으면 사용자 정보 저장
      // 응답 형식: { status: "success", message: "로그인 성공", data: { id, email, nick_name } }
      if (response.data && response.data.status === 'success' && response.data.data) {
        const userData = response.data.data;
        // 로컬스토리지 사용하지 않고 메모리에만 저장
        setUser({
          id: userData.id,
          email: userData.email,
          nick_name: userData.nick_name // 로그인명으로 사용
        });
      } else {
        // 세션 정보가 없거나 형식이 맞지 않으면 null로 설정
        setUser(null);
      }
    } catch (error) {
      // 세션 없음, 만료됨, 또는 서버 오류
      if (error.response) {
        // 서버에서 응답이 온 경우 (401, 403 등)
        console.log('세션 없음 또는 만료됨:', error.response.status);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.log('세션 확인 요청 실패:', error.request);
      } else {
        // 요청 설정 중 오류가 발생한 경우
        console.log('세션 확인 오류:', error.message);
      }
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
              {user.nick_name || user.email || '사용자'}님 환영합니다!
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

  function Navigation() {
    const navigate = useNavigate();

    const navLinkStyle = {
      color: '#333',
      fontSize: '1.1em',
      fontWeight: '500',
      cursor: 'pointer',
      textDecoration: 'none',
      padding: '1em 0',
      transition: 'color 0.3s',
      backgroundColor: 'transparent',
      border: 'none'
    };

    const rightLinkStyle = {
      color: '#333',
      fontSize: '1.1em',
      cursor: 'pointer',
      textDecoration: 'none',
      padding: '1em 0',
      transition: 'color 0.3s',
      backgroundColor: 'transparent',
      border: 'none'
    };

    return (
      <nav style={{
        backgroundColor: '#ffffff',
        padding: '1.5rem 4rem',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
          marginRight: '3rem'
        }}>
          <button 
            onClick={() => navigate('/')}
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#646cff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#333';
            }}
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/product')}
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#646cff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#333';
            }}
          >
            Product
          </button>
          <button 
            onClick={() => navigate('/service')}
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#646cff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#333';
            }}
          >
            Service
          </button>
          <button 
            onClick={() => navigate('/about')}
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = '#646cff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#333';
            }}
          >
            About
          </button>
        </div>
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {user && (
            <>
              <span style={{
                color: '#333',
                fontSize: '1.1em',
                fontWeight: '500'
              }}>
                {user.nick_name || user.email || '사용자'}
              </span>
              <span style={{
                color: '#ccc',
                fontSize: '1.1em',
                margin: '0 0.5rem'
              }}>
                |
              </span>
            </>
          )}
          {user ? (
            <button 
              onClick={handleLogout}
              style={{
                ...rightLinkStyle,
                color: '#e74c3c'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#c0392b';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#e74c3c';
              }}
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              style={{
                ...rightLinkStyle,
                color: '#3498db'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#2980b9';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#3498db';
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
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

  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';
  const hideNavigation = isSignupPage || isLoginPage;

  return (
    <>
      {!hideNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login user={user} setUser={setUser} />}></Route>
      </Routes>
    </>
  )
}

export default App
