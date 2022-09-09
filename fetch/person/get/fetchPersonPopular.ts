export const fetchPersonPopular = async (id: string) => {
  const url =
    "https://api.themoviedb.org/3/" +
    id +
    "/popular?api_key=" +
    process.env.API_KEY +
    "&language=en-US&page=1";
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch {
    console.log("error get person combined credit");
  }
};
