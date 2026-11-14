import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { Debt, Investment } from '../../types';
import { Wallet, TrendingUp, CreditCard, Plus, Trash2, Zap, ShieldCheck } from 'lucide-react';

export const FinancesManager: React.FC = () => {
  const { debts, investments, addDebt, deleteDebt, amortizeDebt, addInvestment, deleteInvestment } = useFamily();

  // Estados de Modal
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [isInvModalOpen, setIsInvModalOpen] = useState(false);

  // Forms
  const [debtForm, setDebtForm] = useState({
    name: '',
    institution: '',
    category: 'imobiliario' as Debt['category'],
    totalAmount: '',
    currentBalance: '',
    monthlyPayment: '',
    totalInstallments: '',
    remainingInstallments: '',
    interestRate: '',
    dueDate: '',
    notes: ''
  });

  const [invForm, setInvForm] = useState({
    name: '',
    institution: '',
    category: 'reserva' as Investment['category'],
    currentAmount: '',
    targetAmount: '',
    monthlyContribution: '',
    expectedReturn: '',
    notes: ''
  });

  // Cálculos de totais
  const totalInvested = investments.reduce((acc, i) => acc + (i.currentAmount || 0), 0);
  const totalDebts = debts.reduce((acc, d) => acc + (d.currentBalance || 0), 0);
  const netWorth = totalInvested - totalDebts;
  const totalMonthlyContributions = investments.reduce((acc, i) => acc + (i.monthlyContribution || 0), 0);

  const handleSaveDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtForm.name || !debtForm.currentBalance) return;

    addDebt({
      name: debtForm.name,
      institution: debtForm.institution || undefined,
      category: debtForm.category,
      totalAmount: parseFloat(debtForm.totalAmount) || parseFloat(debtForm.currentBalance),
      currentBalance: parseFloat(debtForm.currentBalance),
      monthlyPayment: parseFloat(debtForm.monthlyPayment) || 0,
      totalInstallments: parseInt(debtForm.totalInstallments) || 1,
      remainingInstallments: parseInt(debtForm.remainingInstallments) || 1,
      interestRate: debtForm.interestRate || undefined,
      dueDate: debtForm.dueDate || undefined,
      status: 'em_dia',
      notes: debtForm.notes || undefined
    });

    setIsDebtModalOpen(false);
    setDebtForm({
      name: '',
      institution: '',
      category: 'imobiliario',
      totalAmount: '',
      currentBalance: '',
      monthlyPayment: '',
      totalInstallments: '',
      remainingInstallments: '',
      interestRate: '',
      dueDate: '',
      notes: ''
    });
  };

  const handleSaveInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invForm.name || !invForm.currentAmount) return;

    addInvestment({
      name: invForm.name,
      institution: invForm.institution || undefined,
      category: invForm.category,
      currentAmount: parseFloat(invForm.currentAmount),
      targetAmount: invForm.targetAmount ? parseFloat(invForm.targetAmount) : undefined,
      monthlyContribution: parseFloat(invForm.monthlyContribution) || 0,
      expectedReturn: invForm.expectedReturn || undefined,
      notes: invForm.notes || undefined
    });

    setIsInvModalOpen(false);
    setInvForm({
      name: '',
      institution: '',
      category: 'reserva',
      currentAmount: '',
      targetAmount: '',
      monthlyContribution: '',
      expectedReturn: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Financeiro */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2">
              💰 Inteligência & Prosperidade Familiar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">Gestão Financeira • Davi & Marina</h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              Estratégia de quitação de dívidas, aportes consistentes e construção do patrimônio para a segurança dos filhos.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsInvModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Investimento</span>
            </button>
            <button
              onClick={() => setIsDebtModalOpen(true)}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Dívida</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Cards de Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
          <span className="text-xs font-bold text-slate-400">💎 Patrimônio Líquido</span>
          <h3 className={`text-xl sm:text-2xl font-black mt-1 ${netWorth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-white'}`}>
            R$ {netWorth.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Ativos - Passivos</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">📈 Total Investido</span>
          <h3 className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <span className="text-[10px] text-slate-400">{investments.length} ativos em carteira</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400">💳 Dívidas em Aberto</span>
          <h3 className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
            R$ {totalDebts.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <span className="text-[10px] text-slate-400">{debts.length} financiamentos</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">💵 Aporte Mensal</span>
          <h3 className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            R$ {totalMonthlyContributions.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <span className="text-[10px] text-slate-400">Aportes para o futuro</span>
        </div>
      </div>

      {/* Investimentos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📈</span>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Carteira de Investimentos da Família</h3>
              <p className="text-xs text-slate-500">Reserva de emergência, fundos imobiliários, títulos e faculdade dos filhos</p>
            </div>
          </div>
          <button
            onClick={() => setIsInvModalOpen(true)}
            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs rounded-xl hover:bg-emerald-100 transition"
          >
            + Investimento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investments.map((inv) => {
            const progress = inv.targetAmount ? Math.min(100, Math.round((inv.currentAmount / inv.targetAmount) * 100)) : 100;
            return (
              <div key={inv.id} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px]">
                      {inv.category.toUpperCase()}
                    </span>
                    <button
                      onClick={() => deleteInvestment(inv.id)}
                      className="p-1 text-slate-400 hover:text-red-500 text-xs"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">{inv.name}</h4>
                  <p className="text-[11px] text-slate-400">{inv.institution || 'Não informado'}</p>

                  <div className="my-3 p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider block">Saldo Investido</span>
                    <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                      R$ {inv.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    {inv.expectedReturn && (
                      <span className="text-[11px] text-slate-500 block mt-0.5">Rentabilidade: <strong>{inv.expectedReturn}</strong></span>
                    )}
                  </div>

                  {inv.targetAmount && (
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Meta: R$ {inv.targetAmount.toLocaleString('pt-BR')}</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {inv.notes && <p className="text-[11px] text-slate-400 italic">💡 {inv.notes}</p>}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>Aporte Mensal:</span>
                  <strong className="text-slate-900 dark:text-white">R$ {inv.monthlyContribution.toFixed(2)}/mês</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dívidas e Financiamentos */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💳</span>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Dívidas, Financiamentos & Amortizações</h3>
              <p className="text-xs text-slate-500">Acompanhamento do saldo devedor, parcelas restantes e botão de amortização</p>
            </div>
          </div>
          <button
            onClick={() => setIsDebtModalOpen(true)}
            className="px-3 py-1.5 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold text-xs rounded-xl hover:bg-rose-100 transition"
          >
            + Cadastrar Financiamento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {debts.map((d) => {
            const paid = Math.max(0, d.totalInstallments - d.remainingInstallments);
            const progress = d.totalInstallments ? Math.min(100, Math.round((paid / d.totalInstallments) * 100)) : 0;

            return (
              <div key={d.id} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[11px]">
                      {d.category.toUpperCase()}
                    </span>
                    <button
                      onClick={() => deleteDebt(d.id)}
                      className="p-1 text-slate-400 hover:text-red-500 text-xs"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">{d.name}</h4>
                  <p className="text-[11px] text-slate-400">{d.institution || 'Não informado'} • Taxa: {d.interestRate || 'N/A'}</p>

                  <div className="my-3 p-3 bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl border border-rose-100 dark:border-rose-900/40">
                    <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 tracking-wider block">Saldo Devedor Atual</span>
                    <p className="text-2xl font-black text-rose-700 dark:text-rose-300">
                      R$ {d.currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Parcela: <strong>R$ {d.monthlyPayment.toFixed(2)}</strong> ({d.dueDate || 'Mensal'})
                    </span>
                  </div>

                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{paid} de {d.totalInstallments} pagas ({d.remainingInstallments} restantes)</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">{progress}% quitado</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  {d.notes && <p className="text-[11px] text-slate-400 italic">💡 {d.notes}</p>}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => amortizeDebt(d.id)}
                    className="w-full py-2 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 border border-rose-200 dark:border-rose-800"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Amortizar / Abater 1 Parcela</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Dívida */}
      {isDebtModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg">Cadastrar Dívida / Financiamento</h3>
              <button onClick={() => setIsDebtModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSaveDebt} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Financiamento *</label>
                <input
                  type="text"
                  required
                  value={debtForm.name}
                  onChange={(e) => setDebtForm({ ...debtForm, name: e.target.value })}
                  placeholder="Ex: Financiamento Imobiliário Casa"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Saldo Devedor (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={debtForm.currentBalance}
                    onChange={(e) => setDebtForm({ ...debtForm, currentBalance: e.target.value })}
                    placeholder="215000.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold text-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Parcela Mensal (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={debtForm.monthlyPayment}
                    onChange={(e) => setDebtForm({ ...debtForm, monthlyPayment: e.target.value })}
                    placeholder="2180.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Parcelas Restantes</label>
                  <input
                    type="number"
                    value={debtForm.remainingInstallments}
                    onChange={(e) => setDebtForm({ ...debtForm, remainingInstallments: e.target.value })}
                    placeholder="275"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Total de Parcelas</label>
                  <input
                    type="number"
                    value={debtForm.totalInstallments}
                    onChange={(e) => setDebtForm({ ...debtForm, totalInstallments: e.target.value })}
                    placeholder="360"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white text-center"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setIsDebtModalOpen(false)} className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-semibold text-slate-400">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-rose-600 hover:bg-rose-500 rounded-xl text-xs font-bold text-white">Salvar Dívida</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Investimento */}
      {isInvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg">Cadastrar Investimento</h3>
              <button onClick={() => setIsInvModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSaveInvestment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Investimento *</label>
                <input
                  type="text"
                  required
                  value={invForm.name}
                  onChange={(e) => setInvForm({ ...invForm, name: e.target.value })}
                  placeholder="Ex: Fundos Imobiliários (FIIs)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Valor Atual (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={invForm.currentAmount}
                    onChange={(e) => setInvForm({ ...invForm, currentAmount: e.target.value })}
                    placeholder="35000.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Meta de Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invForm.targetAmount}
                    onChange={(e) => setInvForm({ ...invForm, targetAmount: e.target.value })}
                    placeholder="100000.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Aporte Mensal (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invForm.monthlyContribution}
                    onChange={(e) => setInvForm({ ...invForm, monthlyContribution: e.target.value })}
                    placeholder="1000.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rentabilidade</label>
                  <input
                    type="text"
                    value={invForm.expectedReturn}
                    onChange={(e) => setInvForm({ ...invForm, expectedReturn: e.target.value })}
                    placeholder="Ex: 0.85% a.m."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setIsInvModalOpen(false)} className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-semibold text-slate-400">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white">Salvar Investimento</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
