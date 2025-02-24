import React, { useState } from "react";
import useSWR from "swr";
import "../App.css";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  const res2 = await res.json();
  console.log(res2);
  return res2.results;
};

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
// const Url = "https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1"

const MovieList = () => {
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    fetcher,
    { dedupingInterval: 120000 }
  );

  console.log(data);

  if (error) return <div>Error Occurred</div>;
  if (!data) return <div>Loading Movies</div>;

  return (
    <div className="movie-list-container">
      <h1>MovieList</h1>

      <section className="movie-list">
        {data.map((movie) => {
          return (
            <div key={movie.id} className="movie-card">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
              <p className="movie-title">{movie.title}</p>
            </div>
          );
        })}
      </section>
      <section className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </section>
    </div>
  );
};

export default MovieList;
