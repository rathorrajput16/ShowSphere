import React, {
  useRef,
  useState,
} from 'react'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const DateSelect = ({
  dateTime,
  id,
}) => {
  const navigate =
    useNavigate()

  const scrollRef =
    useRef(null)

  const [
    selectedDate,
    setSelectedDate,
  ] = useState(null)

  const [
    selectedTime,
    setSelectedTime,
  ] = useState(null)

  const scroll = (
    direction
  ) => {
    if (
      scrollRef.current
    ) {
      scrollRef.current.scrollBy(
        {
          left:
            direction ===
            'left'
              ? -250
              : 250,
          behavior:
            'smooth',
        }
      )
    }
  }

  const onBookHandler =
  () => {
    if (
      selectedDate ===
      null
    ) {
      return toast.error(
        'Please select a date'
      )
    }

    if (
      selectedTime ===
      null
    ) {
      return toast.error(
        'Please select a time'
      )
    }

    navigate(
  `/seat/${id}/${selectedDate}?time=${selectedTime}`
)

    window.scrollTo(
      0,
      0
    )
  }

  return (
    <div
  id='dateSelect'
  className='pt-32 max-w-7xl mx-auto scroll-mt-32'
>
      <div className='bg-[#2a0d14] border border-red-900 rounded-3xl p-6'>

        {/* Heading */}
        <p className='text-xl font-semibold mb-6 text-white'>
          Choose Date
        </p>

        {/* Date Scroll */}
        <div className='flex items-center gap-4'>

          {/* Left Arrow */}
          <button
            onClick={() =>
              scroll(
                'left'
              )
            }
            className='text-white hover:text-red-500 transition'
          >
            <ChevronLeft size={28} />
          </button>

          {/* Dates */}
          <div
            ref={
              scrollRef
            }
            className='flex gap-4 overflow-x-auto scroll-smooth flex-1 pb-2 [&::-webkit-scrollbar]:hidden'
          >
            {Object.keys(
              dateTime
            ).map(
              (
                date
              ) => (
                <button
                  key={
                    date
                  }
                  onClick={() => {
                    setSelectedDate(
                      date
                    )

                    // reset time when changing date
                    setSelectedTime(
                      null
                    )
                  }}
                  className={`min-w-[70px] h-[70px]
                  rounded-2xl border
                  flex flex-col items-center justify-center
                  transition duration-300 outline-none
                  ${
                    selectedDate ===
                    date
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-zinc-900 border-zinc-700 text-gray-300 hover:border-red-500'
                  }`}
                >
                  <span className='text-xs'>
                    {new Date(
                      date
                    ).toLocaleDateString(
                      'en-US',
                      {
                        weekday:
                          'short',
                      }
                    )}
                  </span>

                  <span className='font-bold text-lg'>
                    {new Date(
                      date
                    ).getDate()}
                  </span>

                  <span className='text-[10px]'>
                    {new Date(
                      date
                    ).toLocaleDateString(
                      'en-US',
                      {
                        month:
                          'short',
                      }
                    )}
                  </span>
                </button>
              )
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() =>
              scroll(
                'right'
              )
            }
            className='text-white hover:text-red-500 transition'
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className='mt-8'>
            <p className='text-lg font-medium mb-4 text-white'>
              Available Timings
            </p>

            <div className='flex flex-wrap gap-4'>
              {dateTime[
                selectedDate
              ]?.map(
                (
                  time,
                  index
                ) => (
                  <button
                    key={
                      index
                    }
                    onClick={() =>
                      setSelectedTime(
                        time
                      )
                    }
                    className={`px-5 py-3 rounded-xl border transition duration-300 ${
                      selectedTime ===
                      time
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'bg-zinc-900 border-zinc-700 hover:border-red-600 text-white'
                    }`}
                  >
                    {time}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Book Button */}
        <div className='mt-8 flex justify-end'>
          <button
            onClick={
              onBookHandler
            }
            className='bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl transition-all cursor-pointer'
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateSelect