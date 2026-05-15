import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen bg-[#0f0f0f]'>

      {/* Navbar */}
      <AdminNavbar />

      {/* Sidebar + Main Content */}
      <div className='flex'>

        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className='flex-1 p-6 overflow-y-auto'>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default Layout