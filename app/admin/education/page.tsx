import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function EducationPage() {
  const supabase = await createClient();
  
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Education & Qualifications</h1>
          <p className="text-gray-600 mt-1">Manage academic degrees and certifications</p>
        </div>
        <Link
          href="/admin/education/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="ri-add-line"></i>
          Add Education
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Institution
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {education?.map((edu) => (
              <tr key={edu.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {edu.order_index}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${edu.bg_color} flex items-center justify-center`}>
                      <i className={`${edu.icon} text-lg bg-gradient-to-br ${edu.color} bg-clip-text text-transparent`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 max-w-md">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-gray-500">{edu.country}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {edu.institution}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {edu.year_start} - {edu.year_end || 'Present'}
                </td>
                <td className="px-6 py-4">
                  {edu.is_ongoing ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Ongoing
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      Completed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/education/${edu.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={edu.id} type="education" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!education?.length && (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-graduation-cap-line text-5xl mb-4 block"></i>
            <p>No education records yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
