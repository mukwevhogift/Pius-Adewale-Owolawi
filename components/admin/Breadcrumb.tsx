"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Parse the pathname to create breadcrumb items
  const paths = pathname?.split("/").filter(Boolean) || [];
  
  // Generate breadcrumb items
  const breadcrumbs = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    const label = path
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    return { href, label, isLast: index === paths.length - 1 };
  });

  const isEditOrNewPage = pathname?.includes("/edit") || pathname?.includes("/new");

  if (breadcrumbs.length <= 2 && !isEditOrNewPage) return null; // Don't show for main pages

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <nav className="flex items-center gap-2 text-sm">
        {isEditOrNewPage && (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mr-4"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Back</span>
          </button>
        )}
        
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <i className="ri-home-line"></i>
          <span>Dashboard</span>
        </Link>
        
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            {crumb.isLast ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
