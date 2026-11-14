import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { MilestoneCategory, MilestoneStatus } from '../../types';
import { X, Baby } from 'lucide-react';

interface NewMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewMilestoneModal: React.FC<NewMilestoneModalProps> = ({ isOpen, onClose }) => {
  const { addMilestone } = useFamily();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MilestoneCategory>('fala');
  const [status, setStatus] = useState<MilestoneStatus>('em_progresso');
  const [expectedAgeMonths, setExpectedAgeMonths] = useState(24);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMilestone({
      memberId: 'theo',
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      expectedAgeMonths,
      photos: []
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Baby className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Novo Marco do Theo (2 anos)
            </h3>
            <p className="text-xs text-slate-500">Adicione uma etapa do desenvolvimento</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Título do Marco
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Escovar os dentes sozinho com supervisão"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Descrição / O que observar
            </label>
            <textarea
              rows={2}
              placeholder="Detalhes dos comportamentos ou sinais..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Área / Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MilestoneCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
              >
                <option value="fala">Fala & Comunicação</option>
                <option value="motora">Coordenação Motora</option>
                <option value="desfralde">Desfralde & Autonomia</option>
                <option value="sono">Rotina do Sono</option>
                <option value="cognitiva">Cognitiva & Social</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Status Inicial
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MilestoneStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
              >
                <option value="aguardando">Aguardando Momento</option>
                <option value="em_progresso">Em Desenvolvimento</option>
                <option value="concluido">Já Conquistado 🎉</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Idade Prevista (em meses)
            </label>
            <input
              type="number"
              min="12"
              max="48"
              value={expectedAgeMonths}
              onChange={(e) => setExpectedAgeMonths(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-600/20"
            >
              Salvar Marco
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
