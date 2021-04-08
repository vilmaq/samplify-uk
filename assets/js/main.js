const api_key = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";

async function fetchYoutubeData() {
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=the%20weeknd&key=${api_key}`;
  const response = await fetch(youtubeUrl);
  const data = await response.json();
  console.log(data);
}
