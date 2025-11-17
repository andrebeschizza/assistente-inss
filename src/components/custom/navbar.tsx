'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, MessageCircle, CheckSquare, Info, Crown, User, Youtube } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Início', route: '/home' },
    { icon: MessageCircle, label: 'Chat', route: '/chat' },
    { icon: Youtube, label: 'Vídeos', route: '/videos' },
    { icon: CheckSquare, label: 'Checklists', route: '/checklists' },
    { icon: Info, label: 'Info', route: '/info' },
    { icon: Crown, label: 'Premium', route: '/plans' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.route;
          return (
            <button
              key={index}
              onClick={() => router.push(item.route)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#003366] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
