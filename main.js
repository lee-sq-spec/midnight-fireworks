/** * MALACCA NEW YEAR 2025 CORE ENGINE
 * Timezone: Asia/Kuala_Lumpur (GMT+8)
 */

const STATE = {
    isInternal: false,
    isAdmin: false,
    weather: 'clear',
    malaccaOffset: 8 * 60, // Minutes
};

// --- TIME SYSTEM ---
function getMalaccaTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 8));
}

function updateCountdown() {
    const now = getMalaccaTime();
    const target = new Date(2026, 0, 1, 0, 0, 0); // Jan 1, 2026
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerText = "HAPPY NEW YEAR 2026!";
        if (!window.autoFireworkTriggered) triggerAutoFireworks();
        return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('countdown').innerText = `New Year in: ${h}h ${m}m ${s}s`;
}

// --- BACKGROUND (LAYER 0) ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, color, type = 'weather') {
        this.x = x; this.y = y; this.color = color;
        this.type = type;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 3 + 1;
        this.life = 100;
    }
    update() {
        if (this.type === 'rain') this.y += 5;
        else this.y += this.speedY;
        if (this.y > canvas.height) this.y = -10;
        if (this.type === 'firework') this.life -= 2;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initBackground() {
    resize();
    window.addEventListener('resize', resize);
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Render Weather
    if (particles.length < 100) {
        particles.push(new Particle(Math.random() * canvas.width, 0, '#FFF', 'rain'));
    }
    particles.forEach((p, i) => {
        p.update(); p.draw();
        if (p.type === 'firework' && p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

// --- UI FLOW ---
document.getElementById('openBlessBtn').onclick = () => {
    document.getElementById('modalOverlay').classList.remove('hidden');
    document.getElementById('blessForm').classList.remove('hidden');
};

document.getElementById('submitBlessBtn').onclick = () => {
    const nick = document.getElementById('nickInput').value;
    const wish = document.getElementById('wishInput').value;
    const now = getMalaccaTime();

    // Restriction: 1 hour before New Year
    const nyTime = new Date(2026, 0, 1, 0, 0, 0);
    const allowTime = new Date(nyTime.getTime() - 3600000);

    if (now < allowTime && !STATE.isAdmin) {
        alert("The inner circle opens 1 hour before midnight!");
        return;
    }

    if (!nick || !wish) return alert("Fields required!");

    addBlessing(nick, wish);
    enterInternal();
};

function enterInternal() {
    STATE.isInternal = true;
    document.getElementById('centerZone').classList.add('hidden');
    document.getElementById('leftZone').classList.remove('hidden');
    document.getElementById('rightZone').classList.remove('hidden');
    document.getElementById('modalOverlay').classList.add('hidden');
    document.getElementById('blessForm').classList.add('hidden');
}

function addBlessing(name, text) {
    const wall = document.getElementById('wallContent');
    const div = document.createElement('div');
    div.className = 'bless-card';
    div.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
    wall.prepend(div);
}

// --- ADMIN ---
document.getElementById('adminBtn').onclick = () => {
    document.getElementById('modalOverlay').classList.remove('hidden');
    document.getElementById('adminForm').classList.remove('hidden');
};

document.getElementById('loginBtn').onclick = () => {
    // Hidden Logic Verification
    const k = document.getElementById('adm1').value;
    const c = document.getElementById('adm2').value;
    const p = document.getElementById('adm3').value;

    if (k === "ShyuanQinn" && c === "KADETJPJ2025" && p === "MoeStar!2025") {
        STATE.isAdmin = true;
        alert("Admin Mode: Access Granted");
        enterInternal();
    } else {
        alert("Verification Failed");
    }
};

// --- INITIALIZE ---
initBackground();
setInterval(updateCountdown, 1000);
updateCountdown();

// --- GAME STUBS ---
window.openGame = (type) => {
    document.getElementById('modalOverlay').classList.remove('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
    const viewport = document.getElementById('gameViewport');
    viewport.innerHTML = `<h2 style="color:white; padding:20px;">${type.toUpperCase()} LOADING...</h2>`;
    // Game logic would be injected here
};

window.closeModal = () => {
    document.getElementById('modalOverlay').classList.add('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
};
