import { useState, useEffect } from 'react';
import axios from 'axios';

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d02af8d0d09a5d7c7ba186135edac785&language=en-US&page=1`)
      .then(response => {
        const latestPopularMovie = response.data.results[0];
        setMovie(latestPopularMovie);
      })
      .catch(error => {
        console.error('Error fetching latest popular movie:', error);
      });
  }, []); 
  if (!movie) {
    return null; 
  }

  const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div
      className="h-[40vh] md:h-[85vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="text-white text-xl w-full text-center bg-gray-900/60 p-2">
        {movie.title}
      </div>
    </div>
  );
}

export default Banner;
