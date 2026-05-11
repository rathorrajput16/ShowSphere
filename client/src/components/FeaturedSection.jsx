import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import MovieCard from './MovieCard'
import { dummyShowsData } from '../assets/dummyShowsData'

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    <div className='px-4 md:px-8 lg:px-12 py-12'>
      
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-white text-3xl font-bold'>
          Now Showing
        </h2>

        <button
          onClick={() => navigate('/movies')}
          className='flex items-center gap-2 text-red-500 hover:text-red-400 transition-all duration-300 font-semibold'
        >
          View All
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Movie Scroll Section */}
      <div
        className='
          flex gap-6 overflow-x-auto overflow-y-hidden
          scroll-smooth snap-x snap-mandatory pb-3
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-black
          [&::-webkit-scrollbar-thumb]:bg-black
          [&::-webkit-scrollbar-thumb]:rounded-full
        '
      >
        {dummyShowsData.map((movie) => (
          <div
            key={movie._id}
            className='min-w-[260px] flex-shrink-0 snap-start hover:scale-105 transition duration-300'
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className='flex justify-center mt-10'>
        <button
          onClick={() => navigate('/movies')}
          className='bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105'
        >
          Show More
        </button>
      </div>
    </div>
  )
}

export default FeaturedSection