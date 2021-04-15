const renderFavoriteCards = (geniusData) => {
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
