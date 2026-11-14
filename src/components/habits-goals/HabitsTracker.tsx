import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { GoalCategory } from '../../types';
import { Flame, Plus, CheckCircle2, Circle, Trash2, Edit3 } from 'lucide-react';

export const HabitsTracker: React.FC = () => {
  const { habits, toggleHabitToday, addHabit, editHabit, deleteHabit, activeMember, members } = useFamily();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewHabit, setShowNewHabit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GoalCategory>('saude');
  const [newFrequency, setNewFrequency] = useState<'diario' | 'dias_uteis' | 'fim_de_semana'>('diario');

  // Filtrar hábitos relevantes para pais
  const filteredHabits = habits
    .filter((h) => (activeMember.role === 'parent' ? h.memberId === activeMember.id : true))
    .filter((h) => (selectedCategory === 'all' ? true : h.category === selectedCategory));

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addHabit({
      memberId: activeMember.id,
      title: newTitle.trim(),
      category: newCategory,
      frequency: newFrequency
    });

    setNewTitle('');
    setShowNewHabit(false);
  };

  const categoryLabels: Record<GoalCategory, { label: string; color: string }> = {
    carreira: { label: 'Carreira', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' },
    saude: { label: 'Saúde & Treino', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' },
    financas: { label: 'Finanças', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' },
    estudos: { label: 'Estudos', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300' },
    lazer: { label: 'Lazer', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300' }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Tracker de Hábitos Diários
            </h3>
            <span className="flex items-center px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 mr-1" /> Ofensivas Ativas
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mantenha o ritmo dia a dia para consolidar a rotina desejada
          </p>
        </div>

        <button
          onClick={() => setShowNewHabit(!showNewHabit)}
          className="flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Hábito</span>
        </button>
      </div>

      {/* Formulário Inline para Novo Hábito */}
      {showNewHabit && (
        <form onSubmit={handleCreateHabit} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Adicionar Novo Hábito para {activeMember.name}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Ex: Treino de Corrida 40min"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as GoalCategory)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="saude">Saúde & Treino</option>
              <option value="carreira">Carreira / Dev</option>
              <option value="financas">Finanças</option>
              <option value="estudos">Estudos</option>
              <option value="lazer">Lazer</option>
            </select>
            <select
              value={newFrequency}
              onChange={(e) => setNewFrequency(e.target.value as any)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="diario">Diário (Todos os dias)</option>
              <option value="dias_uteis">Dias Úteis (Seg a Sex)</option>
              <option value="fim_de_semana">Fim de Semana</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewHabit(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Salvar Hábito
            </button>
          </div>
        </form>
      )}

      {/* Filtros de Categoria */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {['all', 'saude', 'carreira', 'financas', 'estudos', 'lazer'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold capitalize whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {/* Lista de Hábitos */}
      <div className="space-y-3">
        {filteredHabits.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Nenhum hábito cadastrado nesta categoria.
          </div>
        ) : (
          filteredHabits.map((habit) => {
            const member = members.find((m) => m.id === habit.memberId);
            return (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <button
                    onClick={() => toggleHabitToday(habit.id)}
                    className="p-1 rounded-xl transition-transform active:scale-90"
                    title={habit.completedToday ? 'Hábito concluído hoje!' : 'Marcar como feito hoje'}
                  >
                    {habit.completedToday ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-indigo-500" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        habit.completedToday
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {habit.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryLabels[habit.category]?.color}`}>
                        {categoryLabels[habit.category]?.label || habit.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {member?.name} • {habit.frequency.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge de Streak / Ofensiva & Ações */}
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 font-bold text-xs">
                    <Flame className="w-4 h-4 fill-orange-500" />
                    <span>{habit.streak} {habit.streak === 1 ? 'dia' : 'dias'}</span>
                  </div>

                  <button
                    onClick={() => {
                      const newTitle = prompt('Editar título do hábito:', habit.title);
                      if (newTitle && newTitle.trim()) {
                        editHabit(habit.id, { title: newTitle.trim() });
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Editar hábito"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Tem certeza que deseja apagar o hábito "${habit.title}"?`)) {
                        deleteHabit(habit.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Apagar hábito"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
