const ironMan = document.getElementById('iron-man');
const cap = document.getElementById('captain-america');
const startBtn = document.getElementById('start-btn');
const uiLayer = document.getElementById('ui-layer');
const interactionLayer = document.getElementById('interaction-layer');
const arena = document.querySelector('.arena');
const flash = document.querySelector('.impact-flash');
const particlesContainer = document.getElementById('particles-container');
const pwrLevel = document.getElementById('power-level');

// Button Listeners
startBtn.addEventListener('click', startFight);
document.getElementById('btn-iron').addEventListener('click', () => finishFight('iron'));
document.getElementById('btn-cap').addEventListener('click', () => finishFight('cap'));

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    arena.style.backgroundPosition = `calc(50% + ${x / 2}px) calc(10% + ${y / 2}px)`; // Bg moves slow
    cap.style.transform = cap.classList.contains('run-in') ? `translateX(0) translate(${x}px, ${y}px)` : `translateX(-200%)`; // Char moves med relative to their pose
    ironMan.style.transform = ironMan.classList.contains('fly-in') ? `translateX(0) translate(${x * 1.2}px, ${y * 1.2}px)` : `translateX(200%)`;
});

// Audio Context
let audioCtx;

function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playTone(freq, type, duration, vol = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playNoise(duration) {
    if (!audioCtx) return;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.2;
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    noise.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
}

function startFight() {
    initAudio();

    // 1. Hide Intro UI & Activate HUD
    uiLayer.style.opacity = '0';
    setTimeout(() => uiLayer.style.display = 'none', 500);
    document.body.classList.add('hud-active');

    // SFX: System Boot
    playTone(880, 'sine', 0.5, 0.1);

    // 2. Entrance
    ironMan.classList.add('fly-in');
    cap.classList.add('run-in');

    // SFX: Whoosh
    setTimeout(() => playNoise(0.5), 100);

    // 3. Combat
    setTimeout(() => {
        cap.classList.add('block');
    }, 1200);

    setTimeout(() => {
        ironMan.classList.add('attack');
        playTone(150, 'sawtooth', 0.8, 0.2); // Charge up

        // HUD Update
        let pwr = 100;
        const interval = setInterval(() => {
            pwr -= 2;
            pwrLevel.innerText = `PWR: ${pwr}%`;
            if (pwr < 80) clearInterval(interval);
        }, 20);
    }, 1400);

    setTimeout(() => {
        triggerImpact();
    }, 1600);
}

function triggerImpact() {
    flash.classList.add('flash-anim');
    arena.classList.add('shake-screen');

    playNoise(0.5); // Impact crash
    playTone(50, 'square', 1.0, 0.3); // Low boom

    const impactX = window.innerWidth * 0.35;
    const impactY = window.innerHeight * 0.8;
    spawnSparks(impactX, impactY, 50);

    // PAUSE for Choice
    setTimeout(() => {
        arena.classList.remove('shake-screen');
        flash.classList.remove('flash-anim');

        // Freeze animation
        ironMan.style.animationPlayState = 'paused';
        cap.style.animationPlayState = 'paused';

        // Show Interaction UI
        interactionLayer.style.display = 'flex';
    }, 500);
}

function finishFight(winner) {
    interactionLayer.style.display = 'none';

    if (winner === 'iron') {
        playTone(400, 'sawtooth', 2.0, 0.2); // Unibeam sound
        ironMan.querySelector('.repulsor-beam').style.height = '100px'; // UNIBEAM MODE
        ironMan.querySelector('.repulsor-beam').style.boxShadow = '0 0 50px white, 0 0 100px cyan';

        // Cap gets blasted back
        cap.style.transition = 'transform 0.5s cubic-bezier(0.5, 0, 1, 1)';
        cap.style.transform = 'translateX(-200%) rotate(-45deg)';

        pwrLevel.innerText = "TARGET: NEUTRALIZED";
    } else {
        playTone(100, 'square', 0.2, 0.5); // Ping
        playTone(150, 'square', 0.2, 0.5); // Ping

        // Cap charges forward
        cap.style.transition = 'transform 0.3s ease-in';
        cap.style.transform = 'translateX(200px)'; // Dash

        setTimeout(() => {
            // Iron Man knocked back
            ironMan.style.transition = 'transform 0.5s ease-out';
            ironMan.style.transform = 'translateX(200%) rotate(45deg)';
            playNoise(0.8); // Bash sound
            pwrLevel.innerText = "SYSTEM: CRITICAL";
            document.body.classList.remove('hud-active'); // HUD fails
        }, 300);
    }
}

function spawnSparks(x, y, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const velocityX = (Math.random() - 0.5) * 400;
        const velocityY = (Math.random() - 1) * 400;

        particlesContainer.appendChild(particle);

        const anim = particle.animate([
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${velocityX}px, ${velocityY}px)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 500,
            easing: 'cubic-bezier(0, .9, .57, 1)',
        });

        anim.onfinish = () => particle.remove();
    }
}
