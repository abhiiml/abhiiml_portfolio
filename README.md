# ⚡ Abhijit Pandey — Portfolio

A premium, dark-themed portfolio website built with **React + TypeScript + Vite**, featuring WebGL shaders, GSAP scroll animations, and React Bits–inspired interactive components.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-00C853?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## ✨ Features

### 🌊 WebGL Aurora Background
- Custom GLSL fragment shader using **simplex noise** for organic, flowing aurora waves
- Runs entirely on the GPU for smooth 60fps performance
- Subtle dot-grid overlay with edge vignette fade

### 🎬 Cinematic Image Slideshow
- Auto-cycling hero slideshow with **GSAP cross-fade** transitions across 5 photos
- Slide counter, accent indicator dots, and corner bracket decorations
- Clip-path reveal animation on page load

### ✍️ Text Animations (React Bits–inspired)
- **SplitText** — Character-by-character slide-up entrance
- **BlurText** — Word-by-word blur-to-focus reveal
- **RotatingText** — Smooth cycling word animation with AnimatePresence

### 📸 Parallax Image Gallery
- Layered 3-image stack with **GSAP ScrollTrigger** parallax at different speeds
- Grayscale-to-color hover transitions
- Technical grid overlays and corner bracket hover effects

### 🎯 Interactive Components
- **LineSidebar** — React Bits proximity-driven navigation with cursor-reactive marker lines
- **Custom cursor** with hover state changes
- **Scroll reveal** animations via IntersectionObserver

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, TypeScript 6 |
| **Build Tool** | Vite 8.2 |
| **Styling** | Tailwind CSS 4.3, PostCSS |
| **Animation** | GSAP 3.15 + ScrollTrigger, Framer Motion 13 |
| **Rendering** | WebGL (custom GLSL shaders) |
| **Icons** | Lucide React |
| **Routing** | React Router DOM 7 |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/abhiiml/abhiiml_portfolio.git
cd abhiiml_portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
abhiiml_portfolio/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── images/           # Profile photos (5 images)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Navigation bar
│   │   │   └── Footer.tsx     # Footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx       # Hero with slideshow
│   │   │   ├── About.tsx      # About with parallax gallery
│   │   │   └── Projects.tsx   # Project cards
│   │   └── ui/
│   │       ├── AuroraBackground.tsx  # WebGL shader background
│   │       ├── AnimatedBackground.tsx # Canvas particle network
│   │       ├── TextAnimations.tsx     # BlurText, SplitText, RotatingText
│   │       ├── LineSidebar.tsx        # React Bits sidebar
│   │       └── CustomCursor.tsx       # Custom cursor
│   ├── data/
│   │   └── portfolio.ts      # Portfolio content data
│   ├── hooks/
│   │   └── useScrollReveal.ts # Scroll animation hook
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles + design tokens
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0A0A0A` | Page background |
| `--foreground` | `#FAFAFA` | Primary text |
| `--accent` | `#0070F3` | Electric blue accent |
| `--muted` | `#888` | Secondary text |
| Font Display | `Geist` | Headlines |
| Font Mono | `Geist Mono` | Code / labels |

---

## 👤 About Me

**Abhijit Pandey** — B.Tech CSE (AI/ML) Student

- 🔬 Focused on Machine Learning, TensorFlow, and NLP
- 💻 Skilled in Python, Java, C++, TypeScript, React
- 📜 Certified by IBM & Skill India
- 🌱 Currently learning Advanced Deep Learning & System Design

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ⚡ by <a href="https://github.com/abhiiml">Abhijit Pandey</a>
</p>
