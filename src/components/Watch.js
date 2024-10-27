// import  { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import useMovieTrailer from "../hooks/useMovieTrailer";
// import {  API_OPTIONS, LOGO } from "../utils/constants";
// import { useParams } from "react-router-dom";
// import { addTrailerVideo } from "../utils/moviesSlice";
// import MovieList from "./MovieList";

// const Watch = (movieId) => {
//   const dispatch = useDispatch();
//   const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
//   useMovieTrailer(movieId);
//   const { movieID } = useParams();
//   const [recommendations, setRecommendations] = useState([]); // Initialize as an empty array
 

//   const fetchData = async () => {
//     const data = await fetch('https://api.themoviedb.org/3/movie/' +
//     movieID +
//     '/videos?language=en-US',
//       API_OPTIONS
//     );
//     const json = await data.json();
//     // console.log(json)
//     const filterData = json.results.filter((video) => video.type === "Trailer");
//     const trailer = filterData.length ? filterData[0] : json.results[0]
//     dispatch(addTrailerVideo(trailer));
//   };



//   const getMovieSuggestions = async () => {
//     try {
//       const response = await fetch(
//         'https://api.themoviedb.org/3/movie/' +
//     movieID + '/recommendations?language=en-US&page=1',
//         API_OPTIONS
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const media = await response.json();
//       setRecommendations(media.results);
//       // console.log(media)
//     } catch (error) {
//       // console.error("Error fetching data:", error);
     
//     }
//   };
//   useEffect(() => {
//     fetchData();
//     getMovieSuggestions();
//   }, [movieID]);
 

//   return (
//     <>
//     <div className="absolute  px-8 py-2 bg-gradient-to-b from-black flex flex-col md:flex-row  top-0 left-0  w-full  z-50">
//       <a href="/" className=" text-white">
//         <img className="w-60 mx-auto m  md:mx-0 " src={LOGO} alt="logo" />
//       </a>
//       </div>
//       <div className=" md:h-screen min-w-full max-w-full mt-[-4rem]">
//         <iframe
//           className="h-[416px] md:h-[calc(100%-0px)] w-full pt-[118px] md:pt-[70px]"
//           src={"https://www.youtube.com/embed/" +
//           trailerVideo?.key +
//           "?&autoplay=1&mute=1"}
//           title="YouTube video player"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//         ></iframe>
//       </div>

//       <div className="  bg-black text-white bg-opacity-90">
//       <MovieList title="Recommendations" movies={recommendations} />
//       </div>
//     </>
//   );
// };

// export default Watch;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { API_OPTIONS, LOGO } from "../utils/constants";
import { useParams } from "react-router-dom";
import { addTrailerVideo } from "../utils/moviesSlice";
import MovieList from "./MovieList";

const Watch = () => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const { movieID } = useParams();
  const [recommendations, setRecommendations] = useState([]);

  const movies = useSelector((store) => store.movies);

  const fetchData = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        movieID +
        '/videos?language=en-US',
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results?.filter((video) => video.type === "Trailer");
    const trailer = filterData?.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  const getMovieSuggestions = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/' +
          movieID +
          '/recommendations?language=en-US&page=1',
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const media = await response.json();
      setRecommendations(media.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getMovieSuggestions();
  }, [movieID]);

  return (
    <>
      {/* Navbar styling */}
      <div className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent px-6 py-3 md:px-8 md:py-4 flex justify-between items-center">
        <a href="/" className="text-white">
          <img className="w-36 md:w-48" src={LOGO} alt="logo" />
        </a>
      </div>

      {/* Trailer section */}
      <div className="relative md:h-screen min-w-full max-w-full mt-[-4rem]">
        <iframe
          className="h-[300px] md:h-full w-full mt-[4rem] md:mt-0"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Recommendations section styling */}
      <div className="bg-gradient-to-t  from-gray-900 to-black text-white p-0 md:p-8 lg:p-8 space-y-4">
        {/* <h2 className="text-lg md:text-2xl font-semibold text-center md:text-left">Recommendations</h2> */}
        <MovieList title="Recommendations" movies={recommendations} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      </div>
    </>
  );
};

export default Watch;
