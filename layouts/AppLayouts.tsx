import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export default function AppLayouts({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow flex-shrink-0 w-full bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <Footer />
    </div>
  );
}