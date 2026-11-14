import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { Gift, Coins, Check, Clock, ShieldCheck, AlertCircle, Plus, X, Edit3, Trash2 } from 'lucide-react';

export const RewardStore: React.FC = () => {
  const {
    rewards,
    addReward,
    editReward,
    deleteReward,
    redemptions,
    redeemReward,
    updateRedemptionStatus,
    activeMember,
    isParent,
    members
  } = useFamily();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCost, setNewCost] = useState(50);
  const [newIcon, setNewIcon] = useState('🎁');

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addReward({
      title: newTitle.trim(),
      description: newDesc.trim(),
      cost: newCost,
      icon: newIcon
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  const handleRedeem = (rewardId: string, rewardTitle: string, cost: number) => {
    if (activeMember.points < cost) {
      alert(`Você precisa de mais ${cost - activeMember.points} moedas para resgatar "${rewardTitle}"! Continue cumprindo suas missões.`);
      return;
    }

    const success = redeemReward(rewardId);
    if (success) {
      alert(`Parabéns! "${rewardTitle}" foi resgatado com sucesso! Os pais já receberam a solicitação para aprovar.`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Topo da Loja */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-500/10">
        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Mercado da Família</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black">
            Loja de Recompensas
          </h3>
          <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-lg">
            Troque as moedas conquistadas com esforço e dedicação por momentos especiais, passeios e regalias combinadas em família!
          </p>
        </div>

        {/* Saldo Atual & Botão Admin */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center space-x-3 self-start sm:self-auto">
            <div className="text-3xl">🪙</div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-amber-100 font-bold">
                Seu Saldo Atual ({activeMember.name})
              </p>
              <h4 className="text-2xl font-black text-white">
                {activeMember.points} Moedas
              </h4>
            </div>
          </div>

          {isParent && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-white text-amber-900 hover:bg-amber-50 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Recompensa</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal de Criação de Recompensa (Admin) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-amber-500" />
              Cadastrar Nova Recompensa
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Defina um prêmio real motivador que as crianças poderão resgatar
            </p>

            <form onSubmit={handleCreateReward} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título da Recompensa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Tarde no Cinema ou Passeio de Patins"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Válido para o próximo final de semana..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Custo em Moedas
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="5"
                    required
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ícone Emoji
                  </label>
                  <select
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  >
                    <option value="🎁">🎁 Presente</option>
                    <option value="🍿">🍿 Cinema / Pipoca</option>
                    <option value="🍦">🍦 Sorvete / Doce</option>
                    <option value="🎮">🎮 Videogame</option>
                    <option value="🚲">🚲 Bicicleta</option>
                    <option value="🛹">🛹 Passeio</option>
                    <option value="📚">📚 Livro</option>
                    <option value="🍕">🍕 Pizza</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Salvar Recompensa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid de Recompensas Disponíveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => {
          const canAfford = activeMember.points >= reward.cost;

          return (
            <div
              key={reward.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-400 dark:hover:border-amber-500 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl p-2 rounded-2xl bg-slate-50 dark:bg-slate-800">
                    {reward.icon}
                  </span>
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-black text-xs border border-amber-200 dark:border-amber-800">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{reward.cost} Moedas</span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                  {reward.title}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {reward.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-slate-400">
                    {canAfford ? 'Disponível para troca' : `Faltam ${reward.cost - activeMember.points} moedas`}
                  </span>
                  
                  {isParent && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          const newTitle = prompt('Editar título da recompensa:', reward.title);
                          if (newTitle && newTitle.trim()) {
                            editReward(reward.id, { title: newTitle.trim() });
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Editar recompensa"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Deseja apagar a recompensa "${reward.title}"?`)) {
                            deleteReward(reward.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Apagar recompensa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleRedeem(reward.id, reward.title, reward.cost)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    canAfford
                      ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer active:scale-95'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Resgatar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Histórico de Resgates e Aprovações */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-indigo-500" />
          Pedidos de Recompensa & Histórico
        </h4>

        {redemptions.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            Nenhum resgate solicitado até o momento. As recompensas trocadas aparecerão aqui.
          </p>
        ) : (
          <div className="space-y-3">
            {redemptions.map((item) => {
              const child = members.find((m) => m.id === item.memberId);
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{child?.avatar}</span>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.rewardTitle}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {child?.name} • Custo: {item.cost} moedas • {new Date(item.requestedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.status === 'pendente' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        Pendente de Aprovação
                      </span>
                    )}
                    {item.status === 'aprovado' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        Aprovado (Aproveitar!)
                      </span>
                    )}
                    {item.status === 'entregue' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Entregue
                      </span>
                    )}

                    {/* Ações de Pais */}
                    {isParent && item.status === 'pendente' && (
                      <button
                        onClick={() => updateRedemptionStatus(item.id, 'aprovado')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                      >
                        Aprovar Pedido
                      </button>
                    )}
                    {isParent && item.status === 'aprovado' && (
                      <button
                        onClick={() => updateRedemptionStatus(item.id, 'entregue')}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                      >
                        Marcar como Entregue
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
