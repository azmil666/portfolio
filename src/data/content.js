import GithubIcon from "../components/icons/GithubIcon";
import LinkedinIcon from "../components/icons/LinkedinIcon";
import MailFilledIcon from "../components/icons/MailFilledIcon";

export const CONTENT = {
  about: {
  title: "The Builder",
  lines: [
    "I build interactive web experiences that are clean, useful, and feel great to use.",
    "Mostly working across React, Node, and Python — from UI to backend logic.",
    "I focus on turning simple ideas into polished, interactive experiences with attention to detail.",
    "Still learning, still building — always trying to make the next project better than the last."
  ],
  tags: ["React", "Node.js", "Python", "TypeScript", "UI/UX"],
},
  
projects: {
  title: "Tales & Bounties",
  items: [
    {
      name: "Loomi",
      desc: "AI-powered productivity & journaling platform with clean UX and smart insights.",
      tech: "React · Node.js · Express · Sharp · FastAPI · ML",
      github: "https://github.com/azmil666/Loomi",
      live: "https://loomi-blush.vercel.app",
      preview: "/previews/loomi.webp"
    },
    {
      name: "CoinStorm",
      desc: "Crypto tracking and analytics dashboard with real-time market insights.",
      tech: "Next.js · TypeScript · CoinGecko API · Charts",
      github: "https://github.com/azmil666/coinstorm",
      live: "https://coinstorm.vercel.app",
      preview: "/previews/coinstorm.webp"
    },
    {
      name: "Neuro-drive",
      desc: "Self-driving car simulation with a neural network that learns and evolves in real time directly in the browser.",
      tech: "HTML · CSS · JavaScript · AI · Neural Network",
      github: "https://github.com/azmil666/neuro-drive",
      live: "https://neuro-drive-zeta.vercel.app",
      preview: "/previews/neuro-drive.webp"
    },
    {
      name: "LeaveFlow",
      desc: "Role-based leave management app with employee submissions and manager approvals with Supabase authentication.",
      tech: "Flutter · Dart · Supabase · PostgreSQL",
      github: "https://github.com/azmil666/leave_application",
      live: "https://leaveapplication-chi.vercel.app",
      preview: "/previews/leaveflow.webp"
    },
  ],
},

  skills: {
  title: "What I Work With",
  categories: [
    {
      name: "Core Stack",
      items: ["React", "Three.js (R3F)", "TypeScript", "Node.js", "Python"]
    },
    {
      name: "Frontend",
      items: ["HTML/CSS", "GSAP", "Tailwind", "Responsive Design"]
    },
    {
      name: "Backend",
      items: ["Express", "Flask", "FastAPI", "REST APIs"]
    },
    {
      name: "Database",
      items: ["PostgreSQL", "MongoDB", "SQL"]
    },
    {
      name: "Design",
      items: ["Figma", "UI Design", "Interaction Design"]
    },
    {
      name: "Also Worked With",
      items: ["Svelte", "SvelteKit", "Vue", "Next.js", "Flutter"]
    },
    {
      name: "Tools",
      items: ["Git", "Docker", "Linux", "Vite"]
    }
  ]
},
  contact: {
    title: "Send a Telegram",
    lines: ["Always ready for the next challenge.", "Drop a line — I'll meet you at sundown."],
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
