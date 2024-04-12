import { useEffect, useState } from "react";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Navbar from "./Components/Navbar";
import Watchlist from "./Components/Watchlist";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  let [watchlist, setWatchlist] = useState([])

  let handleAddtoWatchList = (movieObj) =>{
    let newWatchList = [...watchlist,movieObj]
    localStorage.setItem('moviesApp', JSON.stringify(newWatchList))
    setWatchlist(newWatchList)
    console.log(newWatchList)
  }

  let handleRemovefromWatchList=(movieObj)=>{
    let filteredWatchList = watchlist.filter((movie)=>{
      return movie.id != movieObj.id
    })

    setWatchlist(filteredWatchList)

    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchList))

  }

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchlist(JSON.parse(moviesFromLocalStorage))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies handleAddtoWatchList={handleAddtoWatchList} handleRemovefromWatchList={handleRemovefromWatchList} watchlist={watchlist} /> 
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist  watchlist={watchlist} setWatchlist={setWatchlist} handleRemovefromWatchList={handleRemovefromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
