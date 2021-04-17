//get data from the local storage

const getDataFromLS = () => {
  const favCards =
    JSON.parse(localStorage.getItem("localStorageFavData")) || [];

  // console.log(favCards);

  // favCards.slice(1, 6).
  favCards.forEach(renderFavoriteCards);
};

const renderFavoriteCards = (favCard) => {
  const container = $(".cards-container");
  // container.empty();

  const card = `<div class="searchCardContainer is-mobile">
    <div class="card">
      <div class="card-image artworkClick" style="background-image: url('${favCard.favImage}');"><button class="delete is-large deleteCard" data-fTitle="${favCard.favTitle}"></button></div>
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
  $(".delete").on("click", onDelete);
});

// delete button that deletes the card

//limit clicks by assigning  odd/ even clicks
