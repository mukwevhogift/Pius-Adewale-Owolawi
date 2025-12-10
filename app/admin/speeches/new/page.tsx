import SpeechForm from "@/components/admin/SpeechForm";
import Link from "next/link";

export default function NewSpeechPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/speeches"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Speeches
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Speech</h1>
        <p className="text-gray-600 mt-1">Create a new keynote speech or presentation</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <SpeechForm />
      </div>
    </div>
  );
}
