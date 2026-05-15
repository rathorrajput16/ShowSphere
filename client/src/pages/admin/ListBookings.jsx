import React, {
  useEffect,
  useState,
} from 'react'

import {
  Loader2,
} from 'lucide-react'

import Title
from '../../components/admin/Title'

import {
  dummyBookingData,
} from '../../assets/dummyShowsData'


import timeFormat from '../../lib/timeFormat'
import dateFormat from '../../lib/dateFormat'


const ListBookings = () => {

  const currency =
    import.meta.env
      .VITE_CURRENCY ||
    '₹'

  const [
    bookings,
    setBookings,
  ] = useState([])

  const [
    isLoading,
    setIsLoading,
  ] = useState(true)

  const getAllBookings =
    async () => {

      setBookings(
        dummyBookingData
      )

      setIsLoading(
        false
      )
    }

  useEffect(() => {
    getAllBookings()
  }, [])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[70vh]'>
        <Loader2 className='animate-spin text-red-500 w-10 h-10' />
      </div>
    )
  }

  return (
    <div className='p-6 md:p-8'>

      {/* Title */}
      <Title
        title='List Bookings'
        subtitle='Manage and monitor all movie ticket bookings'
      />

      {/* Table */}
      <div className='mt-8 bg-[#181818] border border-white/10 rounded-2xl overflow-hidden shadow-lg'>

        <div className='overflow-x-auto'>

          <table className='w-full text-left min-w-[900px]'>

            {/* Head */}
            <thead className='bg-red-500/10 border-b border-red-500/20'>

              <tr className='text-red-400 text-sm uppercase tracking-wider'>

                <th className='p-5 font-semibold'>
                  User
                </th>

                <th className='p-5 font-semibold'>
                  Movie
                </th>

                <th className='p-5 font-semibold'>
                  Show Time
                </th>

                <th className='p-5 font-semibold'>
                  Seats
                </th>

                <th className='p-5 font-semibold'>
                  Amount
                </th>

                <th className='p-5 font-semibold'>
                  Status
                </th>

              </tr>
            </thead>

            {/* Body */}
            <tbody>

              {bookings.map(
                (
                  item,
                  index
                ) => (

                  <tr
                    key={
                      index
                    }
                    className='border-b border-white/10 hover:bg-white/5 transition duration-300'
                  >

                    {/* User */}
                    <td className='p-5'>

                      <div>
                        <h3 className='text-white font-medium'>
                          {
                            item.user
                              .name
                          }
                        </h3>

                        <p className='text-gray-400 text-sm'>
                          Customer
                        </p>
                      </div>

                    </td>

                    {/* Movie */}
                    <td className='p-5'>

                      <div className='flex items-center gap-4'>

                        <img
                          src={
                            item
                              .show
                              .movie
                              .poster_path
                          }
                          alt=''
                          className='w-16 h-20 rounded-lg object-cover'
                        />

                        <div>

                          <p className='text-white font-semibold'>
                            {
                              item
                                .show
                                .movie
                                .title
                            }
                          </p>

                          <p className='text-gray-400 text-sm'>
                            {timeFormat(
                              item
                                .show
                                .movie
                                .runtime
                            )}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Show Time */}
                    <td className='p-5 text-gray-300 text-sm'>
                      {dateFormat(
                        item
                          .show
                          .showDateTime
                      )}
                    </td>

                    {/* Seats */}
                    <td className='p-5'>

                      <div className='flex flex-wrap gap-2'>

                        {item.bookedSeats.map(
                          (
                            seat,
                            i
                          ) => (

                            <span
                              key={
                                i
                              }
                              className='bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm'
                            >
                              {
                                seat
                              }
                            </span>
                          )
                        )}

                      </div>

                    </td>

                    {/* Amount */}
                    <td className='p-5'>

                      <span className='text-green-400 font-semibold text-lg'>
                        {
                          currency
                        }
                        {
                          item.amount
                        }
                      </span>

                    </td>

                    {/* Payment */}
                    <td className='p-5'>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          item.isPaid
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {item.isPaid
                          ? 'Paid'
                          : 'Pending'}
                      </span>

                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default ListBookings