import React from 'react'
import profile from '../../assets/profile.png'
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {

  const user = {
    firstName: 'Ayush',
    lastName: 'Rathore',
    imageUrl: profile,
  }

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ]

  return (
    <div className='h-screen w-64 bg-[#111111] border-r border-gray-700 flex flex-col items-center py-8'>

      {/* Profile Section */}
      <div className='flex flex-col items-center border-b border-gray-700 w-full pb-6'>
        <img
          src={user.imageUrl}
          alt="profile"
          className='h-20 w-20 rounded-full border-2 border-red-500 object-cover'
        />

        <h1 className='text-xl font-semibold text-white mt-4'>
          {user.firstName} {user.lastName}
        </h1>

        <p className='text-gray-400 text-sm'>
          Admin Panel
        </p>
      </div>

      {/* Navigation Links */}
      <div className='w-full mt-8 px-3 flex flex-col gap-2'>

        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition duration-300
              ${
                isActive
                  ? 'bg-red-500/20 text-red-400'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <link.icon className='w-5 h-5' />
            <span>{link.name}</span>
          </NavLink>
        ))}

      </div>
    </div>
  )
}

export default AdminSidebar