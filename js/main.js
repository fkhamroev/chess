document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const body = document.body;
  const header = document.querySelector(".header");

  // Функция для переключения меню
  function toggleMenu() {
    const isActive = mobileMenu.classList.toggle("active");
    menuBtn.classList.toggle("active", isActive);

    // Отключаем скролл при открытом меню
    if (isActive) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
      header.style.height = "100vh";
    } else {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
      header.style.height = "";
    }
  }

  // Клик по кнопке меню
  menuBtn.addEventListener("click", toggleMenu);

  // Закрытие при клике вне меню
  document.addEventListener("click", function (e) {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    }
  });
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
      spaceBetween: 10,
    },
    548: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: "auto",
      spaceBetween: 30,
    },
  },
});

// News slider
const newsSlider = new Swiper(".news-slider", {
  slidesPerView: 3,
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
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.closest(".date-container")) {
      const container = event.target.closest(".date-container");
      const dateInput = container.querySelector(".date-input");
      dateInput.showPicker();
    }
  });

  document.addEventListener("change", function (event) {
    if (event.target.classList.contains("date-input")) {
      const dateInput = event.target;
      const container = dateInput.closest(".date-container");
      const datePlaceholder = container.querySelector(".placeholder");

      if (dateInput.value) {
        const [year, month, day] = dateInput.value.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        datePlaceholder.textContent = formattedDate;
        datePlaceholder.style.color = "#000";
      }
    }
  });
});

// Verification input
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".verification-input");
  const verifyButton = document.querySelector(".btn-form");

  function checkInputs() {
    const allFilled = [...inputs].every((input) => input.value.trim() !== "");
    if (allFilled) {
      verifyButton.classList.remove("disabled");
      verifyButton.removeAttribute("disabled");
    } else {
      verifyButton.classList.add("disabled");
      verifyButton.setAttribute("disabled", "true");
    }
  }

  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (!/^\d$/.test(e.target.value)) {
        e.target.value = "";
        return;
      }

      if (index < inputs.length - 1 && e.target.value) {
        inputs[index + 1].focus();
      }

      checkInputs();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData(
        "text"
      );

      if (/^\d{6}$/.test(pastedText)) {
        pastedText.split("").forEach((char, i) => {
          if (inputs[i]) {
            inputs[i].value = char;
          }
        });

        inputs[inputs.length - 1].focus();
        checkInputs();
      }
    });
  });

  verifyButton.setAttribute("disabled", "true");
  verifyButton.classList.add("disabled");

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const code = [...inputs].map((input) => input.value).join("");
    console.log("code:", code);
  });
});

document.querySelectorAll(".lang-dropdown a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = this.href;
  });
});
