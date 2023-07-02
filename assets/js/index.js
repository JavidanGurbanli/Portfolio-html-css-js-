const nav = document.querySelector("nav");
const mobile_open = document.querySelector(".mobile_open");
const mobile_close = document.querySelector(".mobile_close");
const mobile_menu = document.querySelector(".mobile_menu");
const tabs = document.querySelectorAll(".tabs");
const all_content = document.querySelectorAll(".tabs_content");
const scrollTop = document.getElementById("scrollTop");
const portfolioTabs = document.querySelectorAll(".portfolioTabs");
const all_portfolioContent = document.querySelectorAll(".content");
const buttons = document.querySelectorAll(".faq_button");
const username = document.querySelector(".contact_name");
const email = document.querySelector(".contact_email");
const message = document.querySelector(".contact_message");
const form = document.querySelector(".contact_form");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav ul li a");

window.addEventListener("scroll", function () {
  nav.classList.toggle("sticky", window.scrollY > 0);
  if (document.documentElement.scrollTop > 150) {
    scrollTop.style.display = "block";
  } else {
    scrollTop.style.display = "none";
  }
});
scrollTop.addEventListener("click", function scrollToTop() {
  document.documentElement.scrollTop = 0;
});

document.addEventListener("click", (e) => {
  let targetEl = e.target;
  if (targetEl == mobile_open) {
    mobile_menu.style.transform = "translateX(0%)";
  } else if (
    targetEl == mobile_close ||
    (targetEl !== mobile_menu &&
      targetEl.parentNode !== mobile_menu &&
      targetEl.parentNode.parentNode !== mobile_menu &&
      targetEl.parentNode.parentNode.parentNode !== mobile_menu)
  ) {
    mobile_menu.style.transform = "translateX(100%)";
  }
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    let line = document.querySelector(".line");
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";
    all_content.forEach((content) => {
      content.classList.remove("active");
    });
    all_content[index].classList.add("active");
  });
});

function scrollToSection(event) {
  event.preventDefault();

  let targetId = event.target.getAttribute("href");
  let targetElement = document.querySelector(targetId);
  let offset = window.scrollY > 0 ? 50 : 120;
  let targetOffset = targetElement.offsetTop - offset;

  window.scrollTo({
    top: targetOffset,
    behavior: "smooth",
  });
}

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY + 100;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav ul li a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

portfolioTabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    portfolioTabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    all_portfolioContent.forEach((content) => {
      content.classList.remove("active");
    });
    if (index == 0) {
      for (let i = 1; i < portfolioTabs.length; i++) {
        all_portfolioContent[i].classList.add("active");
      }
    } else all_portfolioContent[index].classList.add("active");
  });
});

const swiper = new Swiper(".swiper", {
  effect: "slide",
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const faq = button.nextElementSibling;
    const icon = button.children[1];
    const isExpanded = faq.classList.contains("show");
    buttons.forEach((otherButton) => {
      const otherFaq = otherButton.nextElementSibling;
      const otherIcon = otherButton.children[1];
      otherFaq.classList.remove("show");
      otherIcon.classList.remove("rotate");
    });
    if (!isExpanded) {
      faq.classList.add("show");
      icon.classList.add("rotate");
    }
  });
});

const showError = (input, message) => {
  const existingError = input.nextElementSibling;
  if (existingError && existingError.classList.contains("error")) {
    existingError.remove();
  }
  const errorText = document.createElement("p");
  errorText.classList.add("error");
  input.classList.add("input_error");
  input.classList.remove("input_success");
  errorText.textContent = message;
  input.insertAdjacentElement("afterend", errorText);
  setTimeout(() => {
    errorText.classList.add("show");
  }, 0);
};

const removeError = (input) => {
  const errorText = input.nextElementSibling;
  if (errorText && errorText.classList.contains("error")) {
    input.classList.remove("input_error");
    errorText.remove();
  }
};

username.addEventListener("input", () => {
  removeError(username);
  username.classList.add("input_success");
});

email.addEventListener("input", () => {
  removeError(email);
  email.classList.add("input_success");
});

message.addEventListener("input", () => {
  removeError(message);
  message.classList.add("input_success");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let hasError = false;
  if (username.value.trim() === "") {
    showError(username, "Username can not be empty !!!");
    hasError = true;
  }
  if (email.value.trim() === "") {
    showError(email, "Email can not be empty !!!");
    hasError = true;
  }
  if (
    email.value.trim() !== "" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  ) {
    showError(email, "Please enter a valid email address!");
    hasError = true;
  }
  if (message.value.trim() === "") {
    showError(message, "Please enter message !!!");
    hasError = true;
  }

  if (!hasError) {
    Swal.fire({
      title: "Are you sure you want to submit the form?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Submitted !", "", "success");
        username.value = "";
        username.classList.remove("input_success");
        email.value = "";
        email.classList.remove("input_success");
        message.value = "";
        message.classList.remove("input_success");
      } else if (result.isDenied) {
        Swal.fire("Not submitted !", "", "info");
      }
    });
  }
});
