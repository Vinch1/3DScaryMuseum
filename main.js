import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// ---------- Exhibit data: a timeline of 1700s art ----------
const EXHIBITS = [
  {
    year: 'c. 1717',
    title: 'The Embarkation for Cythera',
    artist: 'Jean-Antoine Watteau',
    movement: 'Rococo · Fête Galante',
    palette: ['#3a4a6b', '#c8a878', '#a85a4a', '#e8d8b8'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Jean-Antoine_Watteau_-_Embarking_to_Cythera_-_Google_Art_Project.jpg/960px-Jean-Antoine_Watteau_-_Embarking_to_Cythera_-_Google_Art_Project.jpg',
    desc: 'Watteau invented the "fête galante" — dreamlike scenes of elegant lovers in parkland. Approved as his reception piece to the French Academy in 1717, it established Rococo\'s spirit of intimacy, pastel color, and refined reverie.',
  },
  {
    year: 'c. 1743',
    title: 'Marriage A-la-Mode',
    artist: 'William Hogarth',
    movement: 'English Moral Genre',
    palette: ['#5a3a2a', '#8a6a4a', '#2a1a14', '#c8b890'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Marriage_A-la-Mode_2%2C_The_T%C3%AAte_%C3%A0_T%C3%AAte_-_William_Hogarth.jpg/960px-Marriage_A-la-Mode_2%2C_The_T%C3%AAte_%C3%A0_T%C3%AAte_-_William_Hogarth.jpg',
    desc: 'Hogarth\'s six-part satirical series skewered the mercantile marriages of Georgian London — here, the morning after, scattered props tell of a loveless arrangement. His "modern moral subjects" turned painting into serialized social commentary, a distinctly British counter-current to Continental Rococo.',
  },
  {
    year: 'c. 1750',
    title: 'The Swing',
    artist: 'Jean-Honoré Fragonard',
    movement: 'Rococo',
    palette: ['#e8a8b0', '#5a8a4a', '#3a4a6b', '#f5e8c8'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Jean-Honor%C3%A9_Fragonard_-_The_Swing_-_Google_Art_Project.jpg/960px-Jean-Honor%C3%A9_Fragonard_-_The_Swing_-_Google_Art_Project.jpg',
    desc: 'Rococo\'s emblem: a young woman on a swing, kicked higher by a hidden bishop while her lover watches from below. Pink silk, dappled garden light, and secret desire — the aristocracy\'s last garden party before the world changed.',
  },
  {
    year: '1763–65',
    title: 'The Death of General Wolfe',
    artist: 'Benjamin West',
    movement: 'Proto-Neoclassicism',
    palette: ['#8a4a3a', '#3a4a5a', '#c8b890', '#5a4a3a'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Benjamin_West_005.jpg/960px-Benjamin_West_005.jpg',
    desc: 'West\'s depiction of the 1759 Battle of the Plains of Abraham painted a contemporary death in the costume of a history painting. Though controversial for showing modern soldiers in modern clothes, it redefined what "history painting" could be.',
  },
  {
    year: '1767',
    title: 'The Oath of the Horatii',
    artist: 'Jacques-Louis David',
    movement: 'Neoclassicism',
    palette: ['#8a3030', '#3a3a4a', '#c8bca8', '#5a4a3a'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/960px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
    desc: 'David\'s declaration of war on Rococo. Rigid geometry, Roman virtue, and solemn oath — father and sons swearing to die for Rome. Its 1785 Paris Salon showing ignited Neoclassicism and tied art to civic duty on the eve of revolution.',
  },
  {
    year: '1784',
    title: 'Portrait of Madame Récamier',
    artist: 'Jacques-Louis David',
    movement: 'Neoclassicism · Empire Style',
    palette: ['#c8b890', '#3a2a1a', '#8a6a4a', '#e8dcb8'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Madame_R%C3%A9camier_by_Jacques-Louis_David.jpg/960px-Madame_R%C3%A9camier_by_Jacques-Louis_David.jpg',
    desc: 'Juliette Récamier reclines on a Directoire-era couch in a virginal white dress, surrounded by the new antiquarian taste — straight lines, Etruscan forms, and republican simplicity that defined post-revolutionary interior life.',
  },
  {
    year: '1787',
    title: "Napoleon in His Study",
    artist: 'Jacques-Louis David',
    movement: 'Neoclassicism · Imperial',
    palette: ['#8a1a1a', '#c8a850', '#2a2a3a', '#e8d8a8'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/960px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg',
    desc: 'As First Painter to the Emperor, David\'s imperial imagery — coronation, horseback, and enthroned portraits — fused classical antiquity with Napoleonic power. Art became state propaganda at unprecedented scale.',
  },
  {
    year: '1793',
    title: 'The Death of Marat',
    artist: 'Jacques-Louis David',
    movement: 'Revolutionary Neoclassicism',
    palette: ['#2a3a5a', '#c8a890', '#8a5a4a', '#5a4a3a'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Death_of_Marat_by_David.jpg/960px-Death_of_Marat_by_David.jpg',
    desc: 'Marat, murdered revolutionary, lies in his bath like a Christian martyr. David painted him within days of the assassination — a political icon of the Terror, stripping history painting down to stark grief and propaganda.',
  },
  {
    year: 'c. 1798',
    title: 'The Nightmare',
    artist: 'Henry Fuseli',
    movement: 'Proto-Romanticism',
    palette: ['#1a1420', '#8a3a4a', '#c8b8a8', '#3a2a3a'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/John_Henry_Fuseli_-_The_Nightmare.JPG/960px-John_Henry_Fuseli_-_The_Nightmare.JPG',
    desc: 'An incubus crouches on a sleeping woman. Fuseli\'s dark, irrational vision rejected Neoclassic reason and pointed toward Romanticism — the century\'s closing turn toward the sublime, the subconscious, and fear.',
  },
];

// ---------- Scene setup ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1410);
scene.fog = new THREE.FogExp2(0x1a1410, 0.012);

const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.1, 200);
camera.position.set(0, 1.7, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;
document.body.appendChild(renderer.domElement);

// ---------- Geometry constants ----------
const HALL_WIDTH = 10;
const HALL_HEIGHT = 6;
const SEGMENT_LENGTH = 8;
const NUM_EXHIBITS = EXHIBITS.length;
// Wall paintings alternate sides, one per segment.
const HALL_LENGTH = NUM_EXHIBITS * SEGMENT_LENGTH;
const HALL_START_Z = HALL_LENGTH / 2;
const HALL_END_Z = -HALL_LENGTH / 2;

// ---------- Materials ----------
function makeFloorTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#2a1f16';
  ctx.fillRect(0, 0, 512, 512);
  // Wood planks
  const plankH = 64;
  for (let y = 0; y < 512; y += plankH) {
    const base = 30 + Math.random() * 25;
    ctx.fillStyle = `rgb(${base + 20},${base + 10},${base})`;
    ctx.fillRect(0, y, 512, plankH - 2);
    // grain
    for (let i = 0; i < 40; i++) {
      ctx.strokeStyle = `rgba(20,12,6,${0.1 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * 512, y);
      ctx.bezierCurveTo(
        Math.random() * 512, y + plankH * Math.random(),
        Math.random() * 512, y + plankH * Math.random(),
        Math.random() * 512, y + plankH * Math.random()
      );
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath(); ctx.moveTo(0, y + plankH - 2); ctx.lineTo(512, y + plankH - 2); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, HALL_LENGTH / 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeWallTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#6b5840');
  g.addColorStop(0.5, '#7a6448');
  g.addColorStop(1, '#574832');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  // subtle damask noise
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
  }
  // panel lines
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 8, 240, 240);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(HALL_LENGTH / 4, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeCeilingTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#3a2f22';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 3;
  for (let i = 0; i <= 256; i += 64) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(HALL_WIDTH / 4, HALL_LENGTH / 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------- Build architecture ----------
const floorMat = new THREE.MeshStandardMaterial({
  map: makeFloorTexture(),
  roughness: 0.6,
  metalness: 0.05,
});
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(HALL_WIDTH, HALL_LENGTH),
  floorMat
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const wallMat = new THREE.MeshStandardMaterial({
  map: makeWallTexture(),
  roughness: 0.85,
  metalness: 0.0,
});

const ceilingMat = new THREE.MeshStandardMaterial({
  map: makeCeilingTexture(),
  roughness: 0.9,
});
const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(HALL_WIDTH, HALL_LENGTH),
  ceilingMat
);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = HALL_HEIGHT;
scene.add(ceiling);

// Walls along the hallway (two long walls)
const leftWall = new THREE.Mesh(
  new THREE.PlaneGeometry(HALL_LENGTH, HALL_HEIGHT),
  wallMat
);
leftWall.position.set(-HALL_WIDTH / 2, HALL_HEIGHT / 2, 0);
leftWall.rotation.y = Math.PI / 2;
leftWall.receiveShadow = true;
scene.add(leftWall);

const rightWall = new THREE.Mesh(
  new THREE.PlaneGeometry(HALL_LENGTH, HALL_HEIGHT),
  wallMat
);
rightWall.position.set(HALL_WIDTH / 2, HALL_HEIGHT / 2, 0);
rightWall.rotation.y = -Math.PI / 2;
rightWall.receiveShadow = true;
scene.add(rightWall);

// End walls
const endMat = new THREE.MeshStandardMaterial({ color: 0x4a3826, roughness: 0.9 });
const endGeo = new THREE.PlaneGeometry(HALL_WIDTH, HALL_HEIGHT);
const endWallStart = new THREE.Mesh(endGeo, endMat);
endWallStart.position.set(0, HALL_HEIGHT / 2, HALL_START_Z);
endWallStart.rotation.y = Math.PI;
scene.add(endWallStart);

const endWallEnd = new THREE.Mesh(endGeo, endMat);
endWallEnd.position.set(0, HALL_HEIGHT / 2, HALL_END_Z);
scene.add(endWallEnd);

// Decorative baseboards along walls
const baseMat = new THREE.MeshStandardMaterial({ color: 0x1a120a, roughness: 0.7 });
function addBaseboard(x, rotY) {
  const b = new THREE.Mesh(
    new THREE.BoxGeometry(HALL_LENGTH, 0.4, 0.1),
    baseMat
  );
  b.position.set(x, 0.2, 0);
  b.rotation.y = rotY;
  scene.add(b);
}
addBaseboard(-HALL_WIDTH / 2 + 0.05, 0);
addBaseboard(HALL_WIDTH / 2 - 0.05, 0);

// ---------- Painting texture generator ----------
function makePaintingTexture(exhibit) {
  const w = 600, h = 800;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const p = exhibit.palette;

  // Base canvas wash
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, p[2]);
  bg.addColorStop(0.6, p[1]);
  bg.addColorStop(1, p[0]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Atmospheric brush strokes to evoke the movement
  // Sky / background band
  ctx.globalAlpha = 0.7;
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
  sky.addColorStop(0, p[2]);
  sky.addColorStop(1, p[3]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.55);

  // Distant horizon glow
  ctx.globalAlpha = 0.5;
  const glow = ctx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.45, w * 0.6);
  glow.addColorStop(0, p[3]);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Ground
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = p[1];
  ctx.fillRect(0, h * 0.62, w, h * 0.38);

  // Painted figures as abstract daubs — silhouettes suggesting figures
  ctx.globalAlpha = 0.9;
  const figureCount = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < figureCount; i++) {
    const fx = w * (0.2 + 0.6 * (i / Math.max(figureCount - 1, 1))) + (Math.random() - 0.5) * 60;
    const fy = h * (0.58 + Math.random() * 0.18);
    const fsize = 90 + Math.random() * 70;
    const fcol = p[Math.floor(Math.random() * p.length)];
    // body
    ctx.fillStyle = fcol;
    ctx.beginPath();
    ctx.ellipse(fx, fy + fsize * 0.4, fsize * 0.4, fsize * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    // head
    ctx.beginPath();
    ctx.arc(fx, fy - fsize * 0.15, fsize * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = p[3];
    ctx.fill();
    // drapery highlight
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = p[3];
    ctx.beginPath();
    ctx.ellipse(fx - fsize * 0.1, fy + fsize * 0.3, fsize * 0.15, fsize * 0.5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.9;
  }

  // Foliage / curtain accents in corners
  ctx.globalAlpha = 0.6;
  for (let corner = 0; corner < 2; corner++) {
    const cx = corner === 0 ? 0 : w;
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = p[corner === 0 ? 1 : 0];
      const a = Math.random() * Math.PI * (corner === 0 ? 1 : 1);
      const r = Math.random() * 180;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * r * (corner === 0 ? 1 : -1), Math.random() * h * 0.6 + h * 0.2, 3 + Math.random() * 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Brush texture noise overlay
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;

  // Vignette / aged varnish
  const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.75);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(20,10,0,0.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// ---------- Build exhibits along the walls ----------
const interactables = []; // { mesh, exhibit, basePos, side, index }

EXHIBITS.forEach((exhibit, i) => {
  const z = HALL_START_Z - (i + 0.5) * SEGMENT_LENGTH;
  const side = i % 2 === 0 ? -1 : 1; // alternate left/right
  const x = side * (HALL_WIDTH / 2 - 0.15);

  // Group: frame + canvas + plaque
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;

  // Frame (gilded)
  const frameW = 2.6, frameH = 3.4, frameDepth = 0.18;
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xb8904c,
    metalness: 0.75,
    roughness: 0.35,
  });
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(frameW, frameH, frameDepth),
    frameMat
  );
  frame.position.y = 2.6;
  frame.castShadow = true;
  group.add(frame);

  // Inner canvas — starts with procedural texture, swaps to real image when loaded
  const canvasW = 2.2, canvasH = 3.0;
  const canvasTex = makePaintingTexture(exhibit);
  const paintingMat = new THREE.MeshStandardMaterial({
    map: canvasTex,
    roughness: 0.7,
  });
  const painting = new THREE.Mesh(
    new THREE.PlaneGeometry(canvasW, canvasH),
    paintingMat
  );
  painting.position.set(0, 2.6, frameDepth / 2 + 0.005);
  group.add(painting);

  // Load the real public-domain artwork and swap it in
  if (exhibit.img) {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      exhibit.img,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        paintingMat.map = tex;
        paintingMat.needsUpdate = true;
      },
      undefined,
      (err) => { /* keep procedural fallback on failure */ }
    );
  }

  // Plaque
  const plaqueCanvas = document.createElement('canvas');
  plaqueCanvas.width = 512; plaqueCanvas.height = 160;
  const pctx = plaqueCanvas.getContext('2d');
  pctx.fillStyle = '#2a1f12';
  pctx.fillRect(0, 0, 512, 160);
  pctx.strokeStyle = '#b8904c';
  pctx.lineWidth = 3;
  pctx.strokeRect(6, 6, 500, 148);
  pctx.fillStyle = '#c79656';
  pctx.font = 'bold 26px Georgia, serif';
  pctx.textAlign = 'center';
  pctx.fillText(exhibit.year, 256, 42);
  pctx.fillStyle = '#e8d8b0';
  pctx.font = 'italic 22px Georgia, serif';
  // wrap title
  const words = exhibit.title.split(' ');
  let line = '', y = 80;
  for (const wd of words) {
    const test = line + wd + ' ';
    if (pctx.measureText(test).width > 480 && line) {
      pctx.fillText(line.trim(), 256, y); y += 28; line = wd + ' ';
    } else line = test;
  }
  pctx.fillText(line.trim(), 256, y);
  pctx.fillStyle = '#9c8e72';
  pctx.font = '18px Georgia, serif';
  pctx.fillText(exhibit.artist, 256, 140);

  const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
  plaqueTex.colorSpace = THREE.SRGBColorSpace;
  const plaque = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.44),
    new THREE.MeshStandardMaterial({ map: plaqueTex, roughness: 0.6 })
  );
  plaque.position.set(0, 1.0, frameDepth / 2 + 0.005);
  group.add(plaque);

  scene.add(group);

  // Store interactable data — the player-facing plane is at world position
  const worldFacing = new THREE.Vector3(0, 2.6, 0);
  worldFacing.applyMatrix4(group.matrixWorld);
  interactables.push({
    group,
    exhibit,
    index: i,
    worldPos: new THREE.Vector3(x, 2.6, z),
    side,
    visited: false,
    scared: false,
  });
});

// ---------- Lighting ----------
const ambient = new THREE.AmbientLight(0xfff0d0, 0.55);
scene.add(ambient);

// Ceiling warm fill lights along the hall
const ceilingLights = Math.ceil(HALL_LENGTH / 10);
for (let i = 0; i < ceilingLights; i++) {
  const z = HALL_START_Z - (i + 0.5) * (HALL_LENGTH / ceilingLights);
  const pt = new THREE.PointLight(0xffe4b0, 1.1, 20, 1.4);
  pt.position.set(0, HALL_HEIGHT - 0.3, z);
  scene.add(pt);

  // small fixture mesh
  const fixture = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.12, 0.12, 12),
    new THREE.MeshStandardMaterial({ color: 0xffe8b0, emissive: 0xffc060, emissiveIntensity: 1.2 })
  );
  fixture.position.set(0, HALL_HEIGHT - 0.06, z);
  scene.add(fixture);
}

// Per-painting picture lights
interactables.forEach((item) => {
  const spot = new THREE.SpotLight(0xfff0c8, 4.0, 9, Math.PI / 4.5, 0.5, 1.0);
  // place light in front of and above the painting, pointing at it
  const offsetZ = item.side === -1 ? 0.6 : -0.6;
  spot.position.set(item.worldPos.x + item.side * 0.0, HALL_HEIGHT - 0.7, item.worldPos.z + offsetZ * 0.3);
  spot.target.position.set(item.worldPos.x, 2.6, item.worldPos.z);
  scene.add(spot);
  scene.add(spot.target);

  // picture light fixture (small arm)
  const armMat = new THREE.MeshStandardMaterial({ color: 0xb8904c, metalness: 0.8, roughness: 0.3 });
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.5), armMat);
  arm.position.set(item.worldPos.x, HALL_HEIGHT - 0.7, item.worldPos.z + item.side * 0.25);
  arm.rotation.x = item.side * 0.5;
  scene.add(arm);
  const shade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.12, 0.12, 8),
    new THREE.MeshStandardMaterial({ color: 0xb8904c, metalness: 0.8, roughness: 0.3 })
  );
  shade.position.set(item.worldPos.x, HALL_HEIGHT - 0.78, item.worldPos.z + item.side * 0.45);
  scene.add(shade);
});

// Entry light
const entryLight = new THREE.PointLight(0xffe4b0, 1.4, 18);
entryLight.position.set(0, 4, HALL_START_Z - 1);
scene.add(entryLight);

// ---------- Jump-scare system ----------
let lastScareTime = -Infinity;
const scareOverlay = document.getElementById('scare-overlay');

// High-quality stinger (royalty-free, Mixkit "scary" category). Falls back to
// a procedural synth if the file can't be decoded.
const scareAudio = new Audio('sfx/scare.mp3');
scareAudio.preload = 'auto';

function playScareSound() {
  scareAudio.currentTime = 0;
  scareAudio.play().catch(() => playScareSoundFallback());
}

function playScareSoundFallback() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    // Dissonant stinger: two detuned oscillators sweeping down
    [0, 0.5].forEach((detune, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i ? 'sawtooth' : 'square';
      osc.frequency.setValueAtTime(1400 + detune * 60, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.9);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.5, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.05);
    });
    // Noise burst (white-ish) for a sharp attack
    const bufSize = ctx.sampleRate * 0.4;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.35, now);
    ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 600;
    noise.connect(filter).connect(ng).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.4);
    // Close context after the stinger finishes to free resources
    setTimeout(() => ctx.close(), 1200);
  } catch (e) { /* audio not available; visual scare still runs */ }
}

function triggerScare(item) {
  if (item.scared) return;
  item.scared = true;
  lastScareTime = clock.elapsedTime;

  const isNightmare = item.index === NIGHTMARE_INDEX;
  scareOverlay.classList.toggle('incubus', isNightmare);
  // Restart the CSS animation by toggling the class.
  document.body.classList.remove('scared');
  void scareOverlay.offsetWidth; // reflow to restart animation
  document.body.classList.add('scared');

  playScareSound();

  // Auto-clear after the animation finishes so a later scare can re-trigger.
  setTimeout(() => {
    document.body.classList.remove('scared');
    scareOverlay.classList.remove('incubus');
  }, isNightmare ? 1450 : 1200);
}

// ---------- Controls / movement ----------
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

const keys = {};
addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyE') tryInspect();
});
addEventListener('keyup', (e) => { keys[e.code] = false; });

const startBtn = document.getElementById('start-btn');
const introEl = document.getElementById('intro');
const infoEl = document.getElementById('info');
const closeInfo = document.getElementById('close-info');
const promptEl = document.getElementById('prompt');
const crosshair = document.getElementById('crosshair');
const tlBar = document.getElementById('timeline-bar');
const tlMarkers = document.querySelector('.tl-markers');
const tlProgress = document.getElementById('tl-progress');

// Hide intro only after pointer lock actually engages, so a failed lock
// doesn't leave the user staring at a frozen screen.
startBtn.addEventListener('click', () => {
  controls.lock();
});
closeInfo.addEventListener('click', () => {
  infoEl.classList.add('hidden');
  controls.lock();
});

// On successful lock, hide whichever overlay is up and reveal the timeline.
controls.addEventListener('lock', () => {
  introEl.classList.add('hidden');
  infoEl.classList.add('hidden');
  tlBar.classList.add('show');
  document.body.classList.add('locked');
});

controls.addEventListener('unlock', () => {
  document.body.classList.remove('locked');
  // If the user hit Esc while exploring (no info panel open), show the
  // intro again as a pause screen they can click to resume.
  if (infoEl.classList.contains('hidden')) {
    introEl.classList.remove('hidden');
  }
});

// Click the canvas to (re)acquire pointer lock when no overlay is blocking.
renderer.domElement.addEventListener('click', () => {
  if (!controls.isLocked && introEl.classList.contains('hidden') && infoEl.classList.contains('hidden')) {
    controls.lock();
  } else if (controls.isLocked) {
    tryInspect();
  }
});

// ---------- Timeline markers ----------
interactables.forEach((item, i) => {
  const m = document.createElement('div');
  m.className = 'tl-marker';
  m.style.left = `${(i / (NUM_EXHIBITS - 1)) * 100}%`;
  const lab = document.createElement('div');
  lab.className = 'tl-marker-label';
  lab.textContent = item.exhibit.year.replace('c. ', '').replace(/[–\-].*/, '');
  m.appendChild(lab);
  item.markerEl = m;
  tlMarkers.appendChild(m);
});

// ---------- Interaction ----------
const player = controls.getObject();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
const moveSpeed = 4.5;
const runSpeed = 8;
const PLAYER_RADIUS = 0.5;
let currentNear = null;
const VISIT_DIST = 3.2;
const SCARE_DIST = 1.6;
const SCARE_COOLDOWN = 4.0; // seconds between scares
const NIGHTMARE_INDEX = EXHIBITS.length - 1; // last exhibit is Fuseli's The Nightmare

function tryInspect() {
  if (!currentNear) return;
  showInfo(currentNear.exhibit);
  currentNear.visited = true;
  if (currentNear.markerEl) currentNear.markerEl.classList.add('visited');
  updateTimelineProgress();
}

function showInfo(exhibit) {
  document.getElementById('info-year').textContent = exhibit.year;
  document.getElementById('info-title').textContent = exhibit.title;
  document.getElementById('info-artist').textContent = exhibit.artist;
  document.getElementById('info-movement').textContent = exhibit.movement;
  document.getElementById('info-desc').textContent = exhibit.desc;
  infoEl.classList.remove('hidden');
  controls.unlock();
}

function updateTimelineProgress() {
  const visited = interactables.filter(i => i.visited).length;
  tlProgress.style.width = `${(visited / NUM_EXHIBITS) * 100}%`;
}

// ---------- Resize ----------
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ---------- Movement with wall collision ----------
function collide(pos) {
  // Clamp within hall bounds (with margin)
  const margin = PLAYER_RADIUS;
  pos.x = Math.max(-HALL_WIDTH / 2 + margin, Math.min(HALL_WIDTH / 2 - margin, pos.x));
  pos.z = Math.max(HALL_END_Z + margin, Math.min(HALL_START_Z - margin, pos.z));
}

// ---------- Animation loop ----------
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);

  if (controls.isLocked) {
    // Movement input
    const forward = (keys['KeyW'] || keys['ArrowUp'] ? 1 : 0) - (keys['KeyS'] || keys['ArrowDown'] ? 1 : 0);
    const strafe = (keys['KeyD'] || keys['ArrowRight'] ? 1 : 0) - (keys['KeyA'] || keys['ArrowLeft'] ? 1 : 0);
    const speed = keys['ShiftLeft'] || keys['ShiftRight'] ? runSpeed : moveSpeed;

    direction.set(strafe, 0, forward).normalize();
    velocity.x = direction.x * speed;
    velocity.z = direction.z * speed;

    const prevX = player.position.x;
    const prevZ = player.position.z;
    controls.moveRight(velocity.x * dt);
    controls.moveForward(velocity.z * dt);
    collide(player.position);

    // Find nearest exhibit in front
    let nearest = null;
    let nearestDist = Infinity;
    for (const item of interactables) {
      const dx = player.position.x - item.worldPos.x;
      const dz = player.position.z - item.worldPos.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      // Only count if on the correct side of the hall (same side as painting)
      const sameSide = Math.sign(player.position.x) === Math.sign(item.worldPos.x) || Math.abs(player.position.x) > 1.5;
      if (d < VISIT_DIST && d < nearestDist && sameSide) {
        nearestDist = d;
        nearest = item;
      }
    }
    currentNear = nearest;
    if (nearest) {
      crosshair.classList.add('near');
      promptEl.textContent = `Press E — ${nearest.exhibit.title}`;
      promptEl.classList.add('show');
    } else {
      crosshair.classList.remove('near');
      promptEl.classList.remove('show');
    }

    // Jump-scare: getting too close to a painting provokes it (once each).
    if (nearest && nearestDist < SCARE_DIST && !nearest.scared
        && clock.elapsedTime - lastScareTime > SCARE_COOLDOWN) {
      triggerScare(nearest);
    }
  }

  renderer.render(scene, camera);
}
animate();
