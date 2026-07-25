document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('gravity-canvas');
    const ctx = canvas.getContext('2d');
    const massSlidersContainer = document.getElementById('mass-sliders');
    const countButtons = document.querySelectorAll('.count-btn');
    const launchBtn = document.getElementById('launch-btn');
    const resetBtn = document.getElementById('reset-btn');

    let bodyCount = 2;
    let planets = [];       // holds live simulation state once launched
    let simulationRunning = false;
    let animationId = null;

    // Gravitational constant — NOT the real-world value (6.674e-11),
    // since real-world units would make everything move imperceptibly
    // slowly on a small canvas. This is a scaled-up constant tuned to
    // look right at our pixel/frame scale, while the underlying formula
    // (F = G*M*m/r²) is the genuine physics.
    const G = 0.5;

    const STAR_MASS = 1200;
    const colors = ['#5CF7FF', '#7B2FF7', '#3B82C4'];

    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    function buildSliders(count) {
        massSlidersContainer.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const row = document.createElement('div');
            row.className = 'mass-slider-row';
            row.innerHTML = `
                <label>
                    <span>Planet ${i} Mass</span>
                    <span id="mass-value-${i}">50</span>
                </label>
                <input type="range" id="mass-slider-${i}" min="10" max="300" value="50" />
            `;
            massSlidersContainer.appendChild(row);
        }
        for (let i = 1; i <= count; i++) {
            const slider = document.getElementById(`mass-slider-${i}`);
            const valueLabel = document.getElementById(`mass-value-${i}`);
            slider.addEventListener('input', () => {
                valueLabel.textContent = slider.value;
            });
        }
    }

    function drawStaticScene() {
        resizeCanvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        drawStar(centerX, centerY);

        for (let i = 0; i < bodyCount; i++) {
            const orbitRadius = 80 + i * 60;
            const angle = (i / bodyCount) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * orbitRadius;
            const y = centerY + Math.sin(angle) * orbitRadius;
            drawPlanet(x, y, colors[i]);
        }
    }

    function drawStar(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#E8C15A';
        ctx.shadowColor = '#E8C15A';
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function drawPlanet(x, y, color) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    /**
     * Builds the live simulation state: one object per planet holding
     * position, velocity, mass, and color. Starting velocity is set
     * perpendicular to the line toward the star — that sideways push
     * is what turns "falling toward the star" into "orbiting it."
     */
    function initSimulation() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        planets = [];

        for (let i = 0; i < bodyCount; i++) {
            const slider = document.getElementById(`mass-slider-${i + 1}`);
            const mass = parseInt(slider.value, 10);

            const orbitRadius = 80 + i * 60;
            const angle = (i / bodyCount) * Math.PI * 2;

            const x = centerX + Math.cos(angle) * orbitRadius;
            const y = centerY + Math.sin(angle) * orbitRadius;

            // Circular orbit speed formula: v = sqrt(G * M / r)
            // This is the exact speed needed for a stable circular orbit
            // at this distance, given the star's mass.
            const orbitSpeed = Math.sqrt((G * STAR_MASS) / orbitRadius);

            // Velocity direction perpendicular to the radius (90° rotated)
            const vx = -Math.sin(angle) * orbitSpeed;
            const vy = Math.cos(angle) * orbitSpeed;

            planets.push({ x, y, vx, vy, mass, color: colors[i] });
        }
    }

    /** One physics step: calculate gravity, update velocity, update position. */
function stepSimulation() {
    const dt = 0.15; // single, consistent time step — used everywhere below
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // ---- Star gravity ----
    for (const planet of planets) {
        const dx = centerX - planet.x;
        const dy = centerY - planet.y;
        const r2 = dx * dx + dy * dy;
        const distance = Math.sqrt(r2);
        const accel = (G * STAR_MASS) / r2;
        planet.ax = accel * dx / distance;
        planet.ay = accel * dy / distance;
    }

    // ---- Planet-to-planet gravity ----
    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const p1 = planets[i];
            const p2 = planets[j];
            let dx = p2.x - p1.x;
            let dy = p2.y - p1.y;
            let r2 = dx * dx + dy * dy;
            if (r2 < 25) r2 = 25; // prevent singularity at very close range

            const distance = Math.sqrt(r2);
            const force = (G * p1.mass * p2.mass) / r2;

            const ax1 = (force / p1.mass) * dx / distance;
            const ay1 = (force / p1.mass) * dy / distance;
            const ax2 = -(force / p2.mass) * dx / distance;
            const ay2 = -(force / p2.mass) * dy / distance;

            p1.ax += ax1;
            p1.ay += ay1;
            p2.ax += ax2;
            p2.ay += ay2;
        }
    }

    // ---- Position and velocity update: SAME dt for both ----
    for (const planet of planets) {
        planet.x += planet.vx * dt;
        planet.y += planet.vy * dt;
        planet.vx += planet.ax * dt;
        planet.vy += planet.ay * dt;
    }
}

    function renderSimulation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStar(canvas.width / 2, canvas.height / 2);
        for (const planet of planets) {
            drawPlanet(planet.x, planet.y, planet.color);
        }
    }

    function animate() {
        if (!simulationRunning) return;
        stepSimulation();
        renderSimulation();
        animationId = requestAnimationFrame(animate);
    }

    function launchSimulation() {
        resizeCanvas();
        initSimulation();
        simulationRunning = true;
        animate();
    }

    function resetSimulation() {
        simulationRunning = false;
        if (animationId) cancelAnimationFrame(animationId);
        drawStaticScene();
    }

    countButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            countButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            bodyCount = parseInt(btn.getAttribute('data-count'), 10);
            resetSimulation();
            buildSliders(bodyCount);
            drawStaticScene();
        });
    });

    launchBtn.addEventListener('click', launchSimulation);
    resetBtn.addEventListener('click', resetSimulation);

    window.addEventListener('resize', () => {
        if (!simulationRunning) drawStaticScene();
    });

    buildSliders(bodyCount);
    drawStaticScene();
});