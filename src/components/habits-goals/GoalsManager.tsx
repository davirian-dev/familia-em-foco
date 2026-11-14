import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { GoalHorizon } from '../../types';
import { ProgressBar } from '../common/ProgressBar';
import { NewGoalModal } from './NewGoalModal';
import {
  Target,
  Plus,
  Calendar,
  CheckCircle,
  TrendingUp,
  Edit3,
  Trash2
} from 'lucide-react';

export const GoalsManager: React.FC = () => {
  const { goals, editGoal, deleteGoal, updateGoalProgress, toggleGoalComplete, activeMember, members } = useFamily();
  const [selectedHorizon, setSelectedHorizon] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar metas dos pais
  const filteredGoals = goals
    .filter((g) => (activeMember.role === 'parent' ? g.memberId === activeMember.id : true))
    .filter((g) => (selectedHorizon === 'all' ? true : g.horizon === selectedHorizon));

  const horizonLabels: Record<GoalHorizon, { label: string; icon: string }> = {
    curto: { label: 'Curto Prazo (Até 3 meses)', icon: '⚡' },
    medio: { label: 'Médio Prazo (3 a 12 meses)', icon: '🎯' },
    longo: { label: 'Longo Prazo (> 1 ano)', icon: '🚀' }
  };

  const getCategoryBadge = (category: string) => {
    const map: Record<string, string> = {
      carreira: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300',
      saude: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300',
      financas: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
      estudos: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300',
      lazer: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
    };
    return map[category] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="space-y-6">
      
      {/* Topo com Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-xl">
            Metas de Vida & Carreira
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Objetivos estratégicos divididos por horizonte temporal para {activeMember.name}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Meta</span>
        </button>
      </div>

      {/* Filtros de Horizonte de Tempo */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setSelectedHorizon('all')}
          className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
            selectedHorizon === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          Todas as Metas ({filteredGoals.length})
        </button>
        <button
          onClick={() => setSelectedHorizon('curto')}
          className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
            selectedHorizon === 'curto'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          ⚡ Curto Prazo
        </button>
        <button
          onClick={() => setSelectedHorizon('medio')}
          className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
            selectedHorizon === 'medio'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          🎯 Médio Prazo
        </button>
        <button
          onClick={() => setSelectedHorizon('longo')}
          className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
            selectedHorizon === 'longo'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          🚀 Longo Prazo
        </button>
      </div>

      {/* Grid de Metas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
            <Target className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
              Nenhuma meta cadastrada para este filtro.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Clique em "Criar Nova Meta" para começar a estruturar seus objetivos.
            </p>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const owner = members.find((m) => m.id === goal.memberId);
            const isCompleted = goal.completed || goal.progress === 100;

            return (
              <div
                key={goal.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-5 border transition-all duration-200 ${
                  isCompleted
                    ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryBadge(goal.category)}`}>
                      {goal.category}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {horizonLabels[goal.horizon].label}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleGoalComplete(goal.id)}
                      className="p-1 rounded-xl text-slate-400 hover:text-emerald-500 transition-colors"
                      title={isCompleted ? 'Desmarcar conclusão' : 'Concluir meta'}
                    >
                      <CheckCircle
                        className={`w-5 h-5 ${
                          isCompleted ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950' : 'text-slate-300'
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => {
                        const newTitle = prompt('Editar título da meta:', goal.title);
                        if (newTitle && newTitle.trim()) {
                          editGoal(goal.id, { title: newTitle.trim() });
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Editar meta"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Deseja realmente apagar a meta "${goal.title}"?`)) {
                          deleteGoal(goal.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Apagar meta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className={`font-bold text-base leading-snug mb-1 ${
                  isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                }`}>
                  {goal.title}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                  {goal.description || 'Sem descrição detalhada.'}
                </p>

                {/* Barra de Progresso Interativa */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center">
                      <TrendingUp className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Progresso Atual
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {goal.progress}%
                    </span>
                  </div>

                  <ProgressBar
                    progress={goal.progress}
                    colorClass={isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}
                  />

                  {/* Controle de incremento rápido */}
                  <div className="flex items-center justify-end space-x-1 pt-1">
                    <button
                      onClick={() => updateGoalProgress(goal.id, goal.progress - 10)}
                      disabled={goal.progress <= 0}
                      className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 disabled:opacity-40"
                    >
                      -10%
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, goal.progress + 10)}
                      disabled={goal.progress >= 100}
                      className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 disabled:opacity-40"
                    >
                      +10%
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, 100)}
                      className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                    >
                      100%
                    </button>
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    Meta: {new Date(goal.targetDate).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-300">
                    {owner?.avatar} {owner?.name}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <NewGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
