import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
      const response = await axios.post('/api/user/signup', signupData);
      
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다!');
      // 회원가입 성공 후 홈으로 이동
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response) {
        // 서버에서 응답이 온 경우
        alert(`회원가입 실패: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        alert('서버에 연결할 수 없습니다. 다시 시도해주세요.');
      } else {
        // 요청 설정 중 오류가 발생한 경우
        alert(`오류가 발생했습니다: ${error.message}`);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
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
        border: '1px solid #e0e0e0'
      }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          textAlign: 'center',
          color: '#333',
          fontSize: '2rem'
        }}>
          회원가입
        </h1>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ 
              fontWeight: '500', 
              color: '#333',
              fontSize: '0.95em'
            }}>
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: '0.75em',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1em',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#646cff';
                e.target.style.boxShadow = '0 0 0 3px rgba(100, 108, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
                        
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password" style={{ 
              fontWeight: '500', 
              color: '#333',
              fontSize: '0.95em'
            }}>
              패스워드
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                padding: '0.75em',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1em',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#646cff';
                e.target.style.boxShadow = '0 0 0 3px rgba(100, 108, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="confirmPassword" style={{ 
              fontWeight: '500', 
              color: '#333',
              fontSize: '0.95em'
            }}>
              패스워드 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                padding: '0.75em',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1em',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#646cff';
                e.target.style.boxShadow = '0 0 0 3px rgba(100, 108, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="username" style={{ 
              fontWeight: '500', 
              color: '#333',
              fontSize: '0.95em'
            }}>
              사용자 이름
            </label>
            <input
              type="text"
              id="nick_name"
              name="nick_name"
              value={formData.nick_name}
              onChange={handleChange}
              required
              style={{
                padding: '0.75em',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1em',
                fontFamily: 'inherit',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#646cff';
                e.target.style.boxShadow = '0 0 0 3px rgba(100, 108, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              style={{ 
                flex: 1,
                padding: '0.75em',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: '500',
                transition: 'background-color 0.3s, border-color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.borderColor = '#ccc';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f9f9f9';
                e.target.style.borderColor = '#ddd';
              }}
            >
              취소
            </button>
            <button 
              type="submit" 
              style={{ 
                flex: 1,
                padding: '0.75em',
                borderRadius: '8px',
                border: '1px solid #646cff',
                backgroundColor: '#646cff',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: '500',
                transition: 'background-color 0.3s, border-color 0.3s'
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
        </form>
      </div>
    </div>
  );
}

export default Signup

