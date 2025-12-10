import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch education records" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating education:", body);
    
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("education")
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Create error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create education record" },
      { status: 500 }
    );
  }
}
