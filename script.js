import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// POST-PROCESSING IMPORTS
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

gsap.registerPlugin(ScrollTrigger);

// Environment & Accessibility Detection
const isMobile = window.innerWidth <= 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionSpeed = prefersReducedMotion ? 0.05 : 1.0;

// PHASE 6 PERFORMANCE OPTIMIZATION: Cache window dimensions to prevent DOM queries in render loop
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// ==========================================
// 1. LENIS + GSAP TICKER SYNCHRONIZATION
// ==========================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: false // STRICTLY False: Handled exactly once by GSAP Ticker
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ==========================================
// 2. CUSTOM CURSOR
// ==========================================
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = windowHalfX;
let mouseY = windowHalfY;

if (!isMobile && cursorDot && cursorRing) {
    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3" });
    const xToRing = gsap.quickTo(cursorRing, "x", { duration: 0.25, ease: "power3" });
    const yToRing = gsap.quickTo(cursorRing, "y", { duration: 0.25, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        xToDot(mouseX);
        yToDot(mouseY);
        xToRing(mouseX);
        yToRing(mouseY);
    });

    const hoverTargets = document.querySelectorAll('.hover-target');
    if (hoverTargets.length > 0) {
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                gsap.to(cursorRing, { width: 48, height: 48, backgroundColor: "rgba(0, 243, 255, 0.1)", borderColor: "#00f3ff", duration: 0.2 });
                gsap.to(cursorDot, { scale: 0, duration: 0.2 });
            });
            target.addEventListener('mouseleave', () => {
                gsap.to(cursorRing, { width: 32, height: 32, backgroundColor: "transparent", borderColor: "#bc13fe", duration: 0.2 });
                gsap.to(cursorDot, { scale: 1, duration: 0.2 });
            });
        });
    }
}

// ==========================================
// 3. INTERACTIVE UI EFFECTS
// ==========================================
if (!isMobile && !prefersReducedMotion) {
    // Magnetic CTA Buttons
    const buttons = document.querySelectorAll('.cta-button');
    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    // 3D Card Tilt
    const cards = document.querySelectorAll('.tech-card');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(card, { rotationY: x * 0.04, rotationX: -y * 0.04, duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5 });
            });
        });
    }
}

// CTA Scroll Navigation (Safely chained)
document.getElementById('hero-cta')?.addEventListener('click', () => lenis.scrollTo('#dimension'));
document.getElementById('final-cta')?.addEventListener('click', () => lenis.scrollTo(0));

// ==========================================
// PHASE 5/6: MOBILE NAVIGATION & A11Y LOGIC
// ==========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNavigation = document.getElementById('mobile-navigation');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
let previouslyFocusedElement = null; // PHASE 6: A11y Focus Tracker

if (mobileMenuToggle && mobileNavigation) {
    const toggleMenu = () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            // Close menu
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
            mobileNavigation.classList.remove('is-open');
            mobileNavigation.setAttribute('aria-hidden', 'true');
            if (lenis) lenis.start();

            // PHASE 6: Return focus safely
            if (previouslyFocusedElement) previouslyFocusedElement.focus();
        } else {
            // Open menu
            previouslyFocusedElement = document.activeElement;
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            mobileMenuToggle.setAttribute('aria-label', 'Close navigation menu');
            mobileNavigation.classList.add('is-open');
            mobileNavigation.setAttribute('aria-hidden', 'false');
            if (lenis) lenis.stop();

            // PHASE 6: Move focus into menu for keyboard users
            setTimeout(() => {
                if (mobileNavLinks.length > 0) mobileNavLinks[0].focus();
            }, 100);
        }
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                toggleMenu();

                const delay = prefersReducedMotion ? 0 : 400;
                setTimeout(() => {
                    if (lenis) lenis.scrollTo(targetId);
                }, delay);
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavigation.classList.contains('is-open')) {
            toggleMenu();
        }
    });
}

// ==========================================
// 4. THREE.JS SCENE SETUP (WITH STRICT SAFETY CHECK)
// ==========================================
const canvas = document.querySelector('#bg');

