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
  // console.log(youtubeRequestedData);
  // console.log(data.items[0]);
  // console.log("test");
}

async function fetchGeniusData(userInput) {
  const geniusSearchURL = `https://genius.p.rapidapi.com/search?q=${userInput}`;
  const geniusSearchResponse = await fetch(geniusSearchURL, geniusHeaderObject);
  const geniusSearchData = await geniusSearchResponse.json();
  // console.log(geniusSearchData);
  let geniusResultPath = geniusSearchData.response.hits[0].result;
  geniusRequestedData = {
    idSong: geniusResultPath.id,
    titleSong: geniusResultPath.full_title,
    artImage: geniusResultPath.song_art_image_url,

    //needs to return artwork, then song name, then artist, then release year/date(optional)
  };
  console.log(geniusRequestedData);
}

async function fetchGeniusIDData() {
  const geniusIDURL = `https://genius.p.rapidapi.com/songs/730771`;
  const geniusIDResponse = await fetch(geniusIDURL, geniusHeaderObject);
  const geniusIDData = await geniusIDResponse.json();
  // console.log(geniusIDData);
}

// target the input id
const getLocalStorageData = () => {
  const localStorageData = JSON.parse(localStorage.getItem("userInput"));
  if (localStorageData === null) {
    return [];
  } else return localStorageData;
};

const onDelete = () => {
  const container = $(".cards-container");
  container.empty();
  const swipeCard = `<div class="swiper-container">
    <div class="swiper-wrapper">
    <div class="swiper-slide">
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
};

const onSubmit = async (event) => {
  let userInput = $("#search-input").val();
  console.log(userInput);
  fetchGeniusData(userInput);
  event.preventDefault();
  const container = $(".cards-container");
  container.empty();
  const card = `<div class="searchCardContainer is-mobile"> 
  <div class="card">
    <div class="card-image"><button class="delete is-large"></button></div>
    <div class="card-text content is-normal">
      <h1>Song Title:</h1>
      <div class="subtitle">Artist:</div>
      <div class="subtitle">Release Date:</div>
    </div>
      <div class="card-footer">
        <p class="card-footer-item">
          <span>
            Add to <a>Favorites</a>
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            Share on <a href="#">Facebook</a>
          </span>
        </p>
      </div>
  </div>
</div>`;
  container.append(card);

  $(".delete").on("click", onDelete);

  // fetchYoutubeData()
  // fetchGeniusIDData()
  // displaySearchCards()
};

$("#search").on("submit", onSubmit);
// fetchGeniusIDData();

$(document).ready(function () {
  // fetchYoutubeData();
});
