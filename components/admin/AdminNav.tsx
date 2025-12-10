"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
    { href: "/admin/hero", label: "Hero Section", icon: "ri-home-line" },
    { href: "/admin/education", label: "Education", icon: "ri-graduation-cap-line" },
    { href: "/admin/certifications", label: "Certifications", icon: "ri-award-line" },
    { href: "/admin/publications", label: "Publications", icon: "ri-article-line" },
    { href: "/admin/speeches", label: "Speeches", icon: "ri-mic-line" },
    { href: "/admin/research-areas", label: "Research Areas", icon: "ri-flask-line" },
    { href: "/admin/achievements", label: "Achievements", icon: "ri-trophy-line" },
    { href: "/admin/awards", label: "Awards", icon: "ri-medal-line" },
    { href: "/admin/professional-memberships", label: "Memberships", icon: "ri-shield-check-line" },
    { href: "/admin/gallery", label: "Gallery", icon: "ri-image-line" },
    { href: "/admin/testimonials", label: "Testimonials", icon: "ri-chat-quote-line" },
    { href: "/admin/community-initiatives", label: "Community", icon: "ri-community-line" },
    { href: "/admin/settings", label: "Settings", icon: "ri-settings-line" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-50 flex flex-col ${
      isCollapsed ? "w-20" : "w-64"
    }`}>
      {/* Logo & Toggle */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">PA</span>
            </div>
            {!isCollapsed && (
              <div>
                <div className="text-gray-900 font-bold text-base">Admin Panel</div>
                <div className="text-gray-500 text-xs">Content Management</div>
              </div>
            )}
          </Link>
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="ri-menu-fold-line text-xl"></i>
            </button>
          )}
        </div>
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mt-4 w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ri-menu-unfold-line text-xl"></i>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${
                isActive(item.href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <i className={`${item.icon} text-xl flex-shrink-0`}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {/* View Site */}
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "View Site" : ""}
        >
          <i className="ri-external-link-line text-xl"></i>
          {!isCollapsed && <span className="text-sm font-medium">View Site</span>}
        </Link>

        {/* Sign Out */}
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <i className="ri-logout-box-line text-xl"></i>
            {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
};

export default AdminNav;
