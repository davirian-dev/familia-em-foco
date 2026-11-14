import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { HabitsTracker } from './components/habits-goals/HabitsTracker';
import { GoalsManager } from './components/habits-goals/GoalsManager';
import { KidsTaskManager } from './components/gamification/KidsTaskManager';
import { RewardStore } from './components/gamification/RewardStore';
import { MilestonesDiary } from './components/milestones/MilestonesDiary';
import { StudiesManager } from './components/studies/StudiesManager';
import { FinancesManager } from './components/finances/FinancesManager';
import { useFamily } from './context/FamilyContext';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const { activeMember } = useFamily();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-200">
      
      {/* Cabeçalho Fixo */}
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Barra Lateral para Desktop */}
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Conteúdo Principal */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-5xl overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardOverview onNavigateTab={(tab) => setCurrentTab(tab)} />
          )}

          {currentTab === 'studies' && (
            <div className="animate-fade-in">
              <StudiesManager />
            </div>
          )}

          {currentTab === 'finances' && (
            <div className="animate-fade-in">
              <FinancesManager />
            </div>
          )}

          {currentTab === 'habits-goals' && (
            <div className="space-y-8 animate-fade-in">
              <HabitsTracker />
              <GoalsManager />
            </div>
          )}

          {currentTab === 'kids' && (
            <div className="animate-fade-in">
              <KidsTaskManager />
            </div>
          )}

          {currentTab === 'milestones' && (
            <div className="animate-fade-in">
              <MilestonesDiary />
            </div>
          )}

          {currentTab === 'rewards' && (
            <div className="animate-fade-in">
              <RewardStore />
            </div>
          )}
        </main>
      </div>

      {/* Navegação Inferior para Celular (Mobile App Experience) */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default App;
