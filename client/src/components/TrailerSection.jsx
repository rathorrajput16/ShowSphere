import { PlayCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import ReactPlayer from "react-player";
import dummyTrailers from '../assets/dummyTrailers'

const TrailerSection = () => {

    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

    return (
        <div className='px-6 md:px-16 lg:px-24 py-10'>

            <p className='text-3xl font-bold mb-6'>
                Trailers
            </p>

            {/* Main Trailer */}
            <div className='overflow-hidden rounded-2xl mb-8'>

                <ReactPlayer
                    src={currentTrailer.videoUrl}
                    width="100%"
                    height="500px"
                    controls
                />

            </div>

            {/* Trailer List */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>

                {dummyTrailers.map((trailer) => (

                    <div
                        key={trailer.id}
                        onClick={() => setCurrentTrailer(trailer)}
                        className='relative cursor-pointer group overflow-hidden rounded-xl'
                    >

                        <img
                            src={trailer.image}
                            alt={trailer.title}
                            className='w-full h-40 object-cover group-hover:scale-110 transition duration-300'
                        />

                        {/* Overlay */}
                        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>

                            <PlayCircleIcon
                                className='w-14 h-14 text-white group-hover:scale-125 transition'
                            />

                        </div>

                        {/* Title */}
                        <p className='absolute bottom-2 left-2 text-white font-semibold text-sm'>
                            {trailer.title}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default TrailerSection