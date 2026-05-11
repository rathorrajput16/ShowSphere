import React, {
  useMemo,
  useState,
} from 'react'
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {
  ArrowRight,
  Clock,
} from 'lucide-react'
import toast from 'react-hot-toast'

const SeatLayout = () => {
  const navigate =
    useNavigate()

  const { id, date } =
    useParams()

  const [
    searchParams,
  ] = useSearchParams()

  const time =
    searchParams.get(
      'time'
    )

  const [
    selectedSeats,
    setSelectedSeats,
  ] = useState([])

  // Theatre Structure
  const groupRows = [
    ['A', 'B'],
    ['C', 'D'],
    ['E', 'F'],
    ['G', 'H'],
    ['I', 'J'],
  ]

  const seatsPerRow = 9

  // Dummy booked seats
  const dummyBookedSeats =
    {
      '1-2026-05-16-10:15 AM':
        [
          'A2',
          'A5',
          'B3',
          'D4',
          'F8',
        ],

      '1-2026-05-16-7:15 PM':
        [
          'A1',
          'A6',
          'B7',
          'D3',
          'D4',
          'H8',
          'I5',
        ],

      '2-2026-05-17-1:00 PM':
        [
          'C4',
          'C5',
          'E7',
          'J2',
        ],
    }

  const showKey =
    `${id}-${date}-${time}`

  const occupiedSeats =
    useMemo(
      () =>
        dummyBookedSeats[
          showKey
        ] || [],
      [showKey]
    )

  const handleSeatClick =
    (
      seatId
    ) => {
      if (!time) {
        return toast.error(
          'Please select a time first'
        )
      }

      if (
        occupiedSeats.includes(
          seatId
        )
      ) {
        return toast.error(
          'Seat already booked'
        )
      }

      const isSelected =
        selectedSeats.includes(
          seatId
        )

      if (
        !isSelected &&
        selectedSeats.length >=
          5
      ) {
        return toast.error(
          'Maximum 5 seats allowed'
        )
      }

      if (
        isSelected
      ) {
        setSelectedSeats(
          prev =>
            prev.filter(
              seat =>
                seat !==
                seatId
            )
        )
      } else {
        setSelectedSeats(
          prev => [
            ...prev,
            seatId,
          ]
        )
      }
    }

  const renderSeats =
    (
      row,
      count = 9
    ) => (
      <div
        key={row}
        className='flex gap-3 mt-3'
      >
        {Array.from(
          {
            length:
              count,
          },
          (_, i) => {
            const seatId =
              `${row}${
                i + 1
              }`

            const isSelected =
              selectedSeats.includes(
                seatId
              )

            const isOccupied =
              occupiedSeats.includes(
                seatId
              )

            return (
              <button
                key={
                  seatId
                }
                onClick={() =>
                  handleSeatClick(
                    seatId
                  )
                }
                className={`h-11 w-11 rounded-lg border text-sm font-medium transition-all duration-300
                  
                  ${
                    isSelected
                      ? 'bg-green-500 border-green-500 text-white'
                      : isOccupied
                      ? 'bg-red-600 border-red-600 text-white cursor-not-allowed'
                      : 'border-red-500 text-gray-300 hover:bg-red-500/20'
                  }
                `}
              >
                {
                  seatId
                }
              </button>
            )
          }
        )}
      </div>
    )

  const proceedCheckout =
    () => {
      if (
        !time
      ) {
        return toast.error(
          'Please select a time'
        )
      }

      if (
        !selectedSeats.length
      ) {
        return toast.error(
          'Please select seats'
        )
      }

      toast.success(
        'Seats selected successfully'
      )

      console.log({
        movieId:
          id,
        date,
        time,
        seats:
          selectedSeats,
      })

      // Later backend
      // navigate('/checkout')
    }

  return (
    <div className='min-h-screen bg-black text-white px-6 md:px-16 lg:px-24 pt-32 pb-20 relative overflow-hidden'>

      {/* Background Glow */}
      <div className='absolute top-20 left-0 w-[300px] h-[300px] bg-red-700/20 blur-[140px] rounded-full' />

      <div className='absolute bottom-0 right-0 w-[300px] h-[300px] bg-red-700/20 blur-[140px] rounded-full' />

      <div className='flex flex-col lg:flex-row gap-14'>

        {/* Timing Card */}
        <div className='w-full lg:w-[280px] h-fit bg-[#2a0d14] border border-red-900 rounded-3xl p-7 sticky top-28'>

          <h2 className='text-2xl font-bold mb-6'>
            Show Details
          </h2>

          <div className='space-y-5 text-gray-300'>

            <div>
              <p className='text-sm text-gray-500'>
                Movie ID
              </p>

              <p className='font-medium'>
                {id}
              </p>
            </div>

            <div>
              <p className='text-sm text-gray-500'>
                Date
              </p>

              <p className='font-medium'>
                {date}
              </p>
            </div>

            <div>
              <p className='text-sm text-gray-500'>
                Time
              </p>

              <div className='flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl w-fit mt-2'>
                <Clock size={18} />
                {time}
              </div>
            </div>

            <div>
              <p className='text-sm text-gray-500'>
                Selected Seats
              </p>

              <p className='mt-2 text-green-400'>
                {selectedSeats.length >
                0
                  ? selectedSeats.join(
                      ', '
                    )
                  : 'None'}
              </p>
            </div>
          </div>
        </div>

        {/* Seats */}
        <div className='flex-1 flex flex-col items-center'>

          <h1 className='text-4xl font-bold mb-10'>
            Select your seat
          </h1>

          {/* Screen */}
          <div className='w-[85%] h-6 bg-gradient-to-r from-red-900/60 via-red-500 to-red-900/60 rounded-t-full rounded-b-[100px]' />

          <p className='text-gray-500 text-sm mt-4 mb-16 tracking-[4px]'>
            SCREEN SIDE
          </p>

          {/* Seats Grid */}
          <div className='flex flex-col items-center text-xs'>

            {/* A/B */}
            <div className='grid grid-cols-2 gap-10 mb-8'>
              {groupRows[0].map(
                row =>
                  renderSeats(
                    row
                  )
              )}
            </div>

            {/* Remaining */}
            <div className='grid grid-cols-2 gap-14'>
              {groupRows
                .slice(1)
                .map(
                  (
                    group,
                    idx
                  ) => (
                    <div
                      key={
                        idx
                      }
                    >
                      {group.map(
                        row =>
                          renderSeats(
                            row
                          )
                      )}
                    </div>
                  )
                )}
            </div>
          </div>

          {/* Legend */}
          <div className='flex gap-8 mt-12 text-sm text-gray-300'>
            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 rounded bg-red-600' />
              Booked
            </div>

            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 rounded border border-red-500' />
              Available
            </div>

            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 rounded bg-green-500' />
              Selected
            </div>
          </div>

          {/* Checkout */}
          <button
            onClick={
              proceedCheckout
            }
            className='flex items-center gap-2 mt-16 px-10 py-4 rounded-full bg-red-600 hover:bg-red-500 transition-all font-semibold'
          >
            Proceed to Checkout

            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatLayout