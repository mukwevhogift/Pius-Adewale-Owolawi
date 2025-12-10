import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ResearchAreaForm from '@/components/admin/ResearchAreaForm';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditResearchAreaPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: researchArea, error } = await supabase
    .from('research_areas')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !researchArea) {
    console.error('Error fetching research area:', error);
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link 
          href="/admin/research-areas"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Research Areas
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Research Area</h1>
        <p className="text-gray-600 mt-2">Update research area details and projects</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ResearchAreaForm initialData={researchArea} researchAreaId={id} />
      </div>
    </div>
  );
}
