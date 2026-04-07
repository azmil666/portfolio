import { useState } from "react";
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
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "FastAPI", icon: SiFastapi },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "Python", icon: SiPython },
      { name: "C", icon: SiC },
    ],
  },
  {
    title: "Also Worked With",
    items: [
      { name: "Svelte", icon: SiSvelte },
      { name: "SvelteKit", icon: SiSvelte },
    ],
  },
  {
    title: "Design & Tools",
    items: [
      { name: "Figma", icon: SiFigma },
      { name: "Linux", icon: SiLinux },
      { name: "Git", icon: SiGit },
    ],
  },
];

// --- Injected styles ---
// --- Injected styles ---
const styleTag = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

  /* Base layout (Mobile) */
  .skills-inventory {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    width: 100%;
  }

  /* ── Category title ── */
  .inventory-category-title {
    font-family: 'Cinzel', 'Rye', serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c6a15b;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    padding-bottom: 6px;
  }
  .inventory-category-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 0%;
    background: linear-gradient(90deg, #c6a15b, transparent);
    transition: width 0.45s ease;
  }
  .inventory-category:hover .inventory-category-title::after {
    width: 100%;
  }

  /* ── Grid ── */
  .inventory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
    gap: 0.75rem;
  }

  /* ── Skill card ── */
  .inventory-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 1rem 0.5rem 0.85rem;
    border-radius: 8px;
    border: 1px solid rgba(198, 161, 91, 0.14);
    background: rgba(198, 161, 91, 0.03);
    cursor: default;
    overflow: hidden;
    transition:
      transform 0.25s ease,
      border-color 0.25s ease,
      background 0.25s ease,
      box-shadow 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }

  /* Radial spotlight overlay */
  .inventory-item::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: radial-gradient(circle at 50% 0%, rgba(198, 161, 91, 0.09) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  /* Hover — desktop */
  @media (hover: hover) {
    .inventory-item:hover {
      transform: translateY(-4px) scale(1.04);
      border-color: rgba(198, 161, 91, 0.55);
      background: rgba(198, 161, 91, 0.07);
      box-shadow:
        0 0 12px rgba(198, 161, 91, 0.18),
        0 6px 24px rgba(0, 0, 0, 0.35);
    }
    .inventory-item:hover::before {
      opacity: 1;
    }
    .inventory-item:hover .inventory-icon {
      color: #e7c98b;
      filter: drop-shadow(0 0 6px rgba(231, 201, 139, 0.5));
    }
    .inventory-item:hover .inventory-label {
      color: #e7c98b;
    }
  }

  /* Tap feedback — mobile */
  @media (hover: none) {
    .inventory-item:active {
      transform: scale(0.95);
      border-color: rgba(198, 161, 91, 0.4);
      background: rgba(198, 161, 91, 0.08);
    }
  }

  /* Icon */
  .inventory-icon {
    font-size: 1.6rem;
    color: rgba(198, 161, 91, 0.7);
    transition: color 0.25s ease, filter 0.25s ease;
    flex-shrink: 0;
  }

  /* Label */
  .inventory-label {
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: rgba(198, 161, 91, 0.55);
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    transition: color 0.25s ease;
  }

  /* Mobile grid tightening */
  @media (max-width: 480px) {
    .inventory-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.6rem;
    }
    .inventory-item {
      padding: 0.85rem 0.4rem 0.7rem;
    }
    .inventory-icon {
      font-size: 1.35rem;
    }
    .inventory-label {
      font-size: 0.52rem;
    }
  }

  /* Tablet (2 Columns) */
  @media (min-width: 481px) and (max-width: 1023px) {
    .skills-inventory {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem 1.5rem;
      align-items: start; /* Prevents uneven vertical stretching */
    }
    .inventory-grid {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
  }

  /* Wide desktop (3 Columns to prevent scrolling) */
  @media (min-width: 1024px) {
    .skills-inventory {
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem 2rem;
      align-items: start;
    }
    .inventory-grid {
      grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
      gap: 0.85rem;
    }
  }
`;

export default function SkillsView() {
  return (
    <>
      <style>{styleTag}</style>

      <div className="panel-eyebrow">Skills</div>
      <h2 className="panel-title">What I Work With</h2>
      <div className="panel-divider" />

      <div className="skills-inventory">
        {SKILLS.map((category) => (
          <div key={category.title} className="inventory-category">
            <div className="inventory-category-title">{category.title}</div>
            <div className="inventory-grid">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="inventory-item">
                    <Icon className="inventory-icon" />
                    <span className="inventory-label">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}