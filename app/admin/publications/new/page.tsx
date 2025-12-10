import PublicationForm from "@/components/admin/PublicationForm";
import Link from "next/link";

export default function NewPublicationPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/publications"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Publications
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Publication</h1>
        <p className="text-gray-600 mt-1">Fill in the publication details</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <PublicationForm />
      </div>
    </div>
  );
}
