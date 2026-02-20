// Greeting Rotation
const greetings = ["Hello", "Hola", "Bonjour", "Namaste", "Ciao", "Salam"];
const greetingElement = document.getElementById("greeting-text");
let greetingIndex = 0;

function changeGreeting() {
    greetingElement.style.opacity = 0;
    setTimeout(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        greetingElement.textContent = greetings[greetingIndex];
        greetingElement.style.opacity = 1;
    }, 500);
}

setInterval(changeGreeting, 3000);

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');

            // Animate Skill Bars if skills section is visible
            if (entry.target.classList.contains('skills-container')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0'; // Reset for animation
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                });
            }
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));

// Music Marquee Pause on Hover
const marquee = document.querySelector('.music-marquee');
marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
});
marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
});
