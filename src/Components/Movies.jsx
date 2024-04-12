/* eslint-disable react/prop-types */

import axios from "axios"
import MovieCard from "./MovieCard"
import { useEffect, useState } from "react"
import Page from "./Page"

function Movies({handleAddtoWatchList, handleRemovefromWatchList, watchlist}) {

  const [movies, setMovies] = useState([])
  const [pageNo, setPageNo] = useState(1)

  const handlePrev = ()=>{
    if(pageNo==1){
      setPageNo(1)
    }else{
      setPageNo(pageNo-1)
    }
  }

  const handleNext = ()=>{
    setPageNo(pageNo+1)
  }

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d02af8d0d09a5d7c7ba186135edac785&language=en-US&page=${pageNo}`).then(function(res){
      setMovies(res.data.results)
    })
  },[pageNo])

  return (
    <div className="p-2">
      <div className="text-2xl text-center mb-5">
        Trending Movies
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movieObj) => (
          <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchList={handleAddtoWatchList} handleRemovefromWatchList={handleRemovefromWatchList} watchlist={watchlist} />
        ))}
      </div>
      <Page pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>


  )
}

export default Movies

// https://api.themoviedb.org/3/movie/popular?api_key=d02af8d0d09a5d7c7ba186135edac785&language=en-US&page=1