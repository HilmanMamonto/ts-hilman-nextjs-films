export const fetchReview = async (
  category: string | string[] | undefined,
  id: number
) => {
  const url =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    id +
    "/reviews?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch {
    console.log("fetch review error");
  }
};
