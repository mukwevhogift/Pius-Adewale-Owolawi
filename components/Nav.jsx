"use client";

import { useState } from "react";
import Icon from "./Icons";
import Modal from "./Modal";
import { nav, profile } from "./data";
import { publications } from "./details";

function PublicationsModal({ onClose }) {
  return (
    <Modal title="Publications" icon="publications" wide onClose={onClose}>
      <div className="pub-stats">
        {publications.stats.map((s) => (
          <div className="pub-stat" key={s.label}>
            <div className="pub-stat-value">{s.value}</div>
            <div className="pub-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <h4>Most Cited</h4>
      {publications.mostCited.map((p) => (
        <div className="maward" key={p.title}>
          <Icon name="publications" size={19} strokeWidth={1.8} />
          <div>
            <div className="maward-name">{p.title}</div>
            <div className="maward-meta">{p.venue}</div>
            <p className="maward-desc">{p.note}</p>
          </div>
        </div>
      ))}

      <h4>Recent Highlights (2025)</h4>
      {publications.recent.map((p) => (
        <div className="maward maward-compact" key={p.title}>
          <Icon name="publications" size={17} strokeWidth={1.8} />
          <div>
            <div className="maward-name">{p.title}</div>
            <div className="maward-meta">{p.venue}</div>
          </div>
        </div>
      ))}

      <a
        className="btn btn-navy btn-sm"
        href={publications.scholar}
        target="_blank"
        rel="noreferrer"
        style={{ marginTop: 16 }}
      >
        <Icon name="citations" size={15} /> View Google Scholar Profile
      </a>
    </Modal>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [showPubs, setShowPubs] = useState(false);

  const openPubs = () => {
    setShowPubs(true);
    setOpen(false);
  };

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#home" aria-label="Home">
            <span className="brand-mark">PO</span>
            <span className="brand-divider" />
            <span>{profile.name}</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
            <button className="nav-plain" onClick={openPubs} aria-haspopup="dialog">
              Publications
            </button>
            <a className="btn btn-gold btn-sm nav-cta" href={profile.resume} download>
              <Icon name="download" size={16} /> Download Resume
            </a>
          </nav>

          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} size={26} />
          </button>
        </div>
      </header>

      <div className={`nav-mobile ${open ? "open" : ""}`}>
        {nav.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <button className="nav-mobile-plain" onClick={openPubs} aria-haspopup="dialog">
          Publications
        </button>
        <a className="btn btn-gold" href={profile.resume} download>
          <Icon name="download" size={16} /> Download Resume
        </a>
      </div>

      {showPubs && <PublicationsModal onClose={() => setShowPubs(false)} />}
    </>
  );
}
