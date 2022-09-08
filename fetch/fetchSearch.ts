export const fetchSearch = async (
  category: string | string[] | undefined,
  query: string
) => {
  const url =
    "https://api.themoviedb.org/3/search/" +
    category +
    "?api_key=" +
    process.env.API_KEY +
    "&language=en-US&query=" +
    query;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.log(error);
  }
};
