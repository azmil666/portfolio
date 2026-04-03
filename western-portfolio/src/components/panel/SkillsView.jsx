export default function SkillsView({ content }) {
  return (
    <>
      <div className="panel-eyebrow">Skills</div>
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
  );
}