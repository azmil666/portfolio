import { CONTENT } from "../../data/content";
import AboutView from "./AboutView";
import ProjectsView from "./ProjectsView";
import SkillsView from "./SkillsView";
import ContactView from "./ContactView";

export default function SectionPanel({ sectionId, visible, onClose }) {
  const content = CONTENT[sectionId];
  if (!content || !visible) return null;

  let View = null;

  if (sectionId === "about") View = AboutView;
  if (sectionId === "projects") View = ProjectsView;
  if (sectionId === "skills") View = SkillsView;
  if (sectionId === "contact") View = ContactView;

  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="panel-card" onClick={(e) => e.stopPropagation()}>
        <div className="panel-border-frame"> 
          <button className="panel-close" onClick={onClose} aria-label="Close Panel">
            <span className="close-icon">✕</span>
          </button>
          <div className="panel-scroll-area">
            <View content={content} />
          </div>
          
        </div>
      </div>
    </div>
  );
}