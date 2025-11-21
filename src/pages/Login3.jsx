import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.js";

function Login3() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { login } = useAuth();  // Context에서 login 함수 가져오기
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      const response = await axios.post(
        "/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        const userData = response.data.data;
        login(userData);  // 로그인 후 사용자 정보 저장
        navigate("/");  // 홈으로 이동
      } else {
        setErrMsg("로그인 실패: 서버 응답 오류");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrMsg(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
}

export default Login3;
