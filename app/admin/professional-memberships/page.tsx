import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function ProfessionalMembershipsPage() {
  const supabase = await createClient();

  const { data: memberships, error } = await supabase
    .from('professional_memberships')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching memberships:', error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Professional Memberships</h1>
          <p className="text-gray-600 mt-2">Manage professional organization memberships</p>
        </div>
        <Link
          href="/admin/professional-memberships/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <i className="ri-add-line text-xl"></i>
          Add Membership
        </Link>
      </div>

      {memberships && memberships.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {memberships.map((membership) => (
                <tr key={membership.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{membership.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{membership.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-600">{membership.registration_no}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{membership.year || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      membership.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {membership.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {membership.order_index}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/professional-memberships/${membership.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </Link>
                      <DeleteButton
                        id={membership.id}
                        type="professional-membership"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <i className="ri-team-line text-6xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No memberships yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first professional membership.</p>
          <Link
            href="/admin/professional-memberships/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <i className="ri-add-line text-xl"></i>
            Add Membership
          </Link>
        </div>
      )}
    </div>
  );
}
