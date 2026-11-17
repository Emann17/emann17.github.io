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
    function updateActiveLink() {
        if (!sections.length) return;
        var current = null;
        var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (atBottom) {
            // Short last sections (Contact) can't scroll up to the trigger line on tall screens
            current = sections[sections.length - 1];
        } else {
            var line = window.innerHeight * 0.4;
            sections.forEach(function (s) {
                if (s.getBoundingClientRect().top <= line) current = s;
            });
        }
        navLinks.forEach(function (a) {
            a.classList.toggle("active", !!current && a.getAttribute("href") === "#" + current.id);
        });
    }
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);
    updateActiveLink();
});
