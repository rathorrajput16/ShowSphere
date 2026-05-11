import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from "react-router-dom"
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'

const App = () => {
  const isAdminRoute=useLocation().pathname.startsWith('/admin')
  return (
    <>
      {!isAdminRoute && <Navbar />}


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/seat/:id/:date' element={<SeatLayout/>} />
         <Route path='/my-bookings' element={<MyBookings/>} />
          <Route path='/favourite' element={<Favourite/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App