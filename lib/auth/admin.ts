import { cookies } from "next/headers";

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token");
  
  if (!adminToken) {
    return false;
  }

  // Simple token verification (in production use JWT or session)
  const expectedToken = Buffer.from(
    `${process.env.ADMIN_PASSWORD}:admin`
  ).toString("base64");

  return adminToken.value === expectedToken;
}

export async function setAdminAuth(): Promise<void> {
  const cookieStore = await cookies();
  const token = Buffer.from(
    `${process.env.ADMIN_PASSWORD}:admin`
  ).toString("base64");

  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function clearAdminAuth(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

