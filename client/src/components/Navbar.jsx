import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Menu, Search, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">

      {/* Logo */}
      <Link to='/' className='flex-1 md:flex-none'>
        <img src={logo} alt="Logo" className="w-18 h-15 rounded-full object-cover"/>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full 
      bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-lg">

        <Link to='/'>Home</Link>
        <Link to='/movies'>Movies</Link>
        <Link to='/info'>Info</Link>
        <Link to='/contactus'>ContactUs</Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Search className="hidden md:block w-5 h-5 text-white cursor-pointer" />

        <button className="px-4 py-1.5 rounded-full bg-pink-500 text-white">
          Login
        </button>

        {/* Mobile Menu Icon */}
        <Menu 
          className="md:hidden w-7 h-7 text-white cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center gap-8 text-white text-lg z-50">

          {/* Close Button */}
          <X 
            className="absolute top-6 right-6 w-7 h-7 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <Link to='/' onClick={() => setIsOpen(false)}>Home</Link>
          <Link to='/movies' onClick={() => setIsOpen(false)}>Movies</Link>
          <Link to='/info' onClick={() => setIsOpen(false)}>Info</Link>
          <Link to='/contactus' onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar