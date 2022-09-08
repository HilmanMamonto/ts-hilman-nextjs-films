export const fetchSeasonDetails = async (
  id: string | string[] | undefined,
  season: string | string[] | undefined
) => {
  const url =
    "https://api.themoviedb.org/3/tv/" +
    id +
    "/season/" +
    season +
    "?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch {
    console.log("error get season details");
  }
};
