/* ================= TYPING EFFECT ================= */
const text = "Vaibhav Araikar";
let index = 0;
const speed = 100;

const textSpan = document.querySelector(".typing .text");
const typingContainer = document.querySelector(".typing");

function typeOnce(){
    if(index < text.length){
        textSpan.textContent += text.charAt(index);
        index++;
        setTimeout(typeOnce, speed);
    } else {
        typingContainer.classList.add("finished");
    }
}

if(textSpan){
    textSpan.textContent = "";
    typeOnce();
}

/* ================= SCROLL PROGRESS BAR ================= */
const progressBar = document.getElementById("progress-bar");

function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if(progressBar) progressBar.style.width = pct + "%";
}

/* ================= NAVBAR SCROLL STATE ================= */
const navbar = document.getElementById("navbar");

function updateNavbarState(){
    if(window.scrollY > 40){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", () => {
    updateProgress();
    updateNavbarState();
    updateActiveLink();
    updateBackToTop();
}, { passive: true });

updateProgress();
updateNavbarState();

/* ================= MOBILE NAV TOGGLE ================= */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if(navToggle){
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("open");
            navLinks.classList.remove("open");
        });
    });
}

/* ================= ACTIVE NAV LINK ON SCROLL ================= */
const sections = document.querySelectorAll("section[id], div[id='home']");
const navLinkEls = document.querySelectorAll(".nav-link");

function updateActiveLink(){
    let current = "home";
    const offset = 120;

    sections.forEach(section => {
        const top = section.offsetTop - offset;
        if(window.scrollY >= top){
            current = section.id;
        }
    });

    navLinkEls.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });
}

/* ================= BACK TO TOP ================= */
const backToTop = document.getElementById("backToTop");

function updateBackToTop(){
    if(!backToTop) return;
    if(window.scrollY > 500){
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

if(backToTop){
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ================= SCROLL REVEAL (IntersectionObserver) ================= */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const delay = entry.target.getAttribute("data-delay") || 0;
            entry.target.style.setProperty("--reveal-delay", delay + "ms");
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ================= COUNT-UP FOR ACHIEVEMENTS ================= */
const counters = document.querySelectorAll(".achievement-num[data-count]");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-count"), 10);
            let current = 0;
            const duration = 1200;
            const stepTime = Math.max(Math.floor(duration / target), 15);

            const timer = setInterval(() => {
                current++;
                el.textContent = current;
                if(current >= target){
                    clearInterval(timer);
                    el.textContent = target;
                }
            }, stepTime);

            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

/* ================= TILT EFFECT ON CARDS ================= */
document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;

        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

/* ================= BUTTON RIPPLE EFFECT ================= */
document.querySelectorAll(".btn, .nav-cta").forEach(btn => {
    btn.addEventListener("click", function(e){
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);

        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    });
});

/* ================= FOOTER YEAR ================= */
const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();
