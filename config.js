// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE. Everything on the site is generated from it.
// ─────────────────────────────────────────────────────────────
window.PORTFOLIO = {
  name: "Sumit Dhiman",
  handle: "sumit",          // shown as the shell user: sumit@portfolio
  hostname: "portfolio",
  role: "Backend Engineer",
  location: "Himachal Pradesh, India",
  editor: "nvim",
  theme: "arctic",          // default for first-time visitors: matrix | amber | vampire | arctic | retro | cyberpunk
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
    "## Open source",
    "- 1,300+ merged pull requests on GitHub",
    "- 1,800+ contributions in the last year",
    "- Contributor to Euclid's public CosmWasm core contracts",
    "- Member: GNU/Linux Users Group & ISTE, NIT Hamirpur",
    "",
    "## Achievements",
    "- Winner, ETHIndia 2024 (zk-email track) — 200+ teams",
    "- 2nd prize, Electrothon 2023 (NIT Hamirpur)",
    "- 2nd prize, Hack It Out @ Technex'23 (IIT BHU, 300+ teams)",
    "- Hacktoberfest 2022 & 2023 (50+ PRs)",
    "- Passed LinkedIn's Go skill assessment",
    "",
    "## Leadership",
    "- Secretary, ISTE NIT Hamirpur (2023–24); Coordinator (2020–23)",
    "- Mentored juniors into backend, DevOps and Linux",
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
      name: "OSM — Object Storage Manager",
      slug: "osm",
      year: 2026,
      desc: "Self-hosted, single-binary web UI for S3-compatible storage (S3, R2, MinIO, Backblaze…). Per-user bucket/prefix permissions, TOTP 2FA with trusted devices, full audit log, public file serving, and infinite scroll that handles millions of objects.",
      tech: ["Go", "HTMX", "SQLite", "Docker"],
      repo: "https://github.com/lucifer1708/osm",
    },
    {
      name: "SomniaStream",
      slug: "somnia-stream",
      year: 2025,
      desc: "Real-time blockchain data streaming for the Somnia network: blocks, transactions, logs and network stats fanned out through NATS JetStream streams and served over HTTP and WebSockets.",
      tech: ["Go", "go-ethereum", "NATS JetStream", "Gin", "WebSockets"],
      repo: "https://github.com/lucifer1708/SomniaStream",
    },
    {
      name: "evm-explorer",
      slug: "evm-explorer",
      year: 2026,
      desc: "Terminal-themed, RPC-only multi-chain EVM block explorer — no archive node, no external indexer. Rolling per-chain index window with reorg handling, backed by SQLite.",
      tech: ["TypeScript", "Next.js", "viem", "SQLite"],
      repo: "https://github.com/lucifer1708/evm-explorer",
    },
    {
      name: "Euclid core CosmWasm contracts",
      slug: "cw-euclid-core-contracts",
      stars: 12,
      desc: "Contributor to Euclid Protocol's open-source core smart contracts for its cross-chain unified liquidity layer, written in Rust for CosmWasm.",
      tech: ["Rust", "CosmWasm", "Cosmos"],
      repo: "https://github.com/EuclidProtocol/cw-euclid-core-contracts",
    },
    {
      name: "Concordium Local Chain GUI",
      slug: "concordium-local-chain-gui",
      year: 2023,
      desc: "Cross-platform Rust/Tauri GUI for running local Concordium nodes — setup time cut by 80%, CPU usage from 80–90% down to 15–20%. Built at Athena Consulting as the top contributor (private repo).",
      tech: ["Rust", "Tauri", "Concordium SDK", "React"],
    },
    {
      name: "Superchain Interop Oracle",
      slug: "superchain-interop-oracle",
      year: 2024,
      desc: "Decentralised price-feed oracle for the Optimism Superchain, with contracts deployed on Ethereum and Optimism and a web UI to request and explore feeds.",
      tech: ["Solidity", "JavaScript", "Optimism"],
      repo: "https://github.com/lucifer1708/superchain-interop-oracle",
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
    },
    {
      name: "Prodyogiki'23 website",
      slug: "prodyogiki-23",
      year: 2022,
      stars: 4,
      desc: "Website and backend for NIT Hamirpur's technical fest Prodyogiki'23 — forked by 8 other developers.",
      tech: ["Python", "Django", "Jinja2", "SCSS"],
      repo: "https://github.com/lucifer1708/prody-2023",
    },
    {
      name: "dotfiles & Arch rices",
      slug: "dotfiles",
      desc: "Years of Linux tinkering: AwesomeWM and i3 configs, a Lua Neovim setup, ranger configs and custom Arch ISOs — the reason this portfolio looks like a tiling WM.",
      tech: ["Lua", "Shell", "Arch Linux", "Neovim"],
      repo: "https://github.com/lucifer1708/dotfiles",
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
        "Contributor to the Rust/CosmWasm core contracts (open source)",
      ],
    },
    {
      date: "Apr 2023 — May 2024", role: "Contract Backend Developer", org: "Athena Consulting", url: "https://www.athenaconsulting.io/",
      note: [
        "Secure REST API for a web3 crypto-sharing platform, 50K+ API calls daily",
        "Auth0 + KYC for 1000+ users; CI/CD cut release cycles by 40%",
        "AWS hosting tuned: page load 7s → 0.5s, page views +200%",
        "Top contributor to the Concordium Local Chain GUI (Rust/Tauri)",
      ],
    },
    {
      date: "Dec 2020 — Jul 2024", role: "Secretary (prev. Coordinator)", org: "ISTE NIT Hamirpur",
      note: [
        "Led the technical society's chapter; Secretary from Jun 2023, Coordinator before that",
        "Built and hosted Abhedya, the chapter's cryptic hunt (500+ players)",
        "Mentored juniors — several now ship backend and DevOps work in industry",
      ],
    },
    { date: "2020 — 2024", role: "B.Tech, Civil Engineering", org: "NIT Hamirpur", note: [
        "ETHIndia 2024 winner · Electrothon & Hack It Out runner-up · Hacktoberfest ×2",
        "Built ArchFire (Arch-based distro), Abhedya and the Prodyogiki'23 fest site",
        "Active in the GNU/Linux Users Group and ISTE chapters",
      ] },
  ],

  // Shown on the about workspace and via `testimonials`. Quotes are from LinkedIn recommendations.
  testimonials: [
    {
      name: "Mehul Ambastha", role: "Backend @ Stimuler AI", relation: "reported to Sumit directly",
      url: "https://www.linkedin.com/in/sumit-dhiman-20bce091/details/recommendations/",
      quote: "One of the finest engineers you will ever meet in your life. He crosses all domains, and his mastery ranges from software development, DevOps to Hardware Programming and a love for machines. Sumit is an inspiration for tens of juniors, who had the opportunity of working under him. … He constantly pushed those around him to be better and better … Absolute gem of a person.",
    },
    {
      name: "Harsh Mittal", role: "Software Engineer, ex-Euclid Protocol", relation: "worked on the same team",
      url: "https://www.linkedin.com/in/sumit-dhiman-20bce091/details/recommendations/",
      quote: "I can confidently say that he is an exceptional backend developer. His dedication to his work is unparalleled, consistently delivering high-quality results in record time. Sumit's problem-solving skills and attention to detail set him apart … I highly recommend him for any challenging backend development role.",
    },
    {
      name: "Nikhil Mishra", role: "Full-stack blockchain developer, Euclid Protocol", relation: "worked on the same team",
      url: "https://www.linkedin.com/in/sumit-dhiman-20bce091/details/recommendations/",
      quote: "Awesome backend developer with the great expertise in the field.. will surely recommend [Sumit] if you are looking [for] a backend developer who has worked in the field of web2 as well as web3",
    },
  ],

  contact: [
    { label: "github", text: "github.com/lucifer1708", url: "https://github.com/lucifer1708" },
    { label: "linkedin", text: "linkedin.com/in/sumit-dhiman-20bce091", url: "https://linkedin.com/in/sumit-dhiman-20bce091" },
    { label: "email", text: "sd08012003@gmail.com", url: "mailto:sd08012003@gmail.com" },
  ],

  resume: "resume.pdf", // file next to index.html (enables the resume command + download buttons)

  // Shown on the contact workspace.
  status: "building cross-chain infra at Euclid Protocol · DMs open",
  timezone: "Asia/Kolkata",   // IANA name, e.g. "Asia/Kolkata", "Europe/Berlin"
  replyTime: "usually within 24h",

  // Random theme-matched wallpaper from wallhaven.cc on every load / theme change.
  // Pool lives in wallpapers.json (refreshed daily by .github/workflows/wallpapers.yml).
  wallpapers: true,
};
