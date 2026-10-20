import { useState, useEffect } from "react";


const HINTS = [
  {
    icon: "/horse.png",
    title: "Ride Through Town",
    body: "Scroll up & down — or use your Arrow Keys — to ride the cinematic trail through the western town.",
    keys: ["↑", "↓", "Scroll"],
  },
  {
    icon:  "/wood.svg",
    title: "Explore Each Building",
    body: "Every building is a chapter of my story. When you reach a new district, press the glowing button to open its dossier.",
    keys: ["[ Enter Building ]"],
  },
  {
    icon: "/world.svg",
    title: "The Sheriff's HUD",
    body: "Use the top navbar to fast-travel between districts — About, Projects, Skills, and Contact.",
    keys: ["Top Nav"],
  },
  {
    icon: "/saloon.svg",
    title: "The Saloon Ambience",
    body: "Hit the guitar button to let the western soundtrack play. Toggle the sun/moon to switch between day and night.",
    keys: ["Music", "Theme"], 
  },
  {
    icon: "/cactus.svg",
    title: "You're Ready, Partner",
    body: "That's all you need to know. The trail awaits — ride safe, and keep your eyes peeled for bounties.",
    keys: [],
  },
];
export default function TutorialHint({ visible, onClose }) {
  // const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const [animDir, setAnimDir] = useState("in"); 

  // useEffect(() => {
  //   const seen = sessionStorage.getItem("wpt-hint-seen");
  //   if (!seen) {
      
  //     const t = setTimeout(() => setVisible(true), 2200);
  //     return () => clearTimeout(t);
  //   }
  // }, []);

  const dismiss = () => {
  setClosing(true);
  setTimeout(() => {
    setClosing(false);
    sessionStorage.setItem("wpt-hint-seen", "1");

    if (onClose) onClose(); 
  }, 500);
};

  const next = () => {
    if (step >= HINTS.length - 1) {
      dismiss();
      return;
    }
    setAnimDir("out");
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimDir("in");
    }, 220);
  };

  const prev = () => {
    if (step === 0) return;
    setAnimDir("out");
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimDir("in");
    }, 220);
  };

  if (!visible) return null;

  const hint = HINTS[step];
  const isLast = step === HINTS.length - 1;

  return (
    <>
      <style>{CSS}</style>
      <div className={`wpt-backdrop ${closing ? "wpt-closing" : ""}`} onClick={dismiss} />
      <div className={`wpt-codex ${closing ? "wpt-closing" : ""}`}>
        {/* ── Aged corner ornaments ── */}
        <span className="wpt-corner wpt-tl">✦</span>
        <span className="wpt-corner wpt-tr">✦</span>
        <span className="wpt-corner wpt-bl">✦</span>
        <span className="wpt-corner wpt-br">✦</span>

        {/* ── Header stamp ── */}
        <div className="wpt-stamp">
          <div className="wpt-stamp-inner">RIDER'S CODEX</div>
        </div>

        {/* ── Divider ── */}
        <div className="wpt-divider">
          <span className="wpt-div-line" />
          <span className="wpt-div-icon">✧</span>
          <span className="wpt-div-line" />
        </div>

        {/* ── Hint body ── */}
        <div className={`wpt-hint-body wpt-anim-${animDir}`} key={step}>
          <div className="wpt-hint-icon">
          <img src={hint.icon} alt="icon" />
        </div>
          <h2 className="wpt-hint-title">{hint.title}</h2>
          <p className="wpt-hint-text">{hint.body}</p>
          {hint.keys.length > 0 && (
            <div className="wpt-keys">
              {hint.keys.map((k) => (
                <span key={k} className="wpt-key">{k}</span>
              ))}
            </div>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="wpt-divider" style={{ marginTop: "auto" }}>
          <span className="wpt-div-line" />
          <span className="wpt-div-icon">✧</span>
          <span className="wpt-div-line" />
        </div>

        {/* ── Step dots ── */}
        <div className="wpt-dots">
          {HINTS.map((_, i) => (
            <span key={i} className={`wpt-dot ${i === step ? "wpt-dot-active" : ""}`} />
          ))}
        </div>

        {/* ── Navigation ── */}
        <div className="wpt-nav">
          <button className="wpt-btn wpt-btn-ghost" onClick={prev} disabled={step === 0}>
            ← Back
          </button>
          <button className="wpt-btn wpt-btn-dismiss" onClick={dismiss}>
            Skip
          </button>
          <button className="wpt-btn wpt-btn-primary" onClick={next}>
            {isLast ? "Ride Out →" : "Next →"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── All styles  ──────────────────────────────────────────────────
// ── All styles  ──────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap');

  /* ── Variables ── */
  .wpt-codex {
    --parch: #f5e6c8;
    --parch-dark: #e8d5a8;
    --ink: #2a1a08;
    --ink-faint: #5c3d1e;
    --gold: #b8860b;
    --gold-light: #d4a030;
    --rust: #8b3a1a;
    --border: #8b6914;
  }

  /* ── Backdrop ── */
  .wpt-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 6, 2, 0.72);
    backdrop-filter: blur(3px);
    z-index: 9998;
    animation: wpt-fade-in 0.4s ease forwards;
  }
  .wpt-backdrop.wpt-closing {
    animation: wpt-fade-out 0.45s ease forwards;
  }

  /* ── Codex card ── */
  .wpt-codex {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    width: min(480px, 92vw);
    min-height: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 32px 22px;
    gap: 0;

    /* Parchment background */
    background:
      radial-gradient(ellipse at 30% 20%, rgba(255,230,160,0.35) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 80%, rgba(180,120,50,0.18) 0%, transparent 60%),
      linear-gradient(160deg, #f0d896 0%, #e8c87a 30%, #d4a848 60%, #c8983c 100%);

    /* Aged paper border */
    border: 2px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(184,134,11,0.3),
      0 0 0 5px rgba(184,134,11,0.08),
      inset 0 0 60px rgba(100,60,10,0.15),
      0 20px 60px rgba(0,0,0,0.6),
      0 4px 16px rgba(0,0,0,0.4);

    background-size: 100% 100%;
    animation: wpt-drop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
  .wpt-codex.wpt-closing {
    animation: wpt-drop-out 0.42s cubic-bezier(0.4,0,1,1) forwards;
  }

  /* Noise grain overlay */
  .wpt-codex::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
    background-size: 150px 150px;
    mix-blend-mode: multiply;
    pointer-events: none;
    border-radius: 2px;
    opacity: 0.6;
  }

  /* Vignette */
  .wpt-codex::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(80,40,5,0.28) 100%);
    pointer-events: none;
    border-radius: 2px;
  }

  /* ── Corner ornaments ── */
  .wpt-corner {
    position: absolute;
    font-size: 14px;
    color: var(--gold);
    opacity: 0.7;
  }
  .wpt-tl { top: 8px; left: 10px; }
  .wpt-tr { top: 8px; right: 10px; }
  .wpt-bl { bottom: 8px; left: 10px; }
  .wpt-br { bottom: 8px; right: 10px; }

  /* ── Stamp header ── */
  .wpt-stamp {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .wpt-stamp-inner {
    font-family: 'American Captain', serif;
    font-size: 16px;
    letter-spacing: 0.35em;
    color: var(--rust);
    text-shadow: 1px 1px 0 rgba(255,220,140,0.5);
    padding: 4px 16px;
    border: 1.5px solid var(--rust);
    border-radius: 2px;
    opacity: 0.85;
    transform: rotate(-0.5deg);
  }

  /* ── Decorative divider ── */
  .wpt-divider {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    margin: 10px 0;
    position: relative;
    z-index: 1;
  }
  .wpt-div-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.6;
  }
  .wpt-div-icon {
    color: var(--gold);
    font-size: 11px;
    opacity: 0.7;
  }

  /* ── Hint body ── */
  .wpt-hint-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 8px 4px;
    position: relative;
    z-index: 1;
    flex: 1;
  }
  .wpt-hint-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .wpt-hint-icon img {
    width: 38px;
    height: 38px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
  }
  .wpt-hint-title {
    font-family: 'American Captain', serif;
    font-size: 24px;
    color: var(--ink);
    margin: 0 0 8px;
    text-shadow: 1px 1px 0 rgba(255,220,140,0.4);
    letter-spacing: 0.08em;
  }
  .wpt-hint-text {
    /* Kept original serif body font */
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 15px;
    line-height: 1.65;
    color: var(--ink-faint);
    margin: 0 0 14px;
    max-width: 340px;
  }

  /* ── Key badges ── */
  .wpt-keys {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: center;
    margin-top: 2px;
  }
  .wpt-key {
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 12px;
    color: var(--rust);
    border: 1.5px solid var(--rust);
    border-radius: 3px;
    padding: 3px 10px;
    background: rgba(139,58,26,0.08);
    letter-spacing: 0.05em;
  }

  /* ── Step dots ── */
  .wpt-dots {
    display: flex;
    gap: 7px;
    margin: 6px 0 10px;
    position: relative;
    z-index: 1;
  }
  .wpt-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(139,105,20,0.3);
    border: 1px solid rgba(139,105,20,0.5);
    transition: all 0.3s ease;
  }
  .wpt-dot-active {
    background: var(--gold);
    border-color: var(--gold);
    box-shadow: 0 0 6px rgba(184,134,11,0.5);
    transform: scale(1.25);
  }

  /* ── Nav buttons ── */
  .wpt-nav {
    display: flex;
    gap: 8px;
    width: 100%;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .wpt-btn {
    font-family: 'American Captain', serif;
    font-size: 16px;
    letter-spacing: 0.08em;
    padding: 6px 14px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }
  .wpt-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .wpt-btn-ghost {
    background: transparent;
    color: var(--ink-faint);
    border: 1.5px solid rgba(92,61,30,0.35) !important;
  }
  .wpt-btn-ghost:not(:disabled):hover {
    background: rgba(92,61,30,0.1);
    color: var(--ink);
  }
  .wpt-btn-dismiss {
    background: transparent;
    color: rgba(92,61,30,0.55);
    font-size: 14px;
    border: 1.5px solid rgba(92,61,30,0.2) !important;
  }
  .wpt-btn-dismiss:hover {
    color: var(--rust);
    border-color: var(--rust) !important;
    opacity: 1;
  }
  .wpt-btn-primary {
    background: linear-gradient(135deg, #8b3a1a 0%, #6b2810 100%);
    color: #f5e6c8;
    border: 1.5px solid #6b2810 !important;
    box-shadow: 0 2px 8px rgba(100,30,10,0.35), inset 0 1px 0 rgba(255,200,130,0.15);
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }
  .wpt-btn-primary:hover {
    background: linear-gradient(135deg, #a04422 0%, #7a3015 100%);
    box-shadow: 0 4px 12px rgba(100,30,10,0.5), inset 0 1px 0 rgba(255,200,130,0.2);
    transform: translateY(-1px);
  }
  .wpt-btn-primary:active {
    transform: translateY(0);
  }

  /* ── Animations ── */
  @keyframes wpt-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes wpt-fade-out {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes wpt-drop-in {
    from { opacity: 0; transform: translate(-50%, -48%) scale(0.92); }
    to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes wpt-drop-out {
    from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    to   { opacity: 0; transform: translate(-50%, -53%) scale(0.94); }
  }
  @keyframes wpt-slide-in {
    from { opacity: 0; transform: translateX(18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes wpt-slide-out {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(-18px); }
  }
  .wpt-anim-in  { animation: wpt-slide-in  0.25s ease forwards; }
  .wpt-anim-out { animation: wpt-slide-out 0.2s ease forwards; }

  /* ── Mobile adjustments ── */
  @media (max-width: 480px) {
    .wpt-codex {
      padding: 22px 20px 18px;
      min-height: 380px;
    }
    .wpt-hint-title { font-size: 20px; }
    .wpt-hint-text  { font-size: 14px; }
    .wpt-btn { padding: 6px 10px; font-size: 14px; }
  }
`;