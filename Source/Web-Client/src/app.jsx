import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import './styles/app.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>404</div>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
