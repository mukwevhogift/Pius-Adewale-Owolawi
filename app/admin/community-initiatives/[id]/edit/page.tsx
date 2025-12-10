import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import InitiativeForm from '@/components/admin/InitiativeForm';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInitiativePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: initiative, error } = await supabase
    .from('community_initiatives')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !initiative) {
    console.error('Error fetching initiative:', error);
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link 
          href="/admin/community-initiatives"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Community Initiatives
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Initiative</h1>
        <p className="text-gray-600 mt-2">Update initiative details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <InitiativeForm initialData={initiative} initiativeId={id} />
      </div>
    </div>
  );
}
