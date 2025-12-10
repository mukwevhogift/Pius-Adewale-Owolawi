import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("speeches")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch speeches" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating speech:", body);
    
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("speeches")
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
      { error: error.message || "Failed to create speech" },
      { status: 500 }
    );
  }
}
