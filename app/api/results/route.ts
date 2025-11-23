import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .order("order", { ascending: true });

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      return NextResponse.json(
        { error: "Chyba pri načítaní kategórií" },
        { status: 500 }
      );
    }

    // Get vote counts for each category
    const categoryResults = [];
    let totalVotes = 0;

    for (const category of categories || []) {
      const { data: votes, error: votesError } = await supabase
        .from("votes")
        .select(
          `
          id,
          nominee_id,
          nominees (
            id,
            name,
            image_url,
            instagram
          )
        `
        )
        .eq("category_id", category.id);

      if (votesError) {
        console.error("Error fetching votes:", votesError);
        continue;
      }

      // Count votes per nominee
      const voteCounts: { [key: string]: any } = {};
      
      for (const vote of votes || []) {
        const nomineeId = vote.nominee_id;
        if (!voteCounts[nomineeId]) {
          voteCounts[nomineeId] = {
            nominee_id: nomineeId,
            nominee_name: (vote.nominees as any)?.name || "Unknown",
            nominee_image: (vote.nominees as any)?.image_url || null,
            nominee_instagram: (vote.nominees as any)?.instagram || null,
            vote_count: 0,
          };
        }
        voteCounts[nomineeId].vote_count++;
        totalVotes++;
      }

      // Convert to array and sort by vote count
      const results = Object.values(voteCounts)
        .sort((a, b) => b.vote_count - a.vote_count)
        .slice(0, 10) // Top 10
        .map((result, index) => ({
          ...result,
          rank: index + 1,
        }));

      if (results.length > 0) {
        categoryResults.push({
          category_id: category.id,
          category_name: category.name,
          category_slug: category.slug,
          results,
        });
      }
    }

    return NextResponse.json({
      categoryResults,
      totalVotes,
    });
  } catch (error) {
    console.error("Results API error:", error);
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    );
  }
}

