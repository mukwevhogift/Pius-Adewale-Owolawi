import { createClient } from "@/lib/supabase/server";
import AwardForm from "@/components/admin/AwardForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditAwardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: award, error } = await supabase
    .from("awards")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !award) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/awards"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Awards
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Award</h1>
        <p className="text-gray-600 mt-1">Update award details</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <AwardForm initialData={award} awardId={id} />
      </div>
    </div>
  );
}
