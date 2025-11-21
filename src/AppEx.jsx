import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuth();  // 로그인된 사용자 정보
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavigation = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <AuthProvider>
      {!hideNavigation && (
        <nav>
          <button onClick={() => navigate("/")}>Home</button>
          {user ? (
            <button onClick={() => navigate("/login")}>로그아웃</button>
          ) : (
            <button onClick={() => navigate("/login")}>로그인</button>
          )}
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
