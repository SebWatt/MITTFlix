import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  const navigator = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigator(`../search?query=${searchValue}`);
  };

  return (
    <form id="search" className="search" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Search for a title..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <div className="searchResults"></div>
    </form>
  );
}
