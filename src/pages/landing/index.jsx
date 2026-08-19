import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import {
  FiClock,
  FiType,
  FiMonitor,
  FiActivity,
  FiZap,
  FiArrowRight,
  FiMenu,
  FiX,
  FiLayers,
  FiRadio,
  FiMic,
  FiShield,
  FiUsers,
  FiPlay,
  FiExternalLink,
  FiCheckCircle,
  FiTrendingUp,
  FiGrid,
  FiTv,
  FiSmartphone,
  FiCopy,
  FiInstagram,
} from 'react-icons/fi';
import { FaWhatsapp, FaQrcode } from 'react-icons/fa';
import './landing.css';

const LandingGlobalStyle = createGlobalStyle`
  body {
    display: block !important;
    place-items: unset;
  }
  #root {
    width: 100%;
    min-height: 100vh;
  }
`;

const FEATURES = [
  {
    icon: FiClock,
    title: 'Relógios & Tempo',
    desc: 'Relógios digitais e previsão do tempo ao vivo para todos os programas da rádio, com atualização automática.',
    color: 'indigo',
  },
  {
    icon: FiType,
    title: 'GC & Let',
    desc: 'Nome do locutor ou convidado direto pela URL com query string, com fallback para o valor salvo no dispositivo.',
    color: 'sky',
  },
  {
    icon: FiLayers,
    title: 'Lower Thirds',
    desc: 'Barras inferiores elegantes para identificar convidados, quadros e chamadas durante a programação.',
    color: 'emerald',
  },
  {
    icon: FiInstagram,
    title: 'WhatsApp & Instagram',
    desc: 'Cartões de mídia social sempre na tela para incentivar a interação com o ouvinte e o seguidor.',
    color: 'green',
  },
  {
    icon: FiActivity,
    title: 'Esportes',
    desc: 'Placares, resultados e live scores para a cobertura esportiva em tempo real, sem trabalho manual.',
    color: 'amber',
  },
  {
    icon: FiMonitor,
    title: 'Cenas & Páginas',
    desc: 'Câmeras, QR codes, pins, radar, alertas e páginas de programação prontos para qualquer cenário.',
    color: 'rose',
  },
];

const STATS = [
  {
    icon: FiLayers,
    value: '70+',
    desc: 'Componentes prontos',
  },
  {
    icon: FiGrid,
    value: '16',
    desc: 'Programas e temas',
  },
  {
    icon: FiZap,
    value: 'URL direta',
    desc: 'Pronto para o OBS',
  },
  {
    icon: FiSmartphone,
    value: 'Parâmetros',
    desc: 'Nome e local via URL',
  },
];

const PROGRAMS = [
  'ACORDA ZONA SUL',
  'MISTURA BOA',
  'PENSAR NEGÓCIOS',
  'NOTÍCIAS DA PELOTENSE',
  'CORRESPONDENTE',
  'VOZES DA ZONA SUL',
  'CORPO E MENTE',
  'CULTURA EM CENA',
  'PELOTAS MERECE',
  'ATUALIDADES ESPORTIVAS',
  'RADAR MUSICAL',
  'JORNAL DA TARDE',
  'PAPO DA HORA',
  'RESENHA ESPORTIVA',
  'CONEXÃO',
  'DEBATE REGIONAL',
];

const STEPS = [
  {
    icon: FiExternalLink,
    title: 'Escolha o componente',
    desc: 'Abra a página de testes e encontre o componente ideal para a sua cena.',
  },
  {
    icon: FiCopy,
    title: 'Copie a URL',
    desc: 'Ajuste parâmetros como nome e local e copie a URL pronta do componente.',
  },
  {
    icon: FiTv,
    title: 'Adicione no OBS',
    desc: 'Cole a URL em uma Browser Source e pronto: o overlay entra no ar.',
  },
];

const PREVIEW_CATS = [
  {
    title: 'Default Novo',
    accent: '#6366f1',
    items: [
      { kind: 'clock', label: '10:42' },
      { kind: 'gc', label: 'NOME' },
      { kind: 'lower', label: '' },
    ],
  },
  {
    title: 'Mistura Boa',
    accent: '#38bdf8',
    items: [
      { kind: 'clock', label: '08:15' },
      { kind: 'social', label: '' },
      { kind: 'pin', label: '' },
    ],
  },
  {
    title: 'Esportes',
    accent: '#f59e0b',
    items: [
      { kind: 'score', label: '2 x 1' },
      { kind: 'gc', label: 'NARRADOR' },
      { kind: 'lower', label: '' },
    ],
  },
  {
    title: 'Tempo',
    accent: '#10b981',
    items: [
      { kind: 'temp', label: '21°' },
      { kind: 'temp', label: '18°' },
      { kind: 'temp', label: '24°' },
    ],
  },
  {
    title: 'Lower',
    accent: '#f43f5e',
    items: [
      { kind: 'lower', label: '' },
      { kind: 'gc', label: 'CONVIDADO' },
      { kind: 'lower', label: '' },
    ],
  },
  {
    title: 'Mídias',
    accent: '#22c55e',
    items: [
      { kind: 'social', label: '' },
      { kind: 'qr', label: '' },
      { kind: 'social', label: '' },
    ],
  },
];

