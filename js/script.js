const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        });
    });

    fadeElements.forEach((element) => {
        observer.observe(element);
    });
}

const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.querySelector(".modal-close");

if (galleryItems.length > 0 && modal && modalImg && modalClose) {
    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
        modal.classList.add("show");
        modalImg.src = item.src;
        modalImg.alt = item.alt;
        });
    });

    modalClose.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
        modal.classList.remove("show");
        }
    });
}

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("show");
        hamburger.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });
}

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
        hamburger.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});