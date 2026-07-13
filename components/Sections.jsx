"use client";

import { useState } from "react";
import Icon from "./Icons";
import Modal from "./Modal";
import {
  about, affiliations, awards, certifications, competencies,
  education, experience, externalSites, metrics, profile, programs,
} from "./data";
import {
  allPrograms, competencyDetails, fullAffiliations, fullAwards, fullBio,
  fullCertifications, fullEducation, fullExperience,
} from "./details";

export function Metrics() {
  return (
    <div className="container metrics">
      <div className="metrics-card">
        {metrics.map((m) => (
          <div className="metric" key={m.label}>
            <span className="metric-icon"><Icon name={m.icon} size={24} /></span>
            <div>
              <div className="metric-value">
                {m.value}
                {m.sub && <small>{m.sub}</small>}
              </div>
              <div className="metric-label">{m.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutCompetencies() {
  const [showBio, setShowBio] = useState(false);
  const [comp, setComp] = useState(null);
  const compDetail = comp ? competencyDetails[comp.label] : null;

  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="card about-card">
          <div className="card-head">
            <h2 className="card-title"><Icon name="user" /> About Me</h2>
          </div>
          <p className="about-text">{about.text}</p>
          <button className="btn btn-navy btn-sm" onClick={() => setShowBio(true)}>
            View Full Profile
          </button>
        </div>

        <div className="card">
          <div className="card-head">
            <h2 className="card-title"><Icon name="badge" /> Core Competencies</h2>
          </div>
          <div className="comp-grid">
            {competencies.map((c) => (
              <button
                className="comp-item"
                key={c.label}
                onClick={() => setComp(c)}
                aria-haspopup="dialog"
                title={`Learn more about ${c.label}`}
              >
                <Icon name={c.icon} size={20} />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showBio && (
        <Modal title="About Prof. Pius A. Owolawi" icon="user" wide onClose={() => setShowBio(false)}>
          {fullBio.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <blockquote className="pull-quote">{fullBio.pullQuote}</blockquote>
          <p>{fullBio.closing}</p>
          {fullBio.philosophies.map((ph) => (
            <div className="phil-block" key={ph.title}>
              <h4>{ph.title}</h4>
              <p className="phil-quote">&ldquo;{ph.quote}&rdquo;</p>
              <p>{ph.text}</p>
            </div>
          ))}
          <a className="btn btn-navy btn-sm" href={profile.resume} download>
            <Icon name="download" size={15} /> Download Full Resume
          </a>
        </Modal>
      )}

      {comp && compDetail && (
        <Modal title={comp.label} icon={comp.icon} onClose={() => setComp(null)}>
          <p>{compDetail.summary}</p>
          <h4>Highlights</h4>
          <ul className="detail-list">
            {compDetail.points.map((pt) => (
              <li key={pt.slice(0, 24)}>
                <Icon name="check" size={15} className="li-check" strokeWidth={2.4} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </section>
  );
}

export function ExperiencePrograms() {
  const [showExp, setShowExp] = useState(false);
  const [showProgs, setShowProgs] = useState(false);

  return (
    <section className="section">
      <div className="container exp-grid">
        <div className="card" id="experience">
          <div className="card-head">
            <h2 className="card-title"><Icon name="portfolio" /> Professional Experience</h2>
          </div>
          <div className="timeline">
            {experience.slice(0, 5).map((e) => (
              <div className="tl-item" key={e.title}>
                <div className="tl-top">
                  <span className="tl-title">{e.title}</span>
                  <span className="tl-dates">{e.dates}</span>
                </div>
                <div className="tl-org">{e.org}</div>
                <p className="tl-sum">{e.summary}</p>
              </div>
            ))}
          </div>
          <button className="btn btn-navy btn-sm" onClick={() => setShowExp(true)} style={{ marginTop: 18 }}>
            View Full Experience
          </button>
        </div>

        <div className="card" id="programs">
          <div className="card-head">
            <h2 className="card-title"><Icon name="transformation" /> Transformation &amp; AI Programs</h2>
            <button className="btn btn-outline-navy btn-sm" onClick={() => setShowProgs(true)}>
              View All Programs
            </button>
          </div>
          <div className="prog-grid">
            {programs.map((p) => (
              <article className="prog-card" key={p.title}>
                <div className="prog-media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <h3 className="prog-title">{p.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>

      {showExp && (
        <Modal title="Full Professional Experience" icon="portfolio" wide onClose={() => setShowExp(false)}>
          <div className="timeline">
            {fullExperience.map((e) => (
              <div className="tl-item" key={e.title}>
                <div className="tl-top">
                  <span className="tl-title">{e.title}</span>
                  <span className="tl-dates">{e.dates}</span>
                </div>
                <div className="tl-org">{e.org}</div>
                <ul className="detail-list" style={{ marginTop: 6 }}>
                  {e.bullets.map((b) => (
                    <li key={b.slice(0, 24)}>
                      <Icon name="dot" size={14} className="li-check" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {showProgs && (
        <Modal title="Transformation & AI Programs" icon="transformation" wide onClose={() => setShowProgs(false)}>
          <p className="modal-lede">
            Selected transformation and AI programs led across government, utilities, SETAs, TVET
            colleges, and universities.
          </p>
          <div className="mprog-grid">
            {allPrograms.map((p) => (
              <article className={`mprog ${p.image ? "" : "mprog-plain"}`} key={p.title}>
                {p.image && <img src={p.image} alt={p.title} loading="lazy" />}
                <div className="mprog-body">
                  <h4 className="mprog-title">{p.title}</h4>
                  <p className="mprog-desc">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
}

function CredCard({ id, icon, title, children, linkLabel, onOpen }) {
  return (
    <div className="card cred-card" id={id}>
      <div className="card-head">
        <h2 className="card-title"><Icon name={icon} /> {title}</h2>
      </div>
      {children}
      <button className="cred-link" onClick={onOpen} aria-haspopup="dialog">
        {linkLabel}
      </button>
    </div>
  );
}

export function Credentials() {
  const [open, setOpen] = useState(null); // "education" | "certs" | "awards" | "affil"

  return (
    <section className="section" id="education">
      <div className="container cred-grid">
        <CredCard icon="grad" title="Education" linkLabel="View All Education" onOpen={() => setOpen("education")}>
          <ul className="cred-list">
            {education.map((e) => (
              <li key={e.title}>
                <span className="li-dot" />
                <span>
                  <span className="cred-title">{e.title}</span>
                  <div className="cred-sub">{e.sub}</div>
                </span>
              </li>
            ))}
          </ul>
        </CredCard>

        <CredCard icon="badge" title="Certifications" linkLabel="View All Certifications" onOpen={() => setOpen("certs")}>
          <ul className="cred-list">
            {certifications.map((c) => (
              <li key={c}>
                <Icon name="check" size={16} className="li-check" strokeWidth={2.4} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </CredCard>

        <CredCard icon="award" title="Awards & Recognition" linkLabel="View All Awards" onOpen={() => setOpen("awards")}>
          <ul className="cred-list">
            {awards.map((a) => (
              <li key={a}>
                <Icon name="star" size={15} className="li-star" strokeWidth={1.6} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </CredCard>

        <CredCard icon="users" title="Professional Affiliations" linkLabel="View All Affiliations" onOpen={() => setOpen("affil")}>
          <ul className="cred-list">
            {affiliations.map((a) => (
              <li key={a}>
                <Icon name="check" size={16} className="li-check" strokeWidth={2.4} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </CredCard>
      </div>

      {open === "education" && (
        <Modal title="Education" icon="grad" onClose={() => setOpen(null)}>
          <ul className="cred-list">
            {fullEducation.map((e) => (
              <li key={e.title}>
                <span className="li-dot" />
                <span>
                  <span className="cred-title">{e.title}</span>
                  <div className="cred-sub">{e.sub}</div>
                </span>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {open === "certs" && (
        <Modal title="Technical & Executive Certifications" icon="badge" onClose={() => setOpen(null)}>
          <ul className="cred-list">
            {fullCertifications.map((c) => (
              <li key={c}>
                <Icon name="check" size={16} className="li-check" strokeWidth={2.4} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {open === "awards" && (
        <Modal title="Awards & Recognition" icon="award" wide onClose={() => setOpen(null)}>
          {fullAwards.map((a) => (
            <div className="maward" key={a.name}>
              <Icon name="award" size={22} strokeWidth={1.7} />
              <div>
                <div className="maward-name">{a.name}</div>
                <div className="maward-meta">{a.body} &middot; {a.years}</div>
                <p className="maward-desc">{a.desc}</p>
              </div>
            </div>
          ))}
        </Modal>
      )}

      {open === "affil" && (
        <Modal title="Professional Affiliations" icon="users" onClose={() => setOpen(null)}>
          {fullAffiliations.map((a) => (
            <div className="maward" key={a.name}>
              <Icon name="check" size={18} className="li-check" strokeWidth={2.2} />
              <div>
                <div className="maward-name">{a.name}</div>
                <p className="maward-desc">{a.desc}</p>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </section>
  );
}

export function Contact() {
  const [leaving, setLeaving] = useState(null); // external site pending confirmation

  const confirmLeave = () => {
    window.open(leaving.url, "_blank", "noopener,noreferrer");
    setLeaving(null);
  };

  // No backend — compose the message in the visitor's email client via mailto:
  const submitMessage = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = fd.get("subject") || `Message from ${fd.get("name")}`;
    const body = `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`;
    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <footer className="contact" id="contact">
      <div className="container contact-inner">
        <div className="contact-lead">
          <span className="contact-badge"><Icon name="mail" size={32} strokeWidth={1.5} /></span>
          <div>
            <h2>LET&apos;S <span>CONNECT</span></h2>
            <p>
              I am open to senior leadership, consulting, and executive transformation
              opportunities in AI, digital strategy, Industry 4.0, smart infrastructure,
              utilities modernization, and enterprise innovation.
            </p>
            <a className="btn btn-gold" href={profile.calendar}>
              <Icon name="calendar" size={17} /> Schedule a Call
            </a>
          </div>
        </div>

        <div className="contact-mid">
          <ul className="contact-list">
            <li>
              <Icon name="mail" size={19} />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <Icon name="phone" size={19} />
              <a href={`tel:${profile.phones[0].replace(/\s/g, "")}`}>{profile.phones[0]}</a>
            </li>
            <li>
              <Icon name="pin" size={19} />
              <span>{profile.location}</span>
            </li>
            <li>
              <Icon name="linkedin" size={19} />
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
            <li>
              <Icon name="grad" size={19} />
              <a href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
            </li>
          </ul>

          <a className="btn btn-outline-gold" href={profile.resume} download>
            <Icon name="download" size={17} /> Download Full Resume
          </a>
        </div>

        <form className="contact-form" onSubmit={submitMessage}>
          <h3 className="contact-form-title">Send a Message</h3>
          <div className="cf-row">
            <input name="name" type="text" placeholder="Your Name" required aria-label="Your Name" />
            <input name="email" type="email" placeholder="Your Email" required aria-label="Your Email" />
          </div>
          <input name="subject" type="text" placeholder="Subject" aria-label="Subject" />
          <textarea name="message" rows={5} placeholder="Your Message" required aria-label="Your Message" />
          <button type="submit" className="btn btn-send">
            Send Message <Icon name="send" size={16} />
          </button>
        </form>
      </div>

      <div className="container footer-sites">
        <span className="footer-sites-label">Explore More</span>
        <div className="footer-sites-links">
          {externalSites.map((s) => (
            <button className="footer-site" key={s.key} onClick={() => setLeaving(s)} aria-haspopup="dialog">
              <Icon name={s.icon} size={16} /> {s.label}
              <Icon name="globe" size={12} className="footer-site-ext" />
            </button>
          ))}
        </div>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()} Prof. Pius A. Owolawi, PhD. All rights reserved.
      </div>

      {leaving && (
        <Modal title="You're Leaving This Site" icon="globe" onClose={() => setLeaving(null)}>
          <div className="leave-card">
            <span className="leave-icon"><Icon name={leaving.icon} size={26} strokeWidth={1.6} /></span>
            <div>
              <div className="leave-name">{leaving.label}</div>
              <div className="leave-url">{leaving.name}</div>
            </div>
          </div>
          <p>{leaving.desc}</p>
          <p className="leave-note">
            The link opens in a new tab — this page stays open, so you can come right back.
          </p>
          <div className="leave-actions">
            <button className="btn btn-gold" onClick={confirmLeave}>
              <Icon name="globe" size={16} /> Continue to Site
            </button>
            <button className="btn btn-outline-navy" onClick={() => setLeaving(null)}>
              Stay Here
            </button>
          </div>
        </Modal>
      )}
    </footer>
  );
}
