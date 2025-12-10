import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function CertificationsPage() {
  const supabase = await createClient();
  
  const { data: certifications } = await supabase
    .from("certifications")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Professional Certifications</h1>
          <p className="text-gray-600 mt-1">Manage professional certificates and credentials</p>
        </div>
        <Link
          href="/admin/certifications/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="ri-add-line"></i>
          Add Certification
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
                Certification
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {certifications?.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {cert.order_index}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <i className={`${cert.icon} text-xl text-blue-600`}></i>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {cert.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {cert.full_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {cert.year || '-'}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/certifications/${cert.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={cert.id} type="certification" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!certifications?.length && (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-shield-check-line text-5xl mb-4 block"></i>
            <p>No certifications yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
