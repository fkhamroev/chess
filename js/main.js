document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const body = document.body;

  // Menu button functionality
  menuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  document.addEventListener("click", function (e) {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Language selector functionality
  const langBtns = document.querySelectorAll(".lang-btn");
  const langLinks = document.querySelectorAll(".lang-list a, .lang-dropdown a");

  // Update active language
  function updateLanguage(lang) {
    langLinks.forEach((link) => {
      if (link.getAttribute("href").includes(lang)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update button text
    langBtns.forEach((btn) => {
      btn.textContent = lang.toUpperCase();
    });

    // Store selected language
    localStorage.setItem("selectedLanguage", lang);
  }

  // Handle language selection
  langLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = link.getAttribute("href").split("=")[1];
      updateLanguage(lang);
    });
  });

  // Initialize language from URL or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const savedLang = localStorage.getItem("selectedLanguage");
  const currentLang = urlParams.get("lang") || savedLang || "en";
  updateLanguage(currentLang);

  // Sponsors slider
  const sponsorsSwiper = new Swiper(".sponsors-slider", {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    loopedSlides: 6,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    speed: 800,
    grabCursor: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Hotels slider
  const hotelsSlider = new Swiper(".hotels-slider", {
    slidesPerView: "auto",
    spaceBetween: 30,
    grabCursor: true,
    speed: 600,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },
    },
  });
});

function openDatePicker() {
  document.getElementById("datePicker").showPicker();
}

function updateDate() {
  const dateInput = document.getElementById("datePicker");
  const datePlaceholder = document.getElementById("datePlaceholder");

  if (dateInput.value) {
    const dateParts = dateInput.value.split("-"); // YYYY-MM-DD
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    datePlaceholder.textContent = formattedDate;
    datePlaceholder.style.color = "#000"; // Делаем текст черным после выбора
  }
}

document.getElementById("fileInput").addEventListener("change", function () {
  const fileName = this.files[0] ? this.files[0].name : "No file chosen";
  document.getElementById("fileName").textContent = fileName;
});