import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findShow } from "../services/showsAPI";

const DetailsPage = (show) => {
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

  const [showProperties, setShowProperties] = useState({});
  const showId = useParams(show);
  useEffect(() => {
    findShow(showId.id).then((response) => setShowProperties(response));
  }, [showId]);

  useParams(show);
  return (
    <>
      <div className="show-details">
        <img
          src={`https://image.tmdb.org/t/p/original/${showProperties.poster_path}`}
          alt=""
        />
        <div className="show-details-inner">
          <h1>{showProperties.name}</h1>
          <div className="description">{showProperties.overview}</div>
          <button
            className={
              watchList.includes(showProperties.id)
                ? "remove-to-watchlist"
                : "add-to-watchlist"
            }
            onClick={() => toggleWatchList(showProperties.id)}
          >
            {watchList.includes(showProperties.id)
              ? "- Remove from watch list"
              : "+ Add to watch list"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
