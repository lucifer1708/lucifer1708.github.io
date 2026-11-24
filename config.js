// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE. Everything on the site is generated from it.
// ─────────────────────────────────────────────────────────────
window.PORTFOLIO = {
  name: "Sumit Dhiman",
  handle: "sumit",          // shown as the shell user: sumit@portfolio
  hostname: "portfolio",
  role: "Backend Engineer",
  location: "India",
  editor: "nvim",
  tagline: "Backend engineer building cross-chain infra in Go — 100K+ concurrent requests, 300K+ transactions a day.",

  // Rendered as ~/about.md (shown in the nvim window). Lines starting with # are headings, - are list items.
  about: [
    "# Hey, I'm Sumit 👋",
    "",
    "Backend engineer at Euclid Protocol, building the Go backend",
    "for a cross-chain swap app across EVM, Cosmos and Tron chains.",
    "",
    "## What I do",
    "- Go microservices: gRPC/Connect, Protobuf, NATS, ClickHouse",
    "- Cross-chain tracking, gasless meta-transactions, vault APIs",
    "- Kubernetes + Argo CD GitOps, OpenTelemetry observability",
    "",
    "## By the numbers",
    "- 100K+ concurrent requests · 300K+ transactions daily",
    "- 360+ merged PRs across 25+ microservices",
    "- 99.9% uptime running DevOps on AWS",
    "",
    "## Achievements",
    "- Winner, ETHIndia 2024 (zk-email track) — 200+ teams",
    "- 2nd prize, Electrothon 2023 (NIT Hamirpur)",
    "- 2nd prize, Hack It Out @ Technex'23 (IIT BHU, 300+ teams)",
    "- Hacktoberfest 2022 & 2023 (50+ PRs)",
    "",
    "## Education",
    "- B.Tech, Civil Engineering — NIT Hamirpur (2020–2024)",
  ],

  // Shown as live htop bars. level = 0..100
  skills: [
    { name: "Go", level: 95 },
    { name: "Rust", level: 80 },
    { name: "TypeScript", level: 85 },
    { name: "Python", level: 82 },
    { name: "Web3/EVM", level: 90 },
    { name: "Kubernetes", level: 86 },
    { name: "OTel/Grafana", level: 88 },
    { name: "Linux", level: 93 },
  ],
  stack: ["Go", "Rust", "TypeScript", "Kubernetes", "NATS", "ClickHouse", "OpenTelemetry", "CosmWasm"],

  // slug becomes ~/projects/<slug>.md. url / repo / year / stars are optional.
  projects: [
    {
      name: "Concordium Local Chain GUI",
      slug: "concordium-local-chain-gui",
      desc: "Cross-platform Rust/Tauri GUI for running local Concordium nodes — setup time cut by 80%, CPU usage from 80–90% down to 15–20%.",
      tech: ["Rust", "Tauri", "Concordium SDK", "React"],
      repo: "https://github.com/lucifer117/concordium-local-chain-gui",
    },
    {
      name: "Abhedya — The Cryptic Hunt",
      slug: "abhedya",
      desc: "Django cryptic hunt with auth, leaderboard and 50+ riddles for 500+ players, 99.9% uptime over 24 hours of continuous play.",
      tech: ["Python", "Django", "Docker", "SQL", "Celery"],
      repo: "https://github.com/istenith/cryptic-hunt",
    },
    {
      name: "ArchFire",
      slug: "archfire",
      desc: "Arch Linux based distro with the Calamares installer and 5+ preconfigured desktops — install time cut by 90%, downloaded in 4+ countries, rated 4.2/5.",
      tech: ["Python", "C++", "CMake", "Shell", "Linux"],
      repo: "https://github.com/lucifer117/archfire",
    },
  ],

  // Newest first. Rendered as `git log`. `note` can be a string or a list of lines.
  experience: [
    {
      date: "May 2024 — now", role: "Backend Engineer", org: "Euclid Protocol", url: "https://euclidprotocol.io/",
      note: [
        "Go backend for a cross-chain swap app: 100K+ concurrent requests, 300K+ txs/day",
        "Cross-chain tx tracking engine (EVM, Cosmos, Tron) driven by on-chain events over NATS",
        "Gasless meta-transactions, tiered referral revenue-share, vault APIs, CL-AMM quoting",
        "Kubernetes + Argo CD GitOps, OpenTelemetry → Grafana/OpenObserve; 360+ merged PRs",
      ],
    },
    {
      date: "Apr 2023 — May 2024", role: "Contract Backend Developer", org: "Athena Consulting", url: "https://www.athenaconsulting.io/",
      note: [
        "Secure REST API for a web3 crypto-sharing platform, 50K+ API calls daily",
        "Auth0 + KYC for 1000+ users; CI/CD cut release cycles by 40%",
        "AWS hosting tuned: page load 7s → 0.5s, page views +200%",
      ],
    },
    { date: "2020 — 2024", role: "B.Tech, Civil Engineering", org: "NIT Hamirpur", note: "Hackathons, Hacktoberfest, and an Arch-based distro on the side." },
  ],

  contact: [
    { label: "github", text: "github.com/lucifer1708", url: "https://github.com/lucifer1708" },
    { label: "linkedin", text: "linkedin.com/in/sumit-dhiman-20bce091", url: "https://linkedin.com/in/sumit-dhiman-20bce091" },
    { label: "email", text: "sd08012003@gmail.com", url: "mailto:sd08012003@gmail.com" },
  ],

  resume: "", // e.g. "resume.pdf" (drop the file next to index.html)

  // Shown on the contact workspace.
  status: "building cross-chain infra at Euclid Protocol · DMs open",
  timezone: "Asia/Kolkata",   // IANA name, e.g. "Asia/Kolkata", "Europe/Berlin"
  replyTime: "usually within 24h",

  // Random theme-matched wallpaper from wallhaven.cc on every load / theme change.
  // Pool lives in wallpapers.json (refreshed daily by .github/workflows/wallpapers.yml).
  wallpapers: true,
};