if (!canvas) {
    console.error("Three.js initialization aborted: #bg canvas was not found.");
} else {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(0, 0, 30);

    // ==========================================
    // 4.5. POST-PROCESSING COMPOSER
    // ==========================================
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomStrength = isMobile ? 0.7 : 1.0;
    const bloomRadius = 0.65;
    const bloomThreshold = 0.15;

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        bloomStrength,
        bloomRadius,
        bloomThreshold
    );
    composer.addPass(bloomPass);

    // ==========================================
    // 5. 3D OBJECTS
    // ==========================================
    const torusGeometry = new THREE.TorusKnotGeometry(10, 2.5, 200, 32);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0xbc13fe, wireframe: true, transparent: true, opacity: 1
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    torusKnot.userData = { baseRot: { x: 0, y: 0 }, mouseRot: { x: 0, y: 0 }, scrollRot: { x: 0, y: 0, z: 0 } };
    torusKnot.position.set(isMobile ? 0 : 12, 0, 0);
    scene.add(torusKnot);

    const coreGroup = new THREE.Group();
    coreGroup.position.set(isMobile ? 0 : -12, 0, -40);

    const innerSphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, emissive: 0x00f3ff, emissiveIntensity: 1.2
    });
    const innerSphere = new THREE.Mesh(new THREE.SphereGeometry(2.5, 32, 32), innerSphereMat);

    const outerSphereMat = new THREE.MeshStandardMaterial({
        color: 0x00f3ff, transparent: true, opacity: 0.8, wireframe: true
    });
    const outerSphere = new THREE.Mesh(new THREE.SphereGeometry(4.2, 32, 32), outerSphereMat);
    coreGroup.add(innerSphere, outerSphere);

    const ringGeo = new THREE.TorusGeometry(7.5, 0.05, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.6 }));
    ring1.rotation.x = Math.PI / 2;
    const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: 0xbc13fe, transparent: true, opacity: 0.6 }));
    ring2.rotation.y = Math.PI / 2;
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(9.5, 0.03, 16, 100), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
    ring3.rotation.z = Math.PI / 4;

    coreGroup.add(ring1, ring2, ring3);
    coreGroup.userData = { baseRot: { x: 0, y: 0 }, mouseRot: { x: 0, y: 0 } };
    scene.add(coreGroup);

    const particlesCount = isMobile ? 300 : 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 160;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 160;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 220 - 10;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.1, color: 0x00f3ff, transparent: true, opacity: 0.8 });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const cyanLight = new THREE.PointLight(0x00f3ff, 2.0);
    cyanLight.position.set(15, 15, 10);
    const violetLight = new THREE.PointLight(0xbc13fe, 2.0);
    violetLight.position.set(-15, -15, -10);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(cyanLight, violetLight, ambientLight);

    // ==========================================
    // 6. CINEMATIC INTRO SEQUENCE
    // ==========================================
    let introPlayed = false;

    function playIntroAnimation() {
        if (introPlayed || prefersReducedMotion) return;
        introPlayed = true;

        const introTl = gsap.timeline();
        introTl.fromTo(particlesMesh.material, { opacity: 0 }, { opacity: 0.8, duration: 1.5, ease: "power2.inOut" })
            .fromTo(torusMaterial, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "-=1.0")
            .fromTo('.navbar', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.8")
            .fromTo('.hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .fromTo('.hero-subtitle', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
            .fromTo('.hero-statement', { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
            .fromTo('.hero-description', { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
            .fromTo('.cta-wrapper', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3")
            .fromTo('.scroll-indicator, .hud', { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2");
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        playIntroAnimation();
    } else {
        window.addEventListener('DOMContentLoaded', playIntroAnimation);
    }

    lenis.on('scroll', ({ scroll }) => {
        gsap.to('.scroll-indicator', { opacity: scroll > 60 ? 0 : 1, duration: 0.3, overwrite: "auto" });
    });

    // ==========================================
    // 7. STORYTELLING SCROLL TRIGGER TIMELINE
    // ==========================================
    if (!prefersReducedMotion) {
        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        masterTimeline.to(camera.position, { z: 10, ease: "none" }, 0)
            .to(torusKnot.userData.scrollRot, { x: Math.PI, y: Math.PI * 1.5, ease: "none" }, 0)
            .to(camera.position, { z: -25, ease: "none" }, 0.25)
            .to(torusMaterial, { opacity: 0, ease: "power2.inOut" }, 0.25)
            .to(camera.position, { z: -50, ease: "none" }, 0.5)
            .to(coreGroup.position, { x: isMobile ? 0 : 12, ease: "power1.inOut" }, 0.5)
            .to(camera.position, { z: -75, ease: "none" }, 0.75)
            .to(camera.position, { z: -95, ease: "none" }, 1.0);
    }

    // ==========================================
    // 8. RESIZE LISTENER
    // ==========================================
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // PHASE 6: Update cached window values for render loop performance
        windowHalfX = width / 2;
        windowHalfY = height / 2;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        composer.setSize(width, height);
    });

    // ==========================================
    // 9. UNIFIED 60 FPS RENDER LOOP
    // ==========================================
    const clock = new THREE.Clock();

    // Pre-allocate variables outside loop for Garbage Collection efficiency
    let targetX = 0;
    let targetY = 0;

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // PHASE 6: Use cached windowHalfX/Y to avoid DOM querying layout width 60x a second
        targetX = (!isMobile && !prefersReducedMotion) ? (mouseX - windowHalfX) * 0.0005 : 0;
        targetY = (!isMobile && !prefersReducedMotion) ? (mouseY - windowHalfY) * 0.0005 : 0;

        torusKnot.userData.baseRot.y += (0.002 * motionSpeed);
        torusKnot.userData.baseRot.x += (0.001 * motionSpeed);
        torusKnot.userData.mouseRot.y += 0.03 * (targetX - torusKnot.userData.mouseRot.y);
        torusKnot.userData.mouseRot.x += 0.03 * (targetY - torusKnot.userData.mouseRot.x);

        torusKnot.rotation.set(
            torusKnot.userData.baseRot.x + torusKnot.userData.mouseRot.x + torusKnot.userData.scrollRot.x,
            torusKnot.userData.baseRot.y + torusKnot.userData.mouseRot.y + torusKnot.userData.scrollRot.y,
            torusKnot.userData.scrollRot.z
        );

        if (prefersReducedMotion) {
            innerSphereMat.emissiveIntensity = 1.2;
        } else {
            innerSphereMat.emissiveIntensity = 1.2 + Math.sin(elapsedTime * 2) * 0.5;
        }

        coreGroup.userData.baseRot.y += (0.003 * motionSpeed);
        coreGroup.userData.baseRot.x += (0.001 * motionSpeed);
        coreGroup.userData.mouseRot.y += 0.03 * (targetX - coreGroup.userData.mouseRot.y);
        coreGroup.userData.mouseRot.x += 0.03 * (targetY - coreGroup.userData.mouseRot.x);

        coreGroup.rotation.set(
            coreGroup.userData.baseRot.x + coreGroup.userData.mouseRot.x,
            coreGroup.userData.baseRot.y + coreGroup.userData.mouseRot.y,
            0
        );

        ring1.rotation.x += (0.005 * motionSpeed); ring1.rotation.y -= (0.002 * motionSpeed);
        ring2.rotation.y += (0.005 * motionSpeed); ring2.rotation.x += (0.002 * motionSpeed);
        ring3.rotation.z -= (0.008 * motionSpeed); ring3.rotation.x += (0.001 * motionSpeed);

        if (!isMobile && !prefersReducedMotion) {
            ring1.rotation.z = targetX * 0.5;
            ring2.rotation.z = -targetX * 0.5;
            ring3.rotation.y = targetY * 0.5;
        }

        particlesMesh.rotation.y = elapsedTime * (prefersReducedMotion ? 0.005 : 0.025);
        particlesMesh.rotation.x = targetY * 0.15;

        if (!prefersReducedMotion) {
            particlesMesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05 + (targetX * 0.1);
        }

        // EXACTLY ONE RENDER CALL VIA COMPOSER
        composer.render();
    }

    // Kick off single unified loop
    requestAnimationFrame(animate);
}