export const fetchPersonDetails = async <T>(id: T) => {
  const url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(url);
    const results = response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};
