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
import {
  Toaster
} from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import ListBookings from './pages/admin/ListBookings'

import ListShows from './pages/admin/ListSHows'
import AddShows from './pages/admin/AddShows'
const App = () => {
  const isAdminRoute=useLocation().pathname.startsWith('/admin')
  return (
    <>
 
  <Toaster
    position='top-center'
    gutter={12}
    toastOptions={{
      duration: 3000,
      style: {
        background: '#111827',
        color: '#fff',
        border:
          '1px solid #dc2626',
        zIndex: 999999,
      },
    }}
  />
   
      {!isAdminRoute && <Navbar />}


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/seat/:id/:date' element={<SeatLayout/>} />
         <Route path='/my-bookings' element={<MyBookings/>} />
          <Route path='/favourite' element={<Favourite/>} />
          <Route path='/admin/*' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-show' element={<AddShows/>}/>
            <Route path='list-shows' element={<ListShows/>}/>
            <Route path='list-bookings' element={<ListBookings/>}/>

          </Route>
      </Routes>

     {!isAdminRoute && <Footer />}
    </>
  )
}

export default App