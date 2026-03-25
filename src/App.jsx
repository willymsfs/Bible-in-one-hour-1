import { useState, useEffect, useCallback } from "react";
import { covenants, intro, summaryTable, conclusion } from "./data/covenants.js";
import "./styles/app.css";

function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen">
      <div className="intro-content">
        <div className="intro-badge">JOHN BERGSMA · BIBLE BASICS FOR CATHOLICS</div>
        <h1 className="intro-title">{intro.title}</h1>
        <p className="intro-subtitle">{intro.subtitle}</p>
        <div className="intro-divider" />
        <p className="intro-author">{intro.author}</p>
        <p className="intro-institution">{intro.institution}</p>

        <div className="intro-covenants-list">
          {covenants.map((c, i) => (
            <span key={i} className="intro-cov-tag" style={{ color: c.color }}>
              {c.shortName}
            </span>
          ))}
        </div>

        <blockquote className="intro-quote">{intro.tagline}</blockquote>

        <button className="intro-start-btn" onClick={onStart}>
          Begin the Journey →
        </button>
      </div>

      <div className="intro-key-section">
        <div className="key-card">
          <h3 className="key-title">The Master Key: COVENANT</h3>
          <p className="key-def">{intro.masterKey.definition}</p>
          <div className="key-examples">
            {intro.masterKey.examples.map((ex, i) => (
              <div key={i} className="key-example">
                <span className="key-example-label">{ex.label}:</span>
                <span className="key-example-text"> {ex.text}</span>
              </div>
            ))}
          </div>
          <p className="key-summary">{intro.masterKey.summary}</p>
        </div>

        <div className="key-card">
          <h3 className="key-title">Two More Keys</h3>
          <div className="framework-grid">
            <div className="framework-item">
              <div className="framework-label">MEDIATOR</div>
              <p className="framework-desc">{intro.framework.mediator.description}</p>
              <p className="framework-list">{intro.framework.mediator.list}</p>
            </div>
            <div className="framework-item">
              <div className="framework-label">MOUNTAIN</div>
              <p className="framework-desc">{intro.framework.mountain.description}</p>
              <ul className="framework-reasons">
                {intro.framework.mountain.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryTable({ onBack }) {
  return (
    <div className="summary-screen">
      <div className="summary-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2 className="summary-title">{summaryTable.title}</h2>
      </div>
      <div className="table-wrap">
        <table className="cov-table">
          <thead>
            <tr>
              {summaryTable.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {summaryTable.rows.map((row, i) => (
              <tr key={i} style={{ background: covenants[i]?.lightColor }}>
                {row.map((cell, j) => (
                  <td key={j} style={j === 0 ? { color: covenants[i]?.color, fontWeight: 700, fontSize: "1.1rem" } : {}}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="conclusion-box">
        <h3>{conclusion.title}</h3>
        <p className="conclusion-answer">{conclusion.answer}</p>
        <p className="conclusion-elaboration">{conclusion.elaboration}</p>
        <p className="conclusion-credit">{conclusion.credit}</p>
        <p className="conclusion-credit">{conclusion.websites}</p>
      </div>
    </div>
  );
}

function CovenantSlide({ covenant, slideIndex, total, onNext, onPrev, onBack }) {
  const slide = covenant.slides[slideIndex];
  const isParallelTable = slide.table && slide.tableTitle;
  const isCompareTable = slide.table && !slide.tableTitle;

  return (
    <div className="slide-screen" style={{ "--cov-color": covenant.color, "--cov-light": covenant.lightColor, "--cov-accent": covenant.accentColor }}>
      <div className="slide-header">
        <button className="back-btn" onClick={onBack}>← Covenants</button>
        <div className="slide-header-center">
          <span className="slide-num-badge" style={{ background: covenant.color }}>
            {covenant.romanNumeral} · {covenant.shortName}
          </span>
        </div>
        <div className="slide-counter">{slideIndex + 1} / {total}</div>
      </div>

      <div className="slide-body">
        <h2 className="slide-title">{slide.title}</h2>
        {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}

        {slide.quote && !isParallelTable && !isCompareTable && (
          <blockquote className="slide-quote">{slide.quote}</blockquote>
        )}

        {slide.content && (
          <div className="slide-content-grid">
            {slide.content.map((section, i) => (
              <div key={i} className="content-section">
                <h4 className="content-heading">{section.heading}</h4>
                <ul className="content-list">
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {isParallelTable && (
          <div className="parallel-table-wrap">
            <h4 className="table-heading">{slide.tableTitle}</h4>
            <table className="parallel-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Isaac (Gen 22)</th>
                  <th>Jesus (Gospels)</th>
                </tr>
              </thead>
              <tbody>
                {slide.table.map((row, i) => (
                  <tr key={i}>
                    <td className="feature-col">{row.feature}</td>
                    <td>{row.isaac}</td>
                    <td>{row.jesus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {slide.note && <p className="slide-note">{slide.note}</p>}
          </div>
        )}

        {isCompareTable && (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>OLD Covenant (Mosaic)</th>
                  <th>NEW Covenant (Jeremiah's Promise)</th>
                </tr>
              </thead>
              <tbody>
                {slide.table.map((row, i) => (
                  <tr key={i}>
                    <td className="feature-col">{row.feature}</td>
                    <td>{row.old}</td>
                    <td className="new-col">{row.newCov}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {slide.quote && <blockquote className="slide-quote">{slide.quote}</blockquote>}
            {slide.note && <p className="slide-note">{slide.note}</p>}
          </div>
        )}

        {slide.quote && (isParallelTable || isCompareTable) && !isCompareTable && (
          <blockquote className="slide-quote">{slide.quote}</blockquote>
        )}

        {slide.note && !isParallelTable && !isCompareTable && (
          <p className="slide-note">{slide.note}</p>
        )}
      </div>

      <div className="slide-nav">
        <button className="nav-btn" onClick={onPrev} disabled={slideIndex === 0}>
          ← Prev
        </button>
        <div className="slide-dots">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`dot ${i === slideIndex ? "dot-active" : ""}`} style={i === slideIndex ? { background: covenant.color } : {}} />
          ))}
        </div>
        <button className="nav-btn" onClick={onNext} disabled={slideIndex === total - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}

function CovenantCard({ covenant, onClick }) {
  return (
    <button className="cov-card" onClick={onClick} style={{ "--cov-color": covenant.color, "--cov-light": covenant.lightColor }}>
      <div className="cov-card-top">
        <span className="cov-roman">{covenant.romanNumeral}</span>
        <span className="cov-icon">{covenant.icon}</span>
      </div>
      <h3 className="cov-card-name">{covenant.shortName}</h3>
      <p className="cov-card-subtitle">{covenant.subtitle}</p>
      <div className="cov-card-meta">
        <span>{covenant.location}</span>
        <span>{covenant.scripture}</span>
      </div>
      <p className="cov-card-overview">{covenant.overview.slice(0, 120)}…</p>
      <div className="cov-card-footer" style={{ background: covenant.color }}>
        <span>Mediator: {covenant.mediator}</span>
        <span>→</span>
      </div>
    </button>
  );
}

function CovenantDetail({ covenant, onBack, onShowSummary }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [view, setView] = useState("overview"); // "overview" | "slides"

  const handleNextSlide = useCallback(() => {
    setSlideIndex(i => Math.min(i + 1, covenant.slides.length - 1));
  }, [covenant.slides.length]);

  const handlePrevSlide = useCallback(() => {
    setSlideIndex(i => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (view !== "slides") return;
      if (e.key === "ArrowRight") handleNextSlide();
      if (e.key === "ArrowLeft") handlePrevSlide();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, handleNextSlide, handlePrevSlide]);

  if (view === "slides") {
    return (
      <CovenantSlide
        covenant={covenant}
        slideIndex={slideIndex}
        total={covenant.slides.length}
        onNext={handleNextSlide}
        onPrev={handlePrevSlide}
        onBack={() => { setView("overview"); setSlideIndex(0); }}
      />
    );
  }

  return (
    <div className="detail-screen" style={{ "--cov-color": covenant.color, "--cov-light": covenant.lightColor, "--cov-accent": covenant.accentColor }}>
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>← All Covenants</button>
        <button className="summary-btn" onClick={onShowSummary}>Summary Table</button>
      </div>

      <div className="detail-hero" style={{ background: `linear-gradient(135deg, ${covenant.color} 0%, ${covenant.accentColor} 100%)` }}>
        <div className="detail-hero-top">
          <span className="detail-roman">{covenant.romanNumeral}</span>
          <span className="detail-icon">{covenant.icon}</span>
        </div>
        <h1 className="detail-name">{covenant.name}</h1>
        <p className="detail-subtitle">{covenant.subtitle}</p>
        <div className="detail-meta-row">
          <span className="detail-meta-item">📍 {covenant.location}</span>
          <span className="detail-meta-item">📖 {covenant.scripture}</span>
          <span className="detail-meta-item">👤 {covenant.mediator}</span>
          <span className="detail-meta-item">🔖 {covenant.sign}</span>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-overview">
          <h3 className="detail-overview-title">Overview</h3>
          <p>{covenant.overview}</p>
        </div>

        <div className="detail-summary-box">
          <h3 className="detail-summary-label">In Brief</h3>
          <p>{covenant.summary}</p>
        </div>

        <div className="detail-slides-preview">
          <h3 className="detail-slides-title">Slide Topics ({covenant.slides.length} slides)</h3>
          <div className="slide-preview-list">
            {covenant.slides.map((s, i) => (
              <button key={i} className="slide-preview-item" onClick={() => { setSlideIndex(i); setView("slides"); }}>
                <span className="slide-preview-num">{i + 1}</span>
                <span className="slide-preview-title">{s.title}</span>
                <span>→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="detail-actions">
          <button className="start-slides-btn" onClick={() => { setSlideIndex(0); setView("slides"); }} style={{ background: covenant.color }}>
            View All Slides →
          </button>
        </div>
      </div>
    </div>
  );
}

function CovenantsList({ onSelect, onShowSummary }) {
  return (
    <div className="list-screen">
      <div className="list-header">
        <h2 className="list-title">The Seven Covenants of Salvation History</h2>
        <button className="summary-btn" onClick={onShowSummary}>Summary Table</button>
      </div>
      <div className="cards-grid">
        {covenants.map((c, i) => (
          <CovenantCard key={i} covenant={c} onClick={() => onSelect(c)} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("intro"); // "intro" | "list" | "detail" | "summary"
  const [selected, setSelected] = useState(null);

  return (
    <div className="app">
      {screen === "intro" && (
        <IntroScreen onStart={() => setScreen("list")} />
      )}
      {screen === "list" && (
        <CovenantsList
          onSelect={(c) => { setSelected(c); setScreen("detail"); }}
          onShowSummary={() => setScreen("summary")}
        />
      )}
      {screen === "detail" && selected && (
        <CovenantDetail
          covenant={selected}
          onBack={() => setScreen("list")}
          onShowSummary={() => setScreen("summary")}
        />
      )}
      {screen === "summary" && (
        <SummaryTable onBack={() => setScreen(selected ? "detail" : "list")} />
      )}
    </div>
  );
}
