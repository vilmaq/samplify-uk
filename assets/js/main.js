let youtubeApiKey;
const container = $(".cards-container");
let geniusRequestedData;
let youtubeRequestedData;

//The fetchKey function will check to see if the YouTube API is full. It does this by checking if the response has a value of 'error' and will switch API key if so.
async function fetchKey(youtubeApiKey2) {
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=theweeknd&key=${youtubeApiKey}`;
  const response = await fetch(youtubeUrl);
  const data = await response.json();
  if (data.hasOwnProperty("error")) {
    youtubeApiKey = youtubeApiKey2;
  }
}

function swapApiKey() {
  youtubeApiKey = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";
  const youtubeApiKey2 = "AIzaSyCYuac5jmWm9wfCkzMD7fE2D5YG0mRCznA";
  fetchKey(youtubeApiKey2);
}

//This header object is used as we are accessing the Genius API via Rapid API
const geniusHeaderObject = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "03ecbc5b6bmsh6aa275f6ae95670p130bf3jsn42648f37f353",
    "x-rapidapi-host": "genius.p.rapidapi.com",
  },
};

// This async function will retrieve data from the Youtube API whilst also generating the results for samples using parameters with the fetchGeniusIDData function.
async function fetchYoutubeData(
  sampleSongFullTitle,
  songImage,
  songTitle,
  songArtist,
  originalSongRD,
  originalSongID,
  lyricsPath
) {
  if (sampleSongFullTitle.length === 0) {
    // If no samples are found, a modal will pop up.
    noSampleModal(originalSongID);
  } else {
    container.empty();
    container.append(`<div id="titleAndArtwork">
  <img class= "album-artworkmg" src="${songImage}" width="500" height="500"/>
  <div class="songDetails"><h2>${originalSongRD}</h2>
  <h1 id="titleOfSong">${songTitle}</h1>
  <h1 id="songArtist">${songArtist}</h1>
  <iframe class="appleMusic" allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="60" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://genius.com/songs/${originalSongID}/apple_music_player"></iframe>
  <a href="https://genius.com${lyricsPath}" target="_blank"><img id="geniusLogo" src="http://images.rapgenius.com/b857207c5de745512bc377284199d781.1000x313x1.png" alt="genius-logo"/></a>
  </div>
  </div>
  <div class="break"></div>
`);
    sampleSongFullTitle.forEach(async (sample) => {
      //This for each is looking at the samples object inside of the fetchGeniusIDData API.
      const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${sample.full_title}&key=${youtubeApiKey}`;
      const response = await fetch(youtubeUrl);
      const data = await response.json();
      const videoID = data.items[0].id.videoId;
      const embedYoutubeURL = `https://www.youtube.com/embed/${videoID}`;
      try {
        container.append(
          `<div class="tile is-parent">
          <article class="tile is-child notification is-info sampleBox">
          <p class="subtitle">Sampled:</p>
            <p class="title">${sample.full_title}</p>
            <div class="iframe-container-L"> 
            <iframe width="560" height="315" src="${embedYoutubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="iframe-container-M"> 
            <iframe width="350" height="185" src="${embedYoutubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="iframe-container-S"> 
            <iframe width="250" height="115" src="${embedYoutubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="iframe-container-XS"> 
            <iframe width="250" height="115" src="${embedYoutubeURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </article>
        </div>`
        );
      } catch (e) {
        console.error(e);
      }
    });
  }
}

//This function shows a 'no sample' modal on the screen.
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
  const deleteModal = () => {
    $(".modal").remove();
  };
  $(".deleteModal").on("click", deleteModal);
};

// fetchGeniusData is what we use for the initial search results amd for the data attributes such as ID.
async function fetchGeniusData(userInput) {
  const geniusSearchURL = `https://genius.p.rapidapi.com/search?q=${userInput}`;
  const geniusSearchResponse = await fetch(geniusSearchURL, geniusHeaderObject);
  const geniusSearchData = await geniusSearchResponse.json();
  let geniusResultPath = geniusSearchData.response;
  return (geniusRequestedData = {
    hits: geniusResultPath.hits,
  });
}

