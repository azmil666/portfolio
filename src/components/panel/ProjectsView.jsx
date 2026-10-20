import { LinkPreview } from "../ui/link-preview";
import { Button3D } from "../ui/Button3D";

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
        <Button3D
                onClick={() =>
                  window.open(
                    p.github,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                View Code
              </Button3D>
      </div>
    </div>
  ))}
</div>

      <div className="projects-more">
        <Button3D
          onClick={() =>
            window.open(
              "https://github.com/azmil666",
              "_blank",
              "noopener,noreferrer"
            )
          }
          style={{
            fontSize: "12px",  
            padding: "12px 28px", 
            letterSpacing: "2px",
          }}
        >
          View All on GitHub →
        </Button3D>
      </div>
    </>
  );
}