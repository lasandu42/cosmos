/**
 * Page interactivity: the live-updating HUD readouts, and the
 * "Begin Mission" button. Kept separate from stars.js so each
 * file has exactly one job.
 */
document.addEventListener('DOMContentLoaded', () => {

    // ---- HUD clock: real UTC time, updates every second ----
    const clockEl = document.getElementById('hud-clock');
    function updateClock() {
        const now = new Date();
        const hh = String(now.getUTCHours()).padStart(2, '0');
        const mm = String(now.getUTCMinutes()).padStart(2, '0');
        const ss = String(now.getUTCSeconds()).padStart(2, '0');
        clockEl.textContent = `${hh}:${mm}:${ss} UTC`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ---- HUD coordinates: drift slowly to feel "alive", not random noise ----
    const coordsEl = document.getElementById('hud-coords');
    let lat = 28.5729; // Kennedy Space Center latitude, as a nod to mission control
    let lon = -80.6490;
    function driftCoords() {
        lat += (Math.random() - 0.5) * 0.01;
        lon += (Math.random() - 0.5) * 0.01;
        coordsEl.textContent = `LAT ${lat.toFixed(4)} \u00b7 LON ${lon.toFixed(4)}`;
    }
    setInterval(driftCoords, 1800);

    // ---- Begin Mission button ----
        const beginBtn = document.getElementById('begin-mission');
        beginBtn.addEventListener('click', () => {
            beginBtn.querySelector('.cta-label').textContent = 'Launching...';
            setTimeout(() => {
                window.location.href = '/planets';
            }, 1200);
        });
});
