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
  let geniusResultPath = geniusSearchData.response.hits[0].result;
  return (geniusRequestedData = {
    idSong: geniusResultPath.id,
    titleSong: geniusResultPath.full_title,
    artImage: geniusResultPath.song_art_image_url,
    artist: geniusResultPath.primary_artist.name,

    //needs to return artwork, then song name, then artist, then release year/date(optional)
  });
  console.log(geniusRequestedData);
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

const renderMainCard = (geniusData) => {
  const container = $(".cards-container");
  container.empty();
  const card = `<div class="searchCardContainer is-mobile"> 
  <div class="card">
    <div class="card-image" style="background-image: url('${geniusData.artImage}');"><button class="delete is-large"></button></div>
    <div class="card-text content is-normal">
      <h1>${geniusData.titleSong}</h1>
      <h3 class="subtitle">Artist: ${geniusData.artist}</h3>
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
});
