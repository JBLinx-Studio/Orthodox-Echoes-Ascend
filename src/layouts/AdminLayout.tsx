
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26]">
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
