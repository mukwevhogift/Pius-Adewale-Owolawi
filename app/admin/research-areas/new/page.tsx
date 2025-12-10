import ResearchAreaForm from '@/components/admin/ResearchAreaForm';
import Link from 'next/link';

export default function NewResearchAreaPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Add New Research Area</h1>
        <p className="text-gray-600 mt-2">Create a new research area with associated projects</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ResearchAreaForm />
      </div>
    </div>
  );
}
