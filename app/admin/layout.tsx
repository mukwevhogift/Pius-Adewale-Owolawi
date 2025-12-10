import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Verify admin access
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("role, full_name")
    .eq("email", session.user.email)
    .single();

  if (!adminUser) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
