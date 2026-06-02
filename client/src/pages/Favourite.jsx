import React from 'react'
import { dummyShowsData } from '../assets/dummyShowsData'
import MovieCard from '../components/MovieCard'
import { useAppContext } from '../context/AppContext';

const Favourite = () => {
  const {favoriteMovies}=useAppContext();
  return favoriteMovies.length > 0 ? (

   <div className='px-6 md:px-16 lg:px-24 pt-28 pb-10 min-h-screen bg-black text-white'>

      {/* Heading */}
      <div className='flex items-center justify-between mb-10'>

        <div>
          <h1 className='text-3xl md:text-5xl font-bold'>
            FAVOURITES
          </h1>

          <p className='text-gray-400 mt-3 text-sm md:text-base'>
           My Favourite movies
          </p>
        </div>

      </div>

      {/* Movies Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>

        {favoriteMovies.map((movie) => (

          <MovieCard
            key={movie._id}
            movie={movie}
          />

        ))}

      </div>

    </div>

  ) : (

    <div className='min-h-screen flex items-center justify-center bg-black text-white text-2xl font-semibold'>

      No Movies Found

    </div>

  )
}

export default Favourite