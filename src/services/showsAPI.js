const baseURL = "https://api.themoviedb.org/3";
const key = "6f8d2fa7f15db5b8e7ffc8f435da3641";

export const getShows = async () => {
  const res = await Promise.all([
    fetch(
      `${baseURL}/discover/tv?watch_region=CA&with_watch_providers=8&api_key=${key}`
    ),
    fetch(
      `${baseURL}/discover/tv?watch_region=CA&with_watch_providers=230&api_key=${key}`
    ),
    fetch(
      `${baseURL}/discover/tv?watch_region=CA&with_watch_providers=337&api_key=${key}`
    ),
    fetch(
      `${baseURL}/discover/tv?watch_region=CA&with_watch_providers=350&api_key=${key}`
    ),
  ]);

  const tvShowData = await Promise.all(res.map((r) => r.json()));

  return tvShowData;
};

export const findShow = async (id) => {
  if (id !== undefined) {
    const res = await fetch(`${baseURL}/tv/${id}?api_key=${key}`);

    const data = await res.json();
    return data;
  }
};

export const findShows = async (ids) => {
  if (ids !== undefined) {
    const res = await Promise.all(
      ids.map((showId) =>
        fetch(`${baseURL}/tv/${showId}?api_key=${key}`).then((r) => r.json())
      )
    );

    return res;
  }
};

export const searchShows = async (searchQuery, page) => {
  const res = await fetch(`${baseURL}/search/tv?query=${searchQuery}&page=${page}&api_key=${key}`);
  const searchData = await res.json()
  return searchData; 
};