import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

// POST → save input
export async function POST(req: Request) {
  const supabase = await createServerSupabase();
  try {
    const body = await req.json();
    const { business_idea, target_audience, unique_value_proposition, tag, uploads } = body;

    if (!business_idea || !target_audience || !unique_value_proposition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("campaign_inputs")
      .insert([
        { business_idea, target_audience, unique_value_proposition, tag: tag || null, uploads: uploads || null }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ input: data }, { status: 201 });
  } catch (err) {
  const errorMessage = (err as Error)?.message ?? "Unexpected error";
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
}

// GET → fetch all inputs
export async function GET() {
  const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("campaign_inputs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ inputs: data });
  } catch (err) {
  const errorMessage = (err as Error)?.message ?? "Unexpected error";
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
}
