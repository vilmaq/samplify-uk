const genreCards = [
  {
    id: 525,
    albumArtwork:
      "https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2Fb9d6cf24ceb76fa5d8ebf02569e16e2f.1000x1000x1.png",
  },
  {
    id: 32167,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.rapgenius.com%2Fe09e829807ee4c2d198736a4d89f0d34.1000x1000x1.jpg",
  },
  {
    id: 71255,
    albumArtwork:
      "https://t2.genius.com/unsafe/1344x0/https%3A%2F%2Fimages.genius.com%2Fc89a94b56463722c378a5f00df97ea6b.1000x1000x1.jpg",
  },
  {
    id: 2916544,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2F7aa3bebecdfc0a7f9140c479bcb52182.1000x1000x1.png",
  },
  {
    id: 2263723,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x0/https%3A%2F%2Fimages.genius.com%2Ff3be0158d3a067a81b075686a3a2e63d.1000x1000x1.png",
  },
  {
    id: 2171,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2Fd2fa9ea19155e704d0300ff0d29e78a3.953x953x1.jpg",
  },
  {
    id: 359249,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x0/https%3A%2F%2Fimages.rapgenius.com%2F0b6e38cbdcd8d33ce9d81b023dd87009.600x600x1.jpg",
  },
  {
    id: 2450584,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x0/https%3A%2F%2Fimages.genius.com%2F5c886671ed0b5bb515ef546e396ef528.1000x1000x1.png",
  },
  {
    id: 3021,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2Fbb694d2329470f0f08852feacfb5a02a.600x600x1.jpg",
  },
  {
    id: 4249139,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x0/https%3A%2F%2Fimages.genius.com%2F4535b464eefdbf847ffc1da7eff2a255.1000x1000x1.png",
  },
  {
    // Beck - Loser
    id: 4905,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x0/https%3A%2F%2Fimages.genius.com%2F2616b5713a51eb3db18c625c1542b9e5.500x501x1.jpg",
  },
  {
    // Salt N Pepa - Push it
    id: 56902,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2F4ef12d48c4a618a18e5f8467023ff9ec.600x600x1.jpg",
  },
  {
    // Frank Ocean - Siegfried
    id: 2842086,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2F4ef12d48c4a618a18e5f8467023ff9ec.600x600x1.jpg",
  },
  {
    // James Blake - Can't Believe the Way We Flow
    id: 4201753,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2F4ef12d48c4a618a18e5f8467023ff9ec.600x600x1.jpg",
  },
  {
    // Jay Z & Justin Timberlake - Holy Grail
    id: 177832,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2F2da322648704159878b73c5cfc9c7dc5.1000x1000x1.png",
  },
  {
    // Gorillaz - Clint Eastwood
    id: 1698,
    albumArtwork:
      "https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F454a09a0a3aebd22bc05a6106fb6dfde.1000x1000x1.jpg",
  },
  {
    // Jay Z & Kanye West - No Church In The Wild
    id: 382113,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x440/https%3A%2F%2Fimages.genius.com%2Ff4264b720b7352a2ffac3c36fa1fd5cf.880x880x1.png",
  },
  {
    // Phantogram - Cruel World
    id: 2831911,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x0/https%3A%2F%2Fimages.genius.com%2F5c18b25246c2d8b42ed8b8dffab8a2e4.745x745x1.jpg",
  },
  {
    // Frank Ocean & Earl Sweatshirt - Super Rich Kids
    id: 78960,
    albumArtwork:
      "https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F5c8f128494b2bd41a18ebccad7e760cc.1000x1000x1.png",
  },
  {
    // Pet Shop Boys - My October Symphony
    id: 1183842,
    albumArtwork:
      "https://t2.genius.com/unsafe/440x0/https%3A%2F%2Fimages.genius.com%2F4aebc17bcd83a7774ad3ae9bd9fce7b6.1000x1000x1.png",
  },
  {
    // Kelis - Trick Me
    id: 382113,
    albumArtwork:
      "https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2F142fe36b4329bf1fd87eece659a58759.1000x1000x1.jpg",
  },
];

let finalSliderSongArray = [];
let data = genreCards[i];

function randomSliderSongGenerator() {
  let randomSongIndex =
    genreCards[Math.floor(Math.random() * genreCards.length)];

  console.log(randomSongIndex);
  return randomSongIndex;
}
for (let i = 0; i < 9; i++) {
  let randomSliderSongs = randomSliderSongGenerator();
  finalSliderSongArray.push(randomSliderSongs);
  console.log(randomSliderSongs);
}

for (let i = 0; i < finalSliderSongArray.length; i++) {
  let data = genreCards[i];
  console.log(data.albumArtwork);
}

const renderSliderCards = () => {
  const swiperWrapper = $(".swiper-wrapper");

  swiperWrapper.empty();

  const renderSliderCard = () => {
    for (let i = 0; i < finalSliderSongArray.length; i++) {
      let data = genreCards[i];
      console.log(data.albumArtwork);
    }

    const card = `<div class="swiper-slide" style= "background-image:url("${data.albumArtwork}")" >`;
    console.log(card);
    swiperWrapper.append(card);
  };
  finalSliderSongArray.forEach(renderSliderCard);

  return swiperWrapper;
};

// const renderSliderCards = (finalSliderSongArray) => {
//   const sliderWrapper = $(".swiper-wrapper");
//   sliderWrapper.empty();
// };

// const renderSliderCard = (eachSliderSong) => {
//   console.log(sliderWrapper);
// };
// const renderSliderCardContainer = (eachSong) => {
//   const sliderCardContainer = `<div class="swiper-container">
//   <div class="swiper-wrapper">
//   <div class="swiper-slide" style= "background-image:url("${eachGenre.albumArtwork}")" >
//   </div>
// <div class="swiper-pagination"></div>
// <div class="swiper-button-prev"></div>
// <div class="swiper-button-next"></div>
// </div>`;
//   console.log(each);
//   container.append(card);
// };

// for  (let i = 0; i <sliderArtworks.length; i ++) {
//   genreCards[Math.floor(Math.random() * genreCards.length)];

//   console.log(randomSongIndex);
// let sliderArtworks = 10;
// const geniusSongID = genreCards.id;
// const geniusSongArtwork = genreCards.albumArtwork;
// const randomSliderSongObject = {
//   geniusSongID: geniusSongID,
//   geniusSongArtwork: geniusSongArtwork,
// };
// console.log(geniusSongID);
// console.log(geniusSongArtwork);
// function randomSliderSongGenerator() {
//   const randomArtworkIndex = Math.floor(
//     Math.random() * sliderArtworks.length
//   );
//   const randomSliderArtworks = randomSliderSongObject[randomIndex];
//   return randomSliderArtworks;
// }
// for (let i = 0; i < sliderArtworks.length; i++) {
//   let randomArtworks = randomSliderSongGenerator();
//   result.push(randomArtworks);
// }
// return randomArtworks;

// genreCards.push(randomSliderSongObject);
// console.log(randomSliderSongObject);
