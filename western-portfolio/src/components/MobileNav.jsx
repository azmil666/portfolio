export default function MobileNav({ onNavClick, currentSection }) {
  return (
    <div className="mobile-nav">
      <button
        onClick={() => onNavClick(Math.max(0, currentSection - 1))}
      >
        ↑
      </button>

      <button
        onClick={() => onNavClick(Math.min(4, currentSection + 1))}
      >
        ↓
      </button>
    </div>
  );
}