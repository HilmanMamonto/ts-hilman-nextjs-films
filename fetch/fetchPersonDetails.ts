export const fetchPersonDetails = async (id: string) => {
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
  } catch {
    console.log("error get person details");
  }
};
