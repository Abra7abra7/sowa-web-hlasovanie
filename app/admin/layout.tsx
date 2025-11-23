import { redirect } from "next/navigation";
import { checkAdminAuth } from "@/lib/auth/admin";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Shield, 
  BarChart3,
  LogOut 
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Kategórie", href: "/admin/kategorie", icon: Trophy },
    { name: "Nominanti", href: "/admin/nominanti", icon: Users },
    { name: "Fraud Detection", href: "/admin/fraud-detection", icon: Shield },
    { name: "Výsledky", href: "/admin/vysledky", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background">
        <div className="p-6">
          <h2 className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
            SOWA Admin
          </h2>
        </div>
        <nav className="space-y-1 px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-3 border-t">
          <form action="/admin/api/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors text-red-600"
            >
              <LogOut className="h-5 w-5" />
              Odhlásiť sa
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container py-6 max-w-7xl">{children}</div>
      </main>
    </div>
  );
}

