import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  ArrowRight,
  Download,
  Star,
  GitFork,
  Code2,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "AI Resume Analyzer",
    description:
      "Analyzes resumes with GPT-4 Vision — ATS scoring, skill gap detection, and personalized improvement suggestions.",
    tags: ["OpenAI", "Next.js", "Python", "FastAPI"],
    accent: "#3B82F6",
    stars: 312,
    forks: 48,
  },
  {
    title: "Multi-Agent Workflow",
    description:
      "Orchestrates specialized AI agents in parallel to tackle complex research, coding, and reasoning tasks autonomously.",
    tags: ["LangChain", "Python", "Redis", "WebSocket"],
    accent: "#8B5CF6",
    stars: 524,
    forks: 89,
  },
  {
    title: "RAG Knowledge Base",
    description:
      "Production-ready retrieval-augmented generation system with hybrid vector + BM25 search and re-ranking.",
    tags: ["LlamaIndex", "Pinecone", "FastAPI", "React"],
    accent: "#06B6D4",
    stars: 891,
    forks: 134,
  },
  {
    title: "ChatGPT Tools",
    description:
      "Browser extension with prompt templates, conversation management, and API cost tracking for power users.",
    tags: ["TypeScript", "Chrome Extension", "OpenAI"],
    accent: "#10B981",
    stars: 1420,
    forks: 203,
  },
  {
    title: "Portfolio Generator",
    description:
      "Transforms a GitHub profile into a polished personal portfolio site in under 60 seconds using AI-written copy.",
    tags: ["Claude", "Next.js", "Vercel", "GitHub API"],
    accent: "#F59E0B",
    stars: 673,
    forks: 91,
  },
  {
    title: "Prompt Optimizer",
    description:
      "Automatically rewrites, A/B-tests, and scores prompts across models to maximize quality and minimize token cost.",
    tags: ["Python", "Anthropic", "Streamlit", "MLflow"],
    accent: "#EF4444",
    stars: 287,
    forks: 42,
  },
];

