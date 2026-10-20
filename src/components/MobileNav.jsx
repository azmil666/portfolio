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
          @keyframes hudEntrance {
            0% { opacity: 0; transform: translateY(-50%) translateX(40px); }
            100% { opacity: 1; transform: translateY(-50%) translateX(0); }
          }

          /* Section Change  */
          @keyframes pulseTrack {
            0% { background: #d4a030; box-shadow: 0 0 8px rgba(212, 160, 48, 0.4); }
            100% { background: #0a0502; box-shadow: inset 0 2px 4px rgba(0,0,0,0.9); }
          }

          /* HUD Container  */
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
            
            background: linear-gradient(180deg, #2b1d12 0%, #110a05 100%);
            border: 2px solid #3a2615;
            box-shadow: 
              0 8px 24px rgba(0, 0, 0, 0.8),
              inset 0 2px 4px rgba(255, 255, 255, 0.05),
              inset 0 -4px 8px rgba(0, 0, 0, 0.8);
              
            animation: hudEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .hud-rail {
            position: absolute;
            top: 54px;
            bottom: 54px;
            width: 6px;
            background: #0a0502;
            border-radius: 4px;
            z-index: 1;
            box-shadow: inset 0 2px 6px rgba(0,0,0,1), 0 1px 0 rgba(255,255,255,0.05);
          }

          .hud-rail.is-pulsing {
            animation: pulseTrack 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .hud-btn {
            position: relative;
            z-index: 2;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(180deg, #5c3a21 0%, #3b2210 100%);
            border: 1px solid #1a0f07;
            color: #b39b78; 
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            outline: none;
            -webkit-tap-highlight-color: transparent;
            
            /* 3D Thickness & Beveling */
            box-shadow: 
              inset 0 1px 1px rgba(255, 255, 255, 0.15), 
              inset 0 -2px 4px rgba(0, 0, 0, 0.5),       
              0 4px 0 #1f1006,                           
              0 6px 12px rgba(0, 0, 0, 0.7);
            transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          /* Micro-interactions: Hover */
          @media (hover: hover) {
            .hud-btn:hover:not(.is-disabled) {
              color: #fada80;
              background: linear-gradient(180deg, #6d4629 0%, #472b15 100%);
              box-shadow: 
                inset 0 1px 2px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.6),
                0 4px 0 #1f1006,                          
                0 8px 15px rgba(0, 0, 0, 0.9);
            }
          }

          .hud-btn:active:not(.is-disabled) {
            transform: translateY(4px);
            background: linear-gradient(180deg, #3b2210 0%, #2b1d12 100%);
            box-shadow: 
              inset 0 4px 8px rgba(0, 0, 0, 0.9),       
              0 0 0 #1f1006,                            
              0 2px 4px rgba(0, 0, 0, 0.8);
            color: #d4a030;
          }

          .hud-btn.is-disabled {
            opacity: 0.6;
            cursor: default;
            pointer-events: none;
            background: #1a0f07;
            color: #3b2210;
            box-shadow: inset 0 2px 6px rgba(0,0,0,0.9);
            transform: translateY(4px);
          }

          /* SVG Icon Styling */
          .hud-btn svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            transition: all 0.2s ease;
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