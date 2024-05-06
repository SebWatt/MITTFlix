import { Link } from "react-router-dom";
import image from "../image-not-available.jpg"

export default function Show({ show, toggleWatchList, watchList }) {
  const { poster_path, id, overview, name, vote_average } = show;
  return (
    <div className="movie">
      <Link to={`/details/${id}`}>
        <img
          src={poster_path === null ? image : `https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="Movie poster"
        />
        <div className="overlay">
          <div className="title">{name}</div>
          <div className="rating">{vote_average}/10</div>
          <div className="plot">{overview}</div>
        </div>
      </Link>
      <div
        data-toggled={watchList.includes(id)}
        className="listToggle"
        onClick={() => toggleWatchList(id)}
      >
        <div>
          <i className="fa fa-fw fa-plus"></i>
          <i className="fa fa-fw fa-check"></i>
        </div>
      </div>
    </div>
  );
}
