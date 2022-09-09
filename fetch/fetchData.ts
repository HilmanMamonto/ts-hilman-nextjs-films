// actions
// now_playing, popular, top_rated, latest, up_coming, now_playing

export const fetchData = async <T>(
  category: T,
  page: number = 1,
  action: string = "popular"
) => {
  const API_KEY = "c46408d4e820fa759d94c6a6aeddedd0";
  const URL =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    action +
    "?api_key=" +
    API_KEY +
    "&language=en-US&page=" +
    page;
  try {
    const response = await fetch(URL);
    const results = await response.json();
    return results.results;
  } catch (error) {
    console.log(error);
  }
};
