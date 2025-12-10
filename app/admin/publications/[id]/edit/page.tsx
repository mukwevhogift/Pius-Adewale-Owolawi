import { createClient } from "@/lib/supabase/server";
import PublicationForm from "@/components/admin/PublicationForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: publication } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .single();

  if (!publication) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Edit Publication</h1>
        <p className="text-gray-600 mt-1">Update publication details</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <PublicationForm initialData={publication} />
      </div>
    </div>
  );
}
