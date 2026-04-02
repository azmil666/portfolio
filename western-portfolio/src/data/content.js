import GithubIcon from "../components/icons/GithubIcon";
import LinkedinIcon from "../components/icons/LinkedinIcon";
import MailFilledIcon from "../components/icons/MailFilledIcon";

export const CONTENT = {
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
  {
    name: "Loomi",
    desc: "AI-powered productivity & journaling platform with clean UX and smart insights.",
    tech: "React · Node · AI",
    link: "https://github.com/azmil666/Loomi"
  },
  {
    name: "CoinStorm",
    desc: "Crypto tracking and analytics dashboard with real-time market insights.",
    tech: "JS · API · Charts",
    link: "https://github.com/azmil666/coinstorm"
  },
  {
    name: "Classroom",
    desc: "Frontend system for managing classes, students, and learning workflows.",
    tech: "React · UI",
    link: "https://github.com/azmil666/classroom-frontend"
  },
  {
    name: "Kaffa",
    desc: "Coffee-themed modern web experience with aesthetic UI and interactions.",
    tech: "HTML · CSS · JS",
    link: "https://github.com/azmil666/kaffa"
  },
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
  { 
    label: "azmilmohammed369@email.com", 
    icon: MailFilledIcon,
    link: "mailto:azmilmohammed369@email.com"
  },
  { 
    label: "github.com/azmil666", 
    icon: GithubIcon,
    link: "https://github.com/azmil666"
  },
  { 
    label: "linkedin.com/in/azmil-mohammed", 
    icon: LinkedinIcon,
    link: "https://linkedin.com/in/azmil-mohammed"
  },
],
  },
};
