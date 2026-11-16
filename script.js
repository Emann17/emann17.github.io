document.addEventListener("DOMContentLoaded", function () {
    // Footer year
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // Mobile menu
    var btn = document.querySelector(".menu-btn");
    var nav = document.querySelector(".site-nav");
    if (btn && nav) {
        btn.addEventListener("click", function () {
            var open = nav.classList.toggle("open");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
        nav.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () {
                nav.classList.remove("open");
                btn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Scroll progress line under the header
    var progress = document.querySelector(".progress");
    function updateProgress() {
        if (!progress) return;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = max > 0 ? (window.scrollY / max) * 100 + "%" : "0";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    // Fade-in blocks and staggered lists as they scroll into view
    var fadeTargets = document.querySelectorAll(".section .container");
    fadeTargets.forEach(function (el) { el.classList.add("fade"); });
    var revealTargets = Array.prototype.slice.call(fadeTargets)
        .concat(Array.prototype.slice.call(document.querySelectorAll(".stagger")));

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealTargets.forEach(function (el) { observer.observe(el); });
    } else {
        revealTargets.forEach(function (el) { el.classList.add("visible"); });
    }

    // Highlight the nav link for the section currently on screen
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    if ("IntersectionObserver" in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (a) {
                        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
                    });
                }
            });
        }, { rootMargin: "-40% 0px -55% 0px" });
        sections.forEach(function (s) { spy.observe(s); });
    }
});
