export const fetchVideos = async <T>(category: T, id: T) => {
  const url =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    id +
    "/videos?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const response = await fetch(url);
    const results = await response.json();
    const videos = results.results;
    return videos;
  } catch (error) {
    console.log(error);
  }
};
