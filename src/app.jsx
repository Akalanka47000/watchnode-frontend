import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Router from './routes'
import './styles/app.css'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
