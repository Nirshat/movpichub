import { useState } from "react";
import "./App.css";

import SearchIcon from "@mui/icons-material/Search";
import HeadLine from "./components/HeadLine";
import FootLine from "./components/FootLine";

const App = () => {
  const sampleTest = [
    {
      Title: "The Avengers",
      Year: "2012",
      imdbID: "tt0848228",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Endgame",
      Year: "2019",
      imdbID: "tt4154796",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Infinity War",
      Year: "2018",
      imdbID: "tt4154756",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Age of Ultron",
      Year: "2015",
      imdbID: "tt2395427",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
    },
    {
      Title: "The Avengers",
      Year: "1998",
      imdbID: "tt0118661",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
    },
    {
      Title: "Avengers Assemble",
      Year: "2012–2019",
      imdbID: "tt2455546",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg",
    },
  ];

  const [search, setSearch] = useState('');
  const [movieData, setMovieData] = useState(sampleTest);

  const [isLoading, setIsLoading] = useState(false);

  const callApi = () => {
    try {
      if (search !== "") {
        setIsLoading(true);
        fetch(`https://www.omdbapi.com/?s=${search}&apikey=fd09805a`)
          .then((res) => res.json())
          .then((data) => {
            if (data.Search && data.Search.length > 0) {
              setMovieData(data.Search);
            } else {
              setMovieData([]); // if no movies found
            }
            setIsLoading(false); // close the loading after fetching
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setIsLoading(false); // close the loading after fetching
          });
      } else {
        alert("Please insert a movie title.");
        setIsLoading(false); // close the loading after fetching
      }
    } catch (error) {
      console.error("No Movies found.");
      setIsLoading(false); // close the loading after fetching
    }
  };

  const filterReq = movieData.filter(
    (data) => data.Poster !== "N/A" && data.Type !== "series"
  );
  // to N/A value in Poster

  return (
    <>
      <div className="app-body">
        <HeadLine />

        <div className="searchbox">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Movie Title..."
          />
          <button onClick={callApi}>
            <SearchIcon />
          </button>
        </div>

        {isLoading == true ? (
          <div className="loading-box">
            <h2>Loading...</h2>
          </div>
        ) : (
          <div className={filterReq.length > 0 ? "imgs-box" : "imgs-box-null"}>
            {filterReq.length > 0 ? (
              filterReq.map((md, index) => (
                <div className="img-box" key={index}>
                  <div id="poster">
                    <img src={md.Poster} />
                  </div>
                  <h4 className="title">{md.Title}</h4>
                  <div className="year">{md.Year}</div>
                </div>
              ))
            ) : (
              <div className="no-movies">
                <h2>No Movies found.</h2>
              </div>
            )}
          </div>
        )}


        <br />
        <FootLine/>
      </div>
    </>
  );
};

export default App;
