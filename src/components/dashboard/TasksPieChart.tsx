import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { CheckCircle2, Clock, PieChart as PieIcon } from 'lucide-react';

export const TasksPieChart: React.FC = () => {
  const { tasks, members } = useFamily();
  const [viewMode, setViewMode] = useState<'status' | 'category'>('status');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const verifiedTasks = tasks.filter((t) => t.verifiedByParent).length;

  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Distribuição por Categoria
  const categoryCounts = tasks.reduce(
    (acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const categoryColors: Record<string, { color: string; label: string }> = {
    escola: { color: '#3B82F6', label: 'Escola & Estudos' },
    casa: { color: '#F59E0B', label: 'Casa & Rotina' },
    esporte: { color: '#10B981', label: 'Esportes' },
    comportamento: { color: '#EC4899', label: 'Comportamento' }
  };

  // Cálculo dos segmentos de Donut/Pizza para Status
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const completedStroke = (completedTasks / Math.max(totalTasks, 1)) * circumference;
  const strokeDashoffset = circumference - completedStroke;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      
      {/* Topo do Card */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Conclusão de Tarefas
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Desempenho das crianças na semana
            </p>
          </div>
        </div>

        {/* Alternador de visualização */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-[11px]">
          <button
            onClick={() => setViewMode('status')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              viewMode === 'status'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Status
          </button>
          <button
            onClick={() => setViewMode('category')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              viewMode === 'category'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Categorias
          </button>
        </div>
      </div>

      {/* Gráfico Donut SVG */}
      <div className="flex flex-col sm:flex-row items-center justify-around py-4 gap-4">
        
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Círculo de Fundo (Pendentes) */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="14"
              className="text-slate-100 dark:text-slate-800"
              fill="transparent"
            />
            {/* Círculo de Progresso (Concluídas) */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="url(#gradient-pie)"
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient-pie" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Rótulo Central */}
          <div className="absolute text-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {completionPercent}%
            </span>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Concluído
            </span>
          </div>
        </div>

        {/* Legenda Informativa */}
        {viewMode === 'status' ? (
          <div className="space-y-2.5 min-w-[140px]">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-slate-600 dark:text-slate-300 font-medium">
                <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                Concluídas
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {completedTasks}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-slate-600 dark:text-slate-300 font-medium">
                <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 mr-2" />
                Pendentes
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {pendingTasks}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Validadas
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {verifiedTasks} / {completedTasks}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 min-w-[150px]">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const meta = categoryColors[cat] || { color: '#6B7280', label: cat };
              const percent = Math.round((count / Math.max(totalTasks, 1)) * 100);
              return (
                <div key={cat} className="flex items-center justify-between text-xs">
                  <span className="flex items-center text-slate-600 dark:text-slate-300">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-2"
                      style={{ backgroundColor: meta.color }}
                    />
                    {meta.label}
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {count} ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Rodapé Resumo */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Total de Missões Ativas</span>
        <span className="font-bold text-slate-700 dark:text-slate-300">
          {totalTasks} tarefas no ciclo
        </span>
      </div>

    </div>
  );
};
