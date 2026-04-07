export default function AboutView({ content }) {
  return (
    <>
      <div className="panel-eyebrow">About Me</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />

      {content.lines.map((l, i) => (
        <p key={i} className="panel-body">{l}</p>
      ))}

      {/* <div className="panel-tags">
        {content.tags.map((t) => (
          <span key={t} className="panel-tag">{t}</span>
        ))}
      </div> */}
    </>
  );
}