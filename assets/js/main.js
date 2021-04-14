// genreCards.forEach(console.log(id));

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
  let userInput = $("#search-input").val();
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
}

async function fetchGeniusData(userInput) {
  const geniusSearchURL = `https://genius.p.rapidapi.com/search?q=${userInput}`;
  const geniusSearchResponse = await fetch(geniusSearchURL, geniusHeaderObject);
  const geniusSearchData = await geniusSearchResponse.json();
  let geniusResultPath = geniusSearchData.response;
  console.log(geniusSearchData);
  return (geniusRequestedData = {
    // idSong: geniusResultPath.result.id,
    // titleSong: geniusResultPath.result.full_title,
    // artImage: geniusResultPath.result.song_art_image_url,
    // artist: geniusResultPath.result.primary_artist.name,
    hits: geniusResultPath.hits,

    //needs to return artwork, then song name, then artist, then release year/date(optional)
  });
}

async function fetchGeniusIDData() {
  const geniusIDURL = `https://genius.p.rapidapi.com/songs/730771`;
  const geniusIDResponse = await fetch(geniusIDURL, geniusHeaderObject);
  const geniusIDData = await geniusIDResponse.json();
}

// target the input id
const getLocalStorageData = () => {
  const localStorageData = JSON.parse(localStorage.getItem("userInput"));
  if (localStorageData === null) {
    return [];
  } else return localStorageData;
};

const onDelete = (eachGenre) => {
  const container = $(".cards-container");
  container.empty();
  const swipeCard = `<div class="swiper-container">
    <div class="swiper-wrapper">
    <div class="swiper-slide" style= "background-image:url("${eachGenre.albumArtwork}")" >
    </div>
    <div class="swiper-slide"></div>
    <div class="swiper-slide"></div>
    <div class="swiper-slide"></div>
    <div class="swiper-slide"></div>
    <div class="swiper-slide"></div>
    <div class="swiper-slide"></div>
    <div class="swiper-slide"></div>
    <div class="swiper-slide"></div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  </div>`;

  container.append(swipeCard);
  homePageSliders();
};

const renderMainCard = (geniusData) => {
  const container = $(".cards-container");
  container.empty();
  for (let i = 0; i < 6; i++) {
    const card = `<div class="searchCardContainer is-mobile"> 
    <div class="card">
      <div class="card-image" style="background-image: url('${geniusData.hits[i].result.song_art_image_url}');"><button class="delete is-large"></button></div>
      <div class="card-text content is-normal">
        <h1>${geniusData.hits[i].result.full_title}</h1>
        <h3 class="subtitle">Artist: ${geniusData.hits[i].result.primary_artist.name}</h3>
        <h3 class="subtitle">Release Date: WIP</h3>
      </div>
        <div class="card-footer">
          <div class="card-footer-item">
            <span>
              Add to <a>Favorites</a>
            </span>
          </div>
          <div class="card-footer-item">
            <span>
              Share on <a href="#">Facebook</a>
            </span>
          </div>
        </div>
    </div>
  </div>`;
    container.append(card);
    console.log(geniusData.hits[i].result.full_title);
  }
};

const onSubmit = async (event) => {
  event.preventDefault();
  let userInput = $("#search-input").val();
  const geniusDataObject = await fetchGeniusData(userInput);
  console.log(geniusDataObject);
  renderMainCard(geniusDataObject);
  $(".delete").on("click", onDelete);
  // fetchYoutubeData()
  // fetchGeniusIDData()
};

$("#search").on("submit", onSubmit);
// fetchGeniusIDData();

$(document).ready(function () {
  // fetchYoutubeData();
  homePageSliders();
});
