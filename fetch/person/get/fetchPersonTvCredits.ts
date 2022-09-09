export const fetchPersonTvCredits = async (id: string) => {
  const url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/tv_credits?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch {
    console.log("error get person tv credits");
  }
};
