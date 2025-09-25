import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("GET /api/dashboard → Data:", data);
    console.log("GET /api/dashboard → Error:", error);

    if (error) throw error;

    return NextResponse.json({ campaigns: data });
  } catch (err) {
  const errorMessage = (err as Error)?.message ?? "Unexpected error";
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
}

export async function POST(req: Request) {
  const supabase = await createServerSupabase();
  try {
    const body = await req.json();
    console.log("POST /api/dashboard → Request Body:", body);

    const { title, tag, personas, messaging, channels, calendar, budget_kpis } = body;

    // Check required fields
    if (!title || !personas || !messaging || !channels || !calendar || !budget_kpis) {
      console.error("POST /api/dashboard → Missing fields:", { title, personas, messaging, channels, calendar, budget_kpis });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("campaigns")
      .insert([{ title, tag, personas, messaging, channels, calendar, budget_kpis }])
      .select()
      .single();

    console.log("POST /api/dashboard → Inserted Data:", data);
    console.log("POST /api/dashboard → Insert Error:", error);

    if (error) throw error;

    return NextResponse.json({ campaign: data }, { status: 201 });
  } catch (err) {
  const errorMessage = (err as Error)?.message ?? "Unexpected error";
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
}
