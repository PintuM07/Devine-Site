
// =============================================
// LOADING SCREEN
// =============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    initLotusParticles();
    initStars();
    startWisdom();
  }, 2200);
});

// =============================================
// CUSTOM CURSOR
// =============================================
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
});

function animateCursor() {
  ringX += (cursorX - ringX) * 0.1;
  ringY += (cursorY - ringY) * 0.1;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .symbol-card, .timeline-node, .lila-image-frame').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    cursorRing.style.width = '60px'; cursorRing.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    cursorRing.style.width = '40px'; cursorRing.style.height = '40px';
  });
});

// =============================================
// STAR CANVAS
// =============================================
function initStars() {
  const canvas = document.getElementById('cosmos-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.2,
    a: Math.random(),
    speed: Math.random() * 0.003 + 0.001,
    phase: Math.random() * Math.PI * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.001;
    stars.forEach(s => {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 217, 73, ${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// =============================================
// LOTUS PARTICLES
// =============================================
function initLotusParticles() {
  const container = document.getElementById('lotus-bg');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.classList.add('petal');
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 10}s;
      transform: rotate(${Math.random() * 360}deg);
      width: ${2 + Math.random() * 4}px;
      height: ${15 + Math.random() * 20}px;
      opacity: ${0.3 + Math.random() * 0.4};
    `;
    container.appendChild(p);
  }
}

// =============================================
// NAVIGATION SCROLL
// =============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  updateTimeline();
});

function updateTimeline() {
  const sections = ['birth','bal-lila','mathura','education','dwaraka','gita','departure'];
  const nodes = document.querySelectorAll('.timeline-node');
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.scrollY >= el.offsetTop - 300) current = id;
  });
  nodes.forEach(n => {
    n.classList.toggle('active', n.dataset.section === current);
  });
}

// =============================================
// SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// =============================================
// PARALLAX ON SCROLL
// =============================================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.lila-bg').forEach((bg, i) => {
    bg.style.transform = `translateY(${scrollY * 0.08}px)`;
  });
});

// =============================================
// WISDOM ENGINE — BHAGAVAD GITA QUOTES
// =============================================
const wisdomData = [
  {
    quote: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    ref: "Bhagavad Gita, 2.47 — Karma Yoga"
  },
  {
    quote: "The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
    ref: "Bhagavad Gita, 2.20 — Sankhya Yoga"
  },
  {
    quote: "Just as a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
    ref: "Bhagavad Gita, 2.22 — Sankhya Yoga"
  },
  {
    quote: "From the unmanifested, all manifestations spring forth at the beginning of Brahma's day, and at the coming of Brahma's night, they are dissolved into what is called the unmanifested.",
    ref: "Bhagavad Gita, 8.18 — Akshara Brahma Yoga"
  },
  {
    quote: "I am the taste of water, the light of the sun and the moon, the syllable Om in the Vedic mantras; I am the sound in ether and ability in man.",
    ref: "Bhagavad Gita, 7.8 — Jnana Vijnana Yoga"
  },
  {
    quote: "The one who sees inaction in action, and action in inaction, is intelligent among men, and is in the transcendental position, although engaged in all sorts of activities.",
    ref: "Bhagavad Gita, 4.18 — Jnana Karma Sanyasa Yoga"
  },
  {
    quote: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion — at that time I descend Myself.",
    ref: "Bhagavad Gita, 4.7 — Jnana Karma Sanyasa Yoga"
  },
  {
    quote: "Set thy heart upon thy work, but never on its reward. Work not for a reward; but never cease to do thy work. Do thy work in the peace of Yoga and, free from selfish desires, be not moved in success or in failure.",
    ref: "Bhagavad Gita, 2.47–48 — Karma Yoga"
  },
  {
    quote: "Out of compassion for them, I, dwelling in their hearts, destroy with the shining lamp of knowledge the darkness born of ignorance.",
    ref: "Bhagavad Gita, 10.11 — Vibhuti Yoga"
  },
  {
    quote: "Surrender all actions to Me. With mind intent on the Self, free from desire and the sense of 'mine,' fight — free from fever of the soul.",
    ref: "Bhagavad Gita, 3.30 — Karma Yoga"
  },
  {
    quote: "For those who worship Me with devotion, meditating on My transcendental form, I carry what they lack, and I preserve what they have.",
    ref: "Bhagavad Gita, 9.22 — Raja Vidya Yoga"
  },
  {
    quote: "Abandon all varieties of dharma and simply surrender unto Me alone. I shall deliver you from all sinful reactions. Do not fear.",
    ref: "Bhagavad Gita, 18.66 — Moksha Yoga"
  }
];

let currentWisdomIndex = -1;
let isTyping = false;
let typeTimeout = null;

function startWisdom() {
  setTimeout(newWisdom, 500);
}

function newWisdom() {
  if (isTyping) return;
  let idx;
  do { idx = Math.floor(Math.random() * wisdomData.length); } while (idx === currentWisdomIndex);
  currentWisdomIndex = idx;

  const quoteEl = document.getElementById('quote-text');
  const refEl = document.getElementById('wisdom-ref');
  const cursorEl = document.getElementById('quote-cursor');

  refEl.style.opacity = '0';
  quoteEl.textContent = '';
  cursorEl.style.display = 'inline-block';

  const { quote, ref } = wisdomData[idx];
  isTyping = true;
  let i = 0;

  function typeChar() {
    if (i < quote.length) {
      quoteEl.textContent += quote[i];
      i++;
      typeTimeout = setTimeout(typeChar, 28 + Math.random() * 20);
    } else {
      isTyping = false;
      cursorEl.style.display = 'none';
      refEl.textContent = '— ' + ref;
      refEl.style.opacity = '1';
    }
  }
  if (typeTimeout) clearTimeout(typeTimeout);
  typeChar();
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// =============================================
// DIVINE SOUND ENGINE — Web Audio API
// All sounds synthesized — no external files
// =============================================

let audioCtx = null;
let masterGain = null;
let currentTrackNodes = [];
let isPlaying = false;
let panelOpen = false;
let activeTrack = null;

const TRACK_META = {
  tanpura: { label: '🪕 Tanpura Drone — Sa', icon: '🪕' },
  flute:   { label: '🎵 Krishna Venu (Flute)', icon: '🎵' },
  om:      { label: 'ॐ Om Chanting', icon: 'ॐ' },
  bells:   { label: '🔔 Temple Bells & Shankha', icon: '🔔' },
};

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.45;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

// --- Utility: create oscillator with gain ---
function osc(freq, type, gainVal, detune = 0) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.detune.value = detune;
  g.gain.value = gainVal;
  o.connect(g);
  g.connect(masterGain);
  o.start();
  return { osc: o, gain: g };
}

// --- Utility: reverb (convolver with impulse) ---
function makeReverb(duration = 3, decay = 2) {
  const rate = audioCtx.sampleRate;
  const len = rate * duration;
  const buf = audioCtx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  const conv = audioCtx.createConvolver();
  conv.buffer = buf;
  return conv;
}

// --- Low-pass filter ---
function lpf(freq) {
  const f = audioCtx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = freq;
  return f;
}

// =============================================
// TRACK 1: TANPURA DRONE (Sa + Pa + harmonics)
// =============================================
function playTanpura() {
  const rev = makeReverb(4, 1.5);
  rev.connect(masterGain);

  const baseHz = 130.81; // C3 = Sa
  const nodes = [];

  // Sa (fundamental)
  const droneFreqs = [
    { f: baseHz,       t: 'sine',     g: 0.30, d: 0 },
    { f: baseHz * 2,   t: 'sine',     g: 0.14, d: 0 },
    { f: baseHz * 3,   t: 'sine',     g: 0.08, d: 0 },
    { f: baseHz * 4,   t: 'sine',     g: 0.05, d: 0 },
    // Pa (fifth above = 196 Hz ~ G3)
    { f: 196,          t: 'sine',     g: 0.18, d: 0 },
    { f: 196 * 2,      t: 'sine',     g: 0.09, d: 0 },
    // High Sa
    { f: baseHz * 4,   t: 'sine',     g: 0.12, d: 0 },
    // Slight detuned layers for richness
    { f: baseHz,       t: 'sine',     g: 0.06, d: 4 },
    { f: baseHz,       t: 'sine',     g: 0.06, d: -4 },
  ];

  droneFreqs.forEach(({ f, t, g, d }) => {
    const o = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    o.type = t;
    o.frequency.value = f;
    o.detune.value = d;
    gain.gain.value = g;
    o.connect(gain);
    gain.connect(rev);
    o.start();
    nodes.push(o, gain);
  });

  // Pluck simulation — periodic amplitude modulation per string cycle
  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = 0.28; // ~once per 3.5s tanpura cycle
  lfoGain.gain.value = 0.04;
  lfo.connect(lfoGain);
  lfoGain.connect(masterGain.gain);
  lfo.start();
  nodes.push(lfo, lfoGain);

  return nodes;
}

// =============================================
// TRACK 2: KRISHNA VENU (Flute melody + drone)
// =============================================
function playFlute() {
  const rev = makeReverb(3.5, 2);
  rev.connect(masterGain);

  const nodes = [];

  // Background tanpura hum
  [130.81, 261.63, 392].forEach(f => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine'; o.frequency.value = f; g.gain.value = 0.06;
    o.connect(g); g.connect(rev); o.start();
    nodes.push(o, g);
  });

  // Flute breath noise
  const noise = audioCtx.createOscillator();
  const noiseGain = audioCtx.createGain();
  const noiseLPF = lpf(1200);
  noise.type = 'sawtooth';
  noise.frequency.value = 261.63;
  noiseGain.gain.value = 0.04;
  noise.connect(noiseGain); noiseGain.connect(noiseLPF); noiseLPF.connect(rev);
  noise.start();
  nodes.push(noise, noiseGain, noiseLPF);

  // Melodic flute line — cycling Raag Yaman notes (pentatonic pattern)
  // Notes: Sa Re Ga Pa Dha (C D E G A in C major)
  const raagNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 392.00, 329.63, 293.66, 261.63, 293.66, 392.00, 440.00, 392.00, 329.63, 261.63];
  const noteDurs  = [1.2,    0.6,    0.9,    1.4,    0.8,    1.2,    0.7,    0.9,    0.6,    1.5,    0.5,    0.9,    1.1,    0.8,    0.7,    2.0];

  const fluteOsc = audioCtx.createOscillator();
  const fluteGain = audioCtx.createGain();
  const fluteFilter = audioCtx.createBiquadFilter();
  fluteFilter.type = 'bandpass';
  fluteFilter.frequency.value = 1000;
  fluteFilter.Q.value = 0.8;

  fluteOsc.type = 'sine';
  fluteOsc.frequency.value = raagNotes[0];
  fluteGain.gain.value = 0;
  fluteOsc.connect(fluteGain);
  fluteGain.connect(fluteFilter);
  fluteFilter.connect(rev);
  fluteOsc.start();
  nodes.push(fluteOsc, fluteGain, fluteFilter);

  // Schedule melody
  let t = audioCtx.currentTime + 0.5;
  function scheduleMelody() {
    raagNotes.forEach((freq, i) => {
      const dur = noteDurs[i];
      fluteOsc.frequency.setValueAtTime(freq, t);
      fluteGain.gain.linearRampToValueAtTime(0.22, t + 0.05);
      fluteGain.gain.linearRampToValueAtTime(0.15, t + dur * 0.7);
      fluteGain.gain.linearRampToValueAtTime(0, t + dur - 0.05);
      t += dur;
    });
    // Restart cycle
    setTimeout(scheduleMelody, (t - audioCtx.currentTime) * 1000 - 200);
  }
  scheduleMelody();

  return nodes;
}

// =============================================
// TRACK 3: OM CHANTING (harmonic choir)
// =============================================
function playOm() {
  const rev = makeReverb(5, 1.8);
  rev.connect(masterGain);
  const nodes = [];

  // The Om harmonic series — A2 = 110 Hz
  const omBase = 110;
  const harmonics = [1, 2, 3, 4, 5, 6, 7, 8];
  const gains     = [0.22, 0.14, 0.10, 0.07, 0.05, 0.04, 0.03, 0.02];

  harmonics.forEach((h, i) => {
    // Left voice
    const oL = audioCtx.createOscillator();
    const gL = audioCtx.createGain();
    const panL = audioCtx.createStereoPanner();
    oL.type = 'sine';
    oL.frequency.value = omBase * h;
    oL.detune.value = i * 1.5; // slight chorus
    gL.gain.value = gains[i];
    panL.pan.value = -0.3;
    oL.connect(gL); gL.connect(panL); panL.connect(rev);
    oL.start();
    nodes.push(oL, gL, panL);

    // Right voice (slightly detuned)
    const oR = audioCtx.createOscillator();
    const gR = audioCtx.createGain();
    const panR = audioCtx.createStereoPanner();
    oR.type = 'sine';
    oR.frequency.value = omBase * h;
    oR.detune.value = -i * 1.5;
    gR.gain.value = gains[i] * 0.9;
    panR.pan.value = 0.3;
    oR.connect(gR); gR.connect(panR); panR.connect(rev);
    oR.start();
    nodes.push(oR, gR, panR);
  });

  // Slow breath LFO — mimics the MM-MM-MM of chanting
  const lfo = audioCtx.createOscillator();
  const lfoG = audioCtx.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = 0.12; // one Om every ~8s
  lfoG.gain.value = 0.10;
  lfo.connect(lfoG);
  lfoG.connect(masterGain.gain);
  lfo.start();
  nodes.push(lfo, lfoG);

  return nodes;
}

// =============================================
// TRACK 4: TEMPLE BELLS & SHANKHA
// =============================================
function playBells() {
  const rev = makeReverb(4, 1.2);
  rev.connect(masterGain);
  const nodes = [];

  // Continuous low tanpura bed
  [65.4, 130.81, 196].forEach(f => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine'; o.frequency.value = f; g.gain.value = 0.05;
    o.connect(g); g.connect(rev); o.start();
    nodes.push(o, g);
  });

  // Bell synthesis function
  function ringBell(freq, time, vol) {
    const ctx = audioCtx;
    // Two oscillators detuned slightly for metallic quality
    [0, 2.7].forEach(detune => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = freq + detune;
      g.gain.setValueAtTime(vol, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 3.5);
      o.connect(g); g.connect(rev);
      o.start(time);
      o.stop(time + 4);
    });
    // Upper partial
    const o2 = audioCtx.createOscillator();
    const g2 = audioCtx.createGain();
    o2.type = 'sine';
    o2.frequency.value = freq * 2.756; // inharmonic partial = bell character
    g2.gain.setValueAtTime(vol * 0.35, time);
    g2.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);
    o2.connect(g2); g2.connect(rev);
    o2.start(time); o2.stop(time + 2.5);
  }

  // Shankha (conch) — low breathy sweep
  function shankha(time) {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    const f = lpf(800);
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(180, time);
    o.frequency.linearRampToValueAtTime(220, time + 0.4);
    o.frequency.linearRampToValueAtTime(190, time + 2.5);
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.18, time + 0.2);
    g.gain.linearRampToValueAtTime(0.12, time + 2.0);
    g.gain.linearRampToValueAtTime(0, time + 2.8);
    o.connect(g); g.connect(f); f.connect(rev);
    o.start(time); o.stop(time + 3);
  }

  // Bell schedule — temple-like irregular rhythm
  const bellFreqs = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  let t = audioCtx.currentTime + 0.5;
  function scheduleBells() {
    // Small cluster of bells
    const gaps = [1.8, 2.4, 3.2, 1.6, 4.8, 2.0, 3.6, 5.0, 1.4, 2.8];
    gaps.forEach(gap => {
      const freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];
      const vol = 0.12 + Math.random() * 0.1;
      ringBell(freq, t, vol);
      t += gap;
    });
    // Shankha every ~30 seconds
    shankha(t - 5);
    setTimeout(scheduleBells, (gaps.reduce((a,b)=>a+b,0)) * 1000 - 300);
  }
  scheduleBells();

  return nodes;
}

// =============================================
// PLAYER CONTROLS
// =============================================
function stopAll() {
  currentTrackNodes.forEach(n => {
    try { if (n.stop) n.stop(); } catch(e){}
    try { if (n.disconnect) n.disconnect(); } catch(e){}
  });
  currentTrackNodes = [];
  isPlaying = false;
}

function selectTrack(trackKey, btn) {
  ensureAudio();
  stopAll();
  activeTrack = trackKey;

  // Update button states
  document.querySelectorAll('.sound-track-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Play chosen track
  switch (trackKey) {
    case 'tanpura': currentTrackNodes = playTanpura(); break;
    case 'flute':   currentTrackNodes = playFlute();   break;
    case 'om':      currentTrackNodes = playOm();      break;
    case 'bells':   currentTrackNodes = playBells();   break;
  }

  isPlaying = true;
  updatePlayerUI();
}

function togglePanel() {
  panelOpen = !panelOpen;
  const panel = document.getElementById('sound-panel');
  panel.classList.toggle('open', panelOpen);

  // Auto-play tanpura on first open
  if (panelOpen && !isPlaying && !activeTrack) {
    setTimeout(() => selectTrack('tanpura', document.querySelector('[data-track="tanpura"]')), 300);
  }
}

function setVolume(val) {
  ensureAudio();
  masterGain.gain.linearRampToValueAtTime(val / 100, audioCtx.currentTime + 0.05);
}

function updatePlayerUI() {
  const btn = document.getElementById('sound-toggle-btn');
  const icon = document.getElementById('btn-icon');
  const title = document.getElementById('panel-title');
  const label = document.getElementById('now-playing-label');
  const bars = document.querySelectorAll('.sound-bar');

  btn.classList.toggle('playing', isPlaying);
  title.classList.toggle('muted', !isPlaying);

  if (isPlaying && activeTrack) {
    icon.textContent = TRACK_META[activeTrack].icon;
    label.textContent = TRACK_META[activeTrack].label;
  } else {
    icon.textContent = '🎵';
    label.textContent = 'Select a soundscape below';
  }

  bars.forEach(bar => {
    bar.classList.toggle('playing', isPlaying);
    bar.classList.toggle('paused', !isPlaying);
  });
}

// =============================================
// BUILD WAVEFORM BARS
// =============================================
(function buildBars() {
  const viz = document.getElementById('sound-visualizer');
  const count = 20;
  for (let i = 0; i < count; i++) {
    const bar = document.createElement('div');
    bar.className = 'sound-bar paused';
    const maxH = 8 + Math.random() * 24;
    bar.style.cssText = `
      height: ${maxH}px;
      --dur: ${0.4 + Math.random() * 0.7}s;
      animation-delay: ${Math.random() * 0.8}s;
    `;
    viz.appendChild(bar);
  }
})();

// Pause audio when tab hidden, resume when visible
document.addEventListener('visibilitychange', () => {
  if (!audioCtx) return;
  if (document.hidden) audioCtx.suspend();
  else if (isPlaying) audioCtx.resume();
});