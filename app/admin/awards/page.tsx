import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AwardsPage() {
  const supabase = await createClient();
  
  const { data: awards } = await supabase
    .from("awards")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Awards & Recognition</h1>
          <p className="text-gray-600 mt-1">Manage achievements and honors</p>
        </div>
        <Link
          href="/admin/awards/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="ri-add-line"></i>
          Add Award
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {awards?.map((award) => (
              <tr key={award.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {award.order_index}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${award.color} flex items-center justify-center`}>
                      <i className={`${award.icon} text-xl text-white`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {award.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {award.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {award.year}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {award.organization}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/awards/${award.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={award.id} type="award" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!awards?.length && (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-trophy-line text-5xl mb-4 block"></i>
            <p>No awards yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
