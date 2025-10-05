
import './App.css'
import Home from './pages/Home'
import {BrowserRouter , Route , Routes} from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Verify from './pages/Verify'
import { TransactionsProvider } from './context/TransactionContext'
import ProtectedRoute from './protectedRoute/ProtectedRoute'


function App() {

  return (
    <>
    <TransactionsProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path = '/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path = '/verify' element={<ProtectedRoute><Verify /></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
    </TransactionsProvider>
    </>
  )
}

export default App