//fetchGeniusIDData will be used to find the sample, release date, apple music player, and more. This is because when using the ID with the API instead of song name, a lot more details are returned.
async function fetchGeniusIDData(geniusSongID) {
  let samples = [];
  const geniusIDURL = `https://genius.p.rapidapi.com/songs/${geniusSongID}`;
  try {
    const geniusIDResponse = await fetch(geniusIDURL, geniusHeaderObject); // Header object is also passed in as it is via Rapid API
    const geniusIDData = await geniusIDResponse.json();
    const idPath = geniusIDData.response.song;
    const samplePath = idPath.song_relationships[0].songs;

    for (let i = 0; i < samplePath.length; i++) {
      samples.push(samplePath[i]); // This is pushing all of the samples into an array as it will allow us to display all samples if a song has more than 1.
    }
    const geniusIDSampleData = {
      originalSongTitle: idPath.title,
      originalSongArtist: idPath.primary_artist.name,
      originalSongRD: idPath.release_date_for_display,
      originalSongArt: idPath.song_art_image_url,
      originalSongID: idPath.id,
      lyricsPath: idPath.path,
      sample: samples,
      sampleCheck: idPath.song_relationships[0].songs[0],
    };
    //These will be used to append the sample data via the fetch youtube function.
    const originalSongTitle = geniusIDSampleData.originalSongTitle;
    const originalSongArtist = geniusIDSampleData.originalSongArtist;
    const originalSongRD = geniusIDSampleData.originalSongRD;
    const originalSongArt = geniusIDSampleData.originalSongArt;
    const originalSongID = geniusIDSampleData.originalSongID;
    const lyricsPath = geniusIDSampleData.lyricsPath;
    const sampleSong = geniusIDSampleData.sample;
    fetchYoutubeData(
      sampleSong,
      originalSongArt,
      originalSongTitle,
      originalSongArtist,
      originalSongRD,
      originalSongID,
      lyricsPath
    );
  } catch (err) {
    console.log(err);
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
  const favArtistImage = target.dataset.artistimage;

  //create an Object with teh details of the clicked song
  const favObject = {
    favTitle,
    favArtist,
    favImage,
    favId,
    favArtistImage,
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

const getLocalStorageData = () => {
  const localStorageData = JSON.parse(
    localStorage.getItem("localStorageFavData")
  );
  if (localStorageData === null) {
    return [];
  } else return localStorageData;
};

//This function will allow search result cards to be deleted and will bring back the genre slider when all have been removed.
const onDelete = (eachGenre) => {
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
    return cardsContainer;
  }
};

//The renderMainCard function looks at the results of the fetchGeniusData function to populate the first 6 search results and append them onto the page.
const renderMainCard = () => {
  container.empty();
  let results = geniusRequestedData.hits;

  const renderEachCard = (each) => {
    const card = `<div class="searchCardContainer block is-mobile"> 
      <div class="card" data-title= "${each.result.title}" data-geniusid="${each.result.id}" data-artist="${each.result.primary_artist.name}"  data-bimage="${each.result.song_art_image_url}" data-artistimage="${each.result.primary_artist.image_url}">
        <div class="card-image artworkClick" data-geniusid="${each.result.id}" style="background-image: url('${each.result.song_art_image_url}');" ><button class="delete is-large deleteCard is-pulled-right"></button></div>
        <div class="card-text content is-normal">
          <h1 id="songTitle">${each.result.title}</h1>
          <h3 id="getArtist" class="subtitle">Artist: ${each.result.primary_artist.name}</h3>
          <img id="artistImage" src="${each.result.primary_artist.image_url}"/>
        </div>
          <div class="card-footer">
            <div class="card-footer-item">
              <span>
                 <a id="addFavorite" class="favorites" data-added-to-fav="false"  onclick="addToFavoritesLocalStorage(this)">Add to Favourites</a>
              </span>
            </div>
            <div class="card-footer-item">
              <span>               
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

const onSubmit = async (event) => {
  event.preventDefault();
  let userInput = $("#search-input").val();
  const geniusDataObject = await fetchGeniusData(userInput);
  const swiperContainer = $(".swiper-container").hide();
  renderMainCard(geniusDataObject);
  $(".deleteCard").on("click", onDelete);
  $(".artworkClick").click(function () {
    const geniusSongID = $(this).data("geniusid");
    fetchGeniusIDData(geniusSongID);
  });
};

$("#search").on("submit", onSubmit);

$(document).ready(function () {
  swapApiKey();
  renderSliderCards();
  homePageSliders();
});
