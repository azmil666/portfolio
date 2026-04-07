import React, { useState, useEffect } from "react";

export default function CinematicHUDNav({ currentSection = 0, onNavClick, totalSections = 5 }) {
  const [isPulsing, setIsPulsing] = useState(false);

  
  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 400);
    return () => clearTimeout(timer);
  }, [currentSection]);

  const handleUp = () => {
    if (currentSection > 0) onNavClick(currentSection - 1);
  };

  const handleDown = () => {
    if (currentSection < totalSections - 1) onNavClick(currentSection + 1);
  };

  return (
    <>
      <style>
        {`
          /* Cinematic Entrance Animation */
          @keyframes hudEntrance {
            0% {
              opacity: 0;
              transform: translateY(-50%) translateX(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(-50%) translateX(0);
            }
          }

          /* Subtle Idle Breathing Effect */
          @keyframes hudBreathe {
            0% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.8), inset 0 0 0 rgba(212, 160, 48, 0); }
            50% { box-shadow: 0 0 25px rgba(0, 0, 0, 0.9), inset 0 0 8px rgba(212, 160, 48, 0.15); }
            100% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.8), inset 0 0 0 rgba(212, 160, 48, 0); }
          }

          /* Section Change Pulse */
          @keyframes pulseTrack {
            0% { background: rgba(212, 160, 48, 0.8); box-shadow: 0 0 15px rgba(212, 160, 48, 0.6); }
            100% { background: rgba(212, 160, 48, 0.15); box-shadow: 0 0 0 rgba(212, 160, 48, 0); }
          }

          /* HUD Container */
          .hud-nav-panel {
            position: fixed;
            top: 50%;
            right: 16px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 56px;
            height: 160px;
            padding: 8px 0;
            border-radius: 40px;
            background: rgba(18, 14, 12, 0.65); /* Dark, slightly warm cinematic base */
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            animation: 
              hudEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards,
              hudBreathe 4s ease-in-out infinite alternate;
            /* Faint Vignette integration */
            background-image: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%);
          }

          /* Connecting Rail/Track */
          .hud-rail {
            position: absolute;
            top: 50px;
            bottom: 50px;
            width: 2px;
            background: rgba(212, 160, 48, 0.15);
            border-radius: 2px;
            z-index: 1;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .hud-rail.is-pulsing {
            animation: pulseTrack 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Tactile Buttons */
          .hud-btn {
            position: relative;
            z-index: 2;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: linear-gradient(145deg, rgba(30, 25, 22, 0.8), rgba(15, 12, 10, 0.9));
            border: 1px solid rgba(212, 160, 48, 0.1);
            color: #b39b78; /* Muted dusty gold */
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            outline: none;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 
              4px 4px 10px rgba(0, 0, 0, 0.6),
              -2px -2px 6px rgba(255, 255, 255, 0.03),
              inset 0 -2px 4px rgba(0, 0, 0, 0.5);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Micro-interactions: Hover & Active */
          @media (hover: hover) {
            .hud-btn:hover:not(.is-disabled) {
              color: #d4a030; /* Bright Soft Gold */
              background: linear-gradient(145deg, rgba(40, 32, 28, 0.9), rgba(20, 16, 14, 1));
              border-color: rgba(212, 160, 48, 0.4);
              box-shadow: 
                0 0 12px rgba(212, 160, 48, 0.2),
                4px 4px 10px rgba(0, 0, 0, 0.8),
                inset 0 -2px 4px rgba(0, 0, 0, 0.5);
            }
            .hud-btn:hover:not(.is-disabled) svg {
              filter: drop-shadow(0 0 4px rgba(212, 160, 48, 0.6));
              transform: scale(1.1);
            }
          }

          .hud-btn:active:not(.is-disabled) {
            transform: scale(0.9) translateY(2px);
            box-shadow: 
              inset 2px 4px 8px rgba(0, 0, 0, 0.8),
              inset -1px -1px 4px rgba(255, 255, 255, 0.02);
            color: #d4a030;
          }

          .hud-btn.is-up:active:not(.is-disabled) {
            transform: scale(0.9) translateY(-2px);
          }

          /* Directional Hinting (Disabled States) */
          .hud-btn.is-disabled {
            opacity: 0.25;
            cursor: default;
            pointer-events: none;
            box-shadow: none;
            background: rgba(15, 12, 10, 0.5);
            border-color: transparent;
          }

          /* SVG Icon Styling */
          .hud-btn svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 2.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}
      </style>

      <div className="hud-nav-panel">
        <button
          className={`hud-btn is-up ${currentSection === 0 ? "is-disabled" : ""}`}
          onClick={handleUp}
          aria-label="Previous Section"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>

       
        <div className={`hud-rail ${isPulsing ? "is-pulsing" : ""}`} />

        <button
          className={`hud-btn is-down ${currentSection >= totalSections - 1 ? "is-disabled" : ""}`}
          onClick={handleDown}
          aria-label="Next Section"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </>
  );
}