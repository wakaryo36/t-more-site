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

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("show");
        hamburger.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
        document.documentElement.classList.toggle("no-scroll");
    });
}

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
        hamburger.classList.remove("active");
        document.body.classList.remove("no-scroll");
        document.documentElement.classList.remove("no-scroll");
    });
});