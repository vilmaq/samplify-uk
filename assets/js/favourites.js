//get data from the local storage
const favCards = JSON.parse(localStorage.getItem("localStorageFavData")) || [];

const getDataFromLS = () => {
  const favCards =
    JSON.parse(localStorage.getItem("localStorageFavData")) || [];

  // console.log(favCards);

  // favCards.slice(1, 6).
  favCards.forEach(renderFavoriteCards);
};


const renderFavoriteCards = (favCard) => {
  console.log(favCard);
  const container = $(".cards-container");
  // container.empty();

  const card = `<div class="searchCardContainer is-mobile">
    <div class="card">
      <div class="card-image" style="background-image: url('${favCard.favImage}');"><button class="delete is-large"></button></div>
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
  console.log(container);
};

const onDelete = (click) => {
const clickEvent = click.target
window.localStorage.removeItem('localStorageFavData');
const indexCard = favCards.indexOf(clickEvent)

}



$(document).ready( function () {
  getDataFromLS()
  $(".delete").on("click", onDelete);
}
);

// delete button that deletes the card


//limit clicks by assigning  odd/ even clicks