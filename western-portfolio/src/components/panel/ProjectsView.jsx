export default function ProjectsView({ content }) {
  return (
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
  );
}