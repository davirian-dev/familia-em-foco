import React from 'react';

export const WeeklyCompletionChart: React.FC = () => {
  // Dados simulados da semana atual (Segunda a Domingo)
  const weekDays = [
    { day: 'Seg', completion: 85, tasksDone: 11, total: 13 },
    { day: 'Ter', completion: 92, tasksDone: 12, total: 13 },
    { day: 'Qua', completion: 78, tasksDone: 10, total: 13 },
    { day: 'Qui', completion: 100, tasksDone: 13, total: 13 },
    { day: 'Sex', completion: 90, tasksDone: 9, total: 10 },
    { day: 'Sáb', completion: 65, tasksDone: 6, total: 9 },
    { day: 'Dom', completion: 80, tasksDone: 7, total: 9 }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
            Consistência Familiar Semanal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Conclusão agregada de hábitos e tarefas nos últimos 7 dias
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
          84% Média Semanal
        </span>
      </div>

      {/* Gráfico de Barras com Tailwind */}
      <div className="flex items-end justify-between h-44 pt-6 pb-2 gap-2 sm:gap-4 px-2">
        {weekDays.map((item, idx) => {
          const isToday = idx === 4; // Sexta-feira
          return (
            <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end group">
              {/* Tooltip no hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-1.5 py-0.5 rounded mb-1 shadow pointer-events-none whitespace-nowrap">
                {item.tasksDone}/{item.total} feitos
              </div>

              {/* Barra */}
              <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex flex-col justify-end h-full">
                <div
                  className={`w-full rounded-xl transition-all duration-700 ${
                    isToday
                      ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/30'
                      : 'bg-indigo-500/70 dark:bg-indigo-600/60 group-hover:bg-indigo-500'
                  }`}
                  style={{ height: `${item.completion}%` }}
                />
              </div>

              {/* Rótulo do Dia */}
              <span
                className={`text-xs mt-2 font-medium ${
                  isToday
                    ? 'font-bold text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
