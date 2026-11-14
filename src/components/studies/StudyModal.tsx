import React, { useState, useEffect } from 'react';
import { useFamily } from '../../context/FamilyContext';
import { StudySubject, StudyCategory, MasteryLevel, StudyTopic } from '../../types';

interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  studyToEdit?: StudySubject | null;
}

export const StudyModal: React.FC<StudyModalProps> = ({
  isOpen,
  onClose,
  studyToEdit
}) => {
  const { members, activeMember, addStudySubject, editStudySubject } = useFamily();

  const [memberId, setMemberId] = useState(activeMember.id);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<StudyCategory>('faculdade');
  const [institution, setInstitution] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [masteryLevel, setMasteryLevel] = useState<MasteryLevel>('em_desenvolvimento');
  const [grade, setGrade] = useState<string>('9.0');
  const [weeklyGoalHours, setWeeklyGoalHours] = useState<string>('5');
  const [hoursStudied, setHoursStudied] = useState<string>('3');
  const [notes, setNotes] = useState('');
  const [topics, setTopics] = useState<StudyTopic[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  useEffect(() => {
    if (studyToEdit) {
      setMemberId(studyToEdit.memberId);
      setName(studyToEdit.name);
      setCategory(studyToEdit.category);
      setInstitution(studyToEdit.institution || '');
      setCurrentTopic(studyToEdit.currentTopic);
      setMasteryLevel(studyToEdit.masteryLevel);
      setGrade(studyToEdit.grade !== undefined ? studyToEdit.grade.toString() : '');
      setWeeklyGoalHours(studyToEdit.weeklyGoalHours !== undefined ? studyToEdit.weeklyGoalHours.toString() : '5');
      setHoursStudied(studyToEdit.hoursStudied !== undefined ? studyToEdit.hoursStudied.toString() : '0');
      setNotes(studyToEdit.notes || '');
      setTopics(studyToEdit.topics || []);
    } else {
      setMemberId(activeMember.id);
      setName('');
      // Sugerir categoria de acordo com a idade
      if (activeMember.role === 'parent') {
        setCategory('faculdade');
        setInstitution('Faculdade');
      } else if (activeMember.id === 'theo') {
        setCategory('desenvolvimento_infantil');
        setInstitution('Em Casa');
      } else {
        setCategory('escola');
        setInstitution('Escola');
      }
      setCurrentTopic('');
      setMasteryLevel('em_desenvolvimento');
      setGrade('9.0');
      setWeeklyGoalHours('4');
      setHoursStudied('0');
      setNotes('');
      setTopics([]);
    }
  }, [studyToEdit, activeMember, isOpen]);

  if (!isOpen) return null;

  const handleAddTopic = () => {
    if (!newTopicTitle.trim()) return;
    setTopics((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        title: newTopicTitle.trim(),
        completed: false
      }
    ]);
    setNewTopicTitle('');
  };

  const handleRemoveTopic = (topicId: string) => {
    setTopics((prev) => prev.filter((t) => t.id !== topicId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !currentTopic.trim()) return;

    const payload = {
      memberId,
      name: name.trim(),
      category,
      institution: institution.trim() || undefined,
      currentTopic: currentTopic.trim(),
      masteryLevel,
      grade: grade ? parseFloat(grade) : undefined,
      weeklyGoalHours: weeklyGoalHours ? parseFloat(weeklyGoalHours) : undefined,
      hoursStudied: hoursStudied ? parseFloat(hoursStudied) : undefined,
      notes: notes.trim() || undefined,
      topics
    };

    if (studyToEdit) {
      editStudySubject(studyToEdit.id, payload);
    } else {
      addStudySubject(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h3 className="text-lg font-bold text-white">
                {studyToEdit ? 'Editar Matéria / Assunto' : 'Novo Plano de Estudo & Evolução'}
              </h3>
              <p className="text-xs text-slate-400">
                Acompanhe o aprendizado da faculdade, colégio e estímulos infantis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Membro */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Para qual membro da família?
            </label>
            <div className="grid grid-cols-5 gap-2">
              {members.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMemberId(m.id);
                    if (m.role === 'parent') setCategory('faculdade');
                    else if (m.id === 'theo') setCategory('desenvolvimento_infantil');
                    else setCategory('escola');
                  }}
                  className={`p-2 rounded-xl text-center border transition flex flex-col items-center ${
                    memberId === m.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold'
                      : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl">{m.avatar}</span>
                  <span className="text-xs truncate max-w-full">{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nome da Matéria / Disciplina */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nome da Matéria / Disciplina / Habilidade *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Engenharia de Software, Tabuada, Alfabetização, Fala & Linguagem"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Categoria e Instituição */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Categoria de Ensino
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StudyCategory)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="faculdade">🎓 Faculdade / Pós-Graduação</option>
                <option value="escola">🏫 Escola / Ensino Fundamental</option>
                <option value="desenvolvimento_infantil">🧸 Estímulos da Primeira Infância</option>
                <option value="curso_livre">💡 Cursos Livres & Certificações</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Instituição / Local
              </label>
              <input
                type="text"
                placeholder="Ex: Faculdade, Colégio, Casa, Alura"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Assunto Atual e Nível de Domínio */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Assunto ou Conteúdo da Semana *
            </label>
            <textarea
              required
              rows={2}
              placeholder="O que está sendo estudado agora? Ex: Microsserviços e Redis, continhas de multiplicação com reserva, rimas e fonemas..."
              value={currentTopic}
              onChange={(e) => setCurrentTopic(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nível de Domínio
              </label>
              <select
                value={masteryLevel}
                onChange={(e) => setMasteryLevel(e.target.value as MasteryLevel)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="iniciando">🌱 Iniciando / Primeiro Contato</option>
                <option value="em_desenvolvimento">⚡ Em Desenvolvimento</option>
                <option value="dominado">🌟 Dominado / Consolidado</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nota / Avaliação (0 - 10)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Ex: 9.5"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Horas Estudadas / Meta
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.5"
                  placeholder="Horas"
                  value={hoursStudied}
                  onChange={(e) => setHoursStudied(e.target.value)}
                  className="w-1/2 bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-sm text-white text-center"
                />
                <span className="text-slate-500">/</span>
                <input
                  type="number"
                  step="0.5"
                  placeholder="Meta"
                  value={weeklyGoalHours}
                  onChange={(e) => setWeeklyGoalHours(e.target.value)}
                  className="w-1/2 bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-sm text-white text-center"
                />
              </div>
            </div>
          </div>

          {/* Subtópicos / Checklist da disciplina */}
          <div className="border-t border-slate-800 pt-3">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Subtópicos / Conteúdos para dominar
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Adicionar subtópico (ex: Tabuada do 7, Leitura da pág. 10 a 25...)"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTopic();
                  }
                }}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddTopic}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                + Adicionar
              </button>
            </div>

            {topics.length > 0 && (
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {topics.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                  >
                    <span>{t.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(t.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Observações da Evolução */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Observações dos Pais / Reflexão sobre a Evolução
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Como está a concentração, pontos que precisam de reforço, conquistas notáveis..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition"
            >
              {studyToEdit ? 'Salvar Alterações' : 'Cadastrar Matéria'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
