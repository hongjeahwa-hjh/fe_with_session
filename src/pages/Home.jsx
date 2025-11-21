import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";  // useAuth를 사용

function Home() {
  const { user, logout } = useAuth(); // 로그인된 사용자 정보
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="app-container">
        <div className="card">
          <h1>{user?.nick_name || user?.email || '사용자'}님 환영합니다!</h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <button onClick={() => navigate('/signup')} className="button">회원가입</button>
            <button onClick={logout} className="button">로그아웃</button>
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

export default Home;
