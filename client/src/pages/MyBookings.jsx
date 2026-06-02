import React, {
  useEffect,
  useState,
} from 'react'

import {dummyBookingData} from '../assets/dummyShowsData'
import timeFormat from '../lib/timeFormat'
import { useAppContext } from '../context/AppContext'

const MyBookings = () => {

  const currency =
    import.meta.env
      .VITE_CURRENCY || "₹"
const {shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url} = useAppContext();

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
      try{
       const {data}=await axios.get('api/user/bookings', {headers: { Authorization: `Bearer ${await getToken()}` }
       })
       if(data.success){
        setBookings(data.bookings)
       }
      }
      catch(error){
        console.error(error)
      }

      setIsLoading(false)
    }

  useEffect(() => {
    if(user){
       getMyBookings()
    }
    
  }, [user])
const handlePayNow = async (booking) => {
  try {

    const token = await getToken();

    const { data } = await axios.post(
      "/api/booking/pay-existing-booking",
      {
        bookingId: booking._id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!data.success) {
      return toast.error(data.message);
    }

    const order = data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ShowSphere",
      description: "Movie Ticket Booking",
      order_id: order.id,

      handler: async function (response) {

        const verifyRes = await axios.post(
          "/api/booking/verify-payment",
          {
            bookingId: booking._id,

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        if (verifyRes.data.success) {
          toast.success("Payment Successful");
          await getMyBookings(); 
            navigate("/my-bookings");
        }
      }
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {
    toast.error(error.message);
  }
};
  return !isLoading ? (
    <div className='min-h-screen bg-black text-white px-6 md:px-16 lg:px-24 pt-28 pb-12'>

      {/* Heading */}
      <div className='mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-red-500'>
          My Bookings
        </h1>

        
      </div>

      {/* Booking Cards */}
      <div className='flex flex-col gap-8'>

        {bookings.map(
          (
            item,
            index
          ) => {

            // FIXED:
            const movie =
              item.show.movie

            return (
              <div
                key={index}
                className='bg-zinc-950 border border-red-900 rounded-3xl overflow-hidden hover:border-red-600 transition duration-300 shadow-lg'
              >

                <div className='flex flex-col lg:flex-row'>

                  {/* Movie Image */}
                  <img
                    src={
                     image_base_url+ movie?.backdrop_path
                    }
                    alt={
                      movie?.title
                    }
                    className='w-full lg:w-[340px] h-[260px] object-cover'
                  />

                  {/* Right Content */}
                  <div className='flex-1 p-8 flex flex-col justify-between'>

                    {/* Top Section */}
                    <div>

                      <div className='flex items-start justify-between flex-wrap gap-4'>

                        <div>
                          <h1 className='text-3xl font-bold text-white'>
                            {
                              movie?.title
                            }
                          </h1>

                          <p className='text-gray-400 mt-2'>
                            {movie?.genres
                              ?.map(
                                genre =>
                                  genre.name
                              )
                              .join(', ')}
                          </p>
                        </div>

                        {/* Payment Status */}
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold border ${item.isPaid
                              ? 'bg-green-500/20 text-green-400 border-green-500/40'
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                            }`}
                        >
                          {item.isPaid
                            ? 'Paid'
                            : 'Payment Pending'}
                        </span>

                      </div>

                      {/* Movie Info */}
                      <div className='flex flex-wrap gap-3 mt-6'>

                        {/* Time */}
                        <span className='bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-full text-sm'>
                          🎬{' '}
                          {new Date(
                            item.show.showDateTime
                          ).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute:
                                '2-digit',
                            }
                          )}
                        </span>

                        {/* Date */}
                        <span className='bg-zinc-800 px-4 py-2 rounded-full text-sm'>
                          📅{' '}
                          {new Date(
                            item.show.showDateTime
                          ).toLocaleDateString()}
                        </span>

                        {/* Runtime */}
                        <span className='bg-zinc-800 px-4 py-2 rounded-full text-sm'>
                          ⏱{' '}
                          {
                            timeFormat(movie?.runtime)
                          }
                        </span>

                        {/* vote_average */}
                        <span className='bg-zinc-800 text-yellow-400 px-4 py-2 rounded-full text-sm'>
                          ⭐{' '}
                          {
                            movie?.vote_average?.toFixed(1)
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
                            (
                              seat
                            ) => (
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
                          <button
  onClick={() => handlePayNow(item)}
  className='mt-4 bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-xl font-semibold'
>
  Pay Now
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