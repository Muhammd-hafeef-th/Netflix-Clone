import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { ToastContainer, toast } from 'react-toastify';
import Mylist from './pages/MyList/Mylist'
import Movies from './pages/MoviesDetails/Movies'
import { useAuth } from './context/AuthContext'

const App = () => {
  const navigate=useNavigate()
  const {user}=useAuth()
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])
  return (
    <div>
      
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/movie/:id' element={<Movies />} />
        <Route path='/myLIst' element={<Mylist />}/>
      </Routes>
     
    </div>
  )
}

export default App
