var youtubeApiKey;
const container = $(".cards-container");
let youtubeRequestedData;

// function to swap the API keys when the quota is reached
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

const geniusHeaderObject = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "03ecbc5b6bmsh6aa275f6ae95670p130bf3jsn42648f37f353",
    "x-rapidapi-host": "genius.p.rapidapi.com",
  },
};

const getDataFromLS = () => {
  const favCards =
    JSON.parse(localStorage.getItem("localStorageFavData")) || [];

  // console.log(favCards);

  // favCards.slice(1, 6).
  favCards.forEach(renderFavoriteCards);
};

async function fetchYoutubeData(
  sampleSongFullTitle,
  songImage,
  songTitle,
  songArtist,
  originalSongRD,
  originalSongID,
  lyricsPath
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
  <a href="https://genius.com${lyricsPath}" target="_blank"><img id="geniusLogo" src="http://images.rapgenius.com/b857207c5de745512bc377284199d781.1000x313x1.png" alt="genius-logo"/></a>
  </div>
  </div>
  <div class="break"></div>
`);
    sampleSongFullTitle.forEach(async (sample) => {
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
        console.error(e);
      }
      youtubeRequestedData = {
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
  const deleteModal = () => {
    $(".modal").remove();
  };
  $(".deleteModal").on("click", deleteModal);
};

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
      lyricsPath: idPath.path,
      sample: samples,
      sampleCheck: idPath.song_relationships[0].songs[0],
    };
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
    noSampleModal();
  }
}

const renderFavoriteCards = (favCard) => {
  // container.empty();

  const card = `<div class="searchCardContainer is-mobile">
    <div class="card">
      <div class="card-image artworkClick" style="background-image: url('${favCard.favImage}');" data-geniusid="${favCard.favId}"><button class="delete is-large deleteCard" data-fTitle="${favCard.favTitle}"></button></div>
      <div class="card-text content is-normal">
        <h1>${favCard.favTitle}</h1>
        <h3 class="subtitle">Artist: ${favCard.favArtist}</h3>
        <img id="artistImage" src="${favCard.favArtistImage}"/>
      </div>
        <div class="card-footer">
          <div class="card-footer-item">

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

const onDelete = (click) => {
  const clickedTarget = click.target;
  const cardContainer = clickedTarget.closest(".searchCardContainer");
  event.stopPropagation();

  const favCards =
    JSON.parse(localStorage.getItem("localStorageFavData")) || [];

  let songTitle = $(clickedTarget).attr("data-fTitle");

  let newFavCards = favCards.filter((song) => song.favTitle != songTitle);

  localStorage.setItem("localStorageFavData", JSON.stringify(newFavCards));

  cardContainer.remove();
};

$(document).ready(function () {
  swapApiKey();
  getDataFromLS();
  $(".artworkClick").click(function () {
    const geniusSongID = $(this).data("geniusid");
    fetchGeniusIDData(geniusSongID);
  });
  $(".deleteCard").on("click", onDelete);
});

// delete button that deletes the card

//limit clicks by assigning  odd/ even clicks
