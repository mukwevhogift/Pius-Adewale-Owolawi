import { createClient } from "@/lib/supabase/server";
import CertificationForm from "@/components/admin/CertificationForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: certification, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !certification) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/certifications"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Certifications
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Certification</h1>
        <p className="text-gray-600 mt-1">Update certification details</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <CertificationForm initialData={certification} certificationId={id} />
      </div>
    </div>
  );
}
