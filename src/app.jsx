import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import './styles/app.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App
