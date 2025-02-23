import React, { useState } from 'react';
import useSWR from 'swr';
import "../App.css";

const fetcher = async (url) => {
    const res = await fetch(url);
    const res2 = await res.json();
    console.log(res2);
    return res2.results;
}

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";
// const Url = "https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1"

// const MovieList = () => {

//   const [page, setPage] = useState(1)


//   const {data, error} = useSWR(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,fetcher, 
//     {dedupingInterval: 120000}
//   );

//   console.log(data);

//   if(error) return <div>Error Occurred</div>
  
//   return (
//     <div>
//         <h1>MovieList</h1>
//         {!data && <p>Loading Movies...</p>}
//         <ul className='movie-list'>
//             {data.map((movie) => {
//                 return (
//                     <div key={movie.id}>
//                         <p>{movie.title}</p>
//                     </div>
//                 )
//             })}
//         </ul>
//         <section>
//             <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
//             <button onClick={() => setPage(page + 1)}>Next</button>
//         </section>
//     </div>
//   )
// }

// export default MovieList



const MovieList = () => {
  const [page, setPage] = useState(1);

  // SWR returns { data, error } (no 'loading' property; use !data && !error instead)
  const { data, error } = useSWR(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    fetcher,
    { dedupingInterval: 120000 }
  );

  if (error) return <div>Error Occurred</div>;
  if (!data) return <div>Loading Movies...</div>;

  return (
    <div>
      <h1>MovieList</h1>
      <ul className='movie-list'>
        {data.map((movie) => {
          return (
            <div key={movie.id}>
              <p>{movie.title}</p>
            </div>
          );
        })}
      </ul>
      <section>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </section>
    </div>
  );
};

export default MovieList;
