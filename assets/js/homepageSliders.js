
function homePageSliders () {
  const body = document.querySelector("body");
  const searchBtn = document.querySelector("#search");
  const searchInput = document.querySelector("#search-input");
  let active = false;
  
  body.addEventListener("click", (e) => {
    if (
      e.target.id === "search" ||
      e.target.id === "search-input" ||
      e.target.id === "search-icon"
    ) {
      if (!active) {
        searchBtn.classList.add("active");
        searchInput.classList.add("active");
        active = true;
      }
    } else {
      searchBtn.classList.remove("active");
      searchInput.classList.remove("active");
      searchInput.value = "";
      active = false;
    }
  });

  const swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    speed: 900,
  
    autoplay: {
      delay: 3000,
    },
  
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      560: {
        slidesPerView: 3,
      },
      990: {
        slidesPerView: 4,
      },
    },
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
}

