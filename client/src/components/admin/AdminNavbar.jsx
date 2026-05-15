import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import profile from '../../assets/profile.png'

const AdminNavbar = () => {

  const user = {
    firstName: 'Ayush',
    lastName: 'Rathore',
    imageUrl: profile,
  }

  return (
    <nav className='h-16 bg-[#0f0f0f] border-b border-white/10 px-4 md:px-8 flex items-center justify-between shadow-md'>

      {/* Left Section - Logo */}
      <Link
        to="/"
        className='flex items-center shrink-0'
      >
        <img
          src={logo}
          alt="logo"
          className='h-10 md:h-11 w-auto object-contain cursor-pointer transition duration-300 hover:scale-105'
        />
      </Link>

      {/* Right Section */}
      <div className='flex items-center gap-4'>

        {/* Admin Badge */}
        <span className='hidden sm:flex bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-1.5 rounded-full font-medium'>
          Admin Panel
        </span>

        {/* Profile */}
        <div className='flex items-center gap-3 bg-white/5 px-3 py-2 rounded-xl border border-white/10'>

          <img
            src={user.imageUrl}
            alt="profile"
            className='h-10 w-10 rounded-full object-cover border border-gray-600'
          />

          <div className='hidden md:block leading-tight'>
            <h2 className='text-white text-sm font-semibold'>
              {user.firstName} {user.lastName}
            </h2>

            <p className='text-gray-400 text-xs'>
              Administrator
            </p>
          </div>

        </div>
      </div>

    </nav>
  )
}

export default AdminNavbar