import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function PublicationsPage() {
  const supabase = await createClient();
  
  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .order("year", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publications</h1>
          <p className="text-gray-600 mt-1">Manage research papers and publications</p>
        </div>
        <Link
          href="/admin/publications/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="ri-add-line"></i>
          Add Publication
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Journal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {publications?.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                    {pub.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate">{pub.authors}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{pub.journal}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{pub.year}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {pub.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/publications/${pub.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={pub.id} type="publication" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!publications?.length && (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-article-line text-5xl mb-4 block"></i>
            <p>No publications yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
