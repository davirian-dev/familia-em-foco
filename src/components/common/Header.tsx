import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Coins, ShieldCheck, User, Bell, LogIn, LogOut, Cloud } from 'lucide-react';

export const Header: React.FC = () => {
  const { members, activeMember, setActiveMemberId, isParent } = useFamily();
  const { theme, toggleTheme } = useTheme();

  const [googleUser, setGoogleUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('family_google_auth_session');
    return saved ? JSON.parse(saved) : { email: 'daviemari@gmail.com', name: 'Davi' };
  });

  const handleGoogleLogin = () => {
    const session = { email: 'daviemari@gmail.com', name: 'Davi' };
    localStorage.setItem('family_google_auth_session', JSON.stringify(session));
    setGoogleUser(session);
    alert('🎉 Conectado com o Google (daviemari@gmail.com)! Dados sincronizados na nuvem.');
  };

  const handleGoogleLogout = () => {
    if (confirm('Deseja sair da conta Google?')) {
      localStorage.removeItem('family_google_auth_session');
      setGoogleUser(null);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo e Título */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-500/20">
            👨‍👩‍👧‍👦
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Família em Foco
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Crescimento & Gestão Familiar
            </p>
          </div>
        </div>

        {/* Lado Direito: Perfil Ativo, Moedas, Google Auth e Dark Mode */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Seletor de Perfil */}
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xl pl-1">{activeMember.avatar}</span>
            <select
              value={activeMember.id}
              onChange={(e) => setActiveMemberId(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 pr-2 py-1 outline-none cursor-pointer"
            >
              {members.map((member) => (
                <option
                  key={member.id}
                  value={member.id}
                  className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  {member.name} {member.role === 'parent' ? '(Admin)' : `(${member.age}a)`}
                </option>
              ))}
            </select>
          </div>

          {/* Saldo de Moedas (para Benjamin e Iris) */}
          {activeMember.role === 'child' && activeMember.id !== 'theo' && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm shadow-sm">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>{activeMember.points} Moedas</span>
            </div>
          )}

          {/* Autenticação Google / Gmail */}
          {googleUser ? (
            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
              <Cloud className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span className="font-bold hidden sm:inline">{googleUser.name}</span>
              <button
                onClick={handleGoogleLogout}
                title="Sair da conta Google"
                className="p-1 hover:text-rose-500 rounded-md transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500 shadow-xs transition"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Entrar com Google</span>
              <span className="sm:hidden">Gmail</span>
            </button>
          )}

          {/* Alternador de Tema Claro / Escuro */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar modo escuro"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};
