export const fetchFilmDetails = async <T>(category: T, id: T) => {
  const URL =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    id +
    "?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};
