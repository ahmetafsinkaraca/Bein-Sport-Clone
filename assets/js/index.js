/* slider top */
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".swiperTop", {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 0,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      601: {
        slidesPerView: 2,
      },
      850: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 5,
      }
    }
  });
});

/* slider main and thumb */
document.addEventListener('DOMContentLoaded', function () {
  var swiperThumbs = new Swiper(".body-content-thumb-slider", {
    spaceBetween: 0,
    slidesPerView: 19,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  var swiper = new Swiper(".swiper-bottom", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    thumbs: {
      swiper: swiperThumbs,
    },
    breakpoints: {
    }
  });

  document.querySelectorAll(".body-content-thumb-slider .swiper-slide").forEach((thumb, index) => {
    thumb.addEventListener("mouseover", function () {
      swiper.autoplay.stop();
      swiper.slideToLoop(index);
    });

    thumb.addEventListener("mouseout", function () {
      swiper.autoplay.start();
    });
  });
});

/* Fikstür slider */
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".swiperFikstur", {
    loop: true,
    slidesPerView: 8,
    spaceBetween: 0,
    breakpoints: {
    },
    navigation: {
      nextEl: ".swiper-button-next-fikstur",
      prevEl: ".swiper-button-prev-fikstur",
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      410: {
        slidesPerView: 3,
      },
      550: {
        slidesPerView: 4,
      },
      850: {
        slidesPerView: 6,
      },
      1440: {
        slidesPerView: 8,
      }
    },
  });
});

/* Puan durumu slider */
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".swiperPuanDurumu", {
    loop: true,
    slidesPerView: 18,
    spaceBetween: 0,
    breakpoints: {
    },
    navigation: {
      nextEl: ".swiper-button-next-puan",
      prevEl: ".swiper-button-prev-puan",
    },
    breakpoints: {
      0: {
        slidesPerView: 4,
      },
      410: {
        slidesPerView: 5,
      },
      550: {
        slidesPerView: 8,
      },
      850: {
        slidesPerView: 11,
      },
      1440: {
        slidesPerView: 18,
      }
    },
  });

});

/* Navbar kısmı */
document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggles = document.querySelectorAll('.nav-link.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    const parent = toggle.closest('.nav-item');
    const dropdownMenu = parent.querySelector('.dropdown-menu');

    if (dropdownMenu) {
      parent.classList.add('has-dropdown-header');
    }

    toggle.addEventListener('mouseover', function () {
      parent.classList.add('show');
      parent.classList.remove('hide-before');
    });

    parent.addEventListener('mouseleave', function () {
      parent.classList.remove('show');
      parent.classList.add('hide-before');
    });

    toggle.addEventListener('click', function (e) {
      e.preventDefault();

      if (parent.classList.contains('show')) {
        parent.classList.remove('show');
        parent.classList.add('hide-before');
      } else {
        closeAllDropdowns();
        parent.classList.add('show');
        parent.classList.remove('hide-before');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.nav-item.show').forEach(item => {
      item.classList.remove('show');
      item.classList.add('hide-before');
    });
  }
});


/* header haber kısmı */
document.addEventListener('DOMContentLoaded', function () {

  const newsData = [
    { date: "13.59", text: "Beşiktaş'ta sorun teknik direktörde değil", href: "/" },
    { date: "14.15", text: "Fenerbahçe yeni transferini açıkladı", href: "/fenerbahce-transfer" },
    { date: "12.45", text: "Galatasaray, derbiye hazır", href: "/galatasaray-derbi" },
    { date: "11.30", text: "Trabzonspor: 3 oyuncu sakatlandı", href: "/trabzonspor-sakatlik" }
  ];

  let currentIndex = 0;

  const newsDateElement = document.getElementById("newsDate");
  const newsTextElement = document.getElementById("newsText");

  function updateNews(index) {
    const news = newsData[index];
    newsDateElement.textContent = news.date;
    newsTextElement.textContent = news.text;
    newsTextElement.href = news.href;
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % newsData.length;
    updateNews(currentIndex);
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + newsData.length) % newsData.length;
    updateNews(currentIndex);
  });

  updateNews(currentIndex);
});


/* category kaydırma kısmı */
document.querySelectorAll('.body-content-videos-category .category-item').forEach(function(item) {
  item.addEventListener('click', function() {
    var categoryList = document.querySelector('.body-content-videos-category');
    var itemPosition = item.getBoundingClientRect().left + window.scrollX;
    var containerPosition = categoryList.getBoundingClientRect().left + window.scrollX;
    var containerWidth = categoryList.offsetWidth;
    var itemWidth = item.offsetWidth;
    var scrollPosition = categoryList.scrollLeft;

    if (itemPosition + itemWidth > containerPosition + containerWidth + scrollPosition) {
      categoryList.scrollTo({
        left: itemPosition + itemWidth - containerWidth,
        behavior: 'smooth'
      });
    } else if (itemPosition < containerPosition + scrollPosition) {
      categoryList.scrollTo({
        left: itemPosition - containerPosition,
        behavior: 'smooth'
      });
    }

    document.querySelectorAll('.body-content-videos-category .category-item').forEach(function(el) {
      el.classList.remove('active');
    });
    item.classList.add('active');
  });
});

