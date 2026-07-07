"use client";

import { useEffect, useRef } from "react";
import Icon from "./Icons";

export default function Modal({ title, icon, onClose, children, wide }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    bodyRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`modal ${wide ? "modal-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3 className="modal-title">
            {icon && <Icon name={icon} size={19} />} {title}
          </h3>
          <button className="modal-close" aria-label="Close dialog" onClick={onClose}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="modal-body" ref={bodyRef} tabIndex={-1}>
          {children}
        </div>
      </div>
    </div>
  );
}
