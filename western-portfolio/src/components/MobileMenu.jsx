import { useState } from "react";

export default function MobileMenu({ onNavClick }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="mobile-menu">
          <button onClick={() => onNavClick(1)}>About</button>
          <button onClick={() => onNavClick(2)}>Projects</button>
          <button onClick={() => onNavClick(3)}>Skills</button>
          <button onClick={() => onNavClick(4)}>Contact</button>
        </div>
      )}
    </>
  );
}