document.querySelectorAll('.body-content-haberler-category .category-item').forEach(function(item) {
  item.addEventListener('click', function() {
    var categoryList = document.querySelector('.body-content-haberler-category');
    var itemPosition = item.getBoundingClientRect().left + window.scrollX;
    var containerPosition = categoryList.getBoundingClientRect().left + window.scrollX;
    var containerWidth = categoryList.offsetWidth;
    var itemWidth = item.offsetWidth;
    var scrollPosition = categoryList.scrollLeft;

    if (itemPosition + itemWidth > containerPosition + containerWidth + scrollPosition) {
      categoryList.scrollTo({
        left: itemPosition + itemWidth - containerWidth,
        behavior: 'smooth'
      });
    } else if (itemPosition < containerPosition + scrollPosition) {
      categoryList.scrollTo({
        left: itemPosition - containerPosition,
        behavior: 'smooth'
      });
    }

    document.querySelectorAll('.body-content-haberler-category .category-item').forEach(function(el) {
      el.classList.remove('active');
    });
    item.classList.add('active');
  });
});



/* normal sürükleme işlemi gerekli ama sitede kullanılmamış */
/*     document.addEventListener("DOMContentLoaded", function () {
        const newsContainer = document.querySelector('.body-content-news');
        let isDragging = false;
        let startX, scrollLeft;

        // Mouse basılı tutma olayı
        newsContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            newsContainer.classList.add('dragging'); // Görsel efekt için class eklenebilir
            startX = e.pageX - newsContainer.offsetLeft;
            scrollLeft = newsContainer.scrollLeft;
        });

        // Mouse hareket ettirme olayı
        newsContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - newsContainer.offsetLeft;
            const walk = (x - startX) * 2; // Sürükleme hızı ayarı
            newsContainer.scrollLeft = scrollLeft - walk;
        });

        // Mouse bırakma olayı
        newsContainer.addEventListener('mouseup', () => {
            isDragging = false;
            newsContainer.classList.remove('dragging');
        });

        // Mouse dışarı çıkarsa sürükleme bırakılır
        newsContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            newsContainer.classList.remove('dragging');
        });
    }); */




/* select işlemi yapılmakta */
document.addEventListener('DOMContentLoaded', function () {

  const form = document.querySelector(".form");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (dropdowns.length > 0) {
    dropdowns.forEach((dropdown) => {
      createCustomDropdown(dropdown);
    });
  }

  if (form !== null) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  function createCustomDropdown(dropdown) {
    const options = dropdown.querySelectorAll("option");
    const optionsArr = Array.from(options);

    const customDropdown = document.createElement("div");
    customDropdown.classList.add("dropdown");
    dropdown.insertAdjacentElement("afterend", customDropdown);

    const selected = document.createElement("div");
    selected.classList.add("dropdown-select");
    selected.textContent = optionsArr[0].textContent;
    customDropdown.appendChild(selected);

    const menu = document.createElement("div");
    menu.classList.add("dropdown-menu");
    customDropdown.appendChild(menu);

    const menuInnerWrapper = document.createElement("div");
    menuInnerWrapper.classList.add("dropdown-menu-inner");
    menu.appendChild(menuInnerWrapper);

    optionsArr.forEach((option) => {
      const item = document.createElement("div");
      item.classList.add("dropdown-menu-item");
      item.dataset.value = option.value;
      item.textContent = option.textContent;
      menuInnerWrapper.appendChild(item);

      item.addEventListener(
        "click",
        setSelected.bind(item, selected, dropdown, menu)
      );
    });

    menuInnerWrapper.querySelector("div").classList.add("selected");

    selected.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(menu);
    });

    document.addEventListener("click", (e) => {
      if (!customDropdown.contains(e.target)) {
        closeDropdown(menu);
      }
    });

    dropdown.style.display = "none";
  }

  function toggleDropdown(menu) {
    if (menu.style.display === "block") {
      closeDropdown(menu);
    } else {
      openDropdown(menu);
    }
  }

  function openDropdown(menu) {
    menu.style.display = "block";
  }

  function closeDropdown(menu) {
    menu.style.display = "none";
  }

  function setSelected(selected, dropdown, menu) {
    const value = this.dataset.value;
    const label = this.textContent;

    selected.textContent = label;
    dropdown.value = value;

    closeDropdown(menu);
  }

});


