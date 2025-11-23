import { NextResponse } from "next/server";
import { clearAdminAuth } from "@/lib/auth/admin";
import { redirect } from "next/navigation";

export async function POST() {
  await clearAdminAuth();
  redirect("/admin/login");
}

