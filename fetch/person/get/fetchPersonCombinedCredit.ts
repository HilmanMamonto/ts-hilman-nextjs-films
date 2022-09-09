export const fetchPersCombinedCredit = async (id: string) => {
  const url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/combined_credits?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch {
    console.log("error get person combined credit");
  }
};
