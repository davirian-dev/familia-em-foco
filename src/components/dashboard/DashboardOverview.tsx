import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { WeeklyCompletionChart } from './WeeklyCompletionChart';
import { TasksPieChart } from './TasksPieChart';
import { MemberQuickCard } from './MemberQuickCard';
import {
  CheckCircle,
  Flame,
  Award,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { members, setActiveMemberId, tasks, habits, goals, milestones, verifyTaskByParent, isParent } = useFamily();

  // Tarefas que as crianças concluíram e aguardam validação dos pais
  const pendingVerificationTasks = tasks.filter((t) => t.completed && !t.verifiedByParent);

  // Hábitos feitos hoje
  const totalHabitsToday = habits.filter((h) => h.completedToday).length;

  // Maior ofensiva da família
  const topStreak = Math.max(...habits.map((h) => h.streak), 0);

  // Total de metas ativas
  const activeGoalsCount = goals.filter((g) => !g.completed).length;

  return (
    <div className="space-y-6">
      
      {/* Banner de Boas-vindas e Resumo da Família */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-indigo-600/10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Semana em Família • Novembro 2026</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Família Davi & Marina
          </h2>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base leading-relaxed">
            Acompanhe as metas de carreira e saúde dos pais, as pequenas responsabilidades do Benjamin e da Iris, e os primeiros passos do Theo em um só lugar.
          </p>
        </div>

        {/* Círculo decorativo */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Alerta de Verificação dos Pais (Se houver tarefas para validar) */}
      {isParent && pendingVerificationTasks.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
                {pendingVerificationTasks.length} {pendingVerificationTasks.length === 1 ? 'tarefa aguarda' : 'tarefas aguardam'} sua validação!
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                As crianças concluíram suas atividades. Ao validar, as moedas virtuais serão creditadas automaticamente.
              </p>
              
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pendingVerificationTasks.map((task) => {
                  const child = members.find((m) => m.id === task.memberId);
                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <span>{child?.avatar}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {task.title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {child?.name} • +{task.pointsReward} moedas
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => verifyTaskByParent(task.id)}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm shrink-0"
                      >
                        Aprovar
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cards de Métricas Rápidas Familiares */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hábitos Hoje</p>
            <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              {totalHabitsToday} feitos
            </h4>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Maior Ofensiva</p>
            <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              {topStreak} dias
            </h4>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Metas Ativas</p>
            <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              {activeGoalsCount} metas
            </h4>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Marcos do Theo</p>
            <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              {milestones.filter((m) => m.status === 'concluido').length} / {milestones.length}
            </h4>
          </div>
        </div>
      </div>

      {/* Gráficos Visuais da Família (Barras Semanal + Pizza de Conclusão) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyCompletionChart />
        <TasksPieChart />
      </div>

      {/* Painel por Membro da Família */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Perfis da Família
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clique em qualquer membro para abrir a visão individual e gerenciar atividades
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {members.map((member) => (
            <MemberQuickCard
              key={member.id}
              member={member}
              onSelect={() => {
                setActiveMemberId(member.id);
                if (member.role === 'parent') {
                  onNavigateTab('habits-goals');
                } else if (member.id === 'theo') {
                  onNavigateTab('milestones');
                } else {
                  onNavigateTab('kids');
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Seção de Atalhos Rápidos */}
      <div className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base">
            Pronto para resgatar momentos em família?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            As crianças podem trocar as moedas acumuladas por passeios, tempo de jogos e sobremesas na loja.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('rewards')}
          className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-2xl shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          <span>Abrir Loja de Recompensas</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
