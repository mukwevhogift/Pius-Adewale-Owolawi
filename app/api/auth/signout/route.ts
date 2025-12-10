import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  // Get the origin from the request or use a fallback
  const origin = request.headers.get('origin') || 
                 process.env.NEXT_PUBLIC_SITE_URL || 
                 'http://localhost:3000';
  
  // Use 303 See Other to redirect POST to GET
  return NextResponse.redirect(new URL("/login", origin), 303);
}