const techStack: Record<string, { name: string; icon: string }[]> = {
  Languages: [
    { name: "Python", icon: "🐍" },
    { name: "TypeScript", icon: "TS" },
    { name: "Go", icon: "Go" },
  ],
  Frontend: [
    { name: "React", icon: "⚛" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind", icon: "◈" },
  ],
  Backend: [
    { name: "FastAPI", icon: "⚡" },
    { name: "Node.js", icon: "◉" },
    { name: "Supabase", icon: "⬡" },
  ],
  AI: [
    { name: "OpenAI", icon: "○" },
    { name: "Claude", icon: "◇" },
    { name: "Gemini", icon: "◆" },
    { name: "LangChain", icon: "⛓" },
    { name: "LlamaIndex", icon: "Ll" },
    { name: "RAG", icon: "↗" },
    { name: "MCP", icon: "⬡" },
    { name: "Vector DB", icon: "⋮" },
  ],
  Cloud: [
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁" },
    { name: "Vercel", icon: "▲" },
    { name: "GH Actions", icon: "⚙" },
  ],
};

const timeline = [
  {
    year: "2023",
    title: "Started Software Development",
    description:
      "Began the journey into full-stack development, mastering modern web technologies and building a strong engineering foundation.",
  },
  {
    year: "2024",
    title: "Built AI Applications",
    description:
      "Dove deep into LLMs, built production RAG systems, multi-agent frameworks, and shipped AI tools used by thousands of developers.",
  },
  {
    year: "2025",
    title: "Focused on Product + AI",
    description:
      "Merged product thinking with AI engineering — designing systems that balance capability, UX, and long-term reliability.",
  },
  {
    year: "Now",
    title: "Building Useful AI Tools",
    description:
      "Creating open-source AI tools and products that solve real problems for developers and professionals worldwide.",
  },
];

const testimonials = [
  {
    name: "Alex Chen",
    role: "Senior Engineer at Vercel",
    text: "SleepyEveryD's RAG system is the cleanest implementation I've seen in the open-source space. Production-ready out of the box.",
    avatar: "AC",
    color: "#3B82F6",
  },
  {
    name: "Maya Patel",
    role: "AI Researcher",
    text: "The multi-agent workflow library saved our team weeks of work. Thoughtful architecture and excellent documentation throughout.",
    avatar: "MP",
    color: "#8B5CF6",
  },
  {
    name: "Jordan Kim",
    role: "Indie Hacker",
    text: "The Portfolio Generator is magical — went from GitHub to a live portfolio in literally 2 minutes. Incredible product sense.",
    avatar: "JK",
    color: "#06B6D4",
  },
];

const repos = [
  {
    name: "rag-knowledge-base",
    desc: "Production RAG with hybrid search + re-ranking",
    stars: 891,
    lang: "Python",
    color: "#3B82F6",
  },
  {
    name: "multi-agent-workflow",
    desc: "Orchestrate AI agents for complex tasks",
    stars: 524,
    lang: "Python",
    color: "#8B5CF6",
  },
  {
    name: "prompt-optimizer",
    desc: "A/B test and score prompts across models",
    stars: 287,
    lang: "TypeScript",
    color: "#06B6D4",
  },
  {
    name: "ai-resume-analyzer",
    desc: "GPT-4 powered resume analysis and ATS scoring",
    stars: 312,
    lang: "Python",
    color: "#10B981",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(700px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.055), transparent 40%)`,
      }}
    />
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-white/40 tracking-widest uppercase mb-6">
      <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
      {children}
    </div>
  );
}

function GradientText({
  children,
  gradient = "linear-gradient(135deg, #3B82F6, #8B5CF6)",
}: {
  children: ReactNode;
  gradient?: string;
}) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}

// ─── 3D Sphere ───────────────────────────────────────────────────────────────

function GlowingSphere() {
  const codeSnippets = [
    {
      code: (
        <>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-300">agent</span>{" "}
          <span className="text-white/40">=</span>{" "}
          <span className="text-cyan-300">new</span>{" "}
          <span className="text-yellow-300">Agent</span>()
        </>
      ),
      style: { top: "6%", right: "-4%" },
      delay: 0,
    },
    {
      code: (
        <>
          <span className="text-green-400">await</span>{" "}
          <span className="text-blue-300">llm</span>.
          <span className="text-yellow-300">generate</span>(
          <span className="text-orange-300">"..."</span>)
        </>
      ),
      style: { bottom: "14%", left: "-2%" },
      delay: 0.6,
    },
    {
      code: (
        <>
          <span className="text-cyan-400">vector</span>.
          <span className="text-yellow-300">search</span>(
          <span className="text-purple-300">query</span>)
        </>
      ),
      style: { top: "44%", right: "-8%" },
      delay: 1.1,
    },
  ];

  return (
    <div className="relative w-[460px] h-[460px] flex items-center justify-center select-none">
      {/* Ambient glow layers */}
      <div
        className="absolute inset-0 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.18), rgba(139,92,246,0.12), transparent 70%)" }}
      />
      <div
        className="absolute inset-12 rounded-full blur-[60px] animate-pulse"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.15), transparent)",
          animationDuration: "3s",
        }}
      />

      {/* Sphere body */}
      <div
        className="relative w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 30%, rgba(139,92,246,0.45) 0%, rgba(59,130,246,0.35) 28%, rgba(6,182,212,0.2) 56%, rgba(9,9,11,0.95) 85%)",
          boxShadow:
            "0 0 80px rgba(59,130,246,0.25), 0 0 160px rgba(139,92,246,0.12), inset 0 0 50px rgba(255,255,255,0.04)",
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute top-5 left-7 w-16 h-9 rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.4), transparent)",
          }}
        />
        {/* Orbital rings */}
        {[
          { scale: 1.18, rotX: 72, dur: 9 },
          { scale: 1.38, rotX: 65, dur: 13 },
          { scale: 1.56, rotX: 78, dur: 17 },
        ].map((ring, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-white/[0.06]"
            style={{
              animation: `orbitSpin ${ring.dur}s linear infinite ${i % 2 ? "reverse" : ""}`,
              transform: `scale(${ring.scale}) rotateX(${ring.rotX}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating code cards */}
      {codeSnippets.map((s, i) => (
        <motion.div
          key={i}
          className="absolute px-3 py-2 rounded-xl font-mono text-xs whitespace-nowrap"
          style={{
            ...s.style,
            background: "rgba(17, 24, 39, 0.88)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          {s.code}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Particles ───────────────────────────────────────────────────────────────

function Particles() {
  const dots = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    dur: Math.random() * 18 + 14,
    delay: Math.random() * 10,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            animation: `particleFloat ${d.dur}s ${d.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Magnetic Button ─────────────────────────────────────────────────────────

function MagneticButton({
  children,
  primary,
  href = "#",
}: {
  children: ReactNode;
  primary?: boolean;
  href?: string;
}) {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setXY({
      x: (e.clientX - (r.left + r.width / 2)) * 0.22,
      y: (e.clientY - (r.top + r.height / 2)) * 0.22,
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 ${
        primary
          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
          : "bg-white/[0.07] hover:bg-white/[0.11] border border-white/[0.1] hover:border-white/20 text-white/75 hover:text-white"
      }`}
      style={{
        transform: `translate(${xy.x}px, ${xy.y}px)`,
        transition:
          "transform 0.14s ease, background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
      }}
    >
      {children}
    </a>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Projects", "About", "Stack", "Timeline", "Contact"];

  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 transition-all duration-500"
      style={{
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled ? "rgba(9,9,11,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.span
          className="font-mono text-sm text-white/70 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Jiaxin Yang
        </motion.span>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l, i) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-white/40 hover:text-white/85 transition-colors duration-200"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
            >
              {l}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="mailto:hello@sleepyeveryd.dev"
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-white/[0.1] hover:border-white/20 text-white/60 hover:text-white/90 hover:bg-white/[0.05] transition-all duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Mail size={13} />
          Get in touch
        </motion.a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [typed, setTyped] = useState("");
  const roles = ["AI Engineer", "Product Builder", "Full Stack Developer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = roles[roleIdx];
    const t = setTimeout(() => {
      if (!deleting && typed === cur) {
        setTimeout(() => setDeleting(true), 1800);
        return;
      }
      if (deleting && typed === "") {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
        return;
      }
      setTyped(deleting ? cur.slice(0, typed.length - 1) : cur.slice(0, typed.length + 1));
    }, deleting ? 48 : 88);
    return () => clearTimeout(t);
  });

  const socials = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "X", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:hello@sleepyeveryd.dev" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[900px] h-[900px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #3B82F6, #8B5CF6, transparent 70%)",
            filter: "blur(120px)",
            top: "-25%",
            left: "15%",
            animation: "aurora1 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #06B6D4, #3B82F6, transparent 70%)",
            filter: "blur(100px)",
            bottom: "5%",
            right: "5%",
            animation: "aurora2 17s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #8B5CF6, transparent 70%)",
            filter: "blur(80px)",
            top: "35%",
            left: "-8%",
            animation: "aurora1 20s ease-in-out infinite reverse",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <Particles />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/[0.07] text-xs font-mono text-green-400 tracking-wider mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </motion.div>

            <motion.h1
              className="font-bold text-white leading-[0.92] tracking-tight mb-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
              }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              Sleepy
              <br />
              <GradientText gradient="linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)">
                EveryD
              </GradientText>
            </motion.h1>

            <motion.div
              className="text-xl lg:text-2xl font-medium text-white/60 mb-6 flex items-center gap-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <span>{typed}</span>
              <span className="w-0.5 h-6 bg-blue-400 inline-block animate-pulse" />
            </motion.div>

            <motion.p
              className="text-base text-white/40 leading-relaxed max-w-lg mb-9"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              I design and build AI-powered applications that combine elegant user
              experience with cutting-edge large language models. Passionate about
              transforming ideas into products people love.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 mb-9"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <MagneticButton primary href="#projects">
                View Projects <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton href="#">
                <Download size={15} /> Resume
              </MagneticButton>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center size-10 rounded-xl border border-white/[0.09] text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — sphere */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlowingSphere />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-mono tracking-[0.2em]">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function ProjectCard({ p }: { p: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl p-5 overflow-hidden cursor-pointer"
      style={{
        background: "rgba(17,24,39,0.55)",
        border: hovered ? `1px solid ${p.accent}30` : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px ${p.accent}18, 0 4px 24px ${p.accent}12`
          : "0 4px 20px rgba(0,0,0,0.2)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Hover radial */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${p.accent}10, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Cover */}
      <div
        className="relative w-full h-32 rounded-xl mb-4 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${p.accent}14, rgba(9,9,11,0.7))`,
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="absolute w-28 h-28 rounded-full blur-[40px] transition-opacity duration-300"
          style={{ background: p.accent, opacity: hovered ? 0.22 : 0.1 }}
        />
        <span
          className="relative text-3xl font-extrabold tracking-tighter"
          style={{ color: p.accent, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {p.title.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <h3
        className="text-white font-semibold text-[1.05rem] mb-2 leading-snug"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {p.title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed mb-4">{p.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md text-[11px] font-mono text-white/45 border border-white/[0.07]"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-white/30 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Star size={11} />
            {p.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={11} />
            {p.forks}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <a href="#" className="hover:text-white/60 transition-colors">
            <Github size={13} />
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Featured Work</SectionLabel>
          <h2
            className="font-bold text-white tracking-tight mb-4 leading-[1.05]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
            }}
          >
            Things I've Built
            <br />
            <GradientText gradient="linear-gradient(135deg, #3B82F6, #8B5CF6)">
              & Shipped
            </GradientText>
          </h2>
          <p className="text-white/40 text-base max-w-lg mb-14">
            Production applications spanning AI infrastructure, developer tools,
            and end-user products.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.07}>
              <ProjectCard p={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const stats = [
    { value: "20+", label: "Projects Shipped" },
    { value: "100k+", label: "Lines of Code" },
    { value: "OSS", label: "Open Source" },
    { value: "∞", label: "Always Learning" },
  ];
  const gradients = [
    "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    "linear-gradient(135deg, #8B5CF6, #06B6D4)",
    "linear-gradient(135deg, #06B6D4, #3B82F6)",
    "linear-gradient(135deg, #3B82F6, #06B6D4)",
  ];

  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <SectionLabel>About Me</SectionLabel>
            <h2
              className="font-bold text-white tracking-tight mb-6 leading-[1.08]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
              }}
            >
              Building at the
              <br />
              intersection of
              <br />
              <GradientText gradient="linear-gradient(135deg, #06B6D4, #8B5CF6)">
                AI & Product
              </GradientText>
            </h2>
            <p className="text-white/45 leading-relaxed mb-4 text-[15px]">
              I'm an AI Engineer and Product Builder who obsesses over the gap between
              what AI can do and what actually ships to users. My work sits at the
              intersection of LLMs, thoughtful product design, and full-stack engineering.
            </p>
            <p className="text-white/30 leading-relaxed mb-8 text-[15px]">
              Focused on LLMs, Product Design, Full Stack Development, and Automation.
              I believe the best AI products are ones where the technology disappears
              and only the value remains.
            </p>
            <div className="flex flex-wrap gap-2">
              {["LLMs", "RAG", "Agents", "Product Design", "Full Stack", "Automation"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-sm text-white/50 border border-white/[0.09]"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.09}>
                <div
                  className="p-6 rounded-2xl border border-white/[0.07] hover:border-white/[0.13] transition-all duration-300"
                  style={{
                    background: "rgba(17,24,39,0.5)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    className="text-4xl font-bold mb-2 bg-clip-text text-transparent"
                    style={{
                      backgroundImage: gradients[i],
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm text-white/40">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

function TechStackSection() {
  return (
    <section id="stack" className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06), transparent 65%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Tech Stack</SectionLabel>
          <h2
            className="font-bold text-white tracking-tight mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
            }}
          >
            Tools &{" "}
            <GradientText gradient="linear-gradient(135deg, #3B82F6, #06B6D4)">
              Technologies
            </GradientText>
          </h2>
          <p className="text-white/35 mb-14 max-w-md text-[15px]">
            The technologies I reach for when building production AI systems and
            developer tooling.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(techStack).map(([cat, items], ci) => (
            <FadeIn key={cat} delay={ci * 0.08}>
              <div
                className="p-5 rounded-2xl border border-white/[0.07] h-full"
                style={{
                  background: "rgba(17,24,39,0.5)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="text-[10px] font-mono text-white/25 tracking-widest uppercase mb-4">
                  {cat}
                </div>
                <div className="flex flex-col gap-2.5">
                  {items.map((item, ii) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center gap-2.5 group"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.04 + ii * 0.04, duration: 0.45 }}
                    >
                      <span className="text-sm w-5 text-center shrink-0 opacity-60">
                        {item.icon}
                      </span>
                      <span className="text-sm text-white/55 group-hover:text-white/85 transition-colors duration-150">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section id="timeline" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Journey</SectionLabel>
          <h2
            className="font-bold text-white tracking-tight mb-16"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
            }}
          >
            Experience{" "}
            <GradientText gradient="linear-gradient(135deg, #8B5CF6, #06B6D4)">
              Timeline
            </GradientText>
          </h2>
        </FadeIn>

        <div className="relative max-w-2xl">
          <div className="absolute left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent" />

          {timeline.map((item, i) => (
            <FadeIn key={item.year} delay={i * 0.1}>
              <div className="relative flex gap-8 pb-12">
                <div className="relative z-10 shrink-0">
                  <div
                    className="size-12 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
                    style={{
                      background: "rgba(17,24,39,0.95)",
                      border: "1px solid rgba(59,130,246,0.35)",
                      boxShadow: "0 0 20px rgba(59,130,246,0.18)",
                      color: "#60a5fa",
                    }}
                  >
                    {item.year === "Now" ? "NOW" : `'${item.year.slice(2)}`}
                  </div>
                </div>

                <div
                  className="flex-1 p-5 rounded-2xl border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300"
                  style={{
                    background: "rgba(17,24,39,0.4)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="text-[11px] font-mono text-white/25 mb-1">
                    {item.year}
                  </div>
                  <h3
                    className="text-white font-semibold mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Open Source ──────────────────────────────────────────────────────────────

function OpenSourceSection() {
  const weeks = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => {
      const r = Math.random();
      return r > 0.62 ? (r > 0.84 ? 3 : r > 0.74 ? 2 : 1) : 0;
    })
  );
  const colorMap = ["rgba(255,255,255,0.05)", "rgba(59,130,246,0.25)", "rgba(59,130,246,0.55)", "rgba(59,130,246,0.9)"];

  return (
    <section id="opensource" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Open Source</SectionLabel>
          <h2
            className="font-bold text-white tracking-tight mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
            }}
          >
            GitHub{" "}
            <GradientText gradient="linear-gradient(135deg, #3B82F6, #8B5CF6)">
              Activity
            </GradientText>
          </h2>
          <p className="text-white/35 mb-10 max-w-lg text-[15px]">
            Consistent contributions to open-source AI tooling and infrastructure
            throughout the year.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="p-6 rounded-2xl border border-white/[0.07] mb-6 overflow-x-auto"
            style={{ background: "rgba(17,24,39,0.5)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex gap-[3px] min-w-max">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="size-[11px] rounded-[2px] transition-transform duration-150 hover:scale-125 cursor-pointer"
                      style={{ background: colorMap[day] }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-white/20 font-mono">
              <span>Less</span>
              {colorMap.map((c, i) => (
                <div key={i} className="size-[11px] rounded-[2px]" style={{ background: c }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.08}>
              <div
                className="p-5 rounded-2xl border border-white/[0.07] hover:border-white/[0.13] transition-all duration-300 group"
                style={{ background: "rgba(17,24,39,0.5)", backdropFilter: "blur(16px)" }}
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-white/35" />
                    <span className="text-white font-mono text-sm font-medium">
                      {r.name}
                    </span>
                  </div>
                  <Github
                    size={14}
                    className="text-white/20 group-hover:text-white/45 transition-colors"
                  />
                </div>
                <p className="text-white/35 text-sm mb-4">{r.desc}</p>
                <div className="flex items-center gap-4 text-xs text-white/25 font-mono">
                  <span className="flex items-center gap-1">
                    <Star size={11} />
                    {r.stars}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: r.color }}
                    />
                    {r.lang}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.09), transparent 55%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Testimonials</SectionLabel>
          <h2
            className="font-bold text-white tracking-tight mb-14"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
            }}
          >
            What people{" "}
            <GradientText gradient="linear-gradient(135deg, #8B5CF6, #3B82F6)">
              are saying
            </GradientText>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div
                className="p-6 rounded-2xl border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col"
                style={{
                  background: "rgba(17,24,39,0.5)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-white/55 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="size-9 rounded-full flex items-center justify-center text-xs font-mono font-semibold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, #8B5CF6)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white/75 text-sm font-medium">{t.name}</div>
                    <div className="text-white/30 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.1), rgba(139,92,246,0.06), transparent 65%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <SectionLabel>Contact</SectionLabel>
          <h2
            className="font-bold text-white tracking-tight mb-5 leading-[1.02]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
            }}
          >
            Let&apos;s Build
            <br />
            <GradientText gradient="linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)">
              Something Amazing.
            </GradientText>
          </h2>
          <p className="text-white/40 text-base mb-12 max-w-md mx-auto leading-relaxed">
            Have an idea, a project, or just want to talk AI? My inbox is always open
            for the right conversation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@sleepyeveryd.dev"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                boxShadow: "0 8px 36px rgba(59,130,246,0.28)",
              }}
            >
              <Mail size={15} /> Send an Email
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white/70 hover:text-white border border-white/[0.1] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200"
            >
              <Github size={15} /> View GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white/70 hover:text-white border border-white/[0.1] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-white/25 text-sm font-mono">
          Designed & Built by{" "}
          <span className="text-white/40">SleepyEveryD</span>
        </span>
        <span className="text-white/15 text-xs font-mono">© 2026</span>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "#09090B",
        color: "#F8FAFC",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(70px,-50px) scale(1.08); }
          66%       { transform: translate(-50px,70px) scale(0.94); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(-90px,45px) scale(1.06); }
          66%       { transform: translate(60px,-55px) scale(1.1); }
        }
        @keyframes orbitSpin {
          from { transform: var(--orbit-from); }
          to   { transform: var(--orbit-to); }
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0) translateX(0);   opacity: 0.15; }
          25%  { transform: translateY(-25px) translateX(12px); opacity: 0.45; }
          50%  { transform: translateY(-50px) translateX(-8px); opacity: 0.2; }
          75%  { transform: translateY(-28px) translateX(-12px); opacity: 0.4; }
          100% { transform: translateY(0) translateX(0);   opacity: 0.15; }
        }
        ::-webkit-scrollbar { width: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59,130,246,0.35); }
      `}</style>

      <CursorGlow />
      <Nav />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <TechStackSection />
      <TimelineSection />
      <OpenSourceSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
