import { createClient } from "@/lib/supabase/server";
import SpeechForm from "@/components/admin/SpeechForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditSpeechPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: speech, error } = await supabase
    .from("speeches")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !speech) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Edit Speech</h1>
        <p className="text-gray-600 mt-1">Update speech details</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <SpeechForm initialData={speech} speechId={id} />
      </div>
    </div>
  );
}
