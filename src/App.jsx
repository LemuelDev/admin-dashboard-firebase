
import {BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './Routes'

function App() {

  return (
    <>
      <Router>
          <div className="app">
              <AppRoutes/>
          </div>
      </Router>
    </>
  )
}

export default App
