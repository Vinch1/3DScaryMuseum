# 🏛️ 3D Scary Museum — 18th Century Art

A walkable, first-person 3D museum of 1700s art, built with **Three.js** and running entirely in the browser. Stroll through rooms ordered along a timeline of 18th-century masterpieces — but don't get **too close** to the paintings. Each one has a secret.

> ⚠️ **Heads-up:** this museum includes a **jump-scare**. Lower your volume before entering.

---

## ✨ Features

- **First-person walkthrough** — WASD to move, mouse to look (pointer lock).
- **Timeline of 1700s art** — real paintings from the period, arranged chronologically.
- **Inspect mode** — stand at a painting and press `E` to read about it.
- **Proximity jump-scare** — get too close to a canvas and it fights back (once per painting, with a cooldown).
- **Special finale** — *The Nightmare* (Henry Fuseli) triggers a unique incubus scare.
- **No build step, no dependencies to install** — it's plain HTML/CSS/JS loading Three.js from a CDN.

---

## 🚀 Run it on your own machine

Because the project uses ES modules with an import map, you **cannot** just double-click `index.html` — the browser will block module loading over `file://`. You need to serve the folder over `http://`. Pick **any one** of the options below.

### Option A — Python (already installed on macOS/Linux)

```bash
cd "3D museum"
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

### Option B — Node.js

```bash
cd "3D museum"
npx serve .
# or
npx http-server -p 8000
```

Then open the URL it prints (usually **http://localhost:3000** or **http://localhost:8080**).

### Option C — VS Code

Install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

---

## 🎮 Controls

| Key / Action        | What it does                          |
|---------------------|---------------------------------------|
| Click the screen    | Lock the mouse / enter the museum     |
| `W` `A` `S` `D`     | Move around                           |
| Mouse               | Look around                           |
| `E`                 | Inspect the painting you're facing    |
| `Esc`               | Release the mouse / pause             |

> **Tip:** you must click to enter — this is a browser requirement for pointer lock and audio.

---

## 📁 Project structure

```
3D museum/
├── index.html      # Page shell, import map, HUD markup
├── main.js         # All 3D scene, movement, scare, and inspect logic
├── style.css       # HUD, overlays, scare flash/animation
├── sfx/
│   └── scare.mp3   # Royalty-free jump-scare stinger (Mixkit)
└── README.md       # You are here
```

---

## 🌐 Deploy your own

This is a static site, so it works on any static host.

**Netlify (drag-and-drop or CLI):**
```bash
npx netlify-cli@latest deploy --dir=. --prod
```

**GitHub Pages:** push to a repo, then enable Pages on the `main` branch root.

**Any static host** (Vercel, Cloudflare Pages, Surge, etc.): point it at the project root — no build command needed.

---

## 🎚️ Tweaking the scare

Open `main.js` and look near the top of the **Jump-scare system** section:

- `SCARE_DIST` — how close you must be to trigger it (default `1.6`).
- `SCARE_COOLDOWN` — seconds between scares (default `4.0`).
- `NIGHTMARE_INDEX` — which painting gets the special incubus finale.

To **disable** jumps-scares entirely, comment out the `triggerScare(nearest)` call in the animation loop.

---

## 🙏 Credits

- 3D engine: [Three.js](https://threejs.org/) (via CDN, MIT licensed)
- Scare stinger: [Mixkit](https://mixkit.co/free-sound-effects/scary/) free sound effects (royalty-free license)
- Artwork imagery: public-domain sources via Wikimedia Commons

---

Enjoy your visit. And remember — **don't get too close.**
