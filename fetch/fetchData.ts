// actions
// now_playing, popular, top_rated, latest, up_coming, now_playing

export const fetchData = async (
  category: string,
  page: number = 1,
  action: string = "popular"
) => {
  const URL =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    action +
    "?api_key=" +
    process.env.API_KEY +
    "&language=en-US&page=" +
    page;
  try {
    const response = await fetch(URL);
    const results = await response.json();
    return results.results;
  } catch {
    console.log("error, get data on " + category);
  }
};
