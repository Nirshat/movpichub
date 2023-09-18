import { useState } from "react";
import "./App.css";

import SearchIcon from "@mui/icons-material/Search";
import HeadLine from "./components/HeadLine";
import FootLine from "./components/FootLine";

const App = () => {
  const sampleTest = [
    {
      "Title": "Kung Fu Panda",
      "Year": "2008",
      "imdbID": "tt0441773",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda 2",
        "Year": "2011",
        "imdbID": "tt1302011",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYzQ0ZWIxZjAtYWI3Yy00MGM0LWFjOGYtNzcyYThiOTA3ODI1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda 3",
        "Year": "2016",
        "imdbID": "tt2267968",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda: Secrets of the Furious Five",
        "Year": "2008",
        "imdbID": "tt1287845",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjQwMWNmYWUtY2E5NS00OTlkLWI2Y2MtNzhjZDUyYmZhZDVjXkEyXkFqcGdeQXVyNjc2MjYzMTY@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda: Legends of Awesomeness",
        "Year": "2011–2016",
        "imdbID": "tt1545214",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMDU2ZmMwNDktZTQyNi00MmI3LTkxZGUtYjEzYjM0ODgyNmU2XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda Holiday",
        "Year": "2010",
        "imdbID": "tt1702433",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMDg4YTg2MDktYjBmMi00ZTE5LTliZTktNGZmN2JkYmM0YzEwXkEyXkFqcGdeQXVyODMxNzcyNDI@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda: Secrets of the Masters",
        "Year": "2011",
        "imdbID": "tt1980162",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNjZmMWU3NDgtYTQ0MC00YzdlLTg0YWUtMDRkMTVlMzhhYTRlXkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda: Secrets of the Scroll",
        "Year": "2016",
        "imdbID": "tt5513770",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTA2ZmJjNDUtOWJjZC00ZWY5LTg1MGUtODMzODVkZmIyYTE1XkEyXkFqcGdeQXVyNjIzODI5OTQ@._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda: The Dragon Knight",
        "Year": "2022–",
        "imdbID": "tt18783984",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOGE1MWRiYzctYjQ3MC00YWI1LTg1MTgtMjUwYzRmMzI0NGIwXkEyXkFqcGdeQXVyMTQ3NDcxMzg4._V1_SX300.jpg"
    },
    {
        "Title": "Kung Fu Panda: The Paws of Destiny",
        "Year": "2018–2019",
        "imdbID": "tt8271176",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZjBmYWMwYzMtZTRkMi00MjRhLTk3MmItZTkzYmNiYzdlMjhiXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
    }
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
