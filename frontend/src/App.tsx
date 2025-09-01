import { useEffect } from 'react'

import './App.css'

import {  Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/user/Dashboard';
import CreateNote from './components/CreateNote';
import Notes from './components/Notes';
import DisplayNote from './components/DisplayNote';
import PublicRoute from './routes/PublicRoute';
import RedirectIfLogged from './routes/RedirectIfLogged';
import { setUser } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchUser = ()=>{
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/get-user`,{withCredentials:true})
      .then((response)=>{
        dispatch(setUser(response.data.data.user));
      })
      .catch((error)=>{
        console.log(error)
        navigate("/auth/signin");
      })
    }
    fetchUser();
  },[]);

  return (
    <>
      <Toaster/>
    <Routes>
      <Route path='/' element={<RedirectIfLogged/>}/>
      <Route path='auth/signin' element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path='auth/signup' element={<PublicRoute><Register/></PublicRoute>}/>

      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
      <Route path='create-note' element={<CreateNote/>}/>
      <Route index element={<Notes/>}/>
      <Route path='note' element={<DisplayNote/>}/>
      </Route>


      {/* <Route path="*" element={<Navigate to="/auth/signin" replace />} /> */}
    </Routes>
      </>
  )
}

export default App
