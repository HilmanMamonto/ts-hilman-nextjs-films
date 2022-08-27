export const fetchWatchProviders = async <T>(category: T, id: T) => {
  const url =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    id +
    "/watch/providers?api_key=" +
    process.env.API_KEY;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.log(error);
  }
};
