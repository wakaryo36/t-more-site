const fadeElements = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    fadeElements.forEach((element) => observer.observe(element));
} else {
    fadeElements.forEach((element) => element.classList.add("show"));
}

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

const setMenuOpen = (isOpen) => {
    if (!hamburger || !nav) return;

    nav.classList.toggle("show", isOpen);
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    document.body.classList.toggle("no-scroll", isOpen);
    document.documentElement.classList.toggle("no-scroll", isOpen);
};

if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        setMenuOpen(!nav.classList.contains("show"));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) setMenuOpen(false);
    });
}

const galleryItems = document.querySelectorAll("[data-gallery-item]");

if (galleryItems.length > 0) {
    let modal = document.getElementById("gallery-modal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "gallery-modal";
        modal.className = "gallery-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "拡大画像");
        modal.hidden = true;
        modal.innerHTML = `
            <button class="modal-close" type="button" aria-label="拡大画像を閉じる">&times;</button>
            <img class="modal-image" src="" alt="">
        `;
        document.body.appendChild(modal);
    }

    const modalImage = modal.querySelector(".modal-image");
    const closeButton = modal.querySelector(".modal-close");
    let lastFocusedItem = null;

    const closeModal = () => {
        modal.hidden = true;
        modalImage.removeAttribute("src");
        modalImage.alt = "";
        document.body.classList.remove("no-scroll");
        document.documentElement.classList.remove("no-scroll");
        lastFocusedItem?.focus();
    };

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            lastFocusedItem = item;
            modalImage.src = item.dataset.full || item.querySelector("img")?.src || "";
            modalImage.alt = item.dataset.alt || item.querySelector("img")?.alt || "";
            modal.hidden = false;
            document.body.classList.add("no-scroll");
            document.documentElement.classList.add("no-scroll");
            closeButton.focus();
        });
    });

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) closeModal();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("show")) {
        setMenuOpen(false);
        hamburger.focus();
    }
});
