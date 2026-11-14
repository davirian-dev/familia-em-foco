import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { KidsTask } from '../../types';
import {
  CheckCircle2,
  Circle,
  Coins,
  ShieldCheck,
  Plus,
  Star,
  Sparkles,
  BookOpen,
  Home,
  Activity,
  Smile,
  Edit3,
  Trash2
} from 'lucide-react';

export const KidsTaskManager: React.FC = () => {
  const {
    tasks,
    toggleTaskComplete,
    verifyTaskByParent,
    addTask,
    editTask,
    deleteTask,
    members,
    activeMember,
    isParent
  } = useFamily();

  const [selectedChildId, setSelectedChildId] = useState<string>(
    activeMember.role === 'child' && activeMember.id !== 'theo' ? activeMember.id : 'benjamin'
  );

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPoints, setTaskPoints] = useState(15);
  const [taskCategory, setTaskCategory] = useState<KidsTask['category']>('escola');

  // Crianças alvo de gamificação (Benjamin e Iris)
  const childrenList = members.filter((m) => m.id === 'benjamin' || m.id === 'iris');
  const currentChild = members.find((m) => m.id === selectedChildId) || childrenList[0];

  const childTasks = tasks.filter((t) => t.memberId === currentChild.id);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask({
      memberId: currentChild.id,
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      pointsReward: taskPoints,
      category: taskCategory,
      dueDate: new Date().toISOString().split('T')[0]
    });

    setTaskTitle('');
    setTaskDesc('');
    setShowNewTaskModal(false);
  };

  const getCategoryIcon = (category: KidsTask['category']) => {
    switch (category) {
      case 'escola':
        return <BookOpen className="w-3.5 h-3.5 text-blue-500" />;
      case 'casa':
        return <Home className="w-3.5 h-3.5 text-amber-500" />;
      case 'esporte':
        return <Activity className="w-3.5 h-3.5 text-emerald-500" />;
      case 'comportamento':
        return <Smile className="w-3.5 h-3.5 text-pink-500" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner da Criança Ativa */}
      <div
        className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg transition-colors"
        style={{
          background: `linear-gradient(135deg, ${currentChild.themeColor}, #4F46E5)`
        }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-4xl sm:text-5xl bg-white/20 p-2 rounded-2xl backdrop-blur-md">
              {currentChild.avatar}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-black">{currentChild.name}</h3>
                <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full font-bold">
                  {currentChild.id === 'benjamin' ? '8 anos • 3º Ano Fundamental' : '5 anos • Pré-Escola'}
                </span>
              </div>
              <p className="text-white/90 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
                {currentChild.id === 'benjamin'
                  ? 'Foco da idade: Autonomia nos estudos, organização do próprio espaço, esportes e controle consciente do tempo de tela.'
                  : 'Foco da idade: Coordenação motora fina (desenhos e recortes), guardar brinquedos, vestir o pijama e alimentação saudável colorida.'}
              </p>
            </div>
          </div>

          {/* Saldo de Moedas em Destaque */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center space-x-3 self-start sm:self-auto shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-xl shadow-md">
              🪙
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/80 font-bold">
                Moedas Estelares
              </p>
              <h4 className="text-2xl font-black text-white">
                {currentChild.points} pts
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Criança (Benjamin / Iris) */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {childrenList.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedChildId === child.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{child.avatar}</span>
              <span>{child.name}</span>
            </button>
          ))}
        </div>

        {isParent && (
          <button
            onClick={() => setShowNewTaskModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Missão</span>
          </button>
        )}
      </div>

      {/* Modal de Criação de Tarefa */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
              Nova Missão para {currentChild.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Crie uma tarefa motivadora com recompensa em moedas
            </p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título da Missão
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Arrumar estante de livros"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Instruções
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Guardar cada livro na prateleira certa..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Categoria
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  >
                    <option value="escola">Escola & Estudos</option>
                    <option value="casa">Responsabilidades de Casa</option>
                    <option value="esporte">Esportes & Lazer</option>
                    <option value="comportamento">Comportamento & Rotina</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Moedas de Recompensa
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    step="5"
                    value={taskPoints}
                    onChange={(e) => setTaskPoints(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Adicionar Missão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Missões / Tarefas */}
      <div className="space-y-3">
        {childTasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
            <Sparkles className="w-10 h-10 mx-auto text-amber-400 mb-2" />
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Nenhuma missão pendente para {currentChild.name}!
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Excelente trabalho! Novos desafios podem ser definidos pelos pais.
            </p>
          </div>
        ) : (
          childTasks.map((task) => {
            const isCompleted = task.completed;
            const isVerified = task.verifiedByParent;

            return (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isVerified
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                    : isCompleted
                    ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className="p-1 rounded-xl transition-transform active:scale-90 mt-0.5"
                    title={isCompleted ? 'Desmarcar tarefa' : 'Marcar tarefa como concluída'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-indigo-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                        {getCategoryIcon(task.category)}
                      </span>
                      <h4
                        className={`font-bold text-sm sm:text-base ${
                          isCompleted
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {task.description}
                    </p>

                    {/* Status de Verificação */}
                    <div className="flex items-center space-x-2 mt-2">
                      {isVerified ? (
                        <span className="inline-flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                          Aprovado pelos Pais (+{task.pointsReward} moedas creditadas)
                        </span>
                      ) : isCompleted ? (
                        <span className="inline-flex items-center text-[11px] font-bold text-amber-600 dark:text-amber-400 animate-pulse">
                          ⏳ Aguardando aprovação dos pais para liberar moedas
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Faça a tarefa e marque aqui para ganhar pontos!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recompensa e Botão de Aprovação dos Pais */}
                <div className="flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-xs">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>+{task.pointsReward} moedas</span>
                  </div>

                  {/* Se os pais estiverem logados e a tarefa foi completada pela criança mas não verificada */}
                  {isParent && isCompleted && !isVerified && (
                    <button
                      onClick={() => verifyTaskByParent(task.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      Validar & Pagar
                    </button>
                  )}

                  {/* Ações de Edição e Exclusão para os Pais */}
                  {isParent && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          const newTitle = prompt('Editar título da missão:', task.title);
                          if (newTitle && newTitle.trim()) {
                            editTask(task.id, { title: newTitle.trim() });
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Editar missão"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Deseja apagar a missão "${task.title}"?`)) {
                            deleteTask(task.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Apagar missão"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
