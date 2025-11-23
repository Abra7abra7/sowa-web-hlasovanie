import { createAdminClient } from "@/lib/supabase/admin";
import { isDisposableEmail } from "@/lib/utils";

export interface FraudCheckResult {
  isSuspicious: boolean;
  fraudType?: string;
  severity?: "low" | "medium" | "high";
  details?: Record<string, any>;
}

export class FraudDetector {
  private supabase = createAdminClient();

  async checkIPClustering(ipAddress: string): Promise<FraudCheckResult> {
    const { data: votes, error } = await this.supabase
      .from("votes")
      .select("id")
      .eq("ip_address", ipAddress);

    if (error) {
      console.error("Error checking IP clustering:", error);
      return { isSuspicious: false };
    }

    const voteCount = votes?.length || 0;

    if (voteCount >= 10) {
      return {
        isSuspicious: true,
        fraudType: "ip_clustering",
        severity: "high",
        details: { voteCount, ipAddress },
      };
    }

    if (voteCount >= 5) {
      return {
        isSuspicious: true,
        fraudType: "ip_clustering",
        severity: "medium",
        details: { voteCount, ipAddress },
      };
    }

    return { isSuspicious: false };
  }

  async checkFingerprintDuplication(fingerprint: string): Promise<FraudCheckResult> {
    const { data: votes, error } = await this.supabase
      .from("votes")
      .select("id")
      .eq("fingerprint", fingerprint);

    if (error) {
      console.error("Error checking fingerprint duplication:", error);
      return { isSuspicious: false };
    }

    const voteCount = votes?.length || 0;

    if (voteCount >= 5) {
      return {
        isSuspicious: true,
        fraudType: "fingerprint_duplication",
        severity: "high",
        details: { voteCount, fingerprint },
      };
    }

    return { isSuspicious: false };
  }

  async checkTimingPattern(userId: string): Promise<FraudCheckResult> {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();

    const { data: recentVotes, error } = await this.supabase
      .from("votes")
      .select("id, voted_at")
      .eq("user_id", userId)
      .gte("voted_at", oneMinuteAgo);

    if (error) {
      console.error("Error checking timing pattern:", error);
      return { isSuspicious: false };
    }

    const voteCount = recentVotes?.length || 0;

    if (voteCount >= 5) {
      return {
        isSuspicious: true,
        fraudType: "suspicious_timing",
        severity: "high",
        details: { votesInLastMinute: voteCount },
      };
    }

    return { isSuspicious: false };
  }

  checkDisposableEmail(email: string): FraudCheckResult {
    if (isDisposableEmail(email)) {
      return {
        isSuspicious: true,
        fraudType: "disposable_email",
        severity: "medium",
        details: { email },
      };
    }

    return { isSuspicious: false };
  }

  async checkVotingPattern(
    userId: string,
    nomineeId: string
  ): Promise<FraudCheckResult> {
    // Check if there are many users voting for the same nominee in a short time
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const { data: recentVotes, error } = await this.supabase
      .from("votes")
      .select("id, user_id")
      .eq("nominee_id", nomineeId)
      .gte("voted_at", fiveMinutesAgo);

    if (error) {
      console.error("Error checking voting pattern:", error);
      return { isSuspicious: false };
    }

    const voteCount = recentVotes?.length || 0;

    if (voteCount >= 50) {
      return {
        isSuspicious: true,
        fraudType: "coordinated_voting",
        severity: "high",
        details: { votesInLast5Minutes: voteCount, nomineeId },
      };
    }

    return { isSuspicious: false };
  }

  async performFullCheck(params: {
    userId: string;
    email: string;
    ipAddress: string;
    fingerprint: string;
    nomineeId: string;
  }): Promise<FraudCheckResult[]> {
    const results = await Promise.all([
      this.checkIPClustering(params.ipAddress),
      this.checkFingerprintDuplication(params.fingerprint),
      this.checkTimingPattern(params.userId),
      this.checkVotingPattern(params.userId, params.nomineeId),
    ]);

    results.push(this.checkDisposableEmail(params.email));

    return results.filter((result) => result.isSuspicious);
  }

  async logFraudDetection(
    result: FraudCheckResult,
    userId: string | null,
    voteId: string | null,
    ipAddress: string,
    fingerprint: string
  ): Promise<void> {
    if (!result.isSuspicious) return;

    try {
      await this.supabase.from("fraud_detection_logs").insert({
        user_id: userId,
        vote_id: voteId,
        fraud_type: result.fraudType || "unknown",
        severity: result.severity || "low",
        details: result.details || {},
        ip_address: ipAddress,
        fingerprint: fingerprint,
        resolved: false,
      });
    } catch (error) {
      console.error("Error logging fraud detection:", error);
    }
  }
}

