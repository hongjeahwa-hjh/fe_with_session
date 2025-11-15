// react 패키지로부터 StrictMode 가져오기 
import { StrictMode } from 'react'
// react-dom 패키지로부터 creatRoot 가져오기
import { createRoot } from 'react-dom/client'

import { BrowserRouter} from 'react-router-dom'

// index.css 파일 가져오기
import './index.css'
// App.jsx 파일 가져오기
import App from './App.jsx'   // App 컴포넌트를 가져오기


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* App 컴포넌트를 렌더링하기 */}
    </BrowserRouter>
  </StrictMode>,
)
