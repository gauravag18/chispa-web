import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET() {
    const supabase = await createServerSupabase();
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ campaigns: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    const supabase = await createServerSupabase();
  try {
    const body = await req.json();

    // Expecting { title, tag, personas, messaging, channels, calendar, budget_kpis }
    const { title, tag, personas, messaging, channels, calendar, budget_kpis } = body;

    if (!title || !personas || !messaging || !channels || !calendar || !budget_kpis) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("campaigns")
      .insert([
        { title, tag, personas, messaging, channels, calendar, budget_kpis }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ campaign: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 });
  }
}
