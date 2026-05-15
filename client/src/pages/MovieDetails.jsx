import React, {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  Star,
  Heart,
} from 'lucide-react'

import ReactPlayer
from 'react-player'

import DateSelect
from '../components/DateSelect'

import {
  dummyShowsData,
  dummyDateTimeData,
} from '../assets/dummyShowsData'

import isoTimeFormat from '../lib/isoTimeFormat'
import timeFormat from '../lib/timeFormat'

const MovieDetails = () => {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const [
    show,
    setShow,
  ] = useState(null)

  useEffect(() => {

    const movie =
      dummyShowsData.find(
        movie =>
          String(
            movie._id
          ) ===
          String(id)
      )

    setShow(movie)

  }, [id])

  if (!show) {
    return (
      <div className='min-h-screen bg-black text-white flex justify-center items-center'>
        Loading...
      </div>
    )
  }

  return (
    <div className='bg-black text-white min-h-screen pt-24 px-6 lg:px-14 relative overflow-hidden'>

      {/* Glow */}
      <div className='absolute top-20 left-10 w-[250px] h-[250px] bg-red-600/20 blur-[120px] rounded-full' />

      <div className='absolute top-32 right-10 w-[250px] h-[250px] bg-red-600/20 blur-[120px] rounded-full' />

      {/* HERO */}
      <div className='max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 items-center'>

        {/* Poster */}
        <img
          src={
            show.poster_path
          }
          alt={
            show.title
          }
          className='w-[260px] h-[390px] object-cover rounded-3xl shadow-2xl'
        />

        {/* Details */}
        <div className='max-w-xl'>

          <p className='text-red-500 uppercase text-sm mb-2'>
            English
          </p>

          <h1 className='text-5xl font-bold mb-4'>
            {show.title}
          </h1>

          {/* Rating */}
          <div className='flex items-center gap-2 text-red-500 mb-4'>
            <Star
              size={18}
              fill='currentColor'
            />

            <span className='font-medium'>
              {
                show.vote_average
              } User Rating
            </span>
          </div>

          {/* Desc */}
          <p className='text-gray-400 leading-7 mb-5'>
            A cinematic masterpiece with stunning visuals, immersive storytelling and unforgettable performances.
          </p>

          {/* Runtime */}
          <p className='text-gray-300 text-sm mb-6'>

            {timeFormat(
              show.runtime
            )}

            {' • '}

            {show.genres
              .map(
                genre =>
                  genre.name
              )
              .join(
                ', '
              )}

            {' • '}

            {new Date(
              show.release_date
            ).getFullYear()}

          </p>

          {/* Buttons */}
          <div className='flex gap-4'>

            <a
              href={
                show.trailer
                  ?.videoUrl
              }
              target='_blank'
              rel='noopener noreferrer'
              className='px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition'
            >
              Watch Trailer
            </a>

            <button
              onClick={() => {

                const section =
                  document.getElementById(
                    'dateSelect'
                  )

                if (
                  section
                ) {

                  const y =
                    section.getBoundingClientRect()
                      .top +
                    window.scrollY -
                    120

                  window.scrollTo({
                    top: y,
                    behavior:
                      'smooth',
                  })
                }
              }}
              className='px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition'
            >
              Buy Tickets
            </button>

            <button>
              <Heart
                size={20}
                className='hover:fill-red-500 transition'
              />
            </button>

          </div>
        </div>
      </div>

      {/* Trailer */}
      <div className='max-w-7xl mx-auto mt-20'>

        <h2 className='font-semibold text-2xl mb-8 text-red-500'>
          Trailer
        </h2>

        <div className='overflow-hidden rounded-3xl border border-zinc-800'>

          <ReactPlayer
            src={
              show.trailer
                .videoUrl
            }
            width='100%'
            height='500px'
            controls
          />

        </div>
      </div>

      {/* Cast */}
      <div className='max-w-7xl mx-auto mt-20'>

        <h2 className='font-semibold text-2xl mb-8 text-red-500'>
          Your Favorite Cast
        </h2>

        <div className='flex gap-6 overflow-x-auto pb-4'>

          {show.casts?.map(
            cast => (

              <div
                key={
                  cast.id
                }
                className='min-w-[120px] text-center flex-shrink-0 group cursor-pointer'
              >

                <img
                  src={
                    cast.profile_path
                  }
                  alt={
                    cast.name
                  }
                  className='w-24 h-24 rounded-full object-cover mx-auto border-2 border-zinc-700 group-hover:border-red-500 transition'
                />

                <p className='text-sm mt-4 font-medium'>
                  {
                    cast.name
                  }
                </p>

                <p className='text-xs text-gray-400'>
                  {
                    cast.character
                  }
                </p>

              </div>
            )
          )}

        </div>
      </div>

      {/* Date Select */}
      <DateSelect
        dateTime={
          dummyDateTimeData
        }
        id={
          show._id
        }
      />

    </div>
  )
}

export default MovieDetails