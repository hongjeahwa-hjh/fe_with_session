import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

function Home() {
  const { user, logout } = useAuth();  // 로그인된 사용자 정보 가져오기
  const navigate = useNavigate();

  if (!user) {
    return (
      <div>
        <h1>환영합니다!</h1>
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/signup")}>회원가입</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.nick_name || user.email}님 환영합니다!</h1>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default Home;
