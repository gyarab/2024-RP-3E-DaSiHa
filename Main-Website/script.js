document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".link-header .mid .menu-toggle");
    const menuMid = document.querySelector(".link-header .mid");

    if (menuToggle && menuMid) {
        menuToggle.addEventListener("click", () => {
            menuMid.classList.toggle("active");
        });
    }
});
