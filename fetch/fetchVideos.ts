export const fetchVideos = async <T>(category: T, id: T) => {
  const urlVideos =
    "https://api.themoviedb.org/3/" +
    category +
    "/" +
    id +
    "/videos?api_key=" +
    process.env.API_KEY +
    "&language=en-US";
  try {
    const videosResponse = await fetch(urlVideos);
    const videosResults = await videosResponse.json();
    const videos = videosResults.results;
    return videos;
  } catch (error) {
    console.log(error);
  }
};
