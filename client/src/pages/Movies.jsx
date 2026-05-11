import React from 'react'
import { dummyShowsData } from '../assets/dummyShowsData'
import MovieCard from '../components/MovieCard'

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className='px-6 md:px-16 lg:px-24 pt-28 pb-10 min-h-screen bg-black text-white'>

      {/* Heading */}
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-3xl md:text-5xl font-bold text-red-500'>
            Now Showing
          </h1>

          <p className='text-gray-400 mt-3 text-sm md:text-base'>
            Discover the latest movies playing in theatres
          </p>
        </div>
      </div>

      {/* Movies Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {dummyShowsData.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white'>
      <h2 className='text-3xl font-bold text-red-500'>
        No Movies Found
      </h2>

      <p className='text-gray-400 mt-3'>
        Please check again later.
      </p>
    </div>
  )
}

export default Movies