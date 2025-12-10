import EducationForm from "@/components/admin/EducationForm";
import Link from "next/link";

export default function NewEducationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/education"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Education
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add Education Record</h1>
        <p className="text-gray-600 mt-1">Create a new academic qualification</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <EducationForm />
      </div>
    </div>
  );
}
