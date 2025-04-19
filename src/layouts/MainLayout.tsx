
import NavBar from "@/components/NavBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20 px-4 pt-4">{children}</main>
      <NavBar />
    </div>
  );
};

export default MainLayout;
