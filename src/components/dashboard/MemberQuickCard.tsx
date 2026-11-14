import React from 'react';
import { FamilyMember } from '../../types';
import { useFamily } from '../../context/FamilyContext';
import { ProgressBar } from '../common/ProgressBar';
import { Flame, CheckCircle2, Trophy, Coins } from 'lucide-react';

interface MemberQuickCardProps {
  member: FamilyMember;
  onSelect: () => void;
}

export const MemberQuickCard: React.FC<MemberQuickCardProps> = ({ member, onSelect }) => {
  const { goals, habits, tasks, milestones } = useFamily();

  // Métricas específicas de cada membro
  const memberGoals = goals.filter((g) => g.memberId === member.id);
  const memberHabits = habits.filter((h) => h.memberId === member.id);
  const memberTasks = tasks.filter((t) => t.memberId === member.id);
  const memberMilestones = milestones.filter((m) => m.memberId === member.id);

  // Progresso de metas
  const avgGoalProgress =
    memberGoals.length > 0
      ? Math.round(
          memberGoals.reduce((acc, curr) => acc + curr.progress, 0) / memberGoals.length
        )
      : 0;

  // Hábitos feitos hoje
  const habitsDoneToday = memberHabits.filter((h) => h.completedToday).length;

  // Tarefas feitas pelas crianças
  const tasksDone = memberTasks.filter((t) => t.completed).length;

  // Marcos conquistados (Theo)
  const milestonesDone = memberMilestones.filter((m) => m.status === 'concluido').length;

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-200 group relative overflow-hidden"
    >
      {/* Barra de cor temática no topo */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: member.themeColor }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
            style={{ backgroundColor: `${member.themeColor}20` }}
          >
            {member.avatar}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {member.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {member.role === 'parent' ? `${member.age} anos • Pais (Admin)` : `${member.age} anos • Criança`}
            </p>
          </div>
        </div>

        {/* Badge de Pontos / Nível */}
        {member.role === 'child' && member.id !== 'theo' && (
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-200 dark:border-amber-800">
            <Coins className="w-3.5 h-3.5" />
            <span>{member.points}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 italic">
        "{member.bio}"
      </p>

      {/* Conteúdo específico por perfil */}
      {member.role === 'parent' ? (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Progresso das Metas</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{avgGoalProgress}%</span>
            </div>
            <ProgressBar progress={avgGoalProgress} colorClass="bg-indigo-600" size="sm" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="flex items-center text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              Hábitos Hoje:
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {habitsDoneToday} / {memberHabits.length}
            </span>
          </div>
        </div>
      ) : member.id === 'theo' ? (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Marcos Conquistados</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">
                {milestonesDone} de {memberMilestones.length}
              </span>
            </div>
            <ProgressBar
              progress={(milestonesDone / Math.max(memberMilestones.length, 1)) * 100}
              colorClass="bg-cyan-500"
              size="sm"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="flex items-center text-slate-500 dark:text-slate-400">
              <Trophy className="w-3.5 h-3.5 mr-1 text-amber-500" />
              Desenvolvimento:
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Fala, Sono & Desfralde
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Tarefas de Hoje</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {tasksDone} / {memberTasks.length} concluídas
              </span>
            </div>
            <ProgressBar
              progress={(tasksDone / Math.max(memberTasks.length, 1)) * 100}
              colorClass="bg-amber-500"
              size="sm"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="flex items-center text-slate-500 dark:text-slate-400">
              <Flame className="w-3.5 h-3.5 mr-1 text-orange-500" />
              Recompensas:
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Pronto para resgatar
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
