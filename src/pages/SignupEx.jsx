import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // CSS 파일 import

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nick_name: ''
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
    // 패스워드 확인 검증
    if (formData.password !== formData.confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    try {
      // API 호출 데이터 준비
      const signupData = {
        email: formData.email,
        password: formData.password,
        nick_name: formData.nick_name
      };

      // axios를 사용하여 회원가입 API 호출
      const response = await axios.post('/api/user/signup', signupData, { 
        headers: {
          'Content-Type': 'application/json'
        } 
      });

      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다!');
      // 회원가입 성공 후 홈으로 이동
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response) {
        alert(`회원가입 실패: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        alert('서버에 연결할 수 없습니다. 다시 시도해주세요.');
      } else {
        alert(`오류가 발생했습니다: ${error.message}`);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div>
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
          
          <div>
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

          <div>
            <label htmlFor="confirmPassword">패스워드 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="nick_name">사용자 이름</label>
            <input
              type="text"
              id="nick_name"
              name="nick_name"
              value={formData.nick_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-container">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => navigate('/')}
            >
              취소
            </button>
            <button 
              type="submit" 
              className="submit-button"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupEx;
