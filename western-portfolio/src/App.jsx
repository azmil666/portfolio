import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import './App.css'
import LoadingScreen from "./components/LoadingScreen";
import MobileNav from "./components/MobileNav";
import MobileMenu from "./components/MobileMenu";
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler";

const SECTIONS = [
  {
    id: "hero",
    label: null,
    position: new THREE.Vector3(14.35, 2.6, 11.8),
    target: new THREE.Vector3(12.5, 3.2, 2.5),
    fov: 52,
  },
  {
    id: "about",
    label: "About Me",
    subtitle: "SHERIFF'S OFFICE",
    position: new THREE.Vector3(13.24, 1.4, -8.5),
    target: new THREE.Vector3(6.2, 2.8, -15.5),
    fov: 48,
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "THE SALOON",
    position: new THREE.Vector3(10.24, 2.6, 14.8),
    target: new THREE.Vector3(3.2, 2.8, 9.2),
    fov: 46,
  },
  {
    id: "skills",
    label: "Skills",
    subtitle: "THE BANK",
    position: new THREE.Vector3(10.67, 2.2, 1.5),
    target: new THREE.Vector3(3.0, 3.0, -3.8),
    fov: 50,
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "THE HOTEL",
    position: new THREE.Vector3(10.90, 3.0, -20),
    target: new THREE.Vector3(17.5, 3.2, -10.2),
    fov: 47,
  },
]
const CONTENT = {
  about: {
    title: "The Stranger",
    lines: [
      "Full-stack developer riding the frontier of modern web.",
      "Crafting cinematic digital experiences with React, Three.js & Node.",
      "5 years on the trail — always chasing the next horizon.",
    ],
    tags: ["React", "Three.js", "Node.js", "TypeScript"],
  },
  projects: {
    title: "Tales & Bounties",
    items: [
  {
    name: "Loomi",
    desc: "AI-powered productivity & journaling platform with clean UX and smart insights.",
    tech: "React · Node · AI",
    link: "https://github.com/azmil666/Loomi"
  },
  {
    name: "CoinStorm",
    desc: "Crypto tracking and analytics dashboard with real-time market insights.",
    tech: "JS · API · Charts",
    link: "https://github.com/azmil666/coinstorm"
  },
  {
    name: "Classroom",
    desc: "Frontend system for managing classes, students, and learning workflows.",
    tech: "React · UI",
    link: "https://github.com/azmil666/classroom-frontend"
  },
  {
    name: "Kaffa",
    desc: "Coffee-themed modern web experience with aesthetic UI and interactions.",
    tech: "HTML · CSS · JS",
    link: "https://github.com/azmil666/kaffa"
  },
],
  },
  skills: {
    title: "Tools of the Trade",
    categories: [
      { name: "Frontend", items: ["React", "Three.js / R3F", "GSAP", "HTML/CSS", "TypeScript"] },
      { name: "Backend", items: ["Node.js", "Flask", "Python", "REST APIs", "SQL"] },
      { name: "Design", items: ["Figma", "Motion Design", "3D Modeling", "UX Research"] },
      { name: "Tools", items: ["Git", "Vite", "Docker", "Linux", "VSCode"] },
    ],
  },
  contact: {
    title: "Send a Telegram",
    lines: ["Riding into a new challenge.", "Drop a line — I'll meet you at sundown."],
    links: [
  { 
    label: "azmilmohammed369@email.com", 
    icon: "✉",
    link: "mailto:azmilmohammed369@email.com"
  },
  { 
    label: "github.com/azmil666", 
    icon: "◈",
    link: "https://github.com/azmil666"
  },
  { 
    label: "linkedin.com/in/azmil-mohammed", 
    icon: "◉",
    link: "https://linkedin.com/in/azmil-mohammed"
  },
],
  },
};

// ─── EASING UTILITIES ─────────────────────────────────────────────────────────
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpV3(a, b, t) {
  return new THREE.Vector3(
    a.x + (b.x - a.x) * t,
    a.y + (b.y - a.y) * t,
    a.z + (b.z - a.z) * t
  );
}

