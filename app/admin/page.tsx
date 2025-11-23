import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Users, Trophy, Vote, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch statistics
  const [
    { count: totalVotes },
    { count: totalUsers },
    { count: totalCategories },
    { data: fraudLogs },
  ] = await Promise.all([
    supabase.from("votes").select("*", { count: "exact", head: true }),
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase
      .from("fraud_detection_logs")
      .select("*")
      .eq("resolved", false)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      title: "Celkový počet hlasov",
      value: totalVotes || 0,
      icon: Vote,
      color: "text-blue-500",
    },
    {
      title: "Registrovaní používatelia",
      value: totalUsers || 0,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Kategórie",
      value: totalCategories || 0,
      icon: Trophy,
      color: "text-purple-500",
    },
    {
      title: "Nerozriešené podozrenia",
      value: fraudLogs?.length || 0,
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Prehľad štatistík a aktivity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Fraud Alerts */}
      {fraudLogs && fraudLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Nedávne podozrivé aktivity</CardTitle>
            <CardDescription>
              Posledných 5 nerozriešených podozrení
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fraudLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        log.severity === "high"
                          ? "text-red-500"
                          : log.severity === "medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{log.fraud_type}</p>
                      <p className="text-sm text-muted-foreground">
                        IP: {log.ip_address}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      log.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : log.severity === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {log.severity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

