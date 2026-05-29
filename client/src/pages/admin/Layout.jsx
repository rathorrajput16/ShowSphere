import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { LucideClockFading } from 'lucide-react'
const Layout = () => {
  const {isAdmin,fetchIsAdmin}=useAppContext();

  useEffect(()=>{
    fetchIsAdmin();
  },[])
  return isAdmin?(
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
  ):<h1>Loading...</h1>
}

export default Layout