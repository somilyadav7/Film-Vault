function MovieCard({movieObj, poster_path, name, handleAddtoWatchList, handleRemovefromWatchList, watchlist}) {
  
  function doesContain(movieObj){
    for(let i=0; i<watchlist.length; i++)
    {
      if(watchlist[i].id==movieObj.id){
        return true;
      }
    }
    return false;
  }
  
  return (
    <div className="overflow-hidden h-[45vh] w-[165px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${poster_path})`}}>
      
      {doesContain(movieObj)?
      <div onClick={()=>(handleRemovefromWatchList(movieObj))} className="m-2 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60">
        &#10060;
      </div> : 
      <div onClick={()=>(handleAddtoWatchList(movieObj))} className="m-2 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60">
        &#128525;
      </div>
      }
      
      
      <div className=" text-white text w-full p-1 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  )
}

export default MovieCard


