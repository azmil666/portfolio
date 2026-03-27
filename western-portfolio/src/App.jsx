import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

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
    position: new THREE.Vector3(10.90, 3.0, -14.5),
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
      { name: "MedCore HMS", desc: "Full-stack hospital management system", tech: "Flask · SQLite · JS" },
      { name: "NextGen Studio", desc: "Multi-page agency site with editorial design", tech: "HTML · CSS · GSAP" },
      { name: "Luminary SaaS", desc: "Dark mode particle-network landing page", tech: "Vanilla JS · Canvas" },
      { name: "Western Portfolio", desc: "Cinematic 3D scroll-driven portfolio", tech: "R3F · Three.js · React" },
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
      { label: "azmil@email.com", icon: "✉" },
      { label: "github.com/azmil", icon: "◈" },
      { label: "linkedin.com/in/azmil", icon: "◉" },
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
      {/* Ground */}
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
    console.log("CAM POS:", camera.position)
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
function WesternSky() {
  return (
    <mesh>
      <sphereGeometry args={[200, 32, 16]} />
      <meshBasicMaterial color="#e8c97a" side={THREE.BackSide} />
    </mesh>
  );
}

// ─── SCENE ────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress, onSectionChange }) {
  return (
    <>
      <WesternSky />
      <Ground />

      <ambientLight intensity={0.6} color="#ffd580" />
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
      <directionalLight position={[-30, 20, -20]} intensity={0.4} color="#ff9944" />
      <hemisphereLight skyColor="#ffa050" groundColor="#c87840" intensity={0.5} />

      <fog attach="fog" args={["#d4964a", 40, 160]} />
      <Stars radius={180} depth={50} count={1200} factor={2} fade speed={0.3} />

      <DustParticles />

      <Suspense fallback={<FallbackTown />}>
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
                <div key={i} className="project-card">
                  <div className="project-num">0{i + 1}</div>
                  <div className="project-name">{p.name}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tech">{p.tech}</div>
                </div>
              ))}
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
                <a key={link.label} href="#" className="contact-link">
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
        <span className="hud-star">★</span>
        <span className="hud-name">AZMIL</span>
        <span className="hud-title">DEV</span>
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
      <div className="scroll-horse">⬇</div>
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
        const y = e.touches[0].clientY;
        if (lastY !== null) {
          const dy = lastY - y;
          scrollProgress.current = Math.min(
            1,
            Math.max(0, scrollProgress.current + dy * 0.002)
          );
          setShowHint(false);
        }
        lastY = y;
        if (e.type === "touchend") lastY = null;
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
      <SectionTitle currentSection={currentSection} />
      <BuildingHint currentSection={currentSection} onOpen={setOpenPanel} />
      <ProgressBar currentSection={currentSection} />
      <ScrollHint visible={showHint} />

      <SectionPanel
        sectionId={openPanel}
        visible={!!openPanel}
        onClose={() => setOpenPanel(null)}
      />

      <style>{CSS}</style>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rye&family=Cinzel:wght@400;600&family=IM+Fell+English:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app-root {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: #2a1a0a;
    cursor: crosshair;
  }

  /* ── HUD ── */
  .hud {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 36px;
    background: linear-gradient(to bottom, rgba(20,10,2,0.75) 0%, transparent 100%);
  }

  .hud-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hud-star {
    color: #d4a030;
    font-size: 18px;
    text-shadow: 0 0 12px rgba(212,160,48,0.6);
  }

  .hud-name {
    font-family: 'Rye', serif;
    font-size: 20px;
    color: #f0d080;
    letter-spacing: 4px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
  }

  .hud-title {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    color: #a07840;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .hud-nav {
    display: flex;
    gap: 8px;
  }

  .hud-nav-btn {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(220,190,120,0.7);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 14px;
    border-bottom: 1px solid transparent;
    transition: all 0.3s;
  }

  .hud-nav-btn:hover,
  .hud-nav-btn.active {
    color: #f0d080;
    border-bottom-color: #d4a030;
    text-shadow: 0 0 12px rgba(212,160,48,0.5);
  }

  /* ── SECTION TITLE ── */
  .section-title-wrap {
    position: fixed;
    bottom: 120px;
    left: 48px;
    z-index: 10;
    animation: fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .section-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 4px;
    color: #d4a030;
    text-transform: uppercase;
    margin-bottom: 8px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
  }

  .section-heading {
    font-family: 'Rye', serif;
    font-size: clamp(36px, 5vw, 64px);
    color: #f5e0a0;
    line-height: 1;
    text-shadow: 3px 3px 0 rgba(0,0,0,0.5), 0 0 40px rgba(212,160,48,0.3);
    letter-spacing: 2px;
  }

  .section-line {
    width: 80px;
    height: 2px;
    background: linear-gradient(to right, #d4a030, transparent);
    margin-top: 12px;
  }

  /* ── BUILDING HINT ── */
  .building-hint {
    position: fixed;
    bottom: 60px;
    left: 48px;
    z-index: 10;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    letter-spacing: 2px;
    color: rgba(220,190,100,0.9);
    background: rgba(10,5,2,0.5);
    border: 1px solid rgba(212,160,48,0.3);
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s;
    animation: fadeSlideUp 0.5s 0.3s cubic-bezier(0.16,1,0.3,1) both;
  }

  .building-hint:hover {
    background: rgba(212,160,48,0.15);
    border-color: rgba(212,160,48,0.7);
    color: #f0d080;
  }

  .hint-bracket {
    color: #d4a030;
    margin: 0 6px;
  }

  /* ── SCROLL HINT ── */
  .scroll-hint {
    position: fixed;
    bottom: 32px;
    right: 48px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
  }

  .scroll-hint.visible { opacity: 1; }

  .scroll-horse {
    animation: bounce 1.5s infinite;
    font-size: 20px;
    color: rgba(212,160,48,0.7);
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }

  .scroll-hint span {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(212,160,48,0.6);
    text-transform: uppercase;
  }

  /* ── PROGRESS ── */
  .progress-wrap {
    position: fixed;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .progress-track {
    display: none;
  }

  .progress-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(212,160,48,0.25);
    border: 1px solid rgba(212,160,48,0.3);
    transition: all 0.4s;
  }

  .progress-dot.active {
    background: #d4a030;
    box-shadow: 0 0 10px rgba(212,160,48,0.6);
    transform: scale(1.4);
  }

  /* ── PANEL OVERLAY ── */
  .panel-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(8,4,1,0.75);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 24px;
    animation: fadeIn 0.3s ease both;
    backdrop-filter: blur(4px);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .panel-card {
    position: relative;
    width: min(520px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    background: linear-gradient(160deg, #1a0e05 0%, #0d0702 100%);
    border: 1px solid rgba(212,160,48,0.3);
    border-left: 3px solid #d4a030;
    padding: 48px 44px 44px;
    animation: slideInRight 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .panel-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: 1px solid rgba(212,160,48,0.3);
    color: rgba(212,160,48,0.7);
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .panel-close:hover {
    background: rgba(212,160,48,0.15);
    color: #f0d080;
  }

  .panel-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 4px;
    color: #a07830;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .panel-title {
    font-family: 'Rye', serif;
    font-size: 32px;
    color: #f0d080;
    line-height: 1.1;
    text-shadow: 2px 2px 0 rgba(0,0,0,0.5);
    margin-bottom: 4px;
  }

  .panel-divider {
    width: 60px;
    height: 1px;
    background: rgba(212,160,48,0.4);
    margin: 20px 0;
  }

  .panel-body {
    font-family: 'IM Fell English', serif;
    font-size: 15px;
    color: rgba(220,195,140,0.85);
    line-height: 1.8;
    margin-bottom: 12px;
  }

  .panel-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
  }

  .panel-tag {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 2px;
    color: #d4a030;
    border: 1px solid rgba(212,160,48,0.35);
    padding: 5px 12px;
    text-transform: uppercase;
  }

  /* ── PROJECTS ── */
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 4px;
  }

  .project-card {
    border: 1px solid rgba(212,160,48,0.2);
    padding: 18px 16px;
    background: rgba(255,255,255,0.02);
    transition: all 0.3s;
    cursor: default;
  }

  .project-card:hover {
    background: rgba(212,160,48,0.07);
    border-color: rgba(212,160,48,0.45);
  }

  .project-num {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    color: #a07830;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }

  .project-name {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    font-weight: 600;
    color: #f0d080;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }

  .project-desc {
    font-family: 'IM Fell English', serif;
    font-size: 12px;
    color: rgba(200,170,110,0.7);
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .project-tech {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 1.5px;
    color: #a07830;
    text-transform: uppercase;
  }

  /* ── SKILLS ── */
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .skill-category {
    border-left: 2px solid rgba(212,160,48,0.3);
    padding-left: 16px;
  }

  .skill-cat-name {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 3px;
    color: #d4a030;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .skill-item {
    font-family: 'IM Fell English', serif;
    font-size: 14px;
    color: rgba(220,195,140,0.8);
    padding: 4px 0;
    border-bottom: 1px solid rgba(212,160,48,0.08);
  }

  /* ── CONTACT ── */
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: rgba(220,190,120,0.85);
    text-decoration: none;
    border: 1px solid rgba(212,160,48,0.2);
    padding: 12px 18px;
    transition: all 0.25s;
  }

  .contact-link:hover {
    background: rgba(212,160,48,0.1);
    border-color: rgba(212,160,48,0.5);
    color: #f0d080;
  }

  .contact-icon {
    color: #d4a030;
    font-size: 16px;
    width: 20px;
    text-align: center;
  }

  /* ── SCROLLBAR ── */
  .panel-card::-webkit-scrollbar { width: 4px; }
  .panel-card::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
  .panel-card::-webkit-scrollbar-thumb { background: rgba(212,160,48,0.3); border-radius: 2px; }

  /* ── VIGNETTE ── */
  .app-root::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 55%, rgba(10,5,0,0.65) 100%);
    z-index: 5;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .hud { padding: 16px 20px; }
    .hud-name { font-size: 16px; letter-spacing: 2px; }
    .hud-nav-btn { font-size: 9px; padding: 5px 8px; }
    .section-title-wrap { left: 20px; bottom: 140px; }
    .building-hint { left: 20px; bottom: 80px; font-size: 10px; padding: 8px 14px; }
    .projects-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: 1fr; }
    .panel-card { padding: 40px 24px 32px; }
    .panel-title { font-size: 26px; }
  }
`;
