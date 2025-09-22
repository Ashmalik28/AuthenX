
import './App.css'
import Home from './pages/Home'
import {BrowserRouter , Route , Routes} from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Verify from './pages/Verify'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path = '/dashboard' element={<Dashboard/>} />
      <Route path = '/verify' element={<Verify />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
