import { useEffect, useState } from "react";
import { findShows } from "../services/showsAPI";
import Show from "../components/Show";

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);
  const [watchIds, setWatchIds] = useState(
    JSON.parse(localStorage.getItem("watchList") ?? [])
  );

  const toggleWatchIds = (showId) => {
    let newWatchList;
    if (watchIds.includes(showId)) {
      newWatchList = watchIds.filter((id) => id !== showId);
    } else {
      newWatchList = [...watchIds, showId];
    }
    setWatchIds(newWatchList);
    localStorage.setItem("watchList", JSON.stringify(newWatchList));
  };

  useEffect(() => {
    findShows(watchIds).then((resonse) => setWatchList(resonse));
  }, [watchIds]);

  return (
    <>
      <div className="titleList">
        <div className="title">
          <h1>My Watch List</h1>
          <div className="titles-wrapper">
            {watchList.map((show) => (
              <Show
                key={show.id}
                show={show}
                watchList={watchIds}
                toggleWatchList={toggleWatchIds}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchList;
