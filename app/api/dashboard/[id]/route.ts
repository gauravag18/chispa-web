import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const supabase = await createServerSupabase();
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({ campaign: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
