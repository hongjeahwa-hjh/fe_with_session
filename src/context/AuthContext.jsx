import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 함수 선언을 먼저
  async function checkSession() {
    try {
      const response = await axios.get("/api/user/session", {
        withCredentials: true,
      });
      if (response?.data?.status === "success") {
        setUser(response.data.data || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
      setUser(null);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  const login = (userInfo) => setUser(userInfo);

  const logout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;