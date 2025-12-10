import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AchievementForm from '@/components/admin/AchievementForm';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAchievementPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: achievement, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !achievement) {
    console.error('Error fetching achievement:', error);
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link 
          href="/admin/achievements"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Achievements
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Achievement</h1>
        <p className="text-gray-600 mt-2">Update achievement details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <AchievementForm initialData={achievement} achievementId={id} />
      </div>
    </div>
  );
}
