import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Settings from './pages/settings'
import './styles/app.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="settings/" element={<Settings />} />
          <Route path="settings/:schedule_id" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
