import { LinkPreview } from "../ui/link-preview";

export default function ProjectsView({ content }) {
  return (
    <>
      <div className="panel-eyebrow">Projects</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />

      
<div className="projects-grid">
  {content.items.map((p, i) => (
    <div
      key={i}
      className="project-card"
      style={{ position: "relative" }}
    >
      <LinkPreview
        url={p.live || p.github}
        imageSrc={p.preview}
        isStatic
      >
        <div
          className="project-content"
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            window.open(
              p.live || p.github,
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          <div className="project-num">
            0{i + 1}
          </div>

          <div className="project-name">
            {p.name}
          </div>

          <div className="project-desc">
            {p.desc}
          </div>

          <div className="project-tech">
            {p.tech}
          </div>
        </div>
      </LinkPreview>

      <div
        style={{
          marginTop: "12px",
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={() =>
            window.open(
              p.github,
              "_blank",
              "noopener,noreferrer"
            )
          }
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "10px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            padding: "6px 12px",
            borderRadius: "3px",
            color: "#cfcfcf",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (window.innerWidth <= 768) return;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.4)";
            e.currentTarget.style.background =
              "rgba(255,255,255,0.12)";
            e.currentTarget.style.transform =
              "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            if (window.innerWidth <= 768) return;
            e.currentTarget.style.color = "#cfcfcf";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.2)";
            e.currentTarget.style.background =
              "rgba(255,255,255,0.05)";
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          View Code
        </button>
      </div>
    </div>
  ))}
</div>

      <div className="projects-more">
        <a 
          href="https://github.com/azmil666"
          target="_blank"
          rel="noopener noreferrer"
          className="more-btn"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#fada80",
            textDecoration: "none",

            padding: "12px 28px",
            borderRadius: "4px",
            border: "1px solid #1a0f07",

            background: "linear-gradient(180deg, #5c3a21 0%, #3b2210 100%)",

            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.15),
              inset 0 -2px 4px rgba(0,0,0,0.5),
              0 6px 0 #1f1006,
              0 10px 20px rgba(0,0,0,0.7)
            `,

            display: "inline-block",
            transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.background = "linear-gradient(180deg, #6d4629 0%, #472b15 100%)";
            e.target.style.boxShadow = `
              inset 0 1px 2px rgba(255,255,255,0.3),
              inset 0 -2px 4px rgba(0,0,0,0.6),
              0 8px 0 #1f1006,
              0 16px 25px rgba(0,0,0,0.9)
            `;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.background = "linear-gradient(180deg, #5c3a21 0%, #3b2210 100%)";
            e.target.style.boxShadow = `
              inset 0 1px 1px rgba(255,255,255,0.15),
              inset 0 -2px 4px rgba(0,0,0,0.5),
              0 6px 0 #1f1006,
              0 10px 20px rgba(0,0,0,0.7)
            `;
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(6px)";
            e.target.style.boxShadow = `
              inset 0 4px 8px rgba(0,0,0,0.9),
              0 0 0 #1f1006,
              0 2px 5px rgba(0,0,0,0.8)
            `;
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(-2px)";
          }}
        >
          View All on GitHub →
        </a>
      </div>
    </>
  );
}