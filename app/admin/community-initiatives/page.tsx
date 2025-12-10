import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function CommunityInitiativesPage() {
  const supabase = await createClient();

  const { data: initiatives, error } = await supabase
    .from('community_initiatives')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching initiatives:', error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Initiatives</h1>
          <p className="text-gray-600 mt-2">Manage community engagement and outreach programs</p>
        </div>
        <Link
          href="/admin/community-initiatives/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <i className="ri-add-line text-xl"></i>
          Add Initiative
        </Link>
      </div>

      {initiatives && initiatives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border-t-4"
              style={{ borderTopColor: initiative.color?.includes('from-') ? undefined : initiative.color }}
            >
              <div className={`h-2 bg-gradient-to-r ${initiative.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${initiative.color} flex items-center justify-center`}>
                    <i className={`${initiative.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="flex items-center gap-3">
                    {initiative.is_active ? (
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{initiative.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Order: {initiative.order_index}</span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/community-initiatives/${initiative.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </Link>
                    <DeleteButton
                      id={initiative.id}
                      type="community-initiative"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <i className="ri-heart-line text-6xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No initiatives yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first community initiative.</p>
          <Link
            href="/admin/community-initiatives/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <i className="ri-add-line text-xl"></i>
            Add Initiative
          </Link>
        </div>
      )}
    </div>
  );
}
