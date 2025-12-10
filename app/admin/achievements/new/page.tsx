import AchievementForm from '@/components/admin/AchievementForm';
import Link from 'next/link';

export default function NewAchievementPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Add New Achievement</h1>
        <p className="text-gray-600 mt-2">Create a new achievement with details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <AchievementForm />
      </div>
    </div>
  );
}
