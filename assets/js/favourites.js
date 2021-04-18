//get data from the local storage
const container = $(".cards-container");
const youtubeApiKey = "AIzaSyDhrIv2axe_DUVDhzFgo9GeFNogHmX3a6w";
const youtubeApiKey2 = "AIzaSyCYuac5jmWm9wfCkzMD7fE2D5YG0mRCznA";
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

async function fetchGeniusIDData(geniusSongID) {
  let samples = [];
  const geniusIDURL = `https://genius.p.rapidapi.com/songs/${geniusSongID}`;
  try {
    const geniusIDResponse = await fetch(geniusIDURL, geniusHeaderObject);
    const geniusIDData = await geniusIDResponse.json();
    console.log(geniusIDData);
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
    // noSampleModal();
    console.log(err);
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
        <h3 class="subtitle">Release Date: WIP</h3>
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

  console.log(click);

  const favCards =
    JSON.parse(localStorage.getItem("localStorageFavData")) || [];

  console.log(favCards);
  let songTitle = $(clickedTarget).attr("data-fTitle");
  console.log(songTitle);

  let newFavCards = favCards.filter((song) => song.favTitle != songTitle);
  console.log(newFavCards);

  localStorage.setItem("localStorageFavData", JSON.stringify(newFavCards));

  cardContainer.remove();
};

$(document).ready(function () {
  getDataFromLS();
  $(".artworkClick").click(function () {
    console.log($(this).data("geniusid"));
    const geniusSongID = $(this).data("geniusid");
    fetchGeniusIDData(geniusSongID);
  });
  $(".delete").on("click", onDelete);
});

// delete button that deletes the card

//limit clicks by assigning  odd/ even clicks
