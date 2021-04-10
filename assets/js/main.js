const api_key = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";

async function fetchYoutubeData() {
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=the%20weeknd&key=${api_key}`;
  const response = await fetch(youtubeUrl);
  const data = await response.json();
  console.log(data.items[0]);
  console.log("test");
}

$(document).ready(function () {
  fetchYoutubeData();
});

async function fetchGeniusData() {
  const geniusSearchURL = `https://genius.p.rapidapi.com/search?q=Kendrick%20Lamar`;
  const geniusSearchResponse = await fetch(geniusSearchURL, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "03ecbc5b6bmsh6aa275f6ae95670p130bf3jsn42648f37f353",
      "x-rapidapi-host": "genius.p.rapidapi.com",
    },
  });
  const geniusSearchData = await geniusSearchResponse.json();
  console.log(geniusSearchData);
}

fetchGeniusData();

fetch("https://genius.p.rapidapi.com/songs/730771", {
  method: "GET",
  headers: {
    "x-rapidapi-key": "03ecbc5b6bmsh6aa275f6ae95670p130bf3jsn42648f37f353",
    "x-rapidapi-host": "genius.p.rapidapi.com",
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });
