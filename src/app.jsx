import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import './styles/app.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename="/watchnode-frontend">
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App
