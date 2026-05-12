import React, {
  useEffect,
  useState,
} from 'react'
import {
  dummyBookingData,
} from '../assets/dummyBookingData'
import {
  dummyShowsData,
} from '../assets/dummyShowsData'

const MyBookings = () => {
  const currency =
    import.meta.env
      .VITE_CURRENCY

  const [
    bookings,
    setBookings,
  ] = useState([])

  const [
    isLoading,
    setIsLoading,
  ] = useState(true)

  const getMyBookings =
    async () => {
      setBookings(
        dummyBookingData
      )

      setIsLoading(
        false
      )
    }

  useEffect(() => {
    getMyBookings()
  }, [])

  return !isLoading ? (
    <div className='min-h-screen bg-black text-white px-6 md:px-16 lg:px-24 pt-28 pb-12'>

      {/* Heading */}
      <div className='mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-red-500'>
          My Bookings
        </h1>

        <p className='text-gray-400 mt-3 text-sm md:text-base'>
          Manage your
          booked movie
          tickets
        </p>
      </div>

      {/* Booking Cards */}
      <div className='flex flex-col gap-8'>
        {bookings.map(
          (
            item,
            index
          ) => {
            const movie =
              dummyShowsData.find(
                m =>
                  m._id ===
                  item
                    .show
                    .movieId
              )

            if (!movie)
              return null

            return (
              <div
                key={index}
                className='bg-zinc-950 border border-red-900 rounded-3xl overflow-hidden hover:border-red-700 transition duration-300'
              >
                <div className='flex flex-col lg:flex-row'>

                  {/* Movie Image */}
                  <img
                    src={
                      movie.backdrop_path
                    }
                    alt={
                      movie.title
                    }
                    className='w-full lg:w-[340px] h-[260px] object-cover'
                  />

                  {/* Right Content */}
                  <div className='flex-1 p-8 flex flex-col justify-between'>

                    {/* Top */}
                    <div>

                      <div className='flex items-start justify-between flex-wrap gap-4'>
                        <div>
                          <h1 className='text-3xl font-bold'>
                            {
                              movie.title
                            }
                          </h1>

                          <p className='text-gray-400 mt-2'>
                            {movie.genres
                              .map(
                                genre =>
                                  genre.name
                              )
                              .join(
                                ', '
                              )}
                          </p>
                        </div>

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                            item.isPaid
                              ? 'bg-green-500/20 text-green-400 border-green-500/40'
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                          }`}
                        >
                          {item.isPaid
                            ? 'Paid'
                            : 'Payment Pending'}
                        </span>
                      </div>

                      {/* Info */}
                      <div className='flex flex-wrap gap-3 mt-6'>

                        <span className='bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-full text-sm'>
                          🎬{' '}
                          {
                            item
                              .show
                              .timing
                          }
                        </span>

                        <span className='bg-zinc-800 px-4 py-2 rounded-full text-sm'>
                          📅{' '}
                          {
                            item
                              .show
                              .date
                          }
                        </span>

                        <span className='bg-zinc-800 px-4 py-2 rounded-full text-sm'>
                          ⏱{' '}
                          {
                            movie.runtime
                          }
                        </span>

                        <span className='bg-zinc-800 text-yellow-400 px-4 py-2 rounded-full text-sm'>
                          ⭐{' '}
                          {
                            movie.rating
                          }
                        </span>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className='flex flex-col md:flex-row justify-between gap-8 mt-8'>

                      {/* Seats */}
                      <div>
                        <p className='text-gray-400 mb-3'>
                          Total
                          Tickets:{' '}
                          <span className='text-white font-semibold'>
                            {
                              item
                                .bookedSeats
                                .length
                            }
                          </span>
                        </p>

                        <div className='flex flex-wrap gap-2'>
                          {item.bookedSeats.map(
                            seat => (
                              <span
                                key={
                                  seat
                                }
                                className='bg-red-500/10 border border-red-500/40 text-red-300 px-3 py-2 rounded-lg text-sm'
                              >
                                {
                                  seat
                                }
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className='text-left md:text-right'>
                        <p className='text-gray-400 text-sm'>
                          Total
                          Amount
                        </p>

                        <h2 className='text-3xl font-bold text-red-500 mt-1'>
                          {
                            currency
                          }
                          {
                            item.amount
                          }
                        </h2>

                        {!item.isPaid && (
                          <button className='mt-4 bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-xl font-semibold'>
                            Pay
                            Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  ) : (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <h1 className='text-red-500 text-3xl font-bold animate-pulse'>
        Loading...
      </h1>
    </div>
  )
}

export default MyBookings