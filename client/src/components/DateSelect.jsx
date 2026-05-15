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

import dateFormat from '../lib/dateFormat'
import timeFormat from '../lib/timeFormat'
import isoTimeFormat from '../lib/isoTimeFormat'

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
        !selectedDate
      ) {
        return toast.error(
          'Please select a date'
        )
      }

      if (
        !selectedTime
      ) {
        return toast.error(
          'Please select a time'
        )
      }

      navigate(
        `/seat/${id}/${selectedTime.showId}?time=${selectedTime.time}`
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

        {/* Date Slider */}
        <div className='flex items-center gap-4'>

          {/* Left */}
          <button
            onClick={() =>
              scroll(
                'left'
              )
            }
            className='text-white hover:text-red-500 transition'
          >
            <ChevronLeft
              size={28}
            />
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

                    setSelectedTime(
                      null
                    )
                  }}
                  className={`min-w-[80px] h-[80px]
                  rounded-2xl border
                  flex flex-col items-center justify-center
                  transition duration-300
                  ${
                    selectedDate ===
                    date
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-zinc-900 border-zinc-700 text-gray-300 hover:border-red-500'
                  }`}
                >
                  <span className='text-xs'>
                    {dateFormat(
                      date
                    )
                      .split(
                        ' '
                      )[0]}
                  </span>

                  <span className='font-bold text-xl'>
                    {new Date(
                      date
                    ).getDate()}
                  </span>

                  <span className='text-xs'>
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

          {/* Right */}
          <button
            onClick={() =>
              scroll(
                'right'
              )
            }
            className='text-white hover:text-red-500 transition'
          >
            <ChevronRight
              size={28}
            />
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
                  show
                ) => (

                  <button
                    key={
                      show.showId
                    }
                    onClick={() =>
                      setSelectedTime(
                        show
                      )
                    }
                    className={`px-5 py-3 rounded-xl border transition duration-300
                    ${
                      selectedTime
                        ?.showId ===
                      show.showId
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'bg-zinc-900 border-zinc-700 hover:border-red-600 text-white'
                    }`}
                  >
                    {isoTimeFormat(
                      show.time
                    )}
                  </button>
                )
              )}

            </div>
          </div>
        )}

        {/* Book */}
        <div className='mt-8 flex justify-end'>
          <button
            onClick={
              onBookHandler
            }
            className='bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl transition cursor-pointer'
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  )
}

export default DateSelect