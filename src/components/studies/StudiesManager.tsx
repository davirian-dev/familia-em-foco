import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { StudySubject, StudyCategory } from '../../types';
import { StudyModal } from './StudyModal';

export const StudiesManager: React.FC = () => {
  const { members, activeMember, studies, deleteStudySubject, toggleStudyTopic } = useFamily();
  
  const [selectedMemberFilter, setSelectedMemberFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyToEdit, setStudyToEdit] = useState<StudySubject | null>(null);

  const filteredStudies = studies.filter((study) => {
    const matchesMember = selectedMemberFilter === 'all' || study.memberId === selectedMemberFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || study.category === selectedCategoryFilter;
    return matchesMember && matchesCategory;
  });

  const handleEdit = (study: StudySubject) => {
    setStudyToEdit(study);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setStudyToEdit(null);
    setIsModalOpen(true);
  };

  const getMemberData = (id: string) => members.find((m) => m.id === id);

  const getMasteryBadge = (level: StudySubject['masteryLevel']) => {
    switch (level) {
      case 'dominado':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            🌟 Dominado
          </span>
        );
      case 'em_desenvolvimento':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            ⚡ Em Progresso
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1">
            🌱 Iniciando
          </span>
        );
    }
  };

  const getCategoryLabel = (cat: StudyCategory) => {
    switch (cat) {
      case 'faculdade':
        return '🎓 Graduação / Pós';
      case 'escola':
        return '🏫 Colégio / Fundamental';
      case 'desenvolvimento_infantil':
        return '🧸 Primeira Infância';
      default:
        return '💡 Cursos & Especializações';
    }
  };

  // Métricas gerais
  const totalSubjects = studies.length;
  const totalTopics = studies.reduce((acc, s) => acc + (s.topics?.length || 0), 0);
  const completedTopics = studies.reduce(
    (acc, s) => acc + (s.topics?.filter((t) => t.completed).length || 0),
    0
  );
  const totalHours = studies.reduce((acc, s) => acc + (s.hoursStudied || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <span>📚 Centro de Aprendizado & Evolução Contínua</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Estudos da Família & Desenvolvimento
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Acompanhe as matérias da faculdade de Davi e Marina, os conteúdos escolares do Benjamin e da Iris, e os estímulos de desenvolvimento do Theo.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition transform active:scale-95"
        >
          <span>➕</span>
          <span>Nova Matéria / Assunto</span>
        </button>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Matérias Ativas</span>
          <p className="text-2xl font-extrabold text-white mt-1">{totalSubjects}</p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Tópicos Concluídos</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">
            {completedTopics} / {totalTopics}
          </p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Horas Semanais Dedicadas</span>
          <p className="text-2xl font-extrabold text-indigo-400 mt-1">{totalHours}h</p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400">Aproveitamento Geral</span>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">
            {totalTopics > 0 ? `${Math.round((completedTopics / totalTopics) * 100)}%` : '100%'}
          </p>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedMemberFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedMemberFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            👨‍👩‍👧‍👦 Todos ({studies.length})
          </button>
          {members.map((m) => {
            const count = studies.filter((s) => s.memberId === m.id).length;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMemberFilter(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                  selectedMemberFilter === m.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{m.avatar}</span>
                <span>{m.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todas as categorias</option>
            <option value="faculdade">🎓 Faculdade / Pós</option>
            <option value="escola">🏫 Escola</option>
            <option value="desenvolvimento_infantil">🧸 Estímulos Theo</option>
            <option value="curso_livre">💡 Cursos Livres</option>
          </select>
        </div>
      </div>

      {/* Lista de Matérias */}
      {filteredStudies.length === 0 ? (
        <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
          <span className="text-4xl">📖</span>
          <h3 className="text-base font-bold text-white mt-3">Nenhum estudo encontrado</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Cadastre matérias da faculdade, assuntos das provas ou os estímulos de desenvolvimento do Theo para acompanhar aqui.
          </p>
          <button
            onClick={handleCreate}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition"
          >
            + Cadastrar Primeiro Conteúdo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudies.map((study) => {
            const member = getMemberData(study.memberId);
            const totalSub = study.topics?.length || 0;
            const completedSub = study.topics?.filter((t) => t.completed).length || 0;
            const progressPercent =
              study.weeklyGoalHours && study.weeklyGoalHours > 0
                ? Math.min(100, Math.round(((study.hoursStudied || 0) / study.weeklyGoalHours) * 100))
                : 100;

            return (
              <div
                key={study.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition group"
              >
                <div>
                  {/* Topo do Card */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold shadow"
                        style={{ backgroundColor: `${member?.themeColor || '#6366F1'}20` }}
                      >
                        {member?.avatar || '👤'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-300">
                            {member?.name || 'Membro'}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            • {getCategoryLabel(study.category)}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-white group-hover:text-indigo-300 transition">
                          {study.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {getMasteryBadge(study.masteryLevel)}
                      <button
                        onClick={() => handleEdit(study)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition text-xs"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir a matéria "${study.name}"?`)) {
                            deleteStudySubject(study.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition text-xs"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Assunto Atual em Foco */}
                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 my-3">
                    <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1 mb-1">
                      <span>🎯 Assunto da Semana:</span>
                    </div>
                    <p className="text-sm font-medium text-slate-200">{study.currentTopic}</p>
                    {study.institution && (
                      <p className="text-[11px] text-slate-400 mt-1">
                        Local/Instituição: {study.institution}
                      </p>
                    )}
                  </div>

                  {/* Checklist de Subtópicos */}
                  {study.topics && study.topics.length > 0 && (
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                        <span>Checklist de Domínio:</span>
                        <span>
                          {completedSub} de {totalSub}
                        </span>
                      </div>
                      <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                        {study.topics.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => toggleStudyTopic(study.id, t.id)}
                            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition border ${
                              t.completed
                                ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-300 line-through opacity-80'
                                : 'bg-slate-800/40 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-sm">
                              {t.completed ? '✅' : '⚪'}
                            </span>
                            <span className="flex-1">{t.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Observações da Evolução */}
                  {study.notes && (
                    <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-2.5 my-2 text-xs text-indigo-200">
                      <span className="font-bold">💡 Observação:</span> {study.notes}
                    </div>
                  )}
                </div>

                {/* Rodapé do Card com Progresso e Nota */}
                <div className="pt-3 border-t border-slate-800/80 mt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Horas: <strong className="text-white">{study.hoursStudied || 0}h</strong> / {study.weeklyGoalHours || 0}h semanais
                    </span>
                    {study.grade !== undefined && (
                      <span className="font-bold text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                        Nota: {study.grade.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        progressPercent >= 100
                          ? 'bg-emerald-500'
                          : progressPercent >= 50
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <StudyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studyToEdit={studyToEdit}
      />
    </div>
  );
};
