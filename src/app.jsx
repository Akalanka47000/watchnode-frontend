import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import './styles/app.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename={window.location.pathname || ''}>
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App
