import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import "./Loading.css";

export default function LoadingScreen() {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    
    if (!active && progress >= 100) {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 500); 
      
   
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 1300); 

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [active, progress]);

  if (!visible) return null;

  return (
    <div className={`loading-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="neoleaf-container">
        
        <div className="text-wrapper">
    
          <h1 className="text-bg">LOADING TOWN</h1>
        
          <h1
            className="text-fill"
            style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
          >
            LOADING TOWN
          </h1>
        </div>

        <div className="progress-bar-container">
          <span className="loading-label">Saddling up...</span>
          <span className="loading-percentage">{progress.toFixed(0)}%</span>
        </div>
        
      </div>
    </div>
  );
}