import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider 컴포넌트
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 세션 체크
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get("/api/user/session", {
        withCredentials: true,
      });

      if (response.data.status === "success" && response.data.data) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const login = (userInfo) => setUser(userInfo);

  const logout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
