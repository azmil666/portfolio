import { useState, useEffect, useRef } from "react";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPython,
  SiC,
  SiSvelte,
  SiFigma,
  SiLinux,
  SiGit,
  SiCss,
} from "react-icons/si";

const SKILLS = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "FastAPI", icon: SiFastapi },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "Python", icon: SiPython },
  { name: "C", icon: SiC },
  { name: "Svelte", icon: SiSvelte },
  { name: "SvelteKit", icon: SiSvelte },
  { name: "Figma", icon: SiFigma },
  { name: "Linux", icon: SiLinux },
  { name: "Git", icon: SiGit },
];

const styleTag = `
  @font-face {
    font-family: 'DjangoFont';
    src: url('/fonts/django-font.woff2') format('woff2'),
         url('/fonts/django-font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
      box-shadow: 0px 0px 0px rgba(198, 161, 91, 0);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      box-shadow: 4px 4px 0px rgba(198, 161, 91, 0.5); 
    }
  }

  .skills-pill-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    justify-content: flex-start; 
    width: 100%;
    padding-top: 1rem;
  }

  /* ── Pill card ── */
  .skill-pill {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.4rem;
    border-radius: 999px;
    border: 2px solid rgba(198, 161, 91, 0.8); 
    background: rgba(198, 161, 91, 0.05);
    cursor: default;
    
    /* Set initial state for animation */
    opacity: 0; 
    transform: translateY(20px) scale(0.9);
    
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .skills-pill-container.is-visible .skill-pill {
    /* The cubic-bezier creates a subtle premium "overshoot" or bounce effect */
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  /* Hover & Interaction */
  @media (hover: hover) {
    .skills-pill-container.is-visible .skill-pill:hover {
      transform: translate(2px, 2px) scale(1);
      box-shadow: 2px 2px 0px rgba(198, 161, 91, 0.8);
      background: rgba(198, 161, 91, 0.1);
    }
  }

  @media (hover: none) {
    .skills-pill-container.is-visible .skill-pill:active {
      transform: translate(2px, 2px) scale(1);
      box-shadow: 2px 2px 0px rgba(198, 161, 91, 0.8);
      background: rgba(198, 161, 91, 0.12);
    }
  }

  /* Icon */
  .skill-icon {
    font-size: 1.1rem;
    color: #c6a15b;
  }

  /* Label */
  .skill-label {
    font-family: 'Cinzel', serif; 
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #c6a15b;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* Mobile tightening */
  @media (max-width: 480px) {
    .skills-pill-container {
      gap: 0.8rem;
      justify-content: center; 
    }
    .skill-pill {
      padding: 0.5rem 1.1rem;
      border-width: 1.5px;
    }
    @keyframes popInMobile {
      0% { opacity: 0; transform: translateY(15px) scale(0.9); box-shadow: 0 0 0 transparent; }
      100% { opacity: 1; transform: translateY(0) scale(1); box-shadow: 3px 3px 0px rgba(198, 161, 91, 0.5); }
    }
    .skills-pill-container.is-visible .skill-pill {
      animation: popInMobile 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .skill-icon {
      font-size: 1rem;
    }
    .skill-label {
      font-size: 0.7rem;
    }
  }
`;

export default function SkillsView() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styleTag}</style>

      <div className="panel-eyebrow">Skills</div>
      <h2 className="panel-title">What I Work With</h2>
      <div className="panel-divider" />

      <div 
        ref={containerRef} 
        className={`skills-pill-container ${isVisible ? 'is-visible' : ''}`}
      >
        {SKILLS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.name} 
              className="skill-pill"
              style={{ animationDelay: `${index * 0.05}s` }} 
            >
              {Icon && <Icon className="skill-icon" />}
              <span className="skill-label">{item.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}