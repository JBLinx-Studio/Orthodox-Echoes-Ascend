
import { Outlet } from 'react-router-dom';
import { MainNavigation } from '@/components/MainNavigation';
import { Footer } from '@/components/Footer';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
