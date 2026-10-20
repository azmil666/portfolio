import React, { useState, useEffect } from "react";

export default function MobileMenu({ onNavClick, setMenuOpen, playOpen, playClose }){
  const [open, setOpen] = useState(false);
  useEffect(() => {
  setMenuOpen(open);
}, [open]);

  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

 const handleNav = (id) => {
  playClose(); 
  setTimeout(() => {
    setOpen(false);
    onNavClick(id);
  }, 200);
};

  return (
    <div className="rdr-mobile-container">
     
      <style>
        {`
          

          /* Restrict to Mobile Screens */
          @media (min-width: 768px) {
            .rdr-mobile-container { display: none; }
          }

          /* Tactile Hamburger Icon */
          .rdr-hamburger {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 100;
            width: 48px;
            height: 48px;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 7px;
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            -webkit-tap-highlight-color: transparent;
          }
          .rdr-hamburger:active {
            transform: scale(0.85);
          }
          .rdr-line {
            width: 32px;
            height: 2px;
            background: #d4c19c; /* Worn Gold */
            border-radius: 2px;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 0 5px rgba(212, 193, 156, 0.3);
          }
          .rdr-hamburger.is-open .rdr-line-1 {
            transform: translateY(9px) rotate(45deg);
            background: #fff;
          }
          .rdr-hamburger.is-open .rdr-line-2 {
            opacity: 0;
            transform: translateX(-15px);
          }
          .rdr-hamburger.is-open .rdr-line-3 {
            transform: translateY(-9px) rotate(-45deg);
            background: #fff;
          }

          /* Cinematic Backdrop */
          .rdr-overlay {
            position: fixed;
            inset: 0;
            z-index: 90;
            background: rgba(8, 6, 6, 0.7);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .rdr-overlay.is-open {
            opacity: 1;
            pointer-events: auto;
          }

          /* Sliding Panel */
          .rdr-panel {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 85%;
            max-width: 380px;
            background-color: #0f0d0c; /* Deep Charcoal/Brown */
            z-index: 95;
            transform: translateX(100%);
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            padding: 100px 30px 40px;
            box-shadow: -15px 0 40px rgba(0,0,0,0.9);
            overflow: hidden;
          }
          .rdr-panel.is-open {
            transform: translateX(0);
          }

          /* Film Grain & Vignette */
          .rdr-panel::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 0;
          }
          .rdr-panel::after {
            content: '';
            position: absolute;
            inset: 0;
            box-shadow: inset 0 0 120px rgba(0,0,0,0.95);
            pointer-events: none;
            z-index: 1;
          }

          /* Menu Header (Chapter style) */
          .rdr-header {
            position: relative;
            z-index: 2;
            font-family: 'American Captain', serif;
            color: #d4a030;; 
            font-size: 13px;
            letter-spacing: 5px;
            text-transform: uppercase;
            margin-bottom: 40px;
            border-bottom: 1px solid rgba(212, 160, 48, 0.25);
            padding-bottom: 12px;
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
          }
          .rdr-panel.is-open .rdr-header {
            opacity: 1;
            transform: translateX(0);
          }

          /* Staggered Navigation Items */
          .rdr-nav {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .rdr-btn {
            background: transparent;
            border: none;
            color: #9c8e79; /* Muted Dusty Gold */
            font-family: 'American Captain', serif;
            font-size: 26px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: left;
            padding: 16px 0;
            position: relative;
            opacity: 0;
            transform: translateX(40px);
            transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            display: flex;
            align-items: center;
          }
            .rdr-btn::after {
            content: '';
            position: absolute;
            bottom: 6px;
            left: 0;
            width: 0%;
            height: 1px;
            background: #d4a030;
            transition: width 0.3s ease;
            }

            .rdr-btn:hover::after {
            width: 100%;
            }

          /* Staggering delays */
          .rdr-panel.is-open .rdr-btn:nth-child(1) { transition-delay: 0.15s; }
          .rdr-panel.is-open .rdr-btn:nth-child(2) { transition-delay: 0.25s; }
          .rdr-panel.is-open .rdr-btn:nth-child(3) { transition-delay: 0.35s; }
          .rdr-panel.is-open .rdr-btn:nth-child(4) { transition-delay: 0.45s; }

          .rdr-panel.is-open .rdr-btn {
            opacity: 1;
            transform: translateX(0);
          }

          /* Hover & Active / Tactile Glow State */
          .rdr-btn::before {
            content: '•';
            color: #d4a030;
            position: absolute;
            left: -20px;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
          }

          @media (hover: hover) {
            .rdr-btn:hover {
              color: #fff;
              transform: translateX(12px) scale(0.98) !important;
              text-shadow: 0 0 12px rgba(212, 193, 156, 0.5), 2px 2px 4px rgba(0,0,0,0.8);
            }
            .rdr-btn:hover::before {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Mobile Tap state matching AAA game depth */
          .rdr-btn:active {
            color: #fff;
            transform: translateX(8px) scale(0.95) !important;
            text-shadow: 0 0 20px rgba(212, 193, 156, 0.7);
          }
        `}
      </style>

      {/* Cinematic Blur Overlay */}
      <div 
        className={`rdr-overlay ${open ? "is-open" : ""}`} 
        onClick={() => {
  playClose();
  setOpen(false);
}}
      />

      {/* Custom Morphing Hamburger Icon */}
      <button 
        className={`rdr-hamburger ${open ? "is-open" : ""}`} 
        onClick={() => {
  if (!open) {
    playOpen();
  } else {
    playClose();
  }
  setOpen(!open);
}}
        aria-label="Toggle menu"
      >
        <span className="rdr-line rdr-line-1"></span>
        <span className="rdr-line rdr-line-2"></span>
        <span className="rdr-line rdr-line-3"></span>
      </button>

      {/* Sliding Cinematic Menu Panel */}
      <nav className={`rdr-panel ${open ? "is-open" : ""}`}>
        <div className="rdr-header">Index</div>
        <div className="rdr-nav">
          <button className="rdr-btn" onClick={() => handleNav(1)}>About</button>
<button className="rdr-btn" onClick={() => handleNav(2)}>Projects</button>
<button className="rdr-btn" onClick={() => handleNav(3)}>Skills</button>
<button className="rdr-btn" onClick={() => handleNav(4)}>Contact</button>
        </div>
      </nav>
    </div>
  );
}