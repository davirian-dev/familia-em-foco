import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Sparkles,
  Baby,
  Calendar,
  Wallet,
  Gift
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'studies', label: 'Estudos', icon: BookOpen },
    { id: 'finances', label: 'Finanças', icon: Wallet },
    { id: 'habits-goals', label: 'Metas', icon: Target },
    { id: 'kids', label: 'Crianças', icon: Sparkles },
    { id: 'milestones', label: 'Theo', icon: Baby },
    { id: 'calendar', label: 'Agenda', icon: Calendar },
    { id: 'rewards', label: 'Loja', icon: Gift }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 px-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[50px] flex-1 py-1 transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
