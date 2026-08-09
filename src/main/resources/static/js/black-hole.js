document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById("bh-canvas-container");


    // =====================================================
    // THREE.JS RENDERER
    // =====================================================

    const renderer =
        new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: "high-performance"
        });


    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.5)
    );


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    container.appendChild(
        renderer.domElement
    );


    // =====================================================
    // FULL SCREEN SCENE
    // =====================================================

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.Camera();


    const geometry =
        new THREE.PlaneGeometry(2, 2);


    // =====================================================
    // PHYSICS
    //
    // Units:
    //
    // G = c = 1
    //
    // M = 0.5
    //
    // Therefore:
    //
    // Schwarzschild radius:
    //
    // Rs = 2M = 1
    //
    // Photon sphere:
    //
    // r = 3M = 1.5 Rs
    //
    // ISCO:
    //
    // r = 6M = 3 Rs
    //
    // =====================================================


    const uniforms = {

        uResolution: {
            value: new THREE.Vector2(
                container.clientWidth,
                container.clientHeight
            )
        },

        uTime: {
            value: 0
        },

        uCameraPosition: {
            value: new THREE.Vector3(
                0,
                3.8,
                10.5
            )
        },

        uFov: {
            value: 52
        }

    };


    // =====================================================
    // VERTEX SHADER
    // =====================================================

    const vertexShader = `

        varying vec2 vUv;

        void main() {

            vUv = uv;

            gl_Position =
                vec4(
                    position,
                    1.0
                );
        }

    `;


    // =====================================================
    // FRAGMENT SHADER
    // =====================================================

    const fragmentShader = `

        precision highp float;


        varying vec2 vUv;


        uniform vec2 uResolution;

        uniform float uTime;

        uniform vec3 uCameraPosition;

        uniform float uFov;


        // -------------------------------------------------
        // PHYSICAL CONSTANTS
        // -------------------------------------------------

        const float M = 0.5;

        const float RS = 1.0;

        const float PHOTON_SPHERE = 1.5;

        const float ISCO = 3.0;

        const float DISK_OUTER = 14.0;

        const float FAR_DISTANCE = 80.0;

        const float PI = 3.141592653589793;


        // -------------------------------------------------
        // HASH FUNCTIONS
        // -------------------------------------------------

        float hash21(vec2 p)
        {
            p = fract(
                p * vec2(
                    123.34,
                    456.21
                )
            );

            p += dot(
                p,
                p + 45.32
            );

            return fract(
                p.x * p.y
            );
        }


        float hash31(vec3 p)
        {
            p = fract(
                p * 0.1031
            );

            p += dot(
                p,
                p.yzx + 33.33
            );

            return fract(
                (p.x + p.y) * p.z
            );
        }


        // -------------------------------------------------
        // STAR FIELD
        // -------------------------------------------------

        vec3 starField(
            vec3 direction
        )
        {

            direction =
                normalize(direction);


            // Spherical coordinates

            float longitude =
                atan(
                    direction.z,
                    direction.x
                );


            float latitude =
                asin(
                    clamp(
                        direction.y,
                        -1.0,
                        1.0
                    )
                );


            vec2 uv =
                vec2(
                    longitude / (2.0 * PI) + 0.5,
                    latitude / PI + 0.5
                );


            vec3 background =
                vec3(
                    0.0015,
                    0.0025,
                    0.008
                );


            // -------------------------------------------------
            // MILKY WAY
            // -------------------------------------------------

            float bandCenter =
                0.10 *
                sin(
                    longitude * 2.0
                );


            float distanceFromBand =
                abs(
                    latitude -
                    bandCenter
                );


            float milkyWay =
                exp(
                    -pow(
                        distanceFromBand / 0.13,
                        2.0
                    )
                );


            background +=
                vec3(
                    0.012,
                    0.010,
                    0.018
                ) *
                milkyWay;


            // -------------------------------------------------
            // LARGE STARS
            // -------------------------------------------------

            vec2 grid =
                uv *
                vec2(
                    700.0,
                    350.0
                );


            vec2 cell =
                floor(grid);


            vec2 local =
                fract(grid) - 0.5;


            float random =
                hash21(cell);


            float starSize =
                mix(
                    0.015,
                    0.055,
                    hash21(
                        cell + 7.2
                    )
                );


            float star =
                smoothstep(
                    starSize,
                    0.0,
                    length(local)
                );


            float starMask =
                step(
                    0.997,
                    random
                );


            background +=
                star *
                starMask *
                vec3(
                    0.8,
                    0.88,
                    1.0
                ) *
                2.5;


            // -------------------------------------------------
            // SMALLER STARS
            // -------------------------------------------------

            vec2 grid2 =
                uv *
                vec2(
                    1400.0,
                    700.0
                );


            vec2 cell2 =
                floor(grid2);


            vec2 local2 =
                fract(grid2) - 0.5;


            float random2 =
                hash21(
                    cell2 + 91.7
                );


            float star2 =
                smoothstep(
                    0.018,
                    0.0,
                    length(local2)
                );


            float mask2 =
                step(
                    0.999,
                    random2
                );


            background +=
                star2 *
                mask2 *
                vec3(
                    0.55,
                    0.65,
                    0.85
                ) *
                1.4;


            return background;
        }


        // -------------------------------------------------
        // BLACKBODY-STYLE COLOR
        // -------------------------------------------------

        vec3 diskColor(
            float temperature
        )
        {

            temperature =
                clamp(
                    temperature,
                    0.0,
                    1.0
                );


            vec3 deepOrange =
                vec3(
                    1.0,
                    0.025,
                    0.001
                );


            vec3 orange =
                vec3(
                    1.0,
                    0.18,
                    0.015
                );


            vec3 yellow =
                vec3(
                    1.0,
                    0.65,
                    0.16
                );


            vec3 white =
                vec3(
                    1.0,
                    0.94,
                    0.75
                );


            vec3 result;


            if (temperature < 0.35)
            {

                result =
                    mix(
                        deepOrange,
                        orange,
                        temperature / 0.35
                    );

            }
            else if (
                temperature < 0.7
            )
            {

                result =
                    mix(
                        orange,
                        yellow,
                        (
                            temperature -
                            0.35
                        ) / 0.35
                    );

            }
            else
            {

                result =
                    mix(
                        yellow,
                        white,
                        (
                            temperature -
                            0.7
                        ) / 0.3
                    );

            }


            return result;
        }


        // -------------------------------------------------
        // SCHWARZSCHILD GEODESIC
        //
        // u = 1/r
        //
        // d²u/dφ² + u = 3Mu²
        //
        // This is the null-geodesic equation for photons
        // travelling around a Schwarzschild black hole.
        // -------------------------------------------------

        float geodesicAcceleration(
            float u
        )
        {

            return
                3.0 * M * u * u -
                u;
        }


        // -------------------------------------------------
        // DISK EMISSION
        // -------------------------------------------------

        vec3 calculateDiskEmission(
            vec3 position,
            vec3 photonDirection
        )
        {

            float radius =
                length(
                    vec2(
                        position.x,
                        position.z
                    )
                );


            if (
                radius < ISCO ||
                radius > DISK_OUTER
            )
            {
                return vec3(0.0);
            }


            // -------------------------------------------------
            // RADIAL TEMPERATURE PROFILE
            //
            // Approximation to a thin accretion disk.
            // Temperature decreases outward.
            // -------------------------------------------------

            float x =
                ISCO / radius;


            float profile =
                pow(
                    x,
                    3.0
                ) *
                (
                    1.0 -
                    sqrt(x)
                );


            profile =
                max(
                    profile,
                    0.0
                );


            // -------------------------------------------------
            // ORBITAL VELOCITY
            //
            // For circular Schwarzschild orbits:
            //
            // v = sqrt(M / (r - 2M))
            //
            // -------------------------------------------------

            float velocity =
                sqrt(
                    M /
                    max(
                        radius - 2.0 * M,
                        0.001
                    )
                );


            velocity =
                clamp(
                    velocity,
                    0.0,
                    0.95
                );


            float gamma =
                1.0 /
                sqrt(
                    1.0 -
                    velocity *
                    velocity
                );


            // -------------------------------------------------
            // TANGENTIAL VELOCITY
            // -------------------------------------------------

            vec3 radial =
                normalize(
                    vec3(
                        position.x,
                        0.0,
                        position.z
                    )
                );


            vec3 velocityDirection =
                normalize(
                    cross(
                        vec3(
                            0.0,
                            1.0,
                            0.0
                        ),
                        radial
                    )
                );


            // -------------------------------------------------
            // DOPPLER SHIFT
            // -------------------------------------------------

            float observerAngle =
                dot(
                    velocityDirection,
                    -photonDirection
                );


            float doppler =
                1.0 /
                (
                    gamma *
                    (
                        1.0 -
                        velocity *
                        observerAngle
                    )
                );


            // -------------------------------------------------
            // GRAVITATIONAL REDSHIFT
            //
            // g = sqrt(1 - Rs/r)
            // -------------------------------------------------

            float gravitational =
                sqrt(
                    max(
                        1.0 -
                        RS / radius,
                        0.001
                    )
                );


            float g =
                gravitational *
                doppler;


            // -------------------------------------------------
            // OBSERVED TEMPERATURE
            // -------------------------------------------------

            float temperature =
                clamp(
                    pow(
                        max(
                            profile,
                            0.00001
                        ),
                        0.18
                    ) *
                    g *
                    0.75,
                    0.0,
                    1.0
                );


            vec3 color =
                diskColor(
                    temperature
                );


            // Relativistic intensity transformation

            float intensity =
                profile *
                pow(
                    max(g, 0.1),
                    3.0
                );


            intensity *= 35.0;


            // Small turbulent variation

            float turbulence =
                0.92 +
                0.08 *
                sin(
                    radius * 9.0 +
                    uTime * 0.8
                );


            intensity *= turbulence;


            return
                color *
                intensity;
        }


        // -------------------------------------------------
        // MAIN RAY TRACE
        // -------------------------------------------------

        vec3 traceBlackHole(
            vec3 rayOrigin,
            vec3 rayDirection
        )
        {

            // -------------------------------------------------
            // Build the 2D orbital plane.
            //
            // Schwarzschild spacetime is spherically symmetric,
            // so every photon trajectory remains in the plane
            // defined by its initial position and direction.
            // -------------------------------------------------

            vec3 radial0 =
                normalize(
                    rayOrigin
                );


            vec3 transverse =
                rayDirection -
                radial0 *
                dot(
                    rayDirection,
                    radial0
                );


            float angularMomentum =
                length(
                    cross(
                        rayOrigin,
                        rayDirection
                    )
                );


            if (
                angularMomentum < 0.00001
            )
            {

                if (
                    dot(
                        rayDirection,
                        radial0
                    ) < 0.0
                )
                {
                    return vec3(0.0);
                }

                return starField(
                    rayDirection
                );
            }


            vec3 tangential0 =
                normalize(
                    transverse
                );


            // -------------------------------------------------
            // Initial conditions
            // -------------------------------------------------

            float radius0 =
                length(
                    rayOrigin
                );


            float u =
                1.0 /
                radius0;


            float du =
                -dot(
                    rayDirection,
                    radial0
                ) /
                angularMomentum;


            float phi =
                0.0;


            vec3 previousPosition =
                rayOrigin;


            bool diskHit =
                false;


            vec3 diskResult =
                vec3(0.0);


            // -------------------------------------------------
            // Integrate the photon orbit
            // -------------------------------------------------

            const float STEP =
                0.035;


            for (
                int i = 0;
                i < 240;
                i++
            )
            {

                // -------------------------------------------------
                // RK4 integration
                // -------------------------------------------------

                float k1u =
                    du;

                float k1v =
                    geodesicAcceleration(
                        u
                    );


                float u2 =
                    u +
                    0.5 *
                    STEP *
                    k1u;


                float v2 =
                    du +
                    0.5 *
                    STEP *
                    k1v;


                float k2u =
                    v2;


                float k2v =
                    geodesicAcceleration(
                        u2
                    );


                float u3 =
                    u +
                    0.5 *
                    STEP *
                    k2u;


                float v3 =
                    du +
                    0.5 *
                    STEP *
                    k2v;


                float k3u =
                    v3;


                float k3v =
                    geodesicAcceleration(
                        u3
                    );


                float u4 =
                    u +
                    STEP *
                    k3u;


                float v4 =
                    du +
                    STEP *
                    k3v;


                float k4u =
                    v4;


                float k4v =
                    geodesicAcceleration(
                        u4
                    );


                u +=
                    STEP *
                    (
                        k1u +
                        2.0 * k2u +
                        2.0 * k3u +
                        k4u
                    ) /
                    6.0;


                du +=
                    STEP *
                    (
                        k1v +
                        2.0 * k2v +
                        2.0 * k3v +
                        k4v
                    ) /
                    6.0;


                phi +=
                    STEP;


                // -------------------------------------------------
                // Photon reaches infinity
                // -------------------------------------------------

                if (
                    u <= 0.0
                )
                {

                    // Photon escaped.
                    // Calculate its final direction.

                    float safeU =
                        max(
                            u + 0.000001,
                            0.000001
                        );


                    float radius =
                        1.0 /
                        safeU;


                    float drdphi =
                        -du /
                        (
                            safeU *
                            safeU
                        );


                    vec3 eR =
                        radial0 *
                        cos(phi) +
                        tangential0 *
                        sin(phi);


                    vec3 ePhi =
                        -radial0 *
                        sin(phi) +
                        tangential0 *
                        cos(phi);


                    vec3 outgoingDirection =
                        normalize(
                            drdphi * eR +
                            radius * ePhi
                        );


                    vec3 sky =
                        starField(
                            outgoingDirection
                        );


                    // Photon ring enhancement

                    float criticalImpact =
                        3.0 *
                        sqrt(3.0) *
                        M;


                    float ringDistance =
                        abs(
                            angularMomentum -
                            criticalImpact
                        );


                    float photonRing =
                        exp(
                            -pow(
                                ringDistance /
                                0.035,
                                2.0
                            )
                        );


                    sky +=
                        vec3(
                            1.0,
                            0.38,
                            0.06
                        ) *
                        photonRing *
                        2.5;


                    return sky;
                }


                float radius =
                    1.0 /
                    max(
                        u,
                        0.000001
                    );


                // -------------------------------------------------
                // Event horizon
                //
                // r <= Rs
                // -------------------------------------------------

                if (
                    radius <= RS
                )
                {

                    return vec3(0.0);
                }


                // -------------------------------------------------
                // Current orbital position
                // -------------------------------------------------

                vec3 eR =
                    radial0 *
                    cos(phi) +
                    tangential0 *
                    sin(phi);


                vec3 ePhi =
                    -radial0 *
                    sin(phi) +
                    tangential0 *
                    cos(phi);


                vec3 currentPosition =
                    radius *
                    eR;


                // -------------------------------------------------
                // Current photon direction
                // -------------------------------------------------

                float drdphi =
                    -du /
                    max(
                        u * u,
                        0.000001
                    );


                vec3 currentDirection =
                    normalize(
                        drdphi * eR +
                        radius * ePhi
                    );


                // -------------------------------------------------
                // Check intersection with accretion disk.
                //
                // Disk plane = y = 0
                // -------------------------------------------------

                float previousY =
                    previousPosition.y;


                float currentY =
                    currentPosition.y;


                if (
                    previousY *
                    currentY <= 0.0
                )
                {

                    float denominator =
                        previousY -
                        currentY;


                    if (
                        abs(denominator) >
                        0.000001
                    )
                    {

                        float t =
                            previousY /
                            denominator;


                        t =
                            clamp(
                                t,
                                0.0,
                                1.0
                            );


                        vec3 hitPosition =
                            mix(
                                previousPosition,
                                currentPosition,
                                t
                            );


                        float diskRadius =
                            length(
                                vec2(
                                    hitPosition.x,
                                    hitPosition.z
                                )
                            );


                        if (
                            diskRadius > ISCO &&
                            diskRadius < DISK_OUTER
                        )
                        {

                            diskResult =
                                calculateDiskEmission(
                                    hitPosition,
                                    currentDirection
                                );


                            if (
                                length(
                                    diskResult
                                ) > 0.001
                            )
                            {

                                diskHit =
                                    true;

                            }

                        }

                    }

                }


                if (diskHit)
                {
                    return diskResult;
                }


                previousPosition =
                    currentPosition;


                // -------------------------------------------------
                // Prevent numerical problems
                // -------------------------------------------------

                if (
                    radius > FAR_DISTANCE
                )
                {

                    return starField(
                        currentDirection
                    );
                }

            }


            // -------------------------------------------------
            // If photon remains trapped near the photon sphere,
            // it contributes to the black-hole shadow/ring.
            // -------------------------------------------------

            return vec3(0.0);
        }


        // =====================================================
        // MAIN
        // =====================================================

        void main()
        {

            // -------------------------------------------------
            // Screen coordinates
            // -------------------------------------------------

            vec2 screen =
                (
                    gl_FragCoord.xy /
                    uResolution
                );


            screen =
                screen *
                2.0 -
                1.0;


            float aspect =
                uResolution.x /
                uResolution.y;


            screen.x *=
                aspect;


            // -------------------------------------------------
            // CAMERA
            // -------------------------------------------------

            vec3 target =
                vec3(
                    0.0,
                    0.0,
                    0.0
                );


            vec3 forward =
                normalize(
                    target -
                    uCameraPosition
                );


            vec3 worldUp =
                vec3(
                    0.0,
                    1.0,
                    0.0
                );


            vec3 right =
                normalize(
                    cross(
                        forward,
                        worldUp
                    )
                );


            vec3 up =
                normalize(
                    cross(
                        right,
                        forward
                    )
                );


            float fovScale =
                tan(
                    radians(uFov) *
                    0.5
                );


            vec3 rayDirection =
                normalize(
                    forward +
                    right *
                    screen.x *
                    fovScale +
                    up *
                    screen.y *
                    fovScale
                );


            // -------------------------------------------------
            // TRACE LIGHT
            // -------------------------------------------------

            vec3 color =
                traceBlackHole(
                    uCameraPosition,
                    rayDirection
                );


            // -------------------------------------------------
            // Soft cinematic exposure
            // -------------------------------------------------

            color =
                vec3(1.0) -
                exp(
                    -color *
                    0.8
                );


            // -------------------------------------------------
            // Slight vignette
            // -------------------------------------------------

            vec2 centered =
                gl_FragCoord.xy /
                uResolution -
                0.5;


            float vignette =
                1.0 -
                smoothstep(
                    0.35,
                    0.8,
                    length(centered)
                );


            color *=
                mix(
                    0.78,
                    1.0,
                    vignette
                );


            gl_FragColor =
                vec4(
                    color,
                    1.0
                );
        }

    `;


    // =====================================================
    // SHADER MATERIAL
    // =====================================================

    const material =
        new THREE.ShaderMaterial({

            uniforms: uniforms,

            vertexShader: vertexShader,

            fragmentShader: fragmentShader

        });


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    scene.add(mesh);


    // =====================================================
    // CAMERA CONTROL
    // =====================================================

    let yaw = 0.0;

    let pitch = 0.32;

    let distance = 11.2;


    let dragging = false;

    let lastX = 0;

    let lastY = 0;


    // -----------------------------------------------------
    // Update camera position
    // -----------------------------------------------------

    function updateCamera()
    {

        pitch =
            Math.max(
                -1.25,
                Math.min(
                    1.25,
                    pitch
                )
            );


        distance =
            Math.max(
                5.0,
                Math.min(
                    24.0,
                    distance
                )
            );


        const cosPitch =
            Math.cos(
                pitch
            );


        const x =
            Math.sin(yaw) *
            cosPitch *
            distance;


        const y =
            Math.sin(pitch) *
            distance;


        const z =
            Math.cos(yaw) *
            cosPitch *
            distance;


        uniforms
            .uCameraPosition
            .value
            .set(
                x,
                y,
                z
            );
    }


    // =====================================================
    // MOUSE DRAG
    // =====================================================

    container.addEventListener(
        "pointerdown",
        (event) => {

            dragging = true;

            lastX =
                event.clientX;

            lastY =
                event.clientY;

            container.setPointerCapture(
                event.pointerId
            );
        }
    );


    container.addEventListener(
        "pointermove",
        (event) => {

            if (!dragging)
                return;


            const deltaX =
                event.clientX -
                lastX;


            const deltaY =
                event.clientY -
                lastY;


            lastX =
                event.clientX;


            lastY =
                event.clientY;


            yaw -=
                deltaX *
                0.006;


            pitch -=
                deltaY *
                0.006;


            updateCamera();
        }
    );


    container.addEventListener(
        "pointerup",
        () => {

            dragging = false;

        }
    );


    container.addEventListener(
        "pointercancel",
        () => {

            dragging = false;

        }
    );


    // =====================================================
    // ZOOM
    // =====================================================

    container.addEventListener(
        "wheel",
        (event) => {

            event.preventDefault();


            distance +=
                event.deltaY *
                0.008;


            distance =
                Math.max(
                    5.0,
                    Math.min(
                        24.0,
                        distance
                    )
                );


            updateCamera();

        },
        {
            passive: false
        }
    );


    // =====================================================
    // RESIZE
    // =====================================================

    function resize()
    {

        const width =
            container.clientWidth;


        const height =
            container.clientHeight;


        renderer.setSize(
            width,
            height
        );


        uniforms
            .uResolution
            .value
            .set(
                width *
                Math.min(
                    window.devicePixelRatio,
                    1.5
                ),

                height *
                Math.min(
                    window.devicePixelRatio,
                    1.5
                )
            );
    }


    window.addEventListener(
        "resize",
        resize
    );


    // =====================================================
    // ANIMATION
    // =====================================================

    const clock =
        new THREE.Clock();


    function animate()
    {

        requestAnimationFrame(
            animate
        );


        uniforms.uTime.value =
            clock.getElapsedTime();


        renderer.render(
            scene,
            camera
        );
    }


    // =====================================================
    // START
    // =====================================================

    updateCamera();

    resize();

    animate();

});