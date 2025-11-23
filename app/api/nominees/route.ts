import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID je povinné" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: nominees, error } = await supabase
      .from("nominees")
      .select("*")
      .eq("category_id", categoryId)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching nominees:", error);
      return NextResponse.json(
        { error: "Chyba pri načítaní nominantov" },
        { status: 500 }
      );
    }

    return NextResponse.json({ nominees });
  } catch (error) {
    console.error("Nominees API error:", error);
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    );
  }
}

