import { useEffect, useState } from "react";
import { getShows } from "../services/showsAPI";
import Show from "../components/Show";

const MainPage = () => {
  const [tvShows, setTVShows] = useState([]);
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) ?? []
  );

  const toggleWatchList = (showId) => {
    let newWatchList;
    if (watchList.includes(showId)) {
      newWatchList = watchList.filter((id) => id !== showId);
    } else {
      newWatchList = [...watchList, showId];
    }
    setWatchList(newWatchList);
    localStorage.setItem("watchList", JSON.stringify(newWatchList));
  };

  useEffect(() => {
    getShows()
      .then((shows) => setTVShows(shows))
      .catch((err) => console.log("error message"));
  }, []);

  return (
    <>
      <div className="titleList">
        <div className="title">
          <h1>Netflix</h1>
          <div className="titles-wrapper">
            {tvShows.length > 0
              ? tvShows[0].results.map((show) => (
                  <Show
                    key={show.id}
                    show={show}
                    toggleWatchList={toggleWatchList}
                    watchList={watchList}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
      <div className="titleList">
        <div className="title">
          <h1>Crave</h1>
          <div className="titles-wrapper">
            {tvShows.length > 0
              ? tvShows[1].results.map((show) => (
                  <Show
                    key={show.id}
                    show={show}
                    toggleWatchList={toggleWatchList}
                    watchList={watchList}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
      <div className="titleList">
        <div className="title">
          <h1>Disney</h1>
          <div className="titles-wrapper">
            {tvShows.length > 0
              ? tvShows[2].results.map((show) => (
                  <Show
                    key={show.id}
                    show={show}
                    toggleWatchList={toggleWatchList}
                    watchList={watchList}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
      <div className="titleList">
        <div className="title">
          <h1>Apple Plus</h1>
          <div className="titles-wrapper">
            {tvShows.length > 0
              ? tvShows[3].results.map((show) => (
                  <Show
                    key={show.id}
                    show={show}
                    toggleWatchList={toggleWatchList}
                    watchList={watchList}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
