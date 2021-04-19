// genreCards.forEach(console.log(id));

const youtubeApiKey = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";
const youtubeApiKey2 = "AIzaSyCYuac5jmWm9wfCkzMD7fE2D5YG0mRCznA";
const geniusHeaderObject = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "03ecbc5b6bmsh6aa275f6ae95670p130bf3jsn42648f37f353",
    "x-rapidapi-host": "genius.p.rapidapi.com",
  },
};
const container = $(".cards-container");
let geniusRequestedData;
let youtubeRequestedData;

// Fetch Youtube Data Async Function
async function fetchYoutubeData(sampleSongFullTitle, songImage, songTitle) {
  console.log(sampleSongFullTitle);
  if (sampleSongFullTitle.length === 0) {
    noSampleModal();
  } else {
    container.empty();
    container.append(`<div id="titleAndArtwork"><h1>${songTitle}</h1>
  <img src="${songImage}" width="350" height="350"/></div>
  <div class="break"></div>
  <h1 class="sampleHeading">Samples:</h1>`);
    sampleSongFullTitle.forEach(async (sample) => {
      let userInput = $("#search-input").val();
      const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${sample.full_title}&key=${youtubeApiKey2}`;
      const response = await fetch(youtubeUrl);
      const data = await response.json();
      console.log(data);
      const videoID = data.items[0].id.videoId;
      console.log(videoID);
      const embedYoutubeURL = `https://www.youtube.com/embed/${videoID}`;
      try {
        container.append(
          `<div id="sampleContainer">
        <h2>${sample.full_title}</h2>
        <iframe width="560" height="315" src="${embedYoutubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`
        );
      } catch (e) {
        // container.append(`<h1>No samples found ${e}</h1>`);
        console.error(e, "///");
      }

      // createSamplePage(sampleYoutubeURL);
      const youtubeResultPath = data.items[0].snippet;
      youtubeRequestedData = {
        title: youtubeResultPath.title,
        channelTitle: youtubeResultPath.channelTitle,
        uploadTime: youtubeResultPath.publishTime,
        thumbnail: youtubeResultPath.thumbnails.high.url,
        videoId: data.items[0].id.videoId,
      };
    });
  }
}

const noSampleModal = () => {
  container.append(`<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Error</p>
      <button class="delete deleteModal" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      Sorry, there were no samples found for this song!
    </section>
    <footer class="modal-card-foot">
    </footer>
  </div>
</div>`);
  const deleteTest = () => {
    $(".modal").remove();
  };
  $(".deleteModal").on("click", deleteTest);
  console.log("hi");
};

async function fetchGeniusData(userInput) {
  const geniusSearchURL = `https://genius.p.rapidapi.com/search?q=${userInput}`;
  const geniusSearchResponse = await fetch(geniusSearchURL, geniusHeaderObject);
  const geniusSearchData = await geniusSearchResponse.json();
  let geniusResultPath = geniusSearchData.response;
  console.log(geniusSearchData);
  // geniusSearchData.0.
  return (geniusRequestedData = {
    // idSong: geniusResultPath.result.id,
    // titleSong: geniusResultPath.result.full_title,
    // artImage: geniusResultPath.result.song_art_image_url,
    // artist: geniusResultPath.result.primary_artist.name,
    hits: geniusResultPath.hits,

    //needs to return artwork, then song name, then artist, then release year/date(optional)
  });
}

async function fetchGeniusIDData(geniusSongID) {
  let samples = [];
  const geniusIDURL = `https://genius.p.rapidapi.com/songs/${geniusSongID}`;
  try {
    const geniusIDResponse = await fetch(geniusIDURL, geniusHeaderObject);
    const geniusIDData = await geniusIDResponse.json();
    const idPath = geniusIDData.response.song;
    const samplePath = idPath.song_relationships[0].songs;

    for (let i = 0; i < samplePath.length; i++) {
      samples.push(samplePath[i]);
    }
    console.log(samples);
    const geniusIDSampleData = {
      originalSongTitle: idPath.full_title,
      originalSongArt: idPath.song_art_image_url,
      sample: samples,
      sampleCheck: idPath.song_relationships[0].songs[0],
    };
    console.log(geniusIDSampleData.sampleCheck);
    const originalSongTitle = geniusIDSampleData.originalSongTitle;
    const originalSongArt = geniusIDSampleData.originalSongArt;
    const sampleSong = geniusIDSampleData.sample;
    fetchYoutubeData(sampleSong, originalSongArt, originalSongTitle);
    console.log(geniusIDSampleData.sample);
  } catch (err) {
    noSampleModal();
  }
}

