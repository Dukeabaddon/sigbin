
import NavBar from "@/components/NavBar";
import NotificationBell from "@/components/NotificationBell";
import UserMenu from "@/components/UserMenu";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          SIGBIN
        </h1>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <UserMenu />
        </div>
      </header>
      <main className="pb-20 px-4 pt-16">{children}</main>
      <NavBar />
    </div>
  );
};

export default MainLayout;
