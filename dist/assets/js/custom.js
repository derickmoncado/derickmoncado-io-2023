"use strict";

(() => {
  console.log("document ready!"); // Appends the 'active' class to nav links

  let pathname = "." + window.location.pathname;
  document.querySelectorAll(`.navbar-nav > li > a[href='${pathname}']`).forEach(el => {
    el.classList.add("active");
  }); // add class to header on scroll to add drop shadow

  const headerBar = document.getElementById("dm-header");

  window.onscroll = () => {
    if (window.scrollY > 40) {
      headerBar.classList.add("active");
    } else {
      headerBar.classList.remove("active");
    }
  }; // add class to the header when nav is open


  const navBtn = document.querySelector(".navbar-toggler");
  navBtn.addEventListener("click", () => {
    headerBar.classList.toggle("open");
  }); // then close nav when a nav-link is clicked

  const navLink = document.querySelectorAll(".nav-link");
  navLink.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        navBtn.click();
      }
    });
  }); // =============================
  // Init Swiper (swiper.js)

  const swiper = new Swiper(".swiper", {
    loop: true,
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    scrollbar: {
      el: ".swiper-scrollbar"
    }
  }); // =============================
  // Init Emergence (emergence.js)

  emergence.init({
    elemCushion: 0.75,
    // toggles class when element is 75% visible
    reset: false
  }); // =============================
  // Init tooltips everywhere (popper.js)

  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  }); // =============================

  /* Assign subpage a unique ID */
  // Get the current page's filename (assuming your pages are in the same directory)

  var currentPage = window.location.pathname.split("/").pop().split(".")[0]; // Assign the current page's filename as the HTML ID

  document.documentElement.id = currentPage; // =============================

  /* Fetch GitHub Gists */

  const username = "derickmoncado";

  const fetchData = async () => {
    try {
      const uri = "https://pokeapi.co/api/v2/pokemon?limit=151";
      const res = await fetch(uri);
      const data = await res.json();
      events = data["results"];
    } catch (error) {
      console.log(error);
    }

    let template = "";
    events.forEach(event => {
      template += `
                <li class="event-item">
                    <div class="event-body">
                        <div class="event-body__img">
                            <img src="${event.image}" alt="Event Image">
                        </div>
                        <div class="event-body__details">
                            <p class="author-date">${event.author}<span>${event.date}</span></p>
                            <a class="title" href="#">${event.title}</a>
                            <p class="location">${event.location}</p>
                        </div>
                    </div>
                </li>
            `;
    });
    eventsContainer.innerHTML = template;
  }; //fetchData();

})();