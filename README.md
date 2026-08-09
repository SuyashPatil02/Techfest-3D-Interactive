<div align="center">

# 🚀 Cinematic 3D WebGL Experience | Techfest IIT Bombay

A highly responsive, futuristic 3D landing page built for the Techfest IIT Bombay College Ambassador Program.

This project delivers an immersive, cyberpunk-inspired WebGL experience combining real-time 3D graphics, cinematic animations, smooth scrolling, interactive UI elements, responsive design, performance optimization, and accessibility-focused interactions.

**[🌐 Live Website](https://techfest-3-d-interactive.vercel.app/)** · **[💻 GitHub Repository](https://github.com/SuyashPatil02/Techfest-3D-Interactive)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Interactive WebGL Experience](#-interactive-webgl-experience)
- [Experience Flow](#️-experience-flow)
- [Key Features](#-key-features)
- [Performance Optimization](#-performance-optimization)
- [Accessibility](#-accessibility)
- [Responsive Design](#-responsive-design)
- [Technology Stack](#️-technology-stack)
- [Screenshots](#-screenshots)
- [Installation & Setup](#️-installation--setup)
- [Project Structure](#-project-structure)
- [Deployment & SEO](#-deployment--seo)
- [Gitignore Configuration](#-gitignore-configuration)
- [Browser Compatibility](#-browser-compatibility)
- [Author](#-author)

---

## 📖 Project Overview

The Cinematic 3D WebGL Experience is a futuristic landing page designed for the Techfest IIT Bombay College Ambassador Program.

Instead of presenting information as a traditional static website, the project turns the landing page into a visual journey through multiple futuristic technological dimensions.

The application is built without heavy frontend UI frameworks and uses:
*   **HTML5** & **CSS3**
*   **Vanilla JavaScript** (ES Modules)
*   **Three.js**
*   **GSAP** & **GSAP ScrollTrigger**
*   **Lenis**

The result is an interactive experience combining 3D graphics, cinematic camera movement, smooth scrolling, neon visual effects, and responsive UI.

---

## 🌌 Interactive WebGL Experience

The core of the project is a custom Three.js WebGL scene rendered through an `EffectComposer` post-processing pipeline.

### 3D Environment
The scene contains:
*   🔷 **Wireframe Torus Knot**
*   ⚡ **Procedural Energy Core**
*   🌀 **Multi-layered orbital rings**
*   ✨ **Dynamic 3D particle starfield**
*   💠 **Dual-tone neon lighting**
*   🎥 **Cinematic camera movement**
*   🖱️ **Mouse-based interactions**
*   📜 **Scroll-controlled 3D transitions**
*   🌈 **Unreal Bloom post-processing**

The WebGL environment is synchronized with the website's storytelling sections so that the 3D scene evolves as the user scrolls through the page.

---

## 🗺️ Experience Flow

The website is structured as a six-stage futuristic journey.

### 01 — Hero / Entry Experience
> **TECHFEST | IIT BOMBAY | BEYOND TOMORROW**

The opening section introduces the experience with the interactive 3D environment and primary CTA.

### 02 — Enter the Dimension
> **ENTER THE DIMENSION**

Introduces the transition from the physical world into a digital technological environment.

### 03 — Quantum Energy
> **QUANTUM ENERGY**

The Energy Core becomes the visual focus of the experience, supported by animated orbital structures and neon lighting.

### 04 — Pure Innovation
> **PURE INNOVATION**

A transition point representing computational and technological possibilities.

### 05 — Technology Domains
The project highlights six technology domains:
*   🤖 **AI**
*   🦾 **ROBOTICS**
*   🚀 **SPACE**
*   ⚛️ **QUANTUM**
*   🛡️ **CYBER**
*   🔮 **FUTURE**

Each domain is presented through an interactive technology card.

### 06 — Initiate
> **INITIATE**

The final section provides the registration-focused CTA: `[ SECURE YOUR PASS ]`

---

## ✨ Key Features

### 🎥 Cinematic 3D Experience
*   Custom Three.js WebGL scene featuring Wireframe Torus Knot geometry and a Procedural Energy Core.
*   Multiple animated orbital rings and a dynamic particle starfield.
*   Real-time camera choreography with neon cyberpunk visual effects and dual-tone lighting.

### 🌀 Scroll-Driven Storytelling
*   The 3D environment responds to the user's scroll position.
*   **GSAP ScrollTrigger + Lenis** coordinate the scrolling and animation system to guide the camera through the six experience stages.
*   This transforms scrolling into an integral part of the 3D experience.

### 🌈 Cinematic Post-Processing
The project uses Three.js post-processing components (`EffectComposer`, `RenderPass`, `UnrealBloomPass`). The bloom effect creates a controlled neon glow around the 3D elements while keeping the surrounding UI readable.

### 🖱️ Interactive UI & Micro-Interactions
The interface includes:
*   Custom dual-ring cursor on desktop.
*   Magnetic CTA buttons and 3D tilt-tracking technology cards.
*   Glassmorphism UI elements with hover animations and smooth navigation.
*   Animated mobile navigation drawer and scroll-based visual transitions.

---

## ⚡ Performance Optimization

Performance was considered throughout the WebGL and animation architecture.

### 📱 Mobile GPU Optimization
The particle system dynamically adjusts according to the device:

| Environment | Approx. Particles |
| :--- | :--- |
| **Desktop** | ~1000 |
| **Mobile** | ~300 |

*Bloom intensity is also reduced on mobile devices to reduce GPU workload.*

### 🎞️ Render Loop Optimization
The WebGL animation architecture uses:
*   A single `requestAnimationFrame()` loop and a single Three.js composer render pipeline.
*   Cached viewport dimensions.
*   Animation variables allocated outside the main render loop where appropriate, reducing unnecessary JavaScript garbage-collection pressure.

### 🔄 Unified Animation Pipeline
Lenis uses `autoRaf: false` and is synchronized with the GSAP ticker. This allows GSAP to act as the unified animation driver for the smooth-scroll system.

---

## ♿ Accessibility

Accessibility considerations are integrated into the application architecture.

### Reduced Motion
The project supports `@media (prefers-reduced-motion: reduce)`. When reduced motion is enabled, the application:
*   Disables continuous Energy Core emissive pulsing.
*   Disables mouse-parallax interactions.
*   Reduces background 3D motion.
*   Reduces or bypasses intro animation delays and minimizes interactive motion.

### Keyboard Navigation
The interface includes:
*   Global `focus-visible` styling and semantic HTML5 structure.
*   Keyboard-accessible navigation with proper ARIA attributes.
*   **Mobile navigation focus management:** Escape key support. Uses `aria-expanded`, `aria-hidden`, and `aria-controls`. When the mobile navigation opens, focus moves into the navigation. When it closes, focus returns to the previously focused element.

---

## 📱 Responsive Design

The website is designed for a wide range of screen sizes.

**Target layouts include:**
*   📱 320px, 375px / 390px mobile devices
*   📱 768px tablets
*   💻 1024px laptops
*   🖥️ 1440px / 1920px desktop displays
*   🖥️ 4K desktop environments

**Responsive implementation uses:**
*   CSS `clamp()` typography.
*   Flexible layouts utilizing CSS Grid and Flexbox.
*   Responsive breakpoints and adaptive UI elements.
*   Responsive WebGL canvas sizing.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Build Tool** | Vite |
| **Core** | HTML5, CSS3, Vanilla JavaScript |
| **Modules** | ES Modules |
| **3D Engine** | Three.js |
| **Graphics** | WebGL |
| **Post-Processing** | EffectComposer, RenderPass, UnrealBloomPass |
| **Animation** | GSAP |
| **Scroll Animation** | GSAP ScrollTrigger |
| **Smooth Scrolling** | Lenis |

---

## 📸 Screenshots

**01 — Hero / Cinematic Entry**  
<img width="1905" height="867" alt="image" src="https://github.com/user-attachments/assets/0730af08-cf06-44ba-b4a1-7e35b1063ce3" />

**02 — 3D Energy Core**  
<img width="1899" height="871" alt="image" src="https://github.com/user-attachments/assets/b3d89e51-8e0e-41db-85be-53312d97ab3b" />

**03 — Technology Domains**  
<img width="1906" height="871" alt="image" src="https://github.com/user-attachments/assets/503e6c71-62e5-4a45-b6f2-a98fc6c76fc8" />

**04 — Mobile Navigation**  
<img width="1902" height="871" alt="image" src="https://github.com/user-attachments/assets/039260e3-9695-4adc-95d0-c4bb2c8c93ed" />

**05 — Final Registration Section**  
<img width="1894" height="868" alt="image" src="https://github.com/user-attachments/assets/0b9f873e-65c8-4faf-8038-5a44584774ff" />

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have installed:
*   Node.js
*   npm
*   Git

**1. Clone the Repository**
git clone [https://github.com/SuyashPatil02/Techfest-3D-Interactive.git](https://github.com/SuyashPatil02/Techfest-3D-Interactive.git)

**2. Navigate to the Project**
cd Techfest-3D-Interactive

**3. Install Dependencies**
npm install

**4. Start the Development Server**
npm run dev
Vite will provide a local development URL, typically http://localhost:5173/. Open the URL in a modern WebGL-compatible browser.

**🏗️ Production Build**
Create an optimized production build using:
npm run build
Vite generates the production output inside the dist/ directory.

**🔍 Preview the Production Build**
To preview the generated production build locally:
npm run preview
Vite will provide a local preview URL, typically http://localhost:4173/.

###📁 Project Structure:
Techfest-3D-Interactive/
├── index.html          # Semantic HTML, SEO metadata, Navigation, WebGL canvas
├── style.css           # Futuristic UI, Glassmorphism, Responsive layouts, Animations
├── script.js           # Three.js WebGL scene, Post-processing, GSAP, Lenis, Mobile Nav
├── package.json        # Project metadata, Dependencies, npm scripts
└── package-lock.json   # Locked dependency versions

##🌍 Deployment & SEO
The project is optimized for static hosting and is deployed through Vercel.

Live Deployment: https://techfest-3-d-interactive.vercel.app/

The project uses Vite's production build process (npm run build), generating output in the dist/ folder.

Production Metadata
The project includes production-oriented metadata such as:
-Page title & Meta description
-Theme color
-Open Graph metadata
-Twitter card metadata
-Responsive viewport configuration
-These metadata elements improve how the website is presented when indexed or shared.

##🎯 Project Highlights
This project demonstrates practical implementation of:
1.Real-time WebGL development & Three.js scene construction
2.3D geometry, materials, and post-processing effects
3.GSAP animation timelines & Scroll-driven animation
4.Smooth scrolling & Responsive UI development
5.Mobile GPU optimization & Accessibility-aware interactions
6.Semantic HTML & SEO metadata
7.Vite-based production builds & Vercel deployment

###👨‍💻 Author

Designed & Developed by Suyash Patil

💻 GitHub: @SuyashPatil02
🌐 Live Project: Techfest 3D Interactive
📦 Repository: Techfest-3D-Interactive

