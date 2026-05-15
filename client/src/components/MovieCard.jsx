import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import timeFormat from '../lib/timeFormat'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  return (
    <div className='bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`)
          scrollTo(0, 0)
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className='h-64 w-full object-cover'
      />

      <div className='p-4'>
        <p className='text-white text-lg font-bold mb-2'>
          {movie.title}
        </p>

        <p className='text-gray-400 text-sm mb-4'>
          {new Date(movie.release_date).getFullYear()} •{' '}
          {movie.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(' | ')}{' '}
          • {timeFormat(movie.runtime)}
        </p>

        <div className='flex items-center justify-between'>
          <button
            onClick={() => {
              navigate(`/movies/${movie._id}`)
              scrollTo(0, 0)
            }}
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all duration-300'
          >
            Buy Tickets
          </button>

          <div className='flex items-center gap-1 text-yellow-400'>
            <Star size={18} fill='currentColor' />
            <p className='text-white'>{movie.vote_average}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard