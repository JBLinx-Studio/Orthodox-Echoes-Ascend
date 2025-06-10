
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
