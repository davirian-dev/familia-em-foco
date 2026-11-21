import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  LayoutDashboard,
  Target,
  Sparkles,
  Baby,
  Gift,
  BookOpen,
  Calendar,
  ShoppingBag,
  Timer,
  HeartHandshake,
  Wallet,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { activeMember, isParent } = useFamily();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: LayoutDashboard,
      description: 'Painel da família na semana'
    },
    {
      id: 'studies',
      label: 'Centro de Estudos',
      icon: BookOpen,
      description: 'Faculdade, Colégio & Theo'
    },
    {
      id: 'pomodoro',
      label: 'Timer de Foco',
      icon: Timer,
      description: 'Pomodoro de Estudos'
    },
    {
      id: 'mural',
      label: 'Mural de Afeto',
      icon: HeartHandshake,
      description: 'Recados & Carinho Familiar'
    },
    {
      id: 'habits-goals',
      label: 'Metas & Hábitos',
      icon: Target,
      description: 'Davi & Marina (Carreira, Saúde)'
    },
    {
      id: 'kids',
      label: 'Trilhas das Crianças',
      icon: Sparkles,
      description: 'Benjamin & Iris (Tarefas)'
    },
    {
      id: 'milestones',
      label: 'Marcos de Crescimento',
      icon: Baby,
      description: 'Diário de Bordo do Theo'
    },
    {
      id: 'calendar',
      label: 'Agenda & Pediatra',
      icon: Calendar,
      description: 'Consultas, vacinas e eventos'
    },
    {
      id: 'shopping',
      label: 'Lista de Compras',
      icon: ShoppingBag,
      description: 'Dia a Dia, Preciso & Quero'
    },
    {
      id: 'finances',
      label: 'Gestão Financeira',
      icon: Wallet,
      description: 'Dívidas & Investimentos'
    },
    {
      id: 'rewards',
      label: 'Loja de Recompensas',
      icon: Gift,
      description: 'Troca de pontos e resgates'
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[calc(100vh-4rem)] p-4">
      {/* Navegação Principal */}
      <nav className="flex-1 space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Navegação
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-start space-x-3 px-3.5 py-3 rounded-2xl text-left transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon
                className={`w-5 h-5 mt-0.5 shrink-0 ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
                }`}
              />
              <div className="min-w-0">
                <div className="text-sm">{item.label}</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Card do Usuário Logado */}
      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{activeMember.avatar}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                {activeMember.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {activeMember.role === 'parent' ? 'Administrador' : `Criança (${activeMember.age} anos)`}
              </p>
            </div>
            {isParent && (
              <span title="Acesso Total de Administrador"><ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" /></span>
            )}
          </div>
          {/* Links de Conformidade LGPD & Termos */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <a href="/privacidade.html" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">Privacidade</a>
            <span>•</span>
            <a href="/termos.html" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">Termos</a>
            <span>•</span>
            <span>v1.0 Pro</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
