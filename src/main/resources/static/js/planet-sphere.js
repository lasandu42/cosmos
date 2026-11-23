/**
 * Real textured 3D planet for the detail pages.
 * Reads the planet name from data-planet-name on #planet-sphere-container,
 * loads /images/planets/<name>.jpg and wraps it onto a lit, slowly spinning sphere.
 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('planet-sphere-container');
    if (!container) return; // this page has no sphere container

    const planetName = container.getAttribute('data-planet-name');

    // The page already defines --planet-color on <body> (set by Thymeleaf),
    // so we can reuse it here for the atmosphere glow and the fallback colour.
    const planetColor = new THREE.Color(
        getComputedStyle(container).getPropertyValue('--planet-color').trim() || '#ffffff'
    );

    // ---- Scene, camera, renderer ----
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );
    camera.position.z = 3.6;

    // alpha: true -> transparent canvas, so the page's starfield and nebula
    // show through behind the planet instead of a black square.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // ---- Lighting ----
    // DirectionalLight = sunlight: parallel rays, no distance falloff.
    // (In Three r155+ a PointLight needs huge intensity values, so a
    // directional light is the simple, predictable choice for a "sun".)
    const sun = new THREE.DirectionalLight(0xffffff, 3.0);
    sun.position.set(5, 2, 4);
    scene.add(sun);

    // Soft fill so the night side isn't pure black.
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // ---- Planet group: tilted axis, sphere spins inside it ----
    const pivot = new THREE.Group();
    pivot.rotation.z = 0.2; // slight axial tilt looks more natural than perfectly vertical
    scene.add(pivot);

    // Thin glowing atmosphere shell, tinted with the planet's colour.
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.0 * 1.06, 64, 64),
        new THREE.MeshBasicMaterial({
            color: planetColor,
            transparent: true,
            opacity: 0.18,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        })
    );
    scene.add(atmosphere);

    let sphere = null;

    function buildSphere(material) {
        sphere = new THREE.Mesh(new THREE.SphereGeometry(1.0, 96, 96), material);
        pivot.add(sphere);
    }

    // ---- Load the real texture ----
    new THREE.TextureLoader().load(
        `/images/planets/${planetName}.jpg`,
        (texture) => {
            // Tell Three the image is sRGB, otherwise colours look washed out.
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            buildSphere(new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 1.0,
                metalness: 0.0,
            }));
        },
        undefined,
        (error) => {
            // Missing file / wrong name: say so in the console, and show a
            // plain coloured sphere so the page never looks broken.
            console.error(`Could not load /images/planets/${planetName}.jpg`, error);
            buildSphere(new THREE.MeshStandardMaterial({ color: planetColor, roughness: 1.0 }));
        }
    );

    // ---- Render loop ----
    function animate() {
        requestAnimationFrame(animate);
        if (sphere) sphere.rotation.y += 0.0025;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});