function MiniOverlay({ kind, label }) {
  if (kind === 'clock') {
    return (
      <span className="lt-mini lt-mini-clock">
        <FiClock size={10} /> {label}
      </span>
    );
  }
  if (kind === 'gc') {
    return <span className="lt-mini lt-mini-gc">{label}</span>;
  }
  if (kind === 'lower') {
    return <span className="lt-mini lt-mini-lower" />;
  }
  if (kind === 'score') {
    return <span className="lt-mini lt-mini-score">{label}</span>;
  }
  if (kind === 'temp') {
    return (
      <span className="lt-mini lt-mini-temp">
        <FiClock size={9} /> {label}
      </span>
    );
  }
  if (kind === 'social') {
    return <span className="lt-mini lt-mini-social"><FaWhatsapp size={11} /></span>;
  }
  if (kind === 'qr') {
    return <span className="lt-mini lt-mini-qr" />;
  }
  return <span className="lt-mini lt-mini-pin" />;
}

function BrowserMockup() {
  return (
    <div className="landing-mockup-wrap">
      <div className="landing-mockup">
        <div className="landing-mockup-bar">
          <span className="landing-mockup-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="landing-mockup-url">
            <FiShield size={12} /> pelotense-assets.netlify.app/testes
          </span>
          <span className="landing-mockup-bell">
            <FiZap size={14} />
          </span>
        </div>
        <div className="landing-mockup-screen landing-mockup-tests">
          <div className="lt-head">
            <div className="lt-title-block">
              <span className="lt-tag">
                <FiGrid size={10} /> Testes de Componentes
              </span>
              <strong>Explore todos os overlays</strong>
            </div>
            <span className="lt-search">
              <FiType size={11} /> Buscar componente
            </span>
          </div>

          <div className="lt-stats">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.value} className="lt-stat">
                  <span className="lt-stat-icon">
                    <Icon size={13} />
                  </span>
                  <div>
                    <strong>{s.value}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lt-cats">
            {PREVIEW_CATS.map((c) => (
              <div key={c.title} className="lt-cat">
                <div className="lt-cat-head">
                  <span className="lt-cat-dot" style={{ background: c.accent }} />
                  <strong>{c.title}</strong>
                </div>
                <div className="lt-cat-items">
                  {c.items.map((it, i) => (
                    <MiniOverlay key={i} kind={it.kind} label={it.label} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="landing-float landing-float-wa">
        <span className="landing-float-icon wa">
          <FaWhatsapp size={16} />
        </span>
        <div>
          <strong>Overlay novo</strong>
          <span>adicionado à cena</span>
        </div>
      </div>

      <div className="landing-float landing-float-tempo">
        <span className="landing-float-icon tempo">
          <FiClock size={16} />
        </span>
        <div>
          <strong>Tempo ao vivo</strong>
          <span>atualização automática</span>
        </div>
      </div>

      <div className="landing-float landing-float-badge">
        <span className="landing-float-icon badge">
          <FiPlay size={16} />
        </span>
        <div>
          <strong>No ar</strong>
          <span>pronto para transmitir</span>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const els = document.querySelectorAll('.landing-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('landing-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <LandingGlobalStyle />

      <header className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-brand">
            <span className="landing-brand-name">
              Rádio <strong>Pelotense</strong>
            </span>
          </div>

          <nav className={`landing-menu ${menuOpen ? 'open' : ''}`}>
            <a href="#recursos" onClick={(e) => scrollToSection(e, 'recursos')}>
              Recursos
            </a>
            <a href="#componentes" onClick={(e) => scrollToSection(e, 'componentes')}>
              Componentes
            </a>
            <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')}>
              Sobre
            </a>
            <Link to="/testes" className="landing-menu-cta">
              Testar componentes
            </Link>
          </nav>

          <button
            className="landing-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-glow" />
          <div className="landing-hero-inner">
            <div className="landing-hero-text">
              <span className="landing-badge">
                <FiRadio size={14} /> Assets OBS da Rádio Pelotense
              </span>
              <h1>
                Overlays prontos para a sua
                <br />
                <span className="landing-gradient">transmissão profissional.</span>
              </h1>
              <p className="landing-hero-sub">
                Relógios, tempo, GC, lower thirds, mídias sociais e esportes —
                tudo com URL direta e pronto para usar como Browser Source no OBS.
              </p>
              <div className="landing-hero-actions">
                <Link to="/testes" className="landing-btn landing-btn-primary">
                  Testar componentes <FiArrowRight size={16} />
                </Link>
                <a
                  href="#recursos"
                  onClick={(e) => scrollToSection(e, 'recursos')}
                  className="landing-btn landing-btn-ghost"
                >
                  Ver recursos
                </a>
              </div>
            </div>

            <BrowserMockup />

            <div className="landing-hero-stats">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.value} className="landing-hero-stat">
                    <span className="landing-hero-stat-icon">
                      <Icon size={16} />
                    </span>
                    <strong>{s.value}</strong>
                    <span>{s.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="recursos" className="landing-section landing-reveal">
          <div className="landing-section-head">
            <span className="landing-section-tag">Recursos</span>
            <h2>Tudo que a sua transmissão precisa</h2>
            <p>
              Componentes criados para o dia a dia da rádio, do relógio do
              programa ao placar do esporte.
            </p>
          </div>

          <div className="landing-features">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`landing-feature landing-feature-${f.color}`}
                >
                  <div className="landing-feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="componentes"
          className="landing-section landing-section-alt landing-reveal"
        >
          <div className="landing-section-head">
            <span className="landing-section-tag">Como usar</span>
            <h2>Do navegador para o ar em 3 passos</h2>
            <p>
              Nenhuma instalação: escolha, copie a URL e adicione no OBS como
              Browser Source.
            </p>
          </div>

          <div className="landing-steps">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="landing-step">
                  <span className="landing-step-num">{i + 1}</span>
                  <span className="landing-step-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="landing-programs">
            <span className="landing-programs-label">
              <FiMic size={14} /> Programas com versões próprias
            </span>
            <div className="landing-programs-tags">
              {PROGRAMS.map((p) => (
                <span key={p} className="landing-program-tag">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="landing-section-cta">
            <Link to="/testes" className="landing-btn landing-btn-primary landing-btn-lg">
              Explorar todos os componentes <FiArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section id="sobre" className="landing-section landing-reveal">
          <div className="landing-about">
            <div className="landing-about-text">
              <span className="landing-section-tag">Sobre</span>
              <h2>Feito para a Rádio Pelotense</h2>
              <p>
                O projeto de Assets OBS nasceu para deixar a transmissão da rádio
                mais profissional: cada programa tem sua identidade visual, com
                relógio, tempo, GC e mídias sociais padronizados e fáceis de
                atualizar.
              </p>
              <div className="landing-about-list">
                <div>
                  <FiCheckCircle size={16} /> Componentes leves e transparentes
                </div>
                <div>
                  <FiZap size={16} /> Atualização instantânea via URL
                </div>
                <div>
                  <FiUsers size={16} /> Tema próprio por programa
                </div>
              </div>
            </div>

            <div className="landing-about-card">
              <div className="landing-about-card-head">
                <FiMonitor size={20} />
                <span>Uma URL para cada cena</span>
              </div>
              <p>
                Cada overlay tem endereço próprio para o OBS. Com a página de
                testes você vê o componente ao vivo, ajusta nome e local e copia
                a URL exata para a sua cena — sem digitar nada.
              </p>
              <div className="landing-about-card-metrics">
                <div className="landing-about-metric">
                  <FaQrcode size={18} />
                  <div>
                    <strong>QR Code</strong>
                    <span>Link e texto pela URL</span>
                  </div>
                </div>
                <div className="landing-about-metric">
                  <FiTrendingUp size={18} />
                  <div>
                    <strong>Live Score</strong>
                    <span>Esportes em tempo real</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-cta landing-reveal">
          <div className="landing-cta-card">
            <div className="landing-cta-particles">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="landing-particle"
                  style={{
                    left: 4 + i * 13 + '%',
                    animationDelay: i * 0.55 + 's',
                    animationDuration: 4 + (i % 4) + 's',
                  }}
                />
              ))}
            </div>
            <h2>Pronto para colocar no ar?</h2>
            <p>Explore todos os componentes e comece a usar na sua transmissão.</p>
            <Link
              to="/testes"
              className="landing-btn landing-btn-primary landing-btn-lg"
            >
              Acessar página de testes <FiArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-brand">
            <span className="landing-brand-name">
              Rádio <strong>Pelotense</strong>
            </span>
          </div>
          <span className="landing-footer-copy">
            © 2026 Rádio Pelotense · Assets OBS
          </span>
        </div>
      </footer>
    </div>
  );
}