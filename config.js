// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE. Everything on the site is generated from it.
// ─────────────────────────────────────────────────────────────
window.PORTFOLIO = {
  name: "Sumit Dhiman",
  handle: "sumit",          // shown as the shell user: sumit@portfolio
  hostname: "portfolio",
  role: "Software Engineer",
  location: "Earth, Sol System",
  editor: "nvim",
  tagline: "I build things that run in terminals, browsers and occasionally production.",

  // Rendered as ~/about.md (shown in the nvim window). Lines starting with # are headings, - are list items.
  about: [
    "# Hey, I'm Sumit 👋",
    "",
    "Software engineer who likes shipping fast, reading stack traces,",
    "and making computers do slightly unreasonable things.",
    "",
    "## What I do",
    "- Backend systems, APIs and distributed services",
    "- Smart contracts and on-chain infrastructure",
    "- DevOps: CI/CD, containers, cloud, observability",
    "",
    "## Currently",
    "- Building cool stuff (edit config.js to say what)",
    "",
    "## Outside the terminal",
    "- Coffee, side projects, trading experiments",
  ],

  // Shown as live htop bars. level = 0..100
  skills: [
    { name: "TypeScript", level: 92 },
    { name: "Go", level: 85 },
    { name: "Rust", level: 78 },
    { name: "Solidity", level: 80 },
    { name: "Python", level: 75 },
    { name: "Docker/K8s", level: 82 },
    { name: "PostgreSQL", level: 80 },
    { name: "Linux", level: 90 },
  ],
  stack: ["TypeScript", "Go", "Rust", "Solidity", "Docker", "AWS", "Postgres", "Redis"],

  // slug becomes ~/projects/<slug>.md. url / repo are optional.
  projects: [
    {
      name: "Project One",
      slug: "project-one",
      year: 2026,
      stars: 128,
      desc: "A short punchy description of what this does and why it is cool.",
      tech: ["Go", "Postgres", "Docker"],
      url: "",
      repo: "https://github.com/your-username/project-one",
    },
    {
      name: "Project Two",
      slug: "project-two",
      year: 2026,
      stars: 64,
      desc: "Another thing you built. Mention scale, users, or something impressive.",
      tech: ["TypeScript", "React", "Node"],
      url: "https://example.com",
      repo: "",
    },
    {
      name: "Project Three",
      slug: "project-three",
      year: 2025,
      stars: 42,
      desc: "Smart contracts, trading bots, CLI tools… whatever you're proud of.",
      tech: ["Rust", "Solidity"],
      url: "",
      repo: "https://github.com/your-username/project-three",
    },
  ],

  // Newest first. Rendered as `git log`.
  experience: [
    { date: "2024 — now", role: "Software Engineer", org: "Current Company", note: "What you shipped / owned there." },
    { date: "2022 — 2024", role: "Backend Developer", org: "Previous Company", note: "Something impressive with a number in it." },
    { date: "2020 — 2022", role: "Developer", org: "First Gig", note: "Where it all started." },
  ],

  contact: [
    { label: "github", text: "github.com/your-username", url: "https://github.com/your-username" },
    { label: "linkedin", text: "linkedin.com/in/your-username", url: "https://linkedin.com/in/your-username" },
    { label: "x", text: "@your-handle", url: "https://x.com/your-handle" },
    { label: "email", text: "you@example.com", url: "mailto:you@example.com" },
  ],

  resume: "", // e.g. "resume.pdf" (drop the file next to index.html)

  // Shown on the contact workspace.
  status: "open to interesting work",
  timezone: "UTC",            // IANA name, e.g. "Asia/Kolkata", "Europe/Berlin"
  replyTime: "usually within 24h",

  // Random theme-matched wallpaper from wallhaven.cc on every load / theme change.
  // Pool lives in wallpapers.json (refreshed daily by .github/workflows/wallpapers.yml).
  wallpapers: true,
};
