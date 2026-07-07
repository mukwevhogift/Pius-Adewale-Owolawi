// Lightweight inline icon set (24x24, stroke-based) — no external dependencies.
const paths = {
  // metrics
  funding: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M15 9.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1 1.8 3 2.2 3 1.1 3 2.3-1.3 2-3 2-3-.9-3-2" />
    </>
  ),
  publications: (
    <>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6.5a2.5 2.5 0 0 0 0 5H19" />
      <path d="M8 7h7M8 11h7" />
    </>
  ),
  citations: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V13M11 21V8M16 21V11M21 21V5" />
      <path d="M14 5l4-2 1 4" />
    </>
  ),
  leadership: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="17.5" cy="9" r="2.5" />
      <path d="M16 14.3c3 .3 5.5 2.4 5.5 5.7" />
    </>
  ),
  labs: (
    <>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7 7.5l3.5 8M17 7.5l-3.5 8M7.5 6h9" />
    </>
  ),
  // contact / meta
  pin: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M8 10.5V17M8 7.2v.1M12 17v-3.8c0-1.4 1-2.4 2.3-2.4S16.5 11.8 16.5 13.2V17" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9z" />
    </>
  ),
  github: (
    <path d="M9 20.5c-5 1.5-5-2.5-7-3m14 5v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6.2 0C7.6 4.4 6.6 4.7 6.6 4.7a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 5.2 11c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
  ),
  download: (
    <>
      <path d="M12 3v11M7.5 10.5L12 15l4.5-4.5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  star: <path d="M12 3l2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8L12 3z" />,
  check: <path d="M4.5 12.5l5 5L19.5 6.5" />,
  dot: <circle cx="12" cy="12" r="4" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />
    </>
  ),
  grad: (
    <>
      <path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5z" />
      <path d="M6.5 11.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5M21.5 9.5V15" />
    </>
  ),
  badge: (
    <>
      <path d="M12 2.5l2.2 1.6 2.7-.3 1 2.5 2.5 1-.3 2.7 1.6 2.2-1.6 2.2.3 2.7-2.5 1-1 2.5-2.7-.3L12 21.7l-2.2-1.6-2.7.3-1-2.5-2.5-1 .3-2.7L2.3 12l1.6-2.2-.3-2.7 2.5-1 1-2.5 2.7.3L12 2.5z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="17.5" cy="9" r="2.5" />
      <path d="M16 14.3c3 .3 5.5 2.4 5.5 5.7" />
    </>
  ),
  // competencies
  transformation: (
    <>
      <path d="M4 12a8 8 0 0 1 13.5-5.8M20 12a8 8 0 0 1-13.5 5.8" />
      <path d="M17 3v4h4M7 21v-4H3" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </>
  ),
  process: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h5a2 2 0 0 1 2 2V14M14 17.5H9a2 2 0 0 1-2-2V10" />
    </>
  ),
  analytics: (
    <>
      <path d="M3 21h18M6 21v-6M11 21V9M16 21v-9M21 21V5" />
    </>
  ),
  genai: (
    <>
      <path d="M12 3l1.7 4.6L18 9.2l-4.3 1.7L12 15.5l-1.7-4.6L6 9.2l4.3-1.6L12 3z" />
      <path d="M18.5 14l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V9l6 4V9l6 4V5.5L21 5v16H3z" />
      <path d="M7 17h2M12 17h2M17 17h1" />
    </>
  ),
  scada: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M7 12l2.5-3 2.5 2 3-4 2 2.5" />
    </>
  ),
  workforce: (
    <>
      <circle cx="8" cy="8" r="3" />
      <path d="M2.5 19c0-3.2 2.5-5.4 5.5-5.4s5.5 2.2 5.5 5.4" />
      <path d="M16 4.5l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1 1-2.6z" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10a4 4 0 0 1-.5 8H7z" />
    </>
  ),
  governance: (
    <>
      <path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-3z" />
      <path d="M12 8v5M12 16v.5" />
    </>
  ),
  stakeholder: (
    <>
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="7" r="2.5" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="M8.8 8.8l2 5M15.2 8.8l-2 5M9.5 7h5" />
    </>
  ),
  change: (
    <>
      <path d="M20 8a8 8 0 0 0-14.6-1M4 16a8 8 0 0 0 14.6 1" />
      <path d="M4 3v5h5M20 21v-5h-5" />
    </>
  ),
  portfolio: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  innovation: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 1 3.5 10.9c-.8.6-1.5 1.2-1.5 2.1h-4c0-.9-.7-1.5-1.5-2.1A6 6 0 0 1 12 3z" />
    </>
  ),
  partnerships: (
    <>
      <path d="M8 12l-4-1.5L6.5 5 12 6.5 17.5 5 20 10.5 16 12" />
      <path d="M8 12l4 4.5c1 1 2.5 1 3.2 0l.8-1M8 12l3 3.5c.8 1 2.2 1 3 .1" />
    </>
  ),
  // programs
  water: (
    <>
      <path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z" />
      <path d="M9 14.5a3 3 0 0 0 3 3" />
    </>
  ),
  datalab: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
      <path d="M5 5.5v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-6M5 11.5v6c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-6" />
    </>
  ),
  lms: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M8 8l3 2.5L8 13M13 13h4" />
    </>
  ),
  scadaMon: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.7M12 18.5v2.7M2.8 12h2.7M18.5 12h2.7M5.5 5.5l1.9 1.9M16.6 16.6l1.9 1.9M18.5 5.5l-1.9 1.9M7.4 16.6l-1.9 1.9" />
    </>
  ),
  energy: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  agri: (
    <>
      <path d="M12 21V10" />
      <path d="M12 10C12 5.5 8.5 3.5 4.5 3.5 4.5 8 8 10 12 10zM12 13.5c0-3.6 2.9-5.2 6.5-5.2 0 3.7-2.9 5.2-6.5 5.2z" />
    </>
  ),
  robotLib: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="2.5" />
      <path d="M12 8V4.5M12 4.5h.01" />
      <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <path d="M9.5 15.5h5M2.5 12v3M21.5 12v3" />
    </>
  ),
  ar: (
    <>
      <path d="M12 3l7.5 4.3v8.4L12 20l-7.5-4.3V7.3L12 3z" />
      <path d="M12 3v7.7m0 0L4.5 7.3M12 10.7l7.5-3.4M12 20v-9.3" opacity="0.9" />
    </>
  ),
  drone: (
    <>
      <circle cx="5.5" cy="5.5" r="2.3" />
      <circle cx="18.5" cy="5.5" r="2.3" />
      <circle cx="5.5" cy="18.5" r="2.3" />
      <circle cx="18.5" cy="18.5" r="2.3" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" />
      <path d="M7.2 7.2l2.3 2.3M16.8 7.2l-2.3 2.3M7.2 16.8l2.3-2.3M16.8 16.8l-2.3-2.3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

export default function Icon({ name, size = 22, strokeWidth = 1.8, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.dot}
    </svg>
  );
}
