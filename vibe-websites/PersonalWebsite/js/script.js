// --- Custom Cursor ---
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.style.transform = "translate(-50%, -50%) scale(0.8)");
document.addEventListener('mouseup', () => cursor.style.transform = "translate(-50%, -50%) scale(1)");

// Add hover states
const interactiveElements = document.querySelectorAll('a, button, .photo-item, .song-card, .stat-card, .setup-card, .timeline-content');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// --- Typing Effect ---
const typingTextElement = document.getElementById("typing-text");
const words = ["Engineer", "Designer", "Gamer", "Creator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 200;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

// --- Starfield ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
for (let i = 0; i < numStars; i++) stars.push(new Star());
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => { star.update(); star.draw(); });
    requestAnimationFrame(animateStars);
}
animateStars();

// --- Mouse Tilt ---
const movingPicture = document.querySelector('.moving-picture');
const container = document.querySelector('.moving-picture-container');
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    movingPicture.style.transform = `perspective(1000px) rotateX(${y * -0.1}deg) rotateY(${x * 0.1}deg)`;
});
container.addEventListener('mouseleave', () => {
    movingPicture.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});

// --- Observer & Stats Counter ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');

            // Stats Counter
            if (entry.target.classList.contains('stats-grid')) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);

                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + (target > 500 ? "+" : "");
                        }
                    };
                    updateCounter();
                });
                observer.unobserve(entry.target); // Run once
            }

            // Skill Bars
            if (entry.target.classList.contains('skills-container')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => bar.style.width = width, 200);
                });
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

document.querySelectorAll('.photo-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.getAttribute('data-full');
    });
});

closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

// --- Music Player (Mock/YouTube API) ---
let isPlaying = false;
const playBtn = document.getElementById('play-btn');
const equalizer = document.querySelector('.equalizer');
const trackTitle = document.getElementById('track-title');

// Placeholder playlist logic
const playlist = [
    { title: "Midnight City - M83" },
    { title: "Starboy - The Weeknd" },
    { title: "Night Call - Kavinsky" }
];
let trackIndex = 0;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (isPlaying) {
        equalizer.classList.remove('paused');
        trackTitle.innerText = "Playing: " + playlist[trackIndex].title;
    } else {
        equalizer.classList.add('paused');
        trackTitle.innerText = "Paused";
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    trackIndex = (trackIndex + 1) % playlist.length;
    trackTitle.innerText = "Playing: " + playlist[trackIndex].title;
    if (!isPlaying) playBtn.click();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
    trackTitle.innerText = "Playing: " + playlist[trackIndex].title;
    if (!isPlaying) playBtn.click();
});
