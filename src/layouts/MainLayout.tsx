
import NavBar from "@/components/NavBar";
import UserMenu from "@/components/UserMenu";
import NotificationBell from "@/components/NotificationBell";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 flex justify-end items-center gap-2 z-50">
        <NotificationBell />
        <UserMenu />
      </header>
      <main className="pb-20 px-4 pt-16">{children}</main>
      <NavBar />
    </div>
  );
};

export default MainLayout;
