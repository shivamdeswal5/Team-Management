
import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Signup from './pages/signup'
import Admin from './dashboard/admin';
import User from './dashboard/user';
import Login from './pages/login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
