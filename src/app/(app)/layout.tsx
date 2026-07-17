import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8 lg:px-10">{children}</main>
      <Footer />
    </div>
  );
}
