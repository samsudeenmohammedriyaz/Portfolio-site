/* eslint-disable no-unused-vars */
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import resumePDF from './Samsudeen Mohammed Riyaz resume.pdf';

const ease = [0.25, 0.46, 0.45, 0.94];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay }} style={style}>
      {children}
    </motion.div>
  );
}

function StaggerChildren({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
      style={style}>
      {children}
    </motion.div>
  );
}

const childVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } }
};

export default function App() {
  const sections = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'];
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const skills = [
    { category: 'Languages', icon: '⟨/⟩', items: ['Java', 'JavaScript', 'Python'] },
    { category: 'Databases', icon: '◈', items: ['MySQL', 'MongoDB'] },
    { category: 'Frameworks', icon: '⬡', items: ['ReactJS', 'NodeJS', 'Express.js'] },
    { category: 'Operating Systems', icon: '◻', items: ['Windows', 'macOS'] },
    { category: 'Version Control', icon: '⎇', items: ['Git', 'GitHub'] },
    { category: 'Tools & Design', icon: '✦', items: ['Tailwind CSS', 'Vite', 'Eclipse'] },
  ];

  const experiences = [
    {
      company: 'IntWhizz Business Solutions', role: 'Full Stack Developer',
      period: 'Aug 2025 – Present', location: 'Tirunelveli, India', current: true,
      highlights: [
        'Designed and developed a real-world Egg Management System using the MERN stack end-to-end',
        'Built responsive UI with React.js and Tailwind CSS, focusing on clean structure and seamless UX',
        'Created RESTful APIs with Node.js and Express.js for inventory management and authentication',
        'Implemented MongoDB schemas, CRUD operations, and data optimization strategies',
        'Delivered multiple static and semi-dynamic websites using React.js and Tailwind CSS'
      ]
    },
    {
      company: 'MavePizon Technologies', role: 'Full Stack Developer',
      period: 'Feb 2025 – Jul 2025', location: 'Tirunelveli, India', current: false,
      highlights: [
        'Led development of a Barber Shop Management System using MERN stack, streamlining operations',
        'Designed interactive dashboards with React.js and Tailwind CSS for clarity and responsiveness',
        'Implemented appointment booking, service listing, customer profiles, and admin controls',
        'Built scalable RESTful APIs with Node.js and Express.js for logic and authentication',
        'Designed MongoDB schemas, managed collections, and optimized queries for performance'
      ]
    }
  ];

  const projects = [
    { name: 'Employee Management System', desc: 'Frontend system built with Angular 16 featuring modular components, services, and routing with comprehensive CRUD workflows.', tech: ['Angular', 'TypeScript', 'CSS'], link: 'https://github.com/samsudeenmohammedriyaz/Employee-Management-System' },
    { name: 'Amazon Product Management', desc: 'Java-based e-commerce inspired system for product inventory and admin operations built with OOP principles and clean architecture.', tech: ['Java', 'OOP'], link: 'https://github.com/samsudeenmohammedriyaz/Amazon-Product-Management-System' },
    { name: 'CRUD Application', desc: 'Database-driven application demonstrating fundamental CRUD operations with MySQL integration and efficient data management.', tech: ['Java', 'MySQL'], link: null },
    { name: 'Rock-Paper-Scissors', desc: 'Interactive game demonstrating core programming logic, conditional flows, and user interaction with randomized gameplay.', tech: ['JavaScript'], link: 'https://github.com/samsudeenmohammedriyaz/Rock-Paper-Scissor-Game' },
    { name: 'Rock-Paper-Scissors MERN', desc: 'Full-stack animated version featuring responsive design, Tailwind CSS styling, and real-time feedback on every interaction.', tech: ['MERN', 'Tailwind CSS'], link: 'https://github.com/samsudeenmohammedriyaz/Rock-Paper-Scissor-Game' },
    { name: 'Personal Portfolio', desc: 'Modern portfolio built with React.js and Vite showcasing projects and skills with component-based architecture and animations.', tech: ['React', 'Vite'], link: 'https://github.com/samsudeenmohammedriyaz/Portfolio' },
    { name: 'Tutor Booking Platform', desc: 'Platform connecting students with tutors, featuring appointment management and user-friendly booking interfaces.', tech: ['MERN Stack'], link: null },
  ];

  const achievements = [
    { title: 'Full Stack Development Certification', desc: 'Professional training from Accord Info Matrix covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and MySQL.', icon: '🎓' },
    { title: 'Academic Excellence', desc: 'B.E. in Computer Science & Engineering with CGPA 7.63 from Einstein College of Engineering (2020–2024).', icon: '📚' },
    { title: 'Professional Development', desc: 'Hands-on industry experience at two tech companies, delivering production-ready full-stack applications.', icon: '💼' },
    { title: 'Diverse Project Portfolio', desc: 'Successfully developed 7+ applications spanning MERN stack, management systems, and interactive platforms.', icon: '🚀' },
  ];

  const navScrolled = scrollY > 50;

  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", background: '#FAFAFA', color: '#0D0D0D', minHeight: '100vh', fontSize: '115%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 20.24px; letter-spacing: 0.025em; line-height: 1.75; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: #DBEAFE; color: #1E3A8A; }

        .nav-item { position: relative; background: none; border: none; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 500; color: #6B7280; padding: 6px 0; transition: color 0.2s ease; letter-spacing: 0.04em; }
        .nav-item:hover { color: #0D0D0D; }
        .nav-item.active { color: #0D0D0D; }
        .nav-item::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px; background: #2563EB; transition: width 0.25s ease; border-radius: 1px; }
        .nav-item.active::after, .nav-item:hover::after { width: 100%; }

        .mobile-nav-item { background: none; border: none; cursor: pointer; font-family: inherit; font-size: 15px; font-weight: 500; color: #374151; padding: 14px 0; width: 100%; text-align: left; border-bottom: 1px solid #F3F4F6; transition: color 0.2s; letter-spacing: 0.04em; }
        .mobile-nav-item:hover, .mobile-nav-item.active { color: #2563EB; }
        .mobile-nav-item:last-child { border-bottom: none; }

        .card { background: #fff; border: 1px solid #EBEBEB; border-radius: 16px; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        .card:hover { border-color: #C7D7FD; box-shadow: 0 8px 32px rgba(37,99,235,0.07); }

        .tag { display: inline-block; padding: 4px 10px; background: #F0F4FF; border: 1px solid #E0E9FF; border-radius: 6px; font-size: 11px; font-weight: 600; color: #3B5BDB; letter-spacing: 0.06em; font-family: 'DM Mono', monospace; }

        .field label { display: block; font-size: 11.5px; font-weight: 700; color: #9CA3AF; margin-bottom: 7px; letter-spacing: 0.09em; text-transform: uppercase; }
        .field input, .field textarea { width: 100%; padding: 13px 16px; background: #F8F9FF; border: 1.5px solid #E8EDFF; border-radius: 12px; font-size: 14px; color: #0D0D0D; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; font-family: inherit; line-height: 1.75; letter-spacing: 0.02em; }
        .field input:focus, .field textarea:focus { border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.11); background: #fff; }
        .field input::placeholder, .field textarea::placeholder { color: #C4CADE; }
        .field textarea { resize: vertical; min-height: 120px; }

        .btn-primary { width: 100%; padding: 14px 24px; background: #1D4ED8; color: #fff; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-family: inherit; letter-spacing: 0.04em; }
        .btn-primary:hover { background: #1A44C2; }
        .btn-gh { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #0F172A; color: #fff; border-radius: 12px; font-size: 13.5px; font-weight: 600; text-decoration: none; transition: background 0.2s; letter-spacing: 0.04em; }
        .btn-gh:hover { background: #1E293B; }
        .btn-outline { display: inline-flex; align-items: center; gap: 6px; padding: 12px 24px; background: transparent; color: #374151; border: 1.5px solid #D5DBE8; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; letter-spacing: 0.04em; }
        .btn-outline:hover { border-color: #374151; background: #F5F5F5; }
        .btn-resume { display: inline-flex; align-items: center; gap: 6px; padding: 12px 24px; background: transparent; color: #2563EB; border: 1.5px solid #BFDBFE; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; letter-spacing: 0.04em; text-decoration: none; }
        .btn-resume:hover { border-color: #2563EB; background: #EFF6FF; }

        .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #2563EB; font-family: 'DM Mono', monospace; }
        .accent-line { display: block; width: 32px; height: 2px; background: linear-gradient(90deg, #2563EB, #7C3AED); border-radius: 99px; }

        .period-badge { display: inline-flex; align-items: center; padding: 5px 13px; background: #F0F4FF; border: 1px solid #DDE5FF; border-radius: 99px; font-size: 11.5px; font-weight: 600; color: #3B5BDB; white-space: nowrap; font-family: 'DM Mono', monospace; letter-spacing: 0.05em; }
        .current-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 11px; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 99px; font-size: 11px; font-weight: 600; color: #059669; letter-spacing: 0.03em; }
        .dot-pulse { width: 6px; height: 6px; background: #10B981; border-radius: 50%; animation: pulse-green 2s infinite; }
        @keyframes pulse-green { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 90% 55% at 50% -10%, rgba(219,234,254,0.55) 0%, transparent 65%); pointer-events: none; }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(ellipse 90% 65% at 50% 0%, black 20%, transparent 75%); pointer-events: none; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
        footer { border-top: 1px solid #EBEBEB; }

        /* ── RESPONSIVE STYLES ── */

        /* Desktop nav hidden on mobile, hamburger shown */
        .desktop-nav { display: flex; gap: 32px; align-items: center; }
        .hamburger-btn { display: none; background: none; border: 1.5px solid #E5E7EB; border-radius: 9px; padding: 7px 9px; cursor: pointer; color: #374151; transition: all 0.2s; }
        .hamburger-btn:hover { border-color: #2563EB; color: #2563EB; }

        /* Mobile menu overlay */
        .mobile-menu { display: none; position: fixed; top: 60px; left: 0; right: 0; background: rgba(250,250,250,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid #EBEBEB; z-index: 49; padding: 8px 24px 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
        .mobile-menu.open { display: block; }

        /* About grid */
        .about-grid { display: grid; grid-template-columns: 1fr 240px; gap: 14px; align-items: stretch; }
        /* Skills grid */
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        /* Projects grid */
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        /* Achievements grid */
        .achievements-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        /* Contact cards grid */
        .contact-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
        /* Footer inner */
        .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        /* Hero info pills */
        .hero-pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 40px; }
        /* Hero CTA buttons */
        .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        /* Experience header */
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 26px; flex-wrap: wrap; }

        /* ── TABLET (≤ 900px) ── */
        @media (max-width: 900px) {
          html { font-size: 18px; }
          .desktop-nav { display: none; }
          .hamburger-btn { display: flex; align-items: center; justify-content: center; }
          .about-grid { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .achievements-grid { grid-template-columns: 1fr 1fr; }
          .contact-cards-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── MOBILE (≤ 600px) ── */
        @media (max-width: 600px) {
          html { font-size: 16px; }
          .skills-grid { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
          .achievements-grid { grid-template-columns: 1fr; }
          .contact-cards-grid { grid-template-columns: 1fr; }
          .hero-pills { flex-direction: column; align-items: center; }
          .hero-ctas { flex-direction: column; align-items: center; width: 100%; }
          .hero-ctas > * { width: 100%; justify-content: center; }
          .exp-header { flex-direction: column; gap: 10px; }
          .footer-inner { flex-direction: column; align-items: flex-start; }
          .section-pad { padding: 72px 20px !important; }
          .hero-pad { padding: 100px 20px 72px !important; }
          .nav-pad { padding: 0 20px !important; }
          .about-pad { padding: 72px 20px !important; }
          .period-badge { font-size: 10.5px; }
        }

        /* ── SMALL MOBILE (≤ 400px) ── */
        @media (max-width: 400px) {
          html { font-size: 15px; }
          .btn-gh, .btn-outline, .btn-resume { padding: 10px 18px; font-size: 12.5px; }
          .contact-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Progress bar */}
      <motion.div style={{ scaleX, transformOrigin: '0%', position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #2563EB, #7C3AED)', zIndex: 100 }} />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 22, delay: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: navScrolled ? 'rgba(250,250,250,0.93)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(20px) saturate(160%)' : 'none',
          borderBottom: navScrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}>
        <div className="nav-pad" style={{ maxWidth: 1160, margin: '0 auto', padding: '0 40px', height: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          </motion.button>

          {/* Desktop nav */}
          <nav className="desktop-nav">
            {sections.map((s, i) => (
              <motion.button key={s} onClick={() => scrollTo(s)}
                className={`nav-item${activeSection === s ? ' active' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </motion.button>
            ))}
          </nav>

          {/* Hamburger */}
          <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            {menuOpen
              ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {sections.map(s => (
            <button key={s} onClick={() => scrollTo(s)}
              className={`mobile-nav-item${activeSection === s ? ' active' : ''}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="home" className="hero-pad" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div style={{ maxWidth: 700, textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease }} style={{ marginBottom: 28 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 16px', background: '#fff', border: '1px solid #E0E9FF', borderRadius: 99, fontSize: 12, fontWeight: 600, color: '#2563EB', boxShadow: '0 2px 12px rgba(37,99,235,0.1)', letterSpacing: '0.04em' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Full Stack Developer — MERN Stack
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.12 }}
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(36px, 8vw, 72px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 20, color: '#0D0D0D' }}>
            Samsudeen Mohammed{' '}
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Riyaz</em> . S
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.26 }}
            style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.9, maxWidth: 460, margin: '0 auto 32px', letterSpacing: '0.02em' }}>
            Crafting elegant digital experiences with modern web technologies. Passionate about building intuitive, scalable applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38, duration: 0.5 }}
            className="hero-pills">
            {[
              { icon: '📞', text: '+91 9382093530' },
              { icon: '✉️', text: 'samsudeenmohammedriyaz@gmail.com' },
              { icon: '📍', text: 'Tirunelveli, India' },
            ].map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#9CA3AF', background: '#fff', border: '1px solid #EBEBEB', padding: '6px 14px', borderRadius: 99, letterSpacing: '0.02em' }}>
                <span style={{ fontSize: 13 }}>{item.icon}</span> {item.text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="hero-ctas">
            <motion.a href="https://github.com/samsudeenmohammedriyaz" target="_blank" rel="noopener noreferrer" className="btn-gh" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
              View GitHub
            </motion.a>
            <motion.button onClick={() => scrollTo('contact')} className="btn-outline" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Get in Touch
              <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </motion.button>
            <motion.a href={resumePDF} download="Samsudeen Mohammed Riyaz Resume.pdf" className="btn-resume" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        <motion.div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: '#C4CADE', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="16" height="16" fill="none" stroke="#C9D0E0" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" /></svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-pad" style={{ padding: '96px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Introduction</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.025em', marginBottom: 14 }}>About Me</h2>
            <span className="accent-line" style={{ margin: '0 auto' }} />
          </FadeUp>

          <div className="about-grid">
            <FadeUp delay={0.08} style={{ display: 'flex' }}>
              <div className="card" style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.95, marginBottom: 16, letterSpacing: '0.02em' }}>
                  A passionate Software Developer with a{' '}
                  <strong style={{ color: '#0D0D0D', fontWeight: 700 }}>Bachelor of Engineering in Computer Science</strong>{' '}
                  from Einstein College of Engineering, Tirunelveli, India.
                </p>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.95, letterSpacing: '0.02em' }}>
                  Graduated with a CGPA of 7.63 (2020–2024), I specialize in{' '}
                  <span style={{ color: '#2563EB', fontWeight: 600 }}>full-stack development</span>{' '}
                  with deep expertise in the MERN stack, Java, and building responsive, user-centric applications that deliver real value.
                </p>
              </div>
            </FadeUp>

            <StaggerChildren delay={0.14} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Degree', value: 'B.E. CSE' },
                { label: 'CGPA', value: '7.63 / 10' },
                { label: 'Location', value: 'Tirunelveli, IN' },
                { label: 'Specialization', value: 'MERN Stack' },
              ].map((item, i) => (
                <motion.div key={i} variants={childVariant} className="card" style={{ padding: '14px 20px', flex: 1 }} whileHover={{ x: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#C4CADE', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: 5, fontFamily: "'DM Mono', monospace" }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', letterSpacing: '0.01em' }}>{item.value}</div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section-pad" style={{ padding: '112px 40px', background: '#FAFAFA' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Expertise</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.025em', marginBottom: 16 }}>Skills & Technologies</h2>
            <span className="accent-line" style={{ margin: '0 auto' }} />
          </FadeUp>
          <StaggerChildren delay={0.05} style={{}}>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <motion.div key={i} variants={childVariant} className="card" style={{ padding: 28 }} whileHover={{ y: -5, borderColor: '#C7D7FD', boxShadow: '0 12px 40px rgba(37,99,235,0.09)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 20 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #EFF6FF, #F0F4FF)', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#2563EB', fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{skill.icon}</div>
                    <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0D0D0D', letterSpacing: '0.02em' }}>{skill.category}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {skill.items.map((item, j) => (
                      <motion.div key={j} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.06, duration: 0.4, ease }}
                        style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: '#4B5563', letterSpacing: '0.02em' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#93C5FD', flexShrink: 0 }} />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section-pad" style={{ padding: '112px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Career</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.025em', marginBottom: 16 }}>Work Experience</h2>
            <span className="accent-line" style={{ margin: '0 auto' }} />
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {experiences.map((exp, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="card" style={{ padding: 36 }}>
                  <div className="exp-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0D0D0D', letterSpacing: '0.01em' }}>{exp.role}</h3>
                        {exp.current && (<span className="current-badge"><span className="dot-pulse" />Current</span>)}
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 3, letterSpacing: '0.02em' }}>{exp.company}</p>
                      <p style={{ fontSize: 12, color: '#9CA3AF', fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>{exp.location}</p>
                    </div>
                    <span className="period-badge">{exp.period}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {exp.highlights.map((h, j) => (
                      <motion.div key={j} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.055, duration: 0.4, ease }}
                        style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ width: 20, height: 20, borderRadius: 6, background: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <svg style={{ width: 10, height: 10, color: '#2563EB' }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <p style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.85, letterSpacing: '0.02em' }}>{h}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-pad" style={{ padding: '112px 40px', background: '#FAFAFA' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Portfolio</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.025em', marginBottom: 16 }}>Featured Projects</h2>
            <span className="accent-line" style={{ margin: '0 auto' }} />
          </FadeUp>
          <StaggerChildren delay={0.04} style={{}}>
            <div className="projects-grid">
              {projects.map((project, i) => (
                <motion.div key={i} variants={childVariant} className="card" style={{ padding: 26, display: 'flex', flexDirection: 'column' }} whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(37,99,235,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #EFF6FF, #F0F4FF)', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg style={{ width: 16, height: 16, color: '#2563EB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    {project.link ? (
                      <motion.a href={project.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08 }}
                        style={{ width: 30, height: 30, borderRadius: 8, background: '#F5F5F5', border: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', textDecoration: 'none', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.borderColor = '#DBEAFE'; e.currentTarget.style.color = '#2563EB'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F5F5F5'; e.currentTarget.style.borderColor = '#EBEBEB'; e.currentTarget.style.color = '#9CA3AF'; }}>
                        <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </motion.a>
                    ) : (
                      <span style={{ fontSize: 10.5, color: '#B0B8C9', fontWeight: 600, padding: '4px 9px', background: '#F5F5F5', borderRadius: 6, fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>Private</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 8, letterSpacing: '0.01em', lineHeight: 1.5 }}>{project.name}</h3>
                  <p style={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.85, flex: 1, marginBottom: 16, letterSpacing: '0.02em' }}>{project.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.tech.map((t, j) => <span key={j} className="tag">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="section-pad" style={{ padding: '112px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Recognition</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.025em', marginBottom: 16 }}>Achievements</h2>
            <span className="accent-line" style={{ margin: '0 auto' }} />
          </FadeUp>
          <div className="achievements-grid">
            {achievements.map((a, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div className="card" style={{ padding: 30, height: '100%' }} whileHover={{ y: -4 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0D0D0D', marginBottom: 8, letterSpacing: '0.01em', lineHeight: 1.5 }}>{a.title}</h3>
                  <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.85, letterSpacing: '0.02em' }}>{a.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ padding: '112px 40px', background: '#FAFAFA' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Get in Touch</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.025em', marginBottom: 16 }}>Let's Connect</h2>
            <span className="accent-line" style={{ margin: '0 auto 18px' }} />
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.85, letterSpacing: '0.02em' }}>Open for collaborations, exciting opportunities, and innovative projects.</p>
          </FadeUp>

          <StaggerChildren delay={0.04} style={{}}>
            <div className="contact-cards-grid">
              {[
                { label: 'Email', value: 'samsudeenmohammedriyaz@gmail.com', link: 'mailto:samsudeenmohammedriyaz@gmail.com', icon: <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                { label: 'Phone', value: '+91 9382093530', link: 'tel:+919382093530', icon: <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
                { label: 'GitHub', value: 'samsudeenmohammedriyaz', link: 'https://github.com/samsudeenmohammedriyaz', icon: <svg style={{ width: 18, height: 18 }} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg> },
              ].map((c, i) => (
                <motion.a key={i} href={c.link} target={c.link.startsWith('http') ? '_blank' : undefined} rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  variants={childVariant} className="card" style={{ padding: '20px 14px', textAlign: 'center', textDecoration: 'none', display: 'block' }} whileHover={{ y: -4 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#2563EB' }}>{c.icon}</div>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: '#C4CADE', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: 5, fontFamily: "'DM Mono', monospace" }}>{c.label}</p>
                  <p style={{ fontSize: 10.5, fontWeight: 600, color: '#374151', wordBreak: 'break-word', lineHeight: 1.65, letterSpacing: '0.02em' }}>{c.value}</p>
                </motion.a>
              ))}
            </div>
          </StaggerChildren>

          <FadeUp delay={0.18}>
            <div className="card" style={{ padding: 36 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0D0D0D', marginBottom: 28, textAlign: 'center', letterSpacing: '0.01em' }}>Send a Message</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="field"><label>Your Name</label><input type="text" placeholder="John Doe" /></div>
                <div className="field"><label>Your Email</label><input type="email" placeholder="john@example.com" /></div>
                <div className="field"><label>Your Message</label><textarea rows={5} placeholder="Tell me about your project or opportunity..." /></div>
                <motion.button className="btn-primary" whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }}>
                  Send Message →
                </motion.button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '28px 40px' }}>
        <div className="footer-inner">
          <div>
            <p style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: 3, letterSpacing: '0.02em' }}>© 2026 Samsudeen Mohammed Riyaz S</p>
            <p style={{ fontSize: 12, color: '#C4CADE', letterSpacing: '0.02em' }}>Designed & Developed with passion</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {[
              { href: 'https://github.com/samsudeenmohammedriyaz', icon: <svg style={{ width: 17, height: 17 }} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg> },
              { href: 'mailto:samsudeenmohammedriyaz@gmail.com', icon: <svg style={{ width: 17, height: 17 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
            ].map((item, i) => (
              <motion.a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.12, y: -2 }}
                style={{ width: 36, height: 36, borderRadius: 9, background: '#F5F5F5', border: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.borderColor = '#DBEAFE'; e.currentTarget.style.color = '#2563EB'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F5F5F5'; e.currentTarget.style.borderColor = '#EBEBEB'; e.currentTarget.style.color = '#9CA3AF'; }}>
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}