"use client";

import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#education", label: "Academic Journey" },
    { href: "#what-done", label: "Achievements" },
    { href: "#projects", label: "Research" },
    { href: "#publications", label: "Publications" },
    { href: "#speeches", label: "Speeches" },
    { href: "#gallery", label: "Gallery" },
    { href: "#achieved", label: "Awards" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-xl border-b border-gray-200"
          : "bg-white/95 backdrop-blur-xl shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Name - TC-01: Non-clickable, cursor-default */}
          <div
            className="flex items-center gap-3 cursor-default select-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">PA</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-gray-900 font-bold text-lg md:text-xl">Prof. Pius Owolawi</div>
              <div className="text-blue-600 text-xs md:text-sm font-medium">Research & Innovation</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-semibold relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - TC-06: Admin button removed */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`text-2xl ${isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
