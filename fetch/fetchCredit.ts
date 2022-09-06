export const fetchCredit = async (
  id: number,
  category: string | string[] | undefined
) => {
  const url =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    id +
    "/credits?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch {
    console.log("error fetc credit");
  }
};
