import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../context/useAuth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth로 전역 상태 접근
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/user/login', {
        email: formData.email,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (response.data?.status === 'success' && response.data.data) {
        const userData = response.data.data;
        login({
          id: userData.id,
          email: userData.email,
          nick_name: userData.nick_name
        });
        navigate('/');
      } else {
        alert('로그인 응답 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message 
                        || error.response?.data?.error 
                        || error.message 
                        || '알 수 없는 오류';
      alert(`로그인 실패: ${errorMessage}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>로그인</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">패스워드</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button 
              type="button" 
              className="button button-cancel"
              onClick={() => navigate('/')}
            >
              취소
            </button>
            <button 
              type="submit" 
              className="button button-submit"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;