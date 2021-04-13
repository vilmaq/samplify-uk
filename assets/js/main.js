const userInput = "the%20weeknd"
const youtubeApiKey = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";
const geniusHeaderObject = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "03ecbc5b6bmsh6aa275f6ae95670p130bf3jsn42648f37f353",
    "x-rapidapi-host": "genius.p.rapidapi.com",
  },
};
let geniusRequestedData;
let youtubeRequestedData;

async function fetchYoutubeData() {
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&key=${youtubeApiKey}`;
  const response = await fetch(youtubeUrl);
  const data = await response.json();
  const youtubeResultPath = data.items[0].snippet;
  youtubeRequestedData = {
    title: youtubeResultPath.title,
    channelTitle: youtubeResultPath.channelTitle,
    uploadTime: youtubeResultPath.publishTime,
    thumbnail: youtubeResultPath.thumbnails.high.url,
    videoId: data.items[0].id.videoId,
  };
  console.log(youtubeRequestedData);
  // console.log(data.items[0]);
  // console.log("test");
}

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

    //needs to return artwork, then song name, then artist, then release year/date(optional)
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

  // target the input id 
  const getLocalStorageData = () => {
    const localStorageData = JSON.parse(localStorage.getItem("userInput"))
    if (localStorageData === null) {
      return []
    } else 
      return localStorageData
  }
  
  
  const onSubmit = async (event) => {
  event.preventDefault();
  const container = $(".swiper-container")
  container.empty()
  
  const card = ""

  container.append(card)

  // fetchYoutubeData() 
  // fetchGeniusIDData()
  // displaySearchCards()
};


$("#search-input").on("submit",onSubmit)
fetchGeniusIDData();

$(document).ready(function () {
  fetchYoutubeData();
});