// ─── WESTERN CITY MODEL ───────────────────────────────────────────────────────
function WesternCity() {
  const { scene } = useGLTF("/western_city.glb");

  useEffect(() => {
    scene.traverse((child) => {
      let woodTexture = null;

scene.traverse((child) => {
  if (child.isMesh && child.material?.map && !woodTexture) {
    woodTexture = child.material.map;
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(2, 2);
    console.log("WOOD TEXT FOUND", child.name);
  }
});
scene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = true;

    const applyMat = (mat) => {
      if (!mat) return;

      
      if (woodTexture) {
        mat.map = woodTexture;
        mat.needsUpdate = true;
      }

      mat.roughness = 0.75;
      mat.metalness = 0.05;
    };

    if (Array.isArray(child.material)) {
      child.material.forEach(applyMat);
    } else {
      applyMat(child.material);
    }
  }
});
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mat = child.material;
          mat.roughness = Math.min((mat.roughness || 0.5) + 0.2, 1);
          mat.metalness = Math.max((mat.metalness || 0) - 0.1, 0);
          
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// ─── FALLBACK TOWN (when GLB not loaded) ─────────────────────────────────────
function FallbackTown() {
  const buildings = [
    { pos: [-4, 2.5, 7], size: [6, 5, 5], color: "#8B7355", label: "Sheriff" },
    { pos: [10, 3.5, -30], size: [8, 7, 6], color: "#7A6248", label: "Saloon" },
    { pos: [-4, 3, -16], size: [7, 6, 5], color: "#6B5744", label: "Bank" },
    { pos: [20, 3, -31], size: [7, 6, 6], color: "#9C8B6E", label: "Hotel" },
  ];

  return (
    <group>
    
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#b8965a" roughness={0.95} />
      </mesh>

      {/* Street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.01, -10]} receiveShadow>
        <planeGeometry args={[10, 80]} />
        <meshStandardMaterial color="#c4a96a" roughness={0.9} />
      </mesh>

      {buildings.map((b, i) => (
        <group key={i} position={b.pos}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial color={b.color} roughness={0.85} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, b.size[1] / 2 + 0.8, 0]} castShadow>
            <boxGeometry args={[b.size[0] + 0.5, 1.6, b.size[2] + 0.5]} />
            <meshStandardMaterial color="#5C4A35" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Telegraph poles */}
      {[-20, -10, 0, 10, 20].map((z, i) => (
        <group key={i} position={[-16, 0, z]}>
          <mesh position={[0, 3, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.15, 6]} />
            <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── DUST PARTICLES ───────────────────────────────────────────────────────────
function DustParticles() {
  const meshRef = useRef();
  const count = 200;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.015,
      });
    }
    return [pos, vel];
  }, []);

  const posRef = useRef(positions.slice());

  useFrame(() => {
    if (!meshRef.current) return;
    const attr = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      posRef.current[i * 3] += velocities[i].x;
      posRef.current[i * 3 + 1] += velocities[i].y;
      posRef.current[i * 3 + 2] += velocities[i].z;
      if (posRef.current[i * 3 + 1] > 10) posRef.current[i * 3 + 1] = 0;
      if (posRef.current[i * 3 + 1] < 0) posRef.current[i * 3 + 1] = 8;
      if (Math.abs(posRef.current[i * 3]) > 40) posRef.current[i * 3] *= -0.9;
      if (Math.abs(posRef.current[i * 3 + 2]) > 40) posRef.current[i * 3 + 2] *= -0.9;
      attr.setXYZ(i, posRef.current[i * 3], posRef.current[i * 3 + 1], posRef.current[i * 3 + 2]);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#d4a55a" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// ─── CINEMATIC CAMERA CONTROLLER ─────────────────────────────────────────────
function CinematicCamera({ scrollProgress, onSectionChange }) {
  const { camera } = useThree();
  const currentPos = useRef(SECTIONS[0].position.clone());
  const currentTarget = useRef(SECTIONS[0].target.clone());
  const heroDrift = useRef(0);

  useEffect(() => {
    camera.position.copy(SECTIONS[0].position);
    camera.fov = SECTIONS[0].fov;
    camera.updateProjectionMatrix();
  }, [camera]);
  

  useFrame((_, delta) => {
    // console.log("CAM POS:", camera.position)
    const raw = scrollProgress.current;
    const segCount = SECTIONS.length - 1;

    const total = raw * segCount
    const segIndex = Math.min(Math.floor(total), segCount - 1)
    const segT = Math.min(1, total - segIndex)

    const eased = easeInOutCubic(segT);

    const fromSection = SECTIONS[segIndex];
    const toSection = SECTIONS[segIndex + 1] || SECTIONS[segIndex];

    const targetPos = lerpV3(fromSection.position, toSection.position, eased);
    const targetLook = lerpV3(fromSection.target, toSection.target, eased);
    const targetFov = fromSection.fov + (toSection.fov - fromSection.fov) * eased;

    // Hero breathing drift
    if (segIndex === 0 && segT < 0.05) {
      heroDrift.current += delta * 0.3;
      targetPos.x += Math.sin(heroDrift.current) * 0.15;
      targetPos.y += Math.sin(heroDrift.current * 0.7) * 0.08;
    }

    currentPos.current.lerp(targetPos, delta * 2.5);
    currentTarget.current.lerp(targetLook, delta * 2.5);

    camera.position.copy(currentPos.current);
    camera.fov += (targetFov - camera.fov) * delta * 2;
    camera.updateProjectionMatrix();
    camera.lookAt(currentTarget.current);

    // Section detection
    const newSection = Math.floor(raw * segCount);
    onSectionChange(Math.min(newSection, segCount));
  });

  return null;
}

// ─── GROUND PLANE ─────────────────────────────────────────────────────────────
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[300, 300]} />
      <meshStandardMaterial color="#c8a55e" roughness={1} metalness={0} />
    </mesh>
  );
}

// ─── SKY DOME ─────────────────────────────────────────────────────────────────
function WesternSky({ isNight }) {
  return (
    <mesh>
      <sphereGeometry args={[200, 32, 16]} />
      <meshBasicMaterial 
        color={isNight ? "#0b0f1a" : "#e8c97a"} 
        side={THREE.BackSide} 
      />
    </mesh>
  );
}

// ─── SCENE ────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress, onSectionChange }) {
  const [isNight, setIsNight] = useState(false);

useEffect(() => {
  const update = () => {
    setIsNight(document.documentElement.classList.contains("dark"));
  };

  update();

  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}, []);
  return (
    <>
      <WesternSky isNight={isNight} />
      <Ground />

      <ambientLight 
  intensity={isNight ? 0.35 : 0.6} 
  color={isNight ? "#8899ff" : "#ffd580"} 
/>
      <directionalLight
        position={[60, 40, 30]}
        intensity={1.8}
        color="#ffcc66"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <directionalLight
  position={[60, 40, 30]}
  intensity={isNight ? 0.6 : 1.8}
  color={isNight ? "#9bbcff" : "#ffcc66"}
  castShadow
/>
<directionalLight
  position={[20, 30, -20]}  
  intensity={isNight ? 1.2 : 1.8}
  color={isNight ? "#a8c5ff" : "#ffcc66"}
  castShadow
/>
<pointLight
  position={[18, 3, -12]} 
  intensity={isNight ? 1.5 : 0}
  color="#ffb347"
  distance={30}
  decay={2}
/>
<spotLight
  position={[10, 8, -18]}   
  target-position={[17, 5, -10]} 
  intensity={2}
  angle={0.4}
  penumbra={0.5}
  color="#ffd27a"
  castShadow
/>
<directionalLight
  position={[ -20, 10, -10 ]} 
  intensity={isNight ? 0.8 : 0}
  color="#6fa8ff"
/>
     <hemisphereLight 
  skyColor={isNight ? "#1a2a4f" : "#ffa050"} 
  groundColor={isNight ? "#111122" : "#c87840"} 
  intensity={isNight ? 0.3 : 0.5} 
/>
     <fog 
  attach="fog" 
  args={[isNight ? "#0a0f1f" : "#d4964a", 40, 160]} 
/>
     <Stars 
  radius={180} 
  depth={50} 
  count={isNight ? 2000 : 200} 
  factor={2} 
  fade 
  speed={0.3} 
/>

      <DustParticles />

      <Suspense fallback={<LoadingScreen /> }>
        <WesternCity />
      </Suspense>
      {/* <CameraTracker /> */}
      {/* <OrbitControls /> */}
      <CinematicCamera scrollProgress={scrollProgress} onSectionChange={onSectionChange} />
    </>
  );
}
function CameraTracker() {
  const { camera } = useThree()

  useFrame(() => {
    window.__R3F_CAMERA__ = camera
  })

  return null
}
// ─── SECTION PANEL ────────────────────────────────────────────────────────────
function SectionPanel({ sectionId, visible, onClose }) {
  const content = CONTENT[sectionId];
  if (!content || !visible) return null;

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="panel-card" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={onClose}>✕</button>

        {sectionId === "about" && (
          <>
            <div className="panel-eyebrow">Sheriff's Office · About Me</div>
            <h2 className="panel-title">{content.title}</h2>
            <div className="panel-divider" />
            {content.lines.map((l, i) => (
              <p key={i} className="panel-body">{l}</p>
            ))}
            <div className="panel-tags">
              {content.tags.map((t) => <span key={t} className="panel-tag">{t}</span>)}
            </div>
          </>
        )}

        {sectionId === "projects" && (
          <>
            <div className="panel-eyebrow">The Saloon · Projects</div>
            <h2 className="panel-title">{content.title}</h2>
            <div className="panel-divider" />
            <div className="projects-grid">
              {content.items.map((p, i) => (
                <a 
                  key={i}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                >
                  <div className="project-num">0{i + 1}</div>
                  <div className="project-name">{p.name}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tech">{p.tech}</div>
                </a>
              ))}
              <div className="projects-more">
  <a 
    href="https://github.com/azmil666"
    target="_blank"
    rel="noopener noreferrer"
    className="more-btn"
  >
    View All on GitHub →
  </a>
</div>
            </div>
          </>
        )}

        {sectionId === "skills" && (
          <>
            <div className="panel-eyebrow">The Bank · Skills</div>
            <h2 className="panel-title">{content.title}</h2>
            <div className="panel-divider" />
            <div className="skills-grid">
              {content.categories.map((cat) => (
                <div key={cat.name} className="skill-category">
                  <div className="skill-cat-name">{cat.name}</div>
                  {cat.items.map((s) => (
                    <div key={s} className="skill-item">{s}</div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {sectionId === "contact" && (
          <>
            <div className="panel-eyebrow">The Hotel · Contact</div>
            <h2 className="panel-title">{content.title}</h2>
            <div className="panel-divider" />
            {content.lines.map((l, i) => (
              <p key={i} className="panel-body">{l}</p>
            ))}
            <div className="contact-links">
              {content.links.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <span className="contact-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── HUD NAVIGATION ───────────────────────────────────────────────────────────
function HUD({ currentSection, onNavClick }) {
  const navItems = [
    { idx: 1, label: "About", id: "about" },
    { idx: 2, label: "Projects", id: "projects" },
    { idx: 3, label: "Skills", id: "skills" },
    { idx: 4, label: "Contact", id: "contact" },
  ];

  return (
    <div className="hud">
      <div className="hud-brand">
        <span className="hud-star">
  <span className="hud-star cowboy-icon"></span>
</span>
        <span className="hud-name">AZMIL</span>
      </div>
      <nav className="hud-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`hud-nav-btn ${currentSection === item.idx ? "active" : ""}`}
            onClick={() => onNavClick(item.idx)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ─── SCROLL HINT ──────────────────────────────────────────────────────────────
function ScrollHint({ visible }) {
  return (
    <div className={`scroll-hint ${visible ? "visible" : ""}`}>
      <div className="scroll-horse">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M12 19L6 13M12 19L18 13"
      stroke="#f0d080"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>
      <span>Ride on down</span>
    </div>
  );
}

// ─── SECTION TITLE OVERLAY ────────────────────────────────────────────────────
function SectionTitle({ currentSection }) {
  const section = SECTIONS[currentSection];
  if (!section || !section.label) return null;

  return (
    <div className="section-title-wrap" key={section.id}>
      <div className="section-eyebrow">{section.subtitle}</div>
      <h1 className="section-heading">{section.label}</h1>
      <div className="section-line" />
    </div>
  );
}

// ─── CLICKABLE BUILDING HINTS ─────────────────────────────────────────────────
function BuildingHint({ currentSection, onOpen }) {
  if (currentSection === 0) return null;
  const section = SECTIONS[currentSection];
  const sectionMap = { 1: "about", 2: "projects", 3: "skills", 4: "contact" };
  const id = sectionMap[currentSection];
  if (!id) return null;

  return (
    <button className="building-hint" onClick={() => onOpen(id)}>
      <span className="hint-bracket">[</span>
      <span>Enter {section.subtitle}</span>
      <span className="hint-bracket">]</span>
    </button>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ currentSection }) {
  const pct = (currentSection / (SECTIONS.length - 1)) * 100;
  return (
    <div className="progress-wrap">
      {SECTIONS.slice(1).map((s, i) => (
        <div key={s.id} className={`progress-dot ${currentSection >= i + 1 ? "active" : ""}`} />
      ))}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const scrollProgress = useRef(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [openPanel, setOpenPanel] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  

  useEffect(() => {
    const handleWheel = (e) => {
      if (openPanel) return;
      scrollProgress.current = Math.min(
        1,
        Math.max(0, scrollProgress.current + e.deltaY * 0.00015)
      );
      setShowHint(false);
    };

    const handleTouch = (() => {
  let lastY = null;

  return (e) => {
    if (openPanel) return;

    if (!e.touches || e.touches.length === 0) {
      lastY = null;
      return;
    }

    const y = e.touches[0].clientY;

    if (lastY !== null) {
      const dy = lastY - y;
      scrollProgress.current = Math.min(
        1,
        Math.max(0, scrollProgress.current + dy * 0.0012)
      );
      setShowHint(false);
    }

    lastY = y;
  };
})();

    const el = containerRef.current;
    el.addEventListener("wheel", handleWheel, { passive: true });
    el.addEventListener("touchmove", handleTouch, { passive: true });
    el.addEventListener("touchend", handleTouch);
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchmove", handleTouch);
      el.removeEventListener("touchend", handleTouch);
    };
  }, [openPanel]);

  const handleNavClick = (idx) => {
    scrollProgress.current = idx / (SECTIONS.length - 1);
  };
  function CameraDebuggerDOM() {
  const [data, setData] = useState({
    pos: [0, 0, 0],
    look: [0, 0, 0],
  })

  useEffect(() => {
    let raf

    const update = () => {
      const cam = window.__R3F_CAMERA__
      if (cam) {
        const dir = new THREE.Vector3()
        cam.getWorldDirection(dir)

        const lookTarget = cam.position.clone().add(dir.multiplyScalar(10))

        setData({
          pos: [
            cam.position.x.toFixed(2),
            cam.position.y.toFixed(2),
            cam.position.z.toFixed(2),
          ],
          look: [
            lookTarget.x.toFixed(2),
            lookTarget.y.toFixed(2),
            lookTarget.z.toFixed(2),
          ],
        })
      }

      raf = requestAnimationFrame(update)
    }

    update()
    return () => cancelAnimationFrame(raf)
  }, [])

  const copy = () => {
    const text = `
position: new THREE.Vector3(${data.pos.join(", ")}),
target: new THREE.Vector3(${data.look.join(", ")})
`
    navigator.clipboard.writeText(text)
    alert("Copied 🚀")
  }

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      left: "20px",
      zIndex: 999999,
      background: "rgba(0,0,0,0.85)",
      color: "#f0d080",
      padding: "14px",
      fontFamily: "monospace",
      fontSize: "12px",
      border: "1px solid #d4a030",
      minWidth: "200px"
    }}>
      <div><b>CAMERA</b></div>

      <div style={{ marginTop: "6px" }}>POS</div>
      <div>X: {data.pos[0]}</div>
      <div>Y: {data.pos[1]}</div>
      <div>Z: {data.pos[2]}</div>

      <div style={{ marginTop: "8px" }}>LOOK</div>
      <div>X: {data.look[0]}</div>
      <div>Y: {data.look[1]}</div>
      <div>Z: {data.look[2]}</div>

      <button onClick={copy} style={{
        marginTop: "10px",
        width: "100%",
        background: "#d4a030",
        border: "none",
        padding: "6px",
        cursor: "pointer",
        fontWeight: "bold"
      }}>
        COPY
      </button>
    </div>
  )
}

  return (
    <div ref={containerRef} className="app-root">
      <Canvas
        shadows
        camera={{ position: SECTIONS[0].position.toArray(), fov: 55, near: 0.1, far: 400 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#c8883a" }}
      >
        <Scene scrollProgress={scrollProgress} onSectionChange={setCurrentSection} />
      </Canvas>
      {/* <CameraDebuggerDOM /> */}

      <HUD currentSection={currentSection} onNavClick={handleNavClick} />
      
      <MobileMenu 
  onNavClick={handleNavClick} 
  setMenuOpen={setMenuOpen}
/>
      {!openPanel && !menuOpen && (
  <MobileNav 
    onNavClick={handleNavClick} 
    currentSection={currentSection}
  />
)}
<AnimatedThemeToggler className="theme-toggle" />
      <SectionTitle currentSection={currentSection} />
      <BuildingHint currentSection={currentSection} onOpen={setOpenPanel} />
      <ProgressBar currentSection={currentSection} />
      <ScrollHint visible={showHint} />

      <SectionPanel
        sectionId={openPanel}
        visible={!!openPanel}
        onClose={() => setOpenPanel(null)}
      />

      
    </div>
  );
}