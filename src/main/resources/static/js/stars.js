/**
 * Starfield animation.
 * Draws a field of stars on <canvas id="starfield"> that gently drift
 * and twinkle, with a subtle parallax shift toward the mouse position.
 *
 * Kept as an IIFE (Immediately Invoked Function Expression) so none of
 * these variables leak into the global scope and collide with main.js.
 */
(function () {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let stars = [];
    let width, height;
    let mouseX = 0, mouseY = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createStars() {
        // Star count scales with screen area, so mobile isn't overloaded
        // and large desktop monitors don't look sparse.
        const count = Math.floor((width * height) / 4500);
        stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.4 + 0.2,
                baseAlpha: Math.random() * 0.6 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2,
                parallaxFactor: Math.random() * 0.03, // depth: further stars move less
            });
        }
    }

    function draw(time) {
        ctx.clearRect(0, 0, width, height);

        for (const star of stars) {
            // Twinkle: oscillate alpha over time using a sine wave
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
            const alpha = star.baseAlpha + twinkle * 0.3;

            // Parallax: shift star position slightly based on mouse offset from center
            const offsetX = (mouseX - width / 2) * star.parallaxFactor;
            const offsetY = (mouseY - height / 2) * star.parallaxFactor;

            ctx.beginPath();
            ctx.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 246, 250, ${Math.max(0, Math.min(1, alpha))})`;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        resize();
        createStars();
    });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    resize();
    createStars();
    requestAnimationFrame(draw);
})();
