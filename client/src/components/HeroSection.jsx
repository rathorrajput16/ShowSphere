import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import { useNavigate } from "react-router-dom"

const movies = [
  {
    title: "Interstellar",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1925&auto=format&fit=crop",
    description:
      "A breathtaking journey through space and time to save humanity.",
    genre: "Sci-Fi",
    vote_average: "8.7",
  },
  {
    title: "Shutter Island",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format&fit=crop",
    description:
      "A dark psychological thriller filled with mystery and suspense.",
    genre: "Thriller",
    vote_average: "8.2",
  },
  {
    title: "The Shawshank Redemption",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1974&auto=format&fit=crop",
    description:
      "An inspiring story of hope, friendship, and freedom.",
    genre: "Drama",
    vote_average: "9.3",
  },
]

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full px-4 md:px-8 lg:px-12 mt-6">



      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-3xl overflow-hidden"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[70vh] w-full bg-cover bg-center relative flex items-end"
              style={{
                backgroundImage: `url(${movie.image})`,
              }}
            >

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20"></div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-10 max-w-2xl">

                <p className="text-red-500 font-semibold mb-2">
                  {movie.genre} • ⭐ {movie.vote_average}
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">
                  {movie.title}
                </h2>

                <p className="text-gray-300 text-sm md:text-lg mb-6">
                  {movie.description}
                </p>

                <div className="flex gap-4">


                  <button onClick={() => navigate('/movies')} className="bg-white/20 backdrop-blur-md hover:bg-red-600 hover:scale-105 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer">
                    Explore Movies
                  </button>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HeroSection