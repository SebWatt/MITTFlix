import { useEffect, useState } from "react";
import Show from "../components/Show";
import { useLocation, useNavigate } from "react-router-dom";
import { searchShows } from "../services/showsAPI";

const SearchPage = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const searchQuery = search.get("query");
  const numQuery = search.get("page") ?? 1;
  const navigator = useNavigate();

  const [shows, setShows] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pages, setPages] = useState(1);
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) ?? []
  );

  useEffect(() => {
    searchShows(searchQuery, numQuery)
      .then((response) => {
        setPageNum(1);
        setPages(response.total_pages);
        setShows(response.results);
        if (response.total_pages >= numQuery) {
          navigator(`../search?query=${searchQuery}&page=${numQuery}`);
          setPageNum(parseInt(numQuery, 10));
        } else {
          setPageNum(parseInt(numQuery, 10));
        }
      })
      .catch((err) => console.log(err));
  }, [searchQuery]);

  useEffect(() => {
    searchShows(searchQuery, pageNum)
      .then((response) => {
        setPages(response.total_pages);
        setShows(response.results);
        navigator(`../search?query=${searchQuery}&page=${pageNum}`);
      })
      .catch((err) => console.log(err));
  }, [pageNum]);

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

  console.log(pageNum);
  if (shows !== undefined) {
    return (
      <>
        <div className="titleList">
          <div className="title">
            <h1>Results</h1>
              {pages >= pageNum ? 
              <>
            <div className="titles-wrapper">
                {shows.map((show) => (
                  <Show
                    show={show}
                    key={show.id}
                    toggleWatchList={toggleWatchList}
                    watchList={watchList}
                  />
                ))}
            </div>
            
            {pageNum === 1 ? (
              ""
            ) : (
              <button onClick={() => setPageNum(pageNum - 1)}>-</button>
            )}
            {pages > 1
              ? Array.from({ length: pages + 1 }, (page, index) =>
                  index > 0 ? (
                    <button key={index} onClick={() => setPageNum(index)}>
                      <p style={{ color: "black" }}>{index}</p>
                    </button>
                  ) : (
                    ""
                  )
                )
              : ""}
            {pages !== pageNum ? (
              <button onClick={() => setPageNum(pageNum + 1)}>+</button>
            ) : (
              <h1>End of Results</h1>
            )
            }
            </>
            : (
                <h1>
                  Error: Enter a Number smaller or equal to {pages} in the URL
                </h1>
              )}
          </div>
        </div>
      </>
    );
  }
};

export default SearchPage;
