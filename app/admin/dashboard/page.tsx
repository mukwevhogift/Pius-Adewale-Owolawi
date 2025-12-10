import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  // Get counts for all sections
  const [
    { count: educationCount },
    { count: certificationsCount },
    { count: publicationsCount },
    { count: speechesCount },
    { count: researchAreasCount },
    { count: achievementsCount },
    { count: awardsCount },
    { count: membershipsCount },
    { count: galleryCount },
    { count: testimonialsCount },
    { count: initiativesCount },
  ] = await Promise.all([
    supabase.from("education").select("*", { count: "exact", head: true }),
    supabase.from("certifications").select("*", { count: "exact", head: true }),
    supabase.from("publications").select("*", { count: "exact", head: true }),
    supabase.from("speeches").select("*", { count: "exact", head: true }),
    supabase.from("research_areas").select("*", { count: "exact", head: true }),
    supabase.from("achievements").select("*", { count: "exact", head: true }),
    supabase.from("awards").select("*", { count: "exact", head: true }),
    supabase.from("professional_memberships").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("community_initiatives").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      title: "Education",
      count: educationCount || 0,
      icon: "ri-graduation-cap-line",
      color: "from-blue-500 to-blue-600",
      href: "/admin/education",
    },
    {
      title: "Certifications",
      count: certificationsCount || 0,
      icon: "ri-award-line",
      color: "from-cyan-500 to-cyan-600",
      href: "/admin/certifications",
    },
    {
      title: "Publications",
      count: publicationsCount || 0,
      icon: "ri-article-line",
      color: "from-purple-500 to-purple-600",
      href: "/admin/publications",
    },
    {
      title: "Speeches",
      count: speechesCount || 0,
      icon: "ri-mic-line",
      color: "from-green-500 to-green-600",
      href: "/admin/speeches",
    },
    {
      title: "Research Areas",
      count: researchAreasCount || 0,
      icon: "ri-flask-line",
      color: "from-indigo-500 to-indigo-600",
      href: "/admin/research-areas",
    },
    {
      title: "Achievements",
      count: achievementsCount || 0,
      icon: "ri-trophy-line",
      color: "from-orange-500 to-orange-600",
      href: "/admin/achievements",
    },
    {
      title: "Awards",
      count: awardsCount || 0,
      icon: "ri-medal-line",
      color: "from-yellow-500 to-yellow-600",
      href: "/admin/awards",
    },
    {
      title: "Memberships",
      count: membershipsCount || 0,
      icon: "ri-shield-check-line",
      color: "from-pink-500 to-pink-600",
      href: "/admin/professional-memberships",
    },
    {
      title: "Gallery",
      count: galleryCount || 0,
      icon: "ri-image-line",
      color: "from-red-500 to-red-600",
      href: "/admin/gallery",
    },
    {
      title: "Testimonials",
      count: testimonialsCount || 0,
      icon: "ri-chat-quote-line",
      color: "from-teal-500 to-teal-600",
      href: "/admin/testimonials",
    },
    {
      title: "Community",
      count: initiativesCount || 0,
      icon: "ri-community-line",
      color: "from-emerald-500 to-emerald-600",
      href: "/admin/community-initiatives",
    },
  ];

  const totalContent = stats.reduce((acc, stat) => acc + stat.count, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          {user?.email} • Manage your portfolio content from this dashboard
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <i className="ri-file-list-3-line text-4xl mb-3 opacity-80"></i>
          <h3 className="text-sm font-medium mb-1 opacity-90">Total Content Items</h3>
          <p className="text-5xl font-bold">{totalContent}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
          <i className="ri-bar-chart-box-line text-4xl mb-3 opacity-80"></i>
          <h3 className="text-sm font-medium mb-1 opacity-90">Active Sections</h3>
          <p className="text-5xl font-bold">{stats.filter(s => s.count > 0).length}</p>
        </div>
        
        <Link
          href="/"
          target="_blank"
          className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all group"
        >
          <i className="ri-external-link-line text-4xl mb-3 opacity-80 group-hover:scale-110 transition-transform"></i>
          <h3 className="text-sm font-medium mb-1 opacity-90">View Live Site</h3>
          <p className="text-lg font-semibold">Visit Portfolio →</p>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group border border-gray-100"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
            </Link>
          ))}
        </div>
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
    </div>
  );
}
