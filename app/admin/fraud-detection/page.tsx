import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { AlertTriangle, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FraudDetectionPage() {
  const supabase = await createClient();

  const { data: fraudLogs } = await supabase
    .from("fraud_detection_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const unresolvedCount = fraudLogs?.filter((log) => !log.resolved).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fraud Detection</h1>
        <p className="text-muted-foreground">
          Monitoring a detekcia podozrivých aktivít
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nerozriešené</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {unresolvedCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Celkom zaznamenaných</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{fraudLogs?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Záznamy podozrivých aktivít</CardTitle>
          <CardDescription>
            Automaticky detekované podozrivé vzory v hlasovaní
          </CardDescription>
        </CardHeader>
        <CardContent>
          {fraudLogs && fraudLogs.length > 0 ? (
            <div className="space-y-3">
              {fraudLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 rounded-lg border ${
                    log.resolved ? "bg-muted/50" : "bg-background"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {log.resolved ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            log.severity === "high"
                              ? "text-red-500"
                              : log.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                          }`}
                        />
                      )}
                      <div>
                        <p className="font-semibold">{log.fraud_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(log.created_at).toLocaleString("sk-SK")}
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
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">IP adresa:</span>{" "}
                      <span className="font-mono">{log.ip_address}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fingerprint:</span>{" "}
                      <span className="font-mono text-xs">
                        {log.fingerprint?.substring(0, 20)}...
                      </span>
                    </div>
                  </div>
                  {log.details && (
                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Žiadne záznamy podozrivých aktivít
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

