import React, { useEffect, useRef, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import toast from "react-hot-toast";

import { dummyShowsData } from "../../assets/dummyShowsData";
import Title from "../../components/admin/Title";
import timeFormat from "../../lib/timeFormat";
import { useAppContext } from "../../context/AppContext";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const {axios,getToken,user,image_base_url}=useAppContext();
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [showPrice, setShowPrice] = useState("");
  const [addingShow, setAddingShow] = useState(false);

  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const fetchNowPlayingMovies = async () => {
    try{
          const {data}=await axios.get('/api/show/now-playing',{headers:{
            Authorization:`Bearer ${await getToken()}`
          }})
          if(data.success){
            setNowPlayingMovies(data.movies);
          }
          ;
    }
    catch(error){
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const handleAddTime = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      dateRef.current?.showPicker();
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a time");
      timeRef.current?.showPicker();
      return;
    }

    setDateTimeSelection((prev) => {
      const existingTimes = prev[selectedDate] || [];

      if (existingTimes.includes(selectedTime)) {
        toast.error("Time already added");
        return prev;
      }

      return {
        ...prev,
        [selectedDate]: [...existingTimes, selectedTime],
      };
    });

    setSelectedTime("");

    // reopen time picker for fast entry
    setTimeout(() => {
      timeRef.current?.showPicker();
    }, 100);
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);

      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };
    const handleSubmit = async ()=>{
        try {
            setAddingShow(true)

            if(!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice){
                return toast('Missing required fields');
            }

            const showsInput = Object.entries(dateTimeSelection).map(([date, time])=> ({date, time}));

            const payload = {
                movieId: selectedMovie,
                showsInput,
                showPrice: Number(showPrice)
            }

            const { data } = await axios.post('/api/show/add', payload, {headers: { Authorization: `Bearer ${await getToken()}` }})

            if(data.success){
                toast.success(data.message)
                setSelectedMovie(null)
                setDateTimeSelection({})
                setShowPrice("")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error('An error occurred. Please try again.')
        }
        setAddingShow(false)
    }

  return nowPlayingMovies.length > 0 ? (
    <div className="text-white min-h-screen pb-10">
      <Title
        title="Add New Show"
        subtitle="Select a movie and schedule your show"
      />

      {/* Movies */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-5 text-red-500">
          Now Playing Movies
        </h2>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 w-max">
            {nowPlayingMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie.id)}
                className={`w-[170px] shrink-0 cursor-pointer transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden bg-zinc-900 border
                ${
                  selectedMovie === movie.id
                    ? "border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.55)] scale-105"
                    : "border-zinc-800 hover:border-red-500"
                }`}
              >
                <div className="relative">
                  <img
                    src={image_base_url+movie.poster_path}
                    alt={movie.title}
                    className="w-full h-[280px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 rounded-full text-sm text-yellow-400 font-medium">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </div>

                  {selectedMovie === movie.id && (
                    <div className="absolute top-3 right-3 h-10 w-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg animate-pulse text-lg font-bold">
                      ✓
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="font-bold text-sm truncate text-white">
                    {movie.title}
                  </h3>

                  <div className="mt-2 text-sm text-zinc-400 space-y-1">
                    <p>📅 {movie.release_date}</p>
                    <p>⏱ {timeFormat(movie.runtime)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show Details */}
      <div className="mt-8 bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-[2rem] p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-red-500 mb-8">
          Show Details
        </h2>

        {/* Price */}
        <div className="mb-10">
          <label className="block text-zinc-300 mb-3 font-medium">
            Ticket Price
          </label>

          <div className="max-w-sm flex items-center bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 focus-within:border-red-500 transition-all">
            <span className="text-red-500 font-bold text-lg mr-3">
              {currency}
            </span>

            <input
              type="number"
              min={0}
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
              placeholder="Enter ticket price"
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h3 className="text-xl font-semibold text-red-500 mb-5">
            Schedule Show
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Date Picker */}
            <div>
              <p className="text-sm text-zinc-400 mb-2">
                Select Date
              </p>

              <div
                onClick={() => dateRef.current?.showPicker()}
                className="group bg-zinc-950 border border-zinc-700 hover:border-red-500 rounded-3xl px-5 py-5 flex justify-between items-center cursor-pointer transition-all"
              >
                <div>
                  <p className="text-zinc-500 text-sm">
                    Show Date
                  </p>

                  <p className="text-white font-medium text-sm mt-0.5">
                    {selectedDate || "Choose a date"}
                  </p>
                </div>

                <CalendarDays className="text-red-500 group-hover:scale-110 transition duration-300" />

                <input
                  ref={dateRef}
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setSelectedDate(e.target.value)
                  }
                  className="absolute opacity-0 pointer-events-none"
                />
              </div>
            </div>

            {/* Time Picker */}
            <div>
              <p className="text-sm text-zinc-400 mb-2">
                Select Time
              </p>

              <div
                onClick={() => timeRef.current?.showPicker()}
                className="group bg-zinc-950 border border-zinc-700 hover:border-red-500 rounded-3xl px-5 py-5 flex justify-between items-center cursor-pointer transition-all"
              >
                <div>
                  <p className="text-zinc-500 text-sm">
                    Show Time
                  </p>

                  <p className="text-white font-medium text-lg mt-1">
                    {selectedTime || "Choose a time"}
                  </p>
                </div>

                <Clock3 className="text-red-500 group-hover:scale-110 transition duration-300" />

                <input
                  ref={timeRef}
                  type="time"
                  value={selectedTime}
                  onChange={(e) =>
                    setSelectedTime(e.target.value)
                  }
                  className="absolute opacity-0 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Add Time */}
          <button
            onClick={handleAddTime}
            className="mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 transition-all duration-300 px-5 py-2.5 rounded-xl font-semibold shadow-xl shadow-red-900/40"
          >
            Add Time
          </button>
        </div>

        {/* Selected Slots */}
        {Object.keys(dateTimeSelection).length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-zinc-200 mb-5">
              Selected Show Slots
            </h3>

            <div className="space-y-5">
              {Object.entries(dateTimeSelection).map(
                ([date, times]) => (
                  <div
                    key={date}
                    className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5"
                  >
                    <h4 className="text-red-400 font-semibold mb-4">
                      {date}
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      {times.map((time) => (
                        <div
                          key={time}
                          className="flex items-center gap-3 bg-red-950/30 border border-red-700 rounded-2xl px-5 py-3 hover:scale-105 transition"
                        >
                          <span className="text-sm">
                            {time}
                          </span>

                          <button
                            onClick={() =>
                              handleRemoveTime(date, time)
                            }
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={addingShow}
          className="mt-10 bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 transition-all duration-300 px-10 py-4 rounded-2xl font-semibold shadow-xl shadow-red-900/40 disabled:opacity-50"
        >
          {addingShow ? "Adding Show..." : "Add Show"}
        </button>
      </div>
    </div>
  ) : (
    <div className="text-white">Loading...</div>
  );
};

export default AddShows;