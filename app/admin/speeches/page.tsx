import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function SpeechesPage() {
  const supabase = await createClient();
  
  const { data: speeches } = await supabase
    .from("speeches")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Speeches & Presentations</h1>
          <p className="text-gray-600 mt-1">Manage keynote speeches, conferences, and webinars</p>
        </div>
        <Link
          href="/admin/speeches/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="ri-add-line"></i>
          Add Speech
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
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
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
            {speeches?.map((speech) => (
              <tr key={speech.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                    {speech.title}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{speech.event}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(speech.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{speech.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    speech.type === 'keynote' ? 'bg-purple-100 text-purple-800' :
                    speech.type === 'conference' ? 'bg-blue-100 text-blue-800' :
                    speech.type === 'webinar' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {speech.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/speeches/${speech.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={speech.id} type="speech" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!speeches?.length && (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-mic-line text-5xl mb-4 block"></i>
            <p>No speeches yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
