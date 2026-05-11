import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  dummyShowsData,
  dummyDateTimeData,
} from "../assets/dummyShowsData";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);

  useEffect(() => {
    const movie = dummyShowsData.find(
      (m) => String(m._id) === String(id)
    );

    setShow({
      movie,
      dateTime: dummyDateTimeData,
    });
  }, [id]);

  if (!show?.movie) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6 lg:px-14 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-[250px] h-[250px] bg-red-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-32 right-10 w-[250px] h-[250px] bg-red-600/20 blur-[120px] rounded-full" />

      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        
        {/* Movie Poster */}
        <img
          src={show.movie.backdrop_path}
          alt={show.movie.title}
          className="w-[260px] h-[390px] object-cover rounded-3xl shadow-2xl"
        />

        {/* Movie Details */}
        <div className="max-w-xl">
          <p className="text-red-500 uppercase text-sm mb-2">
            English
          </p>

          <h1 className="text-5xl font-bold mb-4">
            {show.movie.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <Star size={18} fill="currentColor" />
            <span className="font-medium">
              {show.movie.rating} User Rating
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 leading-7 mb-5">
            A cinematic masterpiece with stunning visuals,
            immersive storytelling and unforgettable
            performances.
          </p>

          {/* Runtime + Genre */}
          <p className="text-gray-300 text-sm mb-6">
            {show.movie.runtime} •{" "}
            {show.movie.genres
              .map((g) => g.name)
              .join(", ")}{" "}
            •{" "}
            {new Date(
              show.movie.release_date
            ).getFullYear()}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
              Watch Trailer
            </button>

            <button className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>

      {/* CAST SECTION */}
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="font-semibold text-lg mb-8 text-red-500">
          Your Favorite Cast
        </h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="text-center min-w-[70px]"
              >
                <img
                  src={`https://randomuser.me/api/portraits/men/${
                    i + 1
                  }.jpg`}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover border border-zinc-700"
                />

                <p className="text-xs mt-2 text-gray-300">
                  Actor Name
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* DATE BAR */}
      <div className="max-w-7xl mx-auto mt-16 bg-[#2a0d14] border border-red-900 rounded-2xl p-6 flex justify-between items-center">
        
        <div>
          <h3 className="font-semibold mb-4">
            Choose Date
          </h3>

          <div className="flex items-center gap-4">
            <button>
              <ChevronLeft />
            </button>

            {show.dateTime.map((date, index) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedDate(index)
                }
                className={`w-16 h-16 rounded-xl border transition ${
                  selectedDate === index
                    ? "bg-red-600 border-red-600"
                    : "border-zinc-700"
                }`}
              >
                <p className="text-xs">
                  {date.dayOfWeek}
                </p>

                <p className="font-bold">
                  {date.date}
                </p>
              </button>
            ))}

            <button>
              <ChevronRight />
            </button>
          </div>
        </div>

        <button
          onClick={() =>
            navigate(
              `/seat-layout/${show.movie._id}`
            )
          }
          className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-xl font-medium"
        >
          Book Now
        </button>
      </div>

      {/* RECOMMENDED */}
<div className="max-w-7xl mx-auto mt-20">
  <h2 className="font-semibold text-2xl mb-8 text-red-500">
    You May Also Like
  </h2>

  <div
    className="
      flex gap-6 overflow-x-auto overflow-y-hidden
      scroll-smooth pb-3
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-black
      [&::-webkit-scrollbar-thumb]:bg-black
      [&::-webkit-scrollbar-thumb]:rounded-full
    "
  >
    {dummyShowsData
      .filter((m) => m._id !== show.movie._id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
      .map((movie) => (
        <div
          key={movie._id}
          onClick={() =>
            navigate(`/movies/${movie._id}`)
          }
          className="
            min-w-[260px]
            bg-zinc-900 rounded-2xl
            overflow-hidden cursor-pointer
            hover:scale-105 transition duration-300
            flex-shrink-0
          "
        >
          {/* Movie Image */}
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className="h-[220px] w-full object-cover"
          />

          {/* Movie Content */}
          <div className="p-4">
            <h3 className="font-semibold truncate text-lg">
              {movie.title}
            </h3>

            <p className="text-xs text-gray-400 mt-2">
              {movie.genres
                .map((g) => g.name)
                .join(", ")}
            </p>

            {/* Bottom Section */}
            <div className="flex justify-between items-center mt-4">
              
              {/* BUY TICKETS */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(
                    `/movies/${movie._id}`
                  )
                }}
                className="
                  bg-red-600 hover:bg-red-500
                  px-4 py-2 rounded-xl
                  text-sm font-medium
                  transition
                "
              >
                Buy Tickets
              </button>

              <span className="text-red-400 text-sm font-medium">
                ⭐ {movie.rating}
              </span>
            </div>
          </div>
        </div>
      ))}
  </div>

  <div className="flex justify-center mt-12">
    <button
      onClick={() => navigate("/movies")}
      className="
        bg-red-600 hover:bg-red-500
        px-8 py-3 rounded-xl
        transition duration-300
      "
    >
      Show More
    </button>
  </div>
</div>
    </div>
  );
};

export default MovieDetails;