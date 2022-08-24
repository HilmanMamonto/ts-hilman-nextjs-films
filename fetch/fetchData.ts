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
  const response = await fetch(URL);
  const results = await response.json();
  return results.results;
};
