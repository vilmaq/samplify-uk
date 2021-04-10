const api_key = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";
const geniusHeaderObject = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "03ecbc5b6bmsh6aa275f6ae95670p130bf3jsn42648f37f353",
    "x-rapidapi-host": "genius.p.rapidapi.com",
  },
};
let geniusRequestedData;

async function fetchYoutubeData() {
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=the%20weeknd&key=${api_key}`;
  const response = await fetch(youtubeUrl);
  const data = await response.json();
  // console.log(data.items[0]);
  // console.log("test");
}

$(document).ready(function () {
  fetchYoutubeData();
});

async function fetchGeniusData() {
  const geniusSearchURL = `https://genius.p.rapidapi.com/search?q=Kendrick%20Lamar`;
  const geniusSearchResponse = await fetch(geniusSearchURL, geniusHeaderObject);
  const geniusSearchData = await geniusSearchResponse.json();
  // console.log(geniusSearchData);

  const geniusResultPath = geniusSearchData.response.hits[0].result;

  geniusRequestedData = {
    idSong: geniusResultPath.id,
    titleSong: geniusResultPath.full_title,
    artImage: geniusResultPath.song_art_image_url,
  };
  console.log(geniusRequestedData);
}

fetchGeniusData();

async function fetchGeniusIDData() {
  const geniusIDURL = `https://genius.p.rapidapi.com/songs/730771`;
  const geniusIDResponse = await fetch(geniusIDURL, geniusHeaderObject);
  const geniusIDData = await geniusIDResponse.json();
  // console.log(geniusIDData);
}

fetchGeniusIDData();
