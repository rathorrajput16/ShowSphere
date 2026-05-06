import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import MovieCard from './MovieCard'
import { dummyShowsData } from '../assets/dummyShowsData'

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    <div className='px-4 md:px-8 lg:px-12 py-12'>
      <div className='flex items-center justify-between mb-8'>
        <p className='text-white text-3xl font-bold'>
          Now Showing
        </p>

        <button
          onClick={() => navigate('/movies')}
          className='flex items-center gap-2 text-red-500 hover:text-red-400 transition-all duration-300 font-semibold'
        >
          View All
          <ArrowRight size={20} />
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {dummyShowsData.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-10'>
        <button
          onClick={() => navigate('/movies')}
          className='bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-xl transition-all duration-300'
        >
          Show More
        </button>
      </div>
    </div>
  )
}

export default FeaturedSection