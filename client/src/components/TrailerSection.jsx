import { PlayCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useAppContext } from '../context/AppContext'

const TrailerSection = () => {

  const { shows, image_base_url } = useAppContext()

  const trailers = shows
    .filter(movie => movie.trailerKey)
    .map(movie => ({
      id: movie._id,
      title: movie.title,
      image: image_base_url + movie.backdrop_path,
      videoUrl: `https://www.youtube.com/watch?v=${movie.trailerKey}`
    }))

  const [currentTrailer, setCurrentTrailer] = useState(null)

  useEffect(() => {
    if (trailers.length > 0) {
      setCurrentTrailer(trailers[0])
    }
  }, [shows])
  console.log(shows);
  return (
    <div className='px-6 md:px-16 lg:px-24 py-10 bg-black text-white'>
       
      {/* Heading */}
      <div className='mb-8'>
        <h2 className='text-3xl md:text-4xl font-bold'>
          Latest Trailers
        </h2>

        <p className='text-gray-400 mt-2'>
          Watch the newest movie trailers
        </p>
      </div>

      {/* Main Trailer */}
      <div className='overflow-hidden rounded-3xl mb-8 bg-zinc-900 border border-zinc-800'>

        {currentTrailer ? (
          <ReactPlayer
            key={currentTrailer.id}
            src={currentTrailer.videoUrl}
            width="100%"
            height="500px"
            controls
            playing={false}
          />
        ) : (
          <div className='h-[500px] flex items-center justify-center'>
            <p className='text-gray-400'>
              No trailers available
            </p>
          </div>
        )}

      </div>

      {/* Trailer Scroll */}
      <div
        className='
          flex gap-5 overflow-x-auto overflow-y-hidden
          scroll-smooth pb-3
          [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:bg-black
          [&::-webkit-scrollbar-thumb]:bg-zinc-700
          [&::-webkit-scrollbar-thumb]:rounded-full
        '
      >

        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            onClick={() => setCurrentTrailer(trailer)}
            className='
              relative min-w-[280px]
              cursor-pointer group
              overflow-hidden rounded-2xl
              flex-shrink-0
              hover:scale-105 transition duration-300
            '
          >

            {/* Thumbnail */}
            <img
              src={trailer.image}
              alt={trailer.title}
              className='w-full h-44 object-cover group-hover:scale-110 transition duration-500'
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
              <PlayCircleIcon className='w-14 h-14 text-white group-hover:scale-125 transition duration-300' />
            </div>

            {/* Active Trailer Border */}
            {currentTrailer?.id === trailer.id && (
              <div className='absolute inset-0 border-4 border-red-600 rounded-2xl' />
            )}

            {/* Title */}
            <p className='absolute bottom-3 left-3 text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-md'>
              {trailer.title}
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default TrailerSection