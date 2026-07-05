import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import Footer from './components/Footer'  
function App() {

  return (
    <Router>

      <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />  
    </Routes>
      <Footer />
    </Router>
  )
}

export default App
