export default function ContactView({ content }) {
  return (
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
  );
}