import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Trophy, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminResultsPage() {
  const supabase = await createClient();

  // Get all categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("order", { ascending: true });

  // Get results for each category
  const categoryResults = [];

  for (const category of categories || []) {
    const { data: votes } = await supabase
      .from("votes")
      .select(
        `
        id,
        nominee_id,
        nominees (
          id,
          name,
          image_url
        )
      `
      )
      .eq("category_id", category.id);

    // Count votes per nominee
    const voteCounts: { [key: string]: any } = {};

    for (const vote of votes || []) {
      const nomineeId = vote.nominee_id;
      if (!voteCounts[nomineeId]) {
        voteCounts[nomineeId] = {
          nominee_id: nomineeId,
          nominee_name: (vote.nominees as any)?.name || "Unknown",
          vote_count: 0,
        };
      }
      voteCounts[nomineeId].vote_count++;
    }

    const results = Object.values(voteCounts)
      .sort((a, b) => b.vote_count - a.vote_count)
      .map((result, index) => ({
        ...result,
        rank: index + 1,
      }));

    categoryResults.push({
      category,
      results,
      totalVotes: votes?.length || 0,
    });
  }

  const totalVotes = categoryResults.reduce((sum, cat) => sum + cat.totalVotes, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Výsledky</h1>
          <p className="text-muted-foreground">
            Detailný prehľad výsledkov hlasovania
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Celkový počet hlasov</p>
          <p className="text-3xl font-bold gradient-purple bg-clip-text text-transparent">
            {totalVotes}
          </p>
        </div>
      </div>

      {categoryResults.map((categoryResult) => (
        <Card key={categoryResult.category.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {categoryResult.category.name}
                </CardTitle>
                <CardDescription>
                  {categoryResult.totalVotes} hlasov celkom
                </CardDescription>
              </div>
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            {categoryResult.results.length > 0 ? (
              <div className="space-y-3">
                {categoryResult.results.map((result, index) => (
                  <div
                    key={result.nominee_id}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${
                      index === 0
                        ? "bg-primary/10 border-primary/20"
                        : "bg-card"
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 text-center">
                      {index === 0 ? (
                        <Trophy className="h-6 w-6 text-yellow-500 mx-auto" />
                      ) : (
                        <span className="text-xl font-bold text-muted-foreground">
                          #{result.rank}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {result.nominee_name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {result.vote_count}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          hlasov
                        </div>
                      </div>
                      <div className="text-right w-16">
                        <div className="text-sm font-medium flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {(
                            (result.vote_count / categoryResult.totalVotes) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Zatiaľ žiadne hlasy v tejto kategórii
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

