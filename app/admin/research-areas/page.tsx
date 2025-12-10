import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function ResearchAreasPage() {
  const supabase = await createClient();
  
  const { data: researchAreas } = await supabase
    .from("research_areas")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Areas</h1>
          <p className="text-gray-600 mt-1">Manage research focus areas and projects</p>
        </div>
        <Link
          href="/admin/research-areas/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="ri-add-line"></i>
          Add Research Area
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchAreas?.map((area) => {
          const projects = Array.isArray(area.projects) ? area.projects : [];
          
          return (
            <div key={area.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className={`h-2 bg-gradient-to-r ${area.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center`}>
                    <i className={`${area.icon} text-2xl text-white`}></i>
                  </div>
                  <span className="text-sm text-gray-500">#{area.order_index}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {area.title}
                </h3>

                {area.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {area.description}
                  </p>
                )}

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Projects ({projects.length})
                  </div>
                  <div className="space-y-1">
                    {projects.slice(0, 3).map((project: string, idx: number) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="line-clamp-1">{project}</span>
                      </div>
                    ))}
                    {projects.length > 3 && (
                      <div className="text-sm text-gray-400 italic">
                        +{projects.length - 3} more...
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/research-areas/${area.id}/edit`}
                    className="flex-1 text-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={area.id} type="research-area" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!researchAreas?.length && (
        <div className="text-center py-12 text-gray-500">
          <i className="ri-flask-line text-5xl mb-4 block"></i>
          <p>No research areas yet. Add your first one!</p>
        </div>
      )}
    </div>
  );
}
