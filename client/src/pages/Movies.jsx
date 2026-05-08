import React from 'react'
import { dummyShowsData } from '../assets/dummyShowsData'
import MovieCard from '../components/MovieCard'
const Movies = () => {
  return dummyShowsData.length>0?(
   
    <div>
       <h1>Now Showing</h1>
       <div>
        {dummyShowsData.map((movie)=>(
        
         <MovieCard key={movie._id} movie={movie}/>
          
        ))}
       </div>
    </div>
  ):(
    <div>No Movies Found</div>
  )
}

export default Movies