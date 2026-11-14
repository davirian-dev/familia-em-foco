import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { MilestoneCategory, MilestoneStatus } from '../../types';
import { NewMilestoneModal } from './NewMilestoneModal';
import {
  Baby,
  MessageCircle,
  Footprints,
  Sparkles,
  Moon,
  Brain,
  Plus,
  Send,
  Calendar,
  CheckCircle,
  Clock,
  HeartHandshake,
  Edit3,
  Trash2
} from 'lucide-react';

export const MilestonesDiary: React.FC = () => {
  const { milestones, editMilestone, deleteMilestone, updateMilestoneStatus, addMilestoneNote, activeMember, isParent } = useFamily();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNoteText, setActiveNoteText] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMilestones = milestones.filter(
    (m) => selectedCategory === 'all' || m.category === selectedCategory
  );

  const categoryMeta: Record<MilestoneCategory, { label: string; icon: any; color: string }> = {
    fala: { label: 'Fala & Linguagem', icon: MessageCircle, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60' },
    motora: { label: 'Coordenação Motora', icon: Footprints, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60' },
    desfralde: { label: 'Desfralde & Autonomia', icon: Sparkles, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60' },
    sono: { label: 'Rotina do Sono', icon: Moon, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60' },
    cognitiva: { label: 'Cognitivo & Social', icon: Brain, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60' }
  };

  const handleAddNote = (milestoneId: string) => {
    const text = activeNoteText[milestoneId];
    if (!text || !text.trim()) return;

    addMilestoneNote(milestoneId, text.trim());
    setActiveNoteText((prev) => ({ ...prev, [milestoneId]: '' }));
  };

  return (
    <div className="space-y-6">
      
      {/* Banner de Apresentação do Theo */}
      <div className="bg-gradient-to-r from-cyan-500 via-teal-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-cyan-500/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-4xl sm:text-5xl bg-white/20 p-2 rounded-2xl backdrop-blur-md">
              👶
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-black">Diário de Bordo do Theo</h3>
                <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full font-bold">
                  2 anos
                </span>
              </div>
              <p className="text-cyan-100 text-xs sm:text-sm mt-1 max-w-lg">
                Espaço exclusivo dos pais para acompanhar a evolução da fala, coordenação motora, rotina de sono e desfralde.
              </p>
            </div>
          </div>

          {isParent && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-white text-cyan-800 hover:bg-cyan-50 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Novo Marco</span>
            </button>
          )}
        </div>
      </div>

      {/* Filtros de Categoria de Desenvolvimento */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          Todos os Marcos ({milestones.length})
        </button>

        {Object.entries(categoryMeta).map(([catKey, meta]) => {
          const Icon = meta.icon;
          const isActive = selectedCategory === catKey;
          return (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>

      {/* Lista de Marcos e Diário de Bordo */}
      <div className="grid grid-cols-1 gap-5">
        {filteredMilestones.map((milestone) => {
          const meta = categoryMeta[milestone.category];
          const Icon = meta?.icon || Baby;

          return (
            <div
              key={milestone.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border transition-all duration-200 ${
                milestone.status === 'concluido'
                  ? 'border-cyan-300 dark:border-cyan-800/80 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Topo do Card de Marco */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-2xl ${meta.color} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {meta.label}
                      </span>
                      {milestone.expectedAgeMonths && (
                        <span className="text-[11px] text-slate-400">
                          • Esperado aos {milestone.expectedAgeMonths} meses
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mt-0.5">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Seletor de Status (Pais como Administradores) & Ações */}
                <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0">
                  <select
                    value={milestone.status}
                    onChange={(e) =>
                      updateMilestoneStatus(milestone.id, e.target.value as MilestoneStatus)
                    }
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition-all ${
                      milestone.status === 'concluido'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                        : milestone.status === 'em_progresso'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <option value="aguardando">⏳ Aguardando</option>
                    <option value="em_progresso">🚀 Em Desenvolvimento</option>
                    <option value="concluido">🎉 Conquistado!</option>
                  </select>

                  {isParent && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          const newTitle = prompt('Editar título do marco:', milestone.title);
                          if (newTitle && newTitle.trim()) {
                            editMilestone(milestone.id, { title: newTitle.trim() });
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-cyan-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Editar marco"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Deseja apagar o marco "${milestone.title}"?`)) {
                            deleteMilestone(milestone.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Apagar marco"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Registro de Fotos anexadas */}
              {milestone.photos && milestone.photos.length > 0 && (
                <div className="mb-4">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-w-xs">
                    <img
                      src={milestone.photos[0]}
                      alt={milestone.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Linha do Tempo de Notas / Diário da Família */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                    <HeartHandshake className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
                    Notas dos Pais (Diário de Bordo)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {milestone.notes.length} {milestone.notes.length === 1 ? 'registro' : 'registros'}
                  </span>
                </div>

                {/* Lista de Notas */}
                <div className="space-y-2">
                  {milestone.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          {note.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(note.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        "{note.text}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Input para Adicionar Nova Nota */}
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    placeholder={`Escreva uma observação (como ${activeMember.name})...`}
                    value={activeNoteText[milestone.id] || ''}
                    onChange={(e) =>
                      setActiveNoteText({ ...activeNoteText, [milestone.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddNote(milestone.id);
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    onClick={() => handleAddNote(milestone.id)}
                    className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm transition-all"
                    title="Adicionar anotação"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <NewMilestoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
