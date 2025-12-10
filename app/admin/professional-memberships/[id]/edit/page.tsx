import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import MembershipForm from '@/components/admin/MembershipForm';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMembershipPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: membership, error } = await supabase
    .from('professional_memberships')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !membership) {
    console.error('Error fetching membership:', error);
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link 
          href="/admin/professional-memberships"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Professional Memberships
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Membership</h1>
        <p className="text-gray-600 mt-2">Update membership details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <MembershipForm initialData={membership} membershipId={id} />
      </div>
    </div>
  );
}
