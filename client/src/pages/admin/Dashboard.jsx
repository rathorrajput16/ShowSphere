import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/dummyShowsData'
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  Loader2,
  PlayCircleIcon,
  UsersIcon,
} from 'lucide-react'
import Title from '../../components/admin/Title'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {
    const {axios,getToken,user,image_base_url}=useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "$"

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUsers: 0,
  })

  const [loading, setLoading] = useState(true)

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: ChartLineIcon,
    },
    {
      title: "Revenue",
      value: `${currency}${dashboardData.totalRevenue}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length,
      icon: PlayCircleIcon,
    },
    {
      title: "Users",
      value: dashboardData.totalUsers,
      icon: UsersIcon,
    },
  ]

  const fetchDashboardData = async () => {
   try{
        const {data}=await axios.get('/api/admin/dashboard',{headers:{
            Authorization:`Bearer ${await getToken()}`
          }})
        if(data.success){
            setDashboardData(data.dashboardData)
            setLoading(false)
        }else{
            toast.error(data.message)
        }
      }
   catch(error){
        console.error(error);
   }
  }

  useEffect(() => {
    if(user){
      fetchDashboardData()
    }
  }, [user])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='animate-spin text-red-500 w-10 h-10' />
      </div>
    )
  }

  return (
    <div className='flex-1 p-6 md:p-8 bg-[#0f0f0f] min-h-screen'>

      {/* Title */}
      <Title
        title="Welcome Back, Admin"
        subtitle="Monitor bookings, revenue and active movie shows"
      />

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8'>

        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className='bg-[#181818] border border-red-500/10 rounded-2xl p-5 shadow-lg hover:border-red-500/30 transition duration-300'
          >

            <div className='flex items-center justify-between'>

              <div>
                <p className='text-gray-400 text-sm'>
                  {card.title}
                </p>

                <h2 className='text-3xl font-bold text-white mt-2'>
                  {card.value}
                </h2>
              </div>

              <div className='bg-red-500/10 p-4 rounded-xl'>
                <card.icon className='text-red-500 w-7 h-7' />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Active Shows */}
      <div className='mt-10 bg-[#181818] rounded-2xl border border-white/10 overflow-hidden'>

        <div className='p-5 border-b border-white/10'>
          <h2 className='text-xl font-bold text-red-500'>
            Active Shows
          </h2>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left'>

            <thead className='bg-red-500/10 text-red-400'>
              <tr>
                <th className='p-4'>Movie</th>
                <th className='p-4'>Date</th>
                <th className='p-4'>Price</th>
                <th className='p-4'>Booked Seats</th>
              </tr>
            </thead>

            <tbody>

              {dashboardData.activeShows.map((show) => (
                <tr
                  key={show._id}
                  className='border-b border-white/10 hover:bg-white/5 transition'
                >

                  {/* Movie */}
                  <td className='p-4'>
                    <div className='flex items-center gap-4'>

                      <img
                        src={image_base_url+show.movie.backdrop_path}
                        alt=""
                        className='w-20 h-12 rounded-lg object-cover'
                      />

                      <div>
                        <p className='text-white font-semibold'>
                          {show.movie.title}
                        </p>

                        <p className='text-gray-400 text-sm'>
                          {show.movie.genres
                            ?.map((g) => g.name)
                            .join(", ")}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Date */}
                  <td className='p-4 text-white'>
                    {new Date(show.showDateTime)
                      .toLocaleDateString()}
                  </td>

                  {/* Price */}
                  <td className='p-4 text-red-400 font-semibold'>
                    {currency}
                    {show.showPrice}
                  </td>

                  {/* Seats */}
                  <td className='p-4 text-white'>
                    {
                      Object.keys(
                        show.occupiedSeats
                      ).length
                    }
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard