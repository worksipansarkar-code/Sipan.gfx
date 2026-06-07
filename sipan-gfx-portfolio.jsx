import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#050507",
  pink: "#ff2d8b",
  purple: "#9b30ff",
  violet: "#c44dff",
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
};

const SERVICES = [
  { icon: "✦", title: "Graphic Design", desc: "Visual identities that stop thumbs and drop jaws." },
  { icon: "◈", title: "Logo & Branding", desc: "Marks that outlive trends and cement legacy." },
  { icon: "⌘", title: "Social Media Mgmt", desc: "Content ecosystems engineered for virality." },
  { icon: "◉", title: "SEO Optimization", desc: "Rank #1. Own the search. Dominate the niche." },
  { icon: "⬡", title: "Web Design & Dev", desc: "Conversion-first sites that sell while you sleep." },
  { icon: "▷", title: "Motion Graphics", desc: "Animation that turns scrollers into buyers." },
  { icon: "⬛", title: "Video Editing", desc: "Cinematic cuts that keep eyes locked on screen." },
  { icon: "✧", title: "Content Strategy", desc: "Story arcs built for algorithms and humans alike." },
  { icon: "◆", title: "Paid Advertising", desc: "ROAS-obsessed campaigns across every channel." },
  { icon: "◐", title: "Personal Branding", desc: "You, amplified. Authentic. Unforgettable." },
];

const PORTFOLIO_ITEMS = [
  { cat: "Logo Design", title: "NeonBrand Co.", color: "#ff2d8b" },
  { cat: "Social Media", title: "VibeFeed Campaign", color: "#9b30ff" },
  { cat: "Motion", title: "Cyberpunk Intro", color: "#c44dff" },
  { cat: "Website", title: "LuxeStore UI", color: "#ff2d8b" },
  { cat: "Branding", title: "Pulse Agency Kit", color: "#9b30ff" },
  { cat: "Logo Design", title: "Vertex Mark", color: "#c44dff" },
  { cat: "Video", title: "Festival Reel 2026", color: "#ff2d8b" },
  { cat: "Social Media", title: "GlowUp Series", color: "#9b30ff" },
  { cat: "Website", title: "TechSpark Landing", color: "#c44dff" },
];

const STATS = [
  { val: 250, label: "Projects Completed", suffix: "+" },
  { val: 120, label: "Happy Clients", suffix: "+" },
  { val: 50, label: "Brands Managed", suffix: "+" },
  { val: 10, label: "Reach Generated", suffix: "M+" },
];

const TESTIMONIALS = [
  { name: "Rahul Dey", role: "Startup Founder", text: "SIPAN transformed our brand identity overnight. The designs are insane — every detail screams premium.", rating: 5 },
  { name: "Priya Chakraborty", role: "E-commerce Owner", text: "TelentsDigital took our Instagram from 2K to 50K in 4 months. ROI is off the charts.", rating: 5 },
  { name: "Arjun Nair", role: "CEO, NexGen Co.", text: "Best agency in Northeast India. Period. Creative, fast, and actually delivers on promises.", rating: 5 },
  { name: "Sneha Roy", role: "Content Creator", text: "My personal brand is now recognizable. SIPAN's branding is next-level.", rating: 5 },
];

const FAQS = [
  { q: "What's your typical turnaround time?", a: "Logo projects: 3–5 days. Full branding: 1–2 weeks. Websites: 2–4 weeks. Social media campaigns: ongoing." },
  { q: "Do you work with international clients?", a: "Yes! We work globally. Payment via Razorpay, PayPal, or bank transfer." },
  { q: "What makes TelentsDigital different?", a: "We blend sharp design aesthetics with data-driven marketing — not one without the other. Results, not just looks." },
  { q: "Do you offer monthly packages?", a: "Absolutely. Custom retainer packages for Social Media, SEO, and Content Strategy starting from ₹5,000/month." },
];

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const pallete = ["#ff2d8b", "#9b30ff", "#c44dff", "#ff6ec7", "#7c3aed"];
    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.color = pallete[Math.floor(Math.random() * pallete.length)];
        this.alpha = Math.random() * 0.6 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.pulse += 0.02;
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.vx -= (dx / dist) * 0.08;
          this.vy -= (dy / dist) * 0.08;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 140; i++) particles.current.push(new P());

    const drawLines = () => {
      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 90) * 0.12;
            ctx.strokeStyle = pts[i].color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      particles.current.forEach(p => { p.update(); p.draw(); });
      drawLines();
      raf.current = requestAnimationFrame(loop);
    };
    loop();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.12;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.12;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${rPos.current.x - 20}px, ${rPos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: COLORS.pink, zIndex: 9999, pointerEvents: "none", mixBlendMode: "screen" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", border: `1px solid ${COLORS.purple}`, zIndex: 9998, pointerEvents: "none", opacity: 0.5 }} />
    </>
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9000, background: "rgba(255,255,255,0.05)" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.violet})`, transition: "width 0.1s", boxShadow: `0 0 8px ${COLORS.pink}` }} />
    </div>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ val, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(val / 60);
        const timer = setInterval(() => {
          start = Math.min(start + step, val);
          setCount(start);
          if (start >= val) clearInterval(timer);
        }, 20);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [val]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Services", "Portfolio", "Agency", "Testimonials", "FAQ", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 3, left: 0, right: 0, zIndex: 8000,
      padding: "0 5vw",
      background: scrolled ? "rgba(5,5,7,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.glassBorder}` : "none",
      transition: "all 0.4s",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 70,
    }}>
      <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 22, background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        SIPAN.GFX
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
        {links.map(l => (
          <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, cursor: "pointer", letterSpacing: 1, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = COLORS.pink}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}>
            {l.toUpperCase()}
          </button>
        ))}
        <button onClick={() => setDarkMode(!darkMode)} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, color: "#fff", borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>
          {darkMode ? "☀ Light" : "☾ Dark"}
        </button>
        <button onClick={() => scrollTo("Contact")} style={{ background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`, border: "none", color: "#fff", borderRadius: 24, padding: "8px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13, boxShadow: `0 0 20px ${COLORS.pink}44` }}>
          Hire Me
        </button>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 26, cursor: "pointer" }} className="mobile-menu-btn">
        {mobileOpen ? "✕" : "☰"}
      </button>

      {mobileOpen && (
        <div style={{ position: "absolute", top: 70, left: 0, right: 0, background: "rgba(5,5,7,0.98)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${COLORS.glassBorder}`, padding: "20px 5vw", display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, cursor: "pointer", textAlign: "left", padding: "8px 0", borderBottom: `1px solid ${COLORS.glassBorder}` }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── AI CHATBOT ───────────────────────────────────────────────────────────────
function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! 👋 I'm **EduBot** — SIPAN.GFX's AI assistant. Ask me about services, pricing, portfolio, or how to book a call!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are the AI assistant for SIPAN.GFX — a premium personal brand and digital agency website. SIPAN Sarkar is the founder of TelentsDigital, a creative digital marketing agency based in Agartala, Tripura, India.

Services offered: Graphic Design, Logo Branding, Social Media Management, SEO Optimization, Website Design & Development, Motion Graphics, Video Editing, Content Strategy, Paid Advertising, Personal Branding.

Contact: Phone 8415873637, Email work.sipansarkar@gmail.com, Instagram @sipan.gfx.

Be friendly, enthusiastic, concise. Help with service inquiries, pricing (give ballpark figures in INR), portfolio info, and booking. Encourage users to reach out via WhatsApp or email. Keep responses under 120 words.`,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Something went wrong. Please try again!";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! Couldn't connect. Please reach out directly at work.sipansarkar@gmail.com 🙏" }]);
    }
    setLoading(false);
  };

  const glowPulse = {
    animation: "pulse 2s infinite",
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 7000,
        width: 60, height: 60, borderRadius: "50%",
        background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`,
        border: "none", cursor: "pointer", fontSize: 26,
        boxShadow: `0 0 30px ${COLORS.pink}88, 0 0 60px ${COLORS.purple}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "chatPulse 2s infinite",
      }}>
        {open ? "✕" : "🤖"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 100, right: 28, zIndex: 7000,
          width: 340, height: 480,
          background: "rgba(10,8,20,0.96)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${COLORS.purple}55`,
          borderRadius: 20,
          boxShadow: `0 0 40px ${COLORS.purple}33`,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.glassBorder}`, background: `linear-gradient(135deg, ${COLORS.pink}22, ${COLORS.purple}22)`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Orbitron', monospace" }}>SIPAN AI</div>
              <div style={{ color: COLORS.pink, fontSize: 11 }}>● Online</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: m.role === "user" ? `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})` : "rgba(255,255,255,0.07)",
                  color: "#fff", fontSize: 13, lineHeight: 1.5,
                  border: m.role !== "user" ? `1px solid ${COLORS.glassBorder}` : "none",
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 6, padding: "10px 14px", background: "rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px", width: 60 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.pink, animation: `bounce 0.8s ${i * 0.15}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.glassBorder}`, display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              style={{
                flex: 1, background: "rgba(255,255,255,0.06)", border: `1px solid ${COLORS.glassBorder}`,
                borderRadius: 12, padding: "10px 14px", color: "#fff", fontSize: 13, outline: "none",
              }}
            />
            <button onClick={send} style={{ background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`, border: "none", borderRadius: 12, padding: "10px 16px", cursor: "pointer", color: "#fff", fontSize: 16 }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ id, children, style = {} }) {
  return (
    <section id={id} style={{ position: "relative", zIndex: 1, padding: "100px 5vw", ...style }}>
      {children}
    </section>
  );
}

function SectionTitle({ label, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <div style={{ display: "inline-block", background: `linear-gradient(135deg, ${COLORS.pink}22, ${COLORS.purple}22)`, border: `1px solid ${COLORS.pink}44`, borderRadius: 20, padding: "4px 16px", fontSize: 12, color: COLORS.pink, letterSpacing: 2, marginBottom: 16, fontFamily: "'Orbitron', monospace" }}>
        {label}
      </div>
      <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontFamily: "'Orbitron', monospace", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>{sub}</p>}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeFaq, setActiveFaq] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const filters = ["All", "Logo Design", "Social Media", "Motion", "Website", "Branding", "Video"];
  const filteredPortfolio = activeFilter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(p => p.cat === activeFilter);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const bgColor = darkMode ? COLORS.bg : "#0a0a14";

  return (
    <div style={{ background: bgColor, minHeight: "100vh", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.purple}; border-radius: 2px; }
        @keyframes chatPulse { 0%,100%{box-shadow:0 0 30px ${COLORS.pink}88,0 0 60px ${COLORS.purple}44} 50%{box-shadow:0 0 50px ${COLORS.pink}cc,0 0 90px ${COLORS.purple}66} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px ${COLORS.pink}44} 50%{box-shadow:0 0 50px ${COLORS.pink}99,0 0 80px ${COLORS.purple}44} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes textShimmer { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes heroGlow { 0%,100%{text-shadow:0 0 40px ${COLORS.pink}88} 50%{text-shadow:0 0 80px ${COLORS.pink}cc,0 0 120px ${COLORS.purple}55} }
        .service-card:hover { transform: translateY(-8px) scale(1.02) !important; }
        .portfolio-item:hover .overlay { opacity: 1 !important; }
        .nav-link:hover { color: ${COLORS.pink} !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <ParticleCanvas />
      <CustomCursor />
      <ScrollProgress />
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
      <AIChatbot />

      {/* ── HERO ── */}
      <section id="hero" style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "120px 5vw 60px" }}>
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${COLORS.purple}08 1px, transparent 1px), linear-gradient(90deg, ${COLORS.purple}08 1px, transparent 1px)`, backgroundSize: "60px 60px", zIndex: 0 }} />

        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.pink}18 0%, transparent 70%)`, top: "10%", left: "10%", filter: "blur(40px)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}18 0%, transparent 70%)`, bottom: "10%", right: "10%", filter: "blur(40px)", animation: "float 10s ease-in-out infinite reverse" }} />

        <div style={{ position: "relative", zIndex: 1, animation: "fadeInUp 1s ease forwards" }}>
          <div style={{ display: "inline-block", background: `linear-gradient(135deg, ${COLORS.pink}22, ${COLORS.purple}22)`, border: `1px solid ${COLORS.pink}44`, borderRadius: 20, padding: "4px 20px", fontSize: 12, color: COLORS.pink, letterSpacing: 3, marginBottom: 24, fontFamily: "'Orbitron', monospace" }}>
            ✦ FOUNDER OF TELENTSDIGITAL ✦
          </div>

          <h1 style={{
            fontFamily: "'Orbitron', monospace", fontWeight: 900,
            fontSize: "clamp(56px, 12vw, 130px)",
            lineHeight: 1,
            background: `linear-gradient(135deg, #fff 0%, ${COLORS.pink} 40%, ${COLORS.violet} 70%, ${COLORS.purple} 100%)`,
            backgroundSize: "200%",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "heroGlow 3s ease-in-out infinite, textShimmer 4s linear infinite",
            marginBottom: 8,
          }}>
            SIPAN.GFX
          </h1>

          <p style={{ fontSize: "clamp(14px, 2.5vw, 22px)", color: "rgba(255,255,255,0.7)", marginBottom: 24, letterSpacing: 2, fontFamily: "'Orbitron', monospace", fontWeight: 400 }}>
            Creative Designer&nbsp;•&nbsp;Digital Marketer&nbsp;•&nbsp;Agency Owner
          </p>

          <p style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Helping Brands Grow Through Design, Content, SEO, Social Media &amp; Performance Marketing.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "⚡ Hire Me", href: "#contact", primary: true },
              { label: "◈ View Portfolio", href: "#portfolio", primary: false },
              { label: "✉ Contact Me", href: "#contact", primary: false },
            ].map(btn => (
              <a key={btn.label} href={btn.href} onClick={e => { e.preventDefault(); document.querySelector(btn.href)?.scrollIntoView({ behavior: "smooth" }); }} style={{
                display: "inline-block", padding: "14px 32px", borderRadius: 32, textDecoration: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all 0.3s",
                background: btn.primary ? `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})` : "transparent",
                border: btn.primary ? "none" : `1px solid ${COLORS.purple}66`,
                color: "#fff",
                boxShadow: btn.primary ? `0 0 30px ${COLORS.pink}55` : "none",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = btn.primary ? `0 0 50px ${COLORS.pink}88` : `0 0 20px ${COLORS.purple}44`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = btn.primary ? `0 0 30px ${COLORS.pink}55` : "none"; }}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float 2s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${COLORS.pink}, transparent)` }} />
          <span style={{ fontSize: 11, color: COLORS.pink, letterSpacing: 2 }}>SCROLL</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <Section id="about">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
          {/* Profile image area */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 280, height: 280 }}>
              <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: `conic-gradient(${COLORS.pink}, ${COLORS.purple}, ${COLORS.violet}, ${COLORS.pink})`, animation: "spin 4s linear infinite" }} />
              <div style={{ position: "absolute", inset: 2, borderRadius: "50%", background: bgColor }} />
              <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.pink}22, ${COLORS.purple}22)`, border: `1px solid ${COLORS.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 72 }}>👨‍🎨</div>
                <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 13, background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SIPAN SARKAR</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div style={{ display: "inline-block", background: `linear-gradient(135deg, ${COLORS.pink}22, ${COLORS.purple}22)`, border: `1px solid ${COLORS.pink}44`, borderRadius: 20, padding: "4px 16px", fontSize: 12, color: COLORS.pink, letterSpacing: 2, marginBottom: 20, fontFamily: "'Orbitron', monospace" }}>
              ABOUT ME
            </div>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, marginBottom: 20, lineHeight: 1.2 }}>
              I Build Brands That <span style={{ background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Actually Scale.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>
              I'm <strong style={{ color: "#fff" }}>SIPAN SARKAR</strong> — Graphic Designer, Digital Marketing Specialist, SEO Expert, and Founder of <strong style={{ color: COLORS.pink }}>TelentsDigital</strong>. Based in Agartala, Tripura, I craft brands that dominate markets and create digital ecosystems that convert.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Graphic Designer", "Brand Strategist", "SEO Expert", "Social Media", "Agency Founder", "Web Designer"].map(tag => (
                <span key={tag} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── SERVICES ── */}
      <Section id="services" style={{ background: `linear-gradient(180deg, transparent, ${COLORS.purple}08, transparent)` }}>
        <SectionTitle label="WHAT I DO" title="Premium Services" sub="End-to-end creative and marketing solutions for brands that refuse to be average." />
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card" style={{
              background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 20, padding: 24, cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${COLORS.pink}55`;
                e.currentTarget.style.boxShadow = `0 0 30px ${COLORS.pink}22, 0 20px 40px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = `1px solid ${COLORS.glassBorder}`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${[COLORS.pink, COLORS.purple, COLORS.violet][i % 3]}22, transparent)`, filter: "blur(20px)" }} />
              <div style={{ fontSize: 28, marginBottom: 12, background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, fontFamily: "'Orbitron', monospace", color: "#fff", lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PORTFOLIO ── */}
      <Section id="portfolio">
        <SectionTitle label="MY WORK" title="Portfolio" sub="A selection of projects that define the standard for creative excellence." />

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 48 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              background: activeFilter === f ? `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})` : COLORS.glass,
              border: activeFilter === f ? "none" : `1px solid ${COLORS.glassBorder}`,
              color: "#fff", borderRadius: 24, padding: "8px 20px", cursor: "pointer", fontSize: 13, fontWeight: activeFilter === f ? 700 : 400, transition: "all 0.3s",
            }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, maxWidth: 1200, margin: "0 auto" }}>
          {filteredPortfolio.map((item, i) => (
            <div key={i} className="portfolio-item" style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "4/3", background: `linear-gradient(135deg, ${item.color}22, ${COLORS.bg})`, border: `1px solid ${item.color}33` }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 48, opacity: 0.3 }}>◈</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>{item.cat}</div>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 15, fontWeight: 700, color: "#fff" }}>{item.title}</div>
              </div>
              <div className="overlay" style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${item.color}cc, ${COLORS.purple}cc)`, opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 20 }}>🔍</div>
                <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 16 }}>{item.title}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{item.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── AGENCY ── */}
      <Section id="agency" style={{ background: `linear-gradient(180deg, transparent, ${COLORS.pink}06, transparent)` }}>
        <SectionTitle label="THE AGENCY" title="TelentsDigital" sub="A full-service creative and marketing agency built for brands that want to dominate." />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Stats */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 64 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 20, padding: "32px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.purple})` }} />
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
                  <Counter val={s.val} suffix={s.suffix} />
                </div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Agency services */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {["Branding", "Content Creation", "SEO", "Social Media Growth", "Performance Marketing", "Web Development"].map((s, i) => (
              <div key={i} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: "20px", textAlign: "center", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{["🎨", "📱", "🔍", "📈", "💰", "🌐"][i]}</div>
                {s}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <Section id="testimonials">
        <SectionTitle label="SOCIAL PROOF" title="What Clients Say" />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 24, padding: 48, textAlign: "center", minHeight: 220, transition: "all 0.5s" }}>
            <div style={{ fontSize: 24, marginBottom: 16, color: COLORS.pink }}>{"★".repeat(TESTIMONIALS[testimonialIdx].rating)}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", marginBottom: 28, fontStyle: "italic" }}>
              "{TESTIMONIALS[testimonialIdx].text}"
            </p>
            <div style={{ fontWeight: 700, color: "#fff" }}>{TESTIMONIALS[testimonialIdx].name}</div>
            <div style={{ fontSize: 13, color: COLORS.purple, marginTop: 4 }}>{TESTIMONIALS[testimonialIdx].role}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} style={{ width: i === testimonialIdx ? 28 : 8, height: 8, borderRadius: 4, background: i === testimonialIdx ? `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})` : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <SectionTitle label="FAQ" title="Frequently Asked" sub="Everything you need to know before working together." />
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ background: COLORS.glass, border: `1px solid ${activeFaq === i ? COLORS.pink + "55" : COLORS.glassBorder}`, borderRadius: 16, overflow: "hidden", transition: "all 0.3s" }}>
              <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", color: "#fff", padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, fontWeight: 600, textAlign: "left" }}>
                {f.q}
                <span style={{ color: COLORS.pink, fontSize: 20, transform: activeFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}>+</span>
              </button>
              {activeFaq === i && (
                <div style={{ padding: "0 24px 20px", color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" style={{ background: `linear-gradient(180deg, transparent, ${COLORS.purple}08, transparent)` }}>
        <SectionTitle label="LET'S WORK" title="Get In Touch" sub="Ready to build something extraordinary? Let's talk." />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1000, margin: "0 auto" }}>
          {/* Contact info */}
          <div>
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, marginBottom: 32, fontWeight: 700 }}>Direct Contact</h3>
            {[
              { icon: "📞", label: "Phone", val: "8415873637", href: "tel:8415873637" },
              { icon: "✉", label: "Email", val: "work.sipansarkar@gmail.com", href: "mailto:work.sipansarkar@gmail.com" },
              { icon: "📸", label: "Instagram", val: "@sipan.gfx", href: "https://instagram.com/sipan.gfx" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, marginBottom: 12, textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${COLORS.pink}44`; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${COLORS.glassBorder}`; e.currentTarget.style.transform = ""; }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.pink, letterSpacing: 1, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ color: "#fff", fontSize: 14 }}>{c.val}</div>
                </div>
              </a>
            ))}

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <a href="https://wa.me/918415873637" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: "center", padding: "12px 20px", background: "#25D366", borderRadius: 16, textDecoration: "none", color: "#fff", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                💬 WhatsApp
              </a>
              <a href="tel:8415873637" style={{ flex: 1, textAlign: "center", padding: "12px 20px", background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`, borderRadius: 16, textDecoration: "none", color: "#fff", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                📞 Call Now
              </a>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 24, padding: 32 }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name", placeholder: "Your Name", type: "text" },
                  { key: "email", placeholder: "Your Email", type: "email" },
                  { key: "service", placeholder: "Service Needed", type: "text" },
                ].map(field => (
                  <input key={field.key} type={field.type} placeholder={field.placeholder} value={formData[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.glassBorder}`, borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none", width: "100%" }} />
                ))}
                <textarea placeholder="Your Message" value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={4} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.glassBorder}`, borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none", resize: "none", width: "100%" }} />
                <button onClick={() => { if (formData.name && formData.email) setSubmitted(true); }} style={{ background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`, border: "none", borderRadius: 16, padding: "16px", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: `0 0 30px ${COLORS.pink}44`, transition: "all 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  🚀 Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ── NEWSLETTER ── */}
      <Section id="newsletter" style={{ padding: "60px 5vw" }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.pink}15, ${COLORS.purple}15)`, border: `1px solid ${COLORS.purple}33`, borderRadius: 28, padding: "48px 40px", textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(20px, 3vw, 30px)", marginBottom: 12, fontWeight: 800 }}>Stay in the Loop</h3>
          <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 28, fontSize: 15 }}>Design tips, marketing hacks, and agency updates — no spam, ever.</p>
          {newsletterDone ? (
            <p style={{ color: COLORS.pink, fontWeight: 700 }}>✅ You're subscribed! Welcome to the tribe.</p>
          ) : (
            <div style={{ display: "flex", gap: 12, maxWidth: 420, margin: "0 auto" }}>
              <input value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="Enter your email" style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: `1px solid ${COLORS.glassBorder}`, borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none" }} />
              <button onClick={() => { if (newsletterEmail.includes("@")) setNewsletterDone(true); }} style={{ background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.purple})`, border: "none", borderRadius: 12, padding: "14px 20px", color: "#fff", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${COLORS.glassBorder}`, padding: "40px 5vw", textAlign: "center" }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 28, background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 12 }}>
          SIPAN.GFX
        </div>
        <p style={{ color: COLORS.pink, fontSize: 14, letterSpacing: 2, marginBottom: 20, fontFamily: "'Orbitron', monospace" }}>Design. Market. Scale.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
          {[
            { label: "📞 8415873637", href: "tel:8415873637" },
            { label: "✉ work.sipansarkar@gmail.com", href: "mailto:work.sipansarkar@gmail.com" },
            { label: "📸 @sipan.gfx", href: "https://instagram.com/sipan.gfx" },
          ].map(l => (
            <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = COLORS.pink}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
          SIPAN.GFX © 2026 &nbsp;|&nbsp; Powered by <span style={{ color: COLORS.purple }}>TelentsDigital</span>
        </div>
      </footer>
    </div>
  );
}
