import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  // Get counts
  const [
    { count: educationCount },
    { count: publicationsCount },
    { count: speechesCount },
    { count: awardsCount },
    { count: galleryCount },
  ] = await Promise.all([
    supabase.from("education").select("*", { count: "exact", head: true }),
    supabase.from("publications").select("*", { count: "exact", head: true }),
    supabase.from("speeches").select("*", { count: "exact", head: true }),
    supabase.from("awards").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      title: "Education Records",
      count: educationCount || 0,
      icon: "ri-graduation-cap-line",
      color: "blue",
      href: "/admin/education",
    },
    {
      title: "Publications",
      count: publicationsCount || 0,
      icon: "ri-article-line",
      color: "purple",
      href: "/admin/publications",
    },
    {
      title: "Speeches",
      count: speechesCount || 0,
      icon: "ri-presentation-line",
      color: "green",
      href: "/admin/speeches",
    },
    {
      title: "Awards",
      count: awardsCount || 0,
      icon: "ri-trophy-line",
      color: "orange",
      href: "/admin/awards",
    },
    {
      title: "Gallery Images",
      count: galleryCount || 0,
      icon: "ri-image-line",
      color: "pink",
      href: "/admin/gallery",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split("@")[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your portfolio content from this dashboard
          </p>
        </div>
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <i className="ri-logout-box-line"></i>
            Sign Out
          </button>
        </form>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group"
          >
            <div
              className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}
            >
              <i className={`${stat.icon} text-2xl text-${stat.color}-600`}></i>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/publications/new"
            className="p-6 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-center"
          >
            <i className="ri-add-line text-3xl text-blue-600 mb-2 block"></i>
            <p className="text-sm text-gray-700 font-medium">Add Publication</p>
          </Link>
          <Link
            href="/admin/speeches/new"
            className="p-6 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition text-center"
          >
            <i className="ri-presentation-line text-3xl text-purple-600 mb-2 block"></i>
            <p className="text-sm text-gray-700 font-medium">Add Speech</p>
          </Link>
          <Link
            href="/admin/gallery/new"
            className="p-6 border-2 border-green-200 rounded-lg hover:bg-green-50 transition text-center"
          >
            <i className="ri-upload-line text-3xl text-green-600 mb-2 block"></i>
            <p className="text-sm text-gray-700 font-medium">Upload Image</p>
          </Link>
          <Link
            href="/admin/awards/new"
            className="p-6 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition text-center"
          >
            <i className="ri-trophy-line text-3xl text-orange-600 mb-2 block"></i>
            <p className="text-sm text-gray-700 font-medium">Add Award</p>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Content Sections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { title: "Hero Section", icon: "ri-home-heart-line", href: "/admin/hero" },
            { title: "Education", icon: "ri-graduation-cap-line", href: "/admin/education" },
            { title: "Certifications", icon: "ri-medal-line", href: "/admin/certifications" },
            { title: "Awards", icon: "ri-trophy-line", href: "/admin/awards" },
            { title: "Publications", icon: "ri-article-line", href: "/admin/publications" },
            { title: "Speeches", icon: "ri-presentation-line", href: "/admin/speeches" },
            { title: "Research Areas", icon: "ri-flask-line", href: "/admin/research-areas" },
            { title: "Achievements", icon: "ri-star-line", href: "/admin/achievements" },
            { title: "Memberships", icon: "ri-team-line", href: "/admin/professional-memberships" },
            { title: "Initiatives", icon: "ri-heart-line", href: "/admin/community-initiatives" },
            { title: "Testimonials", icon: "ri-chat-quote-line", href: "/admin/testimonials" },
            { title: "Gallery", icon: "ri-image-line", href: "/admin/gallery" },
            { title: "Settings", icon: "ri-settings-line", href: "/admin/settings" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <i className={`${item.icon} text-2xl text-gray-600`}></i>
              <span className="font-medium text-gray-700">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
