// genreCards.forEach(console.log(id));
var youtubeApiKeyNew;
var youtubeApiKey;

async function fetchKey() {
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=theweeknd&key=${youtubeApiKey}`;
  const response = await fetch(youtubeUrl);
  const data = await response.json();
  // console.log(data);
  if (data.hasOwnProperty("error")) {
    youtubeApiKey = youtubeApiKey2;
  }
  // console.log(youtubeApiKey);
}

function swapApiKey() {
  youtubeApiKey = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";
  const youtubeApiKey2 = "AIzaSyCYuac5jmWm9wfCkzMD7fE2D5YG0mRCznA";
  fetchKey();
}

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
async function fetchYoutubeData(
  sampleSongFullTitle,
  songImage,
  songTitle,
  songArtist,
  originalSongRD,
  originalSongID
) {
  console.log(sampleSongFullTitle);
  if (sampleSongFullTitle.length === 0) {
    noSampleModal(originalSongID);
  } else {
    container.empty();
    container.append(`<div id="titleAndArtwork">
  <img src="${songImage}" width="500" height="500"/>
  <div class="songDetails"><h2>${originalSongRD}</h2>
  <h1 id="titleOfSong">${songTitle}</h1>
  <h1 id="songArtist">${songArtist}</h1>
  <iframe class="appleMusic" allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="60" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://genius.com/songs/${originalSongID}/apple_music_player"></iframe>
  </div>
  </div>
  <div class="break"></div>
`);
    sampleSongFullTitle.forEach(async (sample) => {
      let userInput = $("#search-input").val();
      const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${sample.full_title}&key=${youtubeApiKey}`;
      const response = await fetch(youtubeUrl);
      const data = await response.json();
      console.log(data);
      const videoID = data.items[0].id.videoId;
      console.log(videoID);
      const embedYoutubeURL = `https://www.youtube.com/embed/${videoID}`;
      try {
        container.append(
          `<div class="tile is-parent">
          <article class="tile is-child notification is-info sampleBox">
          <p class="subtitle">Sampled:</p>
            <p class="title">${sample.full_title}</p>
            
            <iframe width="560" height="315" src="${embedYoutubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           
          </article>
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

const noSampleModal = (originalSongID) => {
  container.append(`<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Error</p>
      <button class="delete deleteModal" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      Sorry, there were no samples found for this song! However, here is a snippet of your selected song:
    </section>
    <section class="modal-card-body">
    <iframe class="appleMusic" allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="70" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://genius.com/songs/${originalSongID}/apple_music_player"></iframe>
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
      originalSongTitle: idPath.title,
      originalSongArtist: idPath.primary_artist.name,
      originalSongRD: idPath.release_date_for_display,
      originalSongArt: idPath.song_art_image_url,
      originalSongID: idPath.id,
      sample: samples,
      sampleCheck: idPath.song_relationships[0].songs[0],
    };
    console.log(geniusIDSampleData.sampleCheck);
    const originalSongTitle = geniusIDSampleData.originalSongTitle;
    const originalSongArtist = geniusIDSampleData.originalSongArtist;
    const originalSongRD = geniusIDSampleData.originalSongRD;
    const originalSongArt = geniusIDSampleData.originalSongArt;
    const originalSongID = geniusIDSampleData.originalSongID;
    const sampleSong = geniusIDSampleData.sample;
    fetchYoutubeData(
      sampleSong,
      originalSongArt,
      originalSongTitle,
      originalSongArtist,
      originalSongRD,
      originalSongID
    );
    console.log(geniusIDSampleData.sample);
  } catch (err) {
    console.log("hiid");
    noSampleModal();
  }
}

// the function that adds a song to Local Storage when "Add to Favourites" is clicked and removes it if the song has been already added before
const addToFavoritesLocalStorage = (element) => {
  const localStorageData = getLocalStorageData();

  // target the clicked card (song) and store the values in DOM
  const target = element.closest(".card");
  const favTitle = target.dataset.title;
  const favArtist = target.dataset.artist;
  const favImage = target.dataset.bimage;
  const favId = target.dataset.geniusid;

  //create an Object with teh details of the clicked song
  const favObject = {
    favTitle,
    favArtist,
    favImage,
    favId,
  };

  // check if the Local Storage is empty and if it is add the new song to LS
  if (localStorageData.length === 0) {
    //push the created favObject in line 195 to LS
    localStorageData.push(favObject);

    localStorage.setItem(
      "localStorageFavData",
      JSON.stringify(localStorageData)
    );

    //change the context of the button from "Add to Favourites" to "Remove from Favourites"
    element.textContent = "Remove from Favourites";

    // if the LS is not empty check if the cliked Song Title (favTitle) is present in the LocalStorage/already added to Favourites
  } else {
    // create a new Array which stores the result from comparing the LS with the Song title clicked
    let addedToFavArray = localStorageData.filter(
      (song) => song.favTitle === favTitle
    );

    // if the new Array is empty, the song has not been previously added into LS so we push it into LS/add to Favourites and change the text content of the button from "Add to Favourites" to "Remove from Favourites"
    if (addedToFavArray.length === 0) {
      element.textContent = "Remove from Favourites";

      localStorageData.push(favObject);

      localStorage.setItem(
        "localStorageFavData",
        JSON.stringify(localStorageData)
      );

      // if the Array is not empty, means that the song has been already added to favourites and clicking it again will remove it from LS/favourites
    } else {
      //filter out the song clicked that is already in LS/favourites and push the new Array in LS
      let newLocalStorageArray = localStorageData.filter(
        (song) => song.favTitle != favTitle
      );
      //push the new created array filtering out the clicked song to LS and change button text Content from "Remove from Favourites "  to "Add to Favourites"
      localStorage.setItem(
        "localStorageFavData",
        JSON.stringify(newLocalStorageArray)
      );

      element.textContent = "Add to Favourites";
    }
  }
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

const renderMainCard = () => {
  container.empty();
  let results = geniusRequestedData.hits;

  const renderEachCard = (each) => {
    const card = `<div class="searchCardContainer is-mobile"> 
      <div class="card" data-title= "${each.result.title}" data-geniusid="${each.result.id}" data-artist="${each.result.primary_artist.name}" data-releasdate =""  data-bimage="${each.result.song_art_image_url}">
        <div class="card-image artworkClick" data-geniusid="${each.result.id}" style="background-image: url('${each.result.song_art_image_url}');" ><button class="delete is-large deleteCard"></button></div>
        <div class="card-text content is-normal">
          <h1 id="songTitle">${each.result.title}</h1>
          <h3 id="getArtist" class="subtitle">Artist: ${each.result.primary_artist.name}</h3>
          <h3 id="getReleaseDate" class="subtitle">Release Date: WIP</h3>
        </div>
          <div class="card-footer">
            <div class="card-footer-item">
              <span>
                 <a id="addFavorite" class="favorites" data-added-to-fav="false"  onclick="addToFavoritesLocalStorage(this)" data-content="Add to Favorites">Add to Favourites</a>
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
    return card;
  };

  let cards = results.map(renderEachCard);
  cards = cards.slice(0, 6);
  container.append(cards);
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
    console.log(youtubeApiKey);
    console.log($(this).data("geniusid"));
    const geniusSongID = $(this).data("geniusid");
    fetchGeniusIDData(geniusSongID);
  });
};

$("#search").on("submit", onSubmit);

// fetchGeniusIDData();

$(document).ready(function () {
  // fetchYoutubeData();
  swapApiKey();
  renderSliderCards();
  homePageSliders();
});