// add clicked item to local storage
const addToFavoritesLocalStorage = (element) => {
  // const favoritesData = getLocalStorageData()

  // const favCard = JSON.parse(localStorage.getItem("card"));
  // const target = $(event.target).parentsUntil(".searchCardContainer").
  // const target = $(event.target).closest(".card")
  const localStorageData = getLocalStorageData();
  console.log(localStorageData);

  const target = element.closest(".card");

  const favTitle = target.dataset.title;

  const favArtist = target.dataset.artist;
  const favImage = target.dataset.bimage;
  const favId = target.dataset.geniusid;

  const favObject = {
    favTitle,
    favArtist,
    favImage,
    favId,
  };

  // console.log(favObject);

  localStorageData.push(favObject);
  console.log(localStorageData);

  localStorage.setItem("localStorageFavData", JSON.stringify(localStorageData));
};

const renderFavoritesCards = () => {
  for (let i = 0; i < localStorage.length; i++) {}
};

const getLocalStorageData = () => {
  const localStorageData = JSON.parse(
    localStorage.getItem("localStorageFavData")
  );
  if (localStorageData === null) {
    return [];
  } else return localStorageData;
};

const onDelete = (eachGenre) => {
  // container.empty();
  event.stopPropagation();
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
  const target = event.currentTarget;

  const cardsContainer = target.closest(".searchCardContainer");

  cardsContainer.remove();

  const numberOfCards = container.find(".searchCardContainer").length;

  if (numberOfCards === 0) {
    const showSwiperContainer = $(".swiper-container").show();
    cardsContainer.append(showSwiperContainer);
    // swiperContainer.append(swipeCard);
    // homePageSliders();
    // .show();
    // container.show(swipeCard);
    // homePageSliders();
    return cardsContainer;
    console.log("empty cards");
  }
};

const renderMainCard = (geniusData) => {
  container.empty();
  for (let i = 0; i < 6; i++) {
    const card = `<div class="searchCardContainer is-mobile"> 
    <div class="card" data-title= "${geniusData.hits[i].result.title}" data-geniusid="${geniusData.hits[i].result.id}" data-artist="${geniusData.hits[i].result.primary_artist.name}" data-releasdate =""  data-bimage="${geniusData.hits[i].result.song_art_image_url}">
      <div class="card-image artworkClick" data-geniusid="${geniusData.hits[i].result.id}" style="background-image: url('${geniusData.hits[i].result.song_art_image_url}');" ><button class="delete is-large deleteCard"></button></div>
      <div class="card-text content is-normal">
        <h1 id="songTitle">${geniusData.hits[i].result.title}</h1>
        <h3 id="getArtist" class="subtitle">Artist: ${geniusData.hits[i].result.primary_artist.name}</h3>
        <h3 id="getReleaseDate" class="subtitle">Release Date: WIP</h3>
      </div>
        <div class="card-footer">
          <div class="card-footer-item">
            <span>
              Add to <a id="addFavorite" class="favorites" onclick="addToFavoritesLocalStorage(this)">Favorites</a>
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
  }
};

// const artworkOnClick = () => {
//   console.log($(this).data("geniusid"));
// };

const onSubmit = async (event) => {
  event.preventDefault();
  let userInput = $("#search-input").val();
  const geniusDataObject = await fetchGeniusData(userInput);
  console.log(geniusDataObject);
  const swiperContainer = $(".swiper-container").hide();
  console.log(swiperContainer);
  renderMainCard(geniusDataObject);
  $(".deleteCard").on("click", onDelete);
  $(".artworkClick").click(function () {
    console.log($(this).data("geniusid"));
    const geniusSongID = $(this).data("geniusid");
    fetchGeniusIDData(geniusSongID);
  });
};

$("#search").on("submit", onSubmit);

// fetchGeniusIDData();

$(document).ready(function () {
  // fetchYoutubeData();

  homePageSliders();

  generateRandomSliderArtworks();
});
