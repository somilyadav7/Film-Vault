import { useEffect, useState } from "react";

import genreIds from "../Utility/Genre"

function Watchlist({ watchlist, setWatchlist, handleRemovefromWatchList }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(['All Genres'])
  const [currGenre, setCurrGenre] = useState('All Genres')

  let handleSearch = (e) => {
    setSearch(e.target.value)
  };

  let handleFilter = (genreList) => {
    setCurrGenre(genreList)
  }

  let sortIncreasing=()=>{
    let sortedIncreasing=watchlist.sort((movieA, movieB)=>{
      return movieA.vote_average-movieB.vote_average
    })
    setWatchlist([...sortedIncreasing])
  }

  let sortDecreasing=()=>{
    let sortedDecreasing=watchlist.sort((movieA, movieB)=>{
      return movieB.vote_average-movieA.vote_average
    })
    setWatchlist([...sortedDecreasing])
  }


  useEffect(()=>{
    let temp = watchlist.map((movieObj)=>{
      return genreIds[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGenre(['All Genres',...temp])
  },[watchlist])


  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genre.map((genreList,index)=>{
          return <div key={index} onClick={()=>handleFilter(genreList)} className={currGenre==genreList ? "flex justify-center h-[3rem] w-[9rem] rounded-xl bg-blue-400 text-white items-center mx-2":"flex justify-center h-[3rem] w-[9rem] rounded-xl bg-gray-400/50 text-white items-center mx-2"}>
          {genreList}
          </div>
        })}

      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for movies"
          className="h-[2.5rem] w-[18rem] bg-gray-100 outline-none px-4"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>Overview</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-1"><i className="fa-solid fa-arrow-up"></i></div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-1"><i className="fa-solid fa-arrow-down"></i></div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currGenre=='All Genres'){
                return true
              }else{
                return genreIds[movieObj.genre_ids[0]]==currGenre
              }
            })
              .filter((movieObj) =>
                movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((movieObj) => (
                <tr key={movieObj.id}
                style={{ borderBottom: '1px solid #ccc' }}>
                  <td className="flex items-center px-4 py-4">
                    <img
                      className="h-[25vh] w-[150px]"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={`${movieObj.title} Poster`}
                    />
                    <div className="mx-10">{movieObj.title}</div>
                  </td>
                  <td className="max-w-[250px] break-words">{movieObj.overview}</td>
                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>
                  <td>{genreIds[movieObj.genre_ids[0]]}</td>
                  <td onClick={()=>handleRemovefromWatchList(movieObj)} className="text-red-800">Delete</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
