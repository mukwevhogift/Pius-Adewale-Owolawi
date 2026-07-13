import Icon from "./Icons";
import { profile } from "./data";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <img className="hero-art" src="/hero-art.jpg" alt="" />
      </div>

      <div className="container hero-inner">
        <div className="hero-photo">
          {/* Replace public/headshot.jpg with a high-resolution executive headshot */}
          <img src="/headshot.jpg" alt={profile.name} />
        </div>

        <div className="hero-copy">
          <h1>{profile.name}</h1>
          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-sub">
            {profile.subtitle.map((s, i) => (
              <span key={s} style={{ display: "contents" }}>
                {i > 0 && <span className="sep">|</span>}
                <span>{s}</span>
              </span>
            ))}
          </div>

          <div className="hero-meta">
            <span className="item"><Icon name="pin" size={17} /> {profile.location}</span>
            <span className="item"><Icon name="shield" size={17} /> {profile.authorization}</span>
          </div>
          <div className="hero-meta">
            {profile.phones.map((p) => (
              <a key={p} className="item" href={`tel:${p.replace(/\s/g, "")}`}>
                <Icon name="phone" size={16} /> {p}
              </a>
            ))}
            <a className="item" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={16} /> {profile.email}
            </a>
          </div>

          <div className="hero-actions">
            <a className="btn btn-white" href={profile.scholar} target="_blank" rel="noreferrer">
              <Icon name="grad" size={17} /> Google Scholar
            </a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Icon name="linkedin" size={17} /> LinkedIn
            </a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
              <Icon name="github" size={17} /> GitHub
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={17} /> Email Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
