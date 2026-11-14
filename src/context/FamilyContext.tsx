import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  FamilyMember,
  Goal,
  Habit,
  KidsTask,
  Reward,
  RewardRedemption,
  ChildMilestone,
  CalendarEvent,
  ShoppingItem,
  StudySubject,
  Debt,
  Investment
} from '../types';
import {
  INITIAL_MEMBERS,
  INITIAL_GOALS,
  INITIAL_HABITS,
  INITIAL_KIDS_TASKS,
  INITIAL_REWARDS,
  INITIAL_MILESTONES,
  INITIAL_STUDIES,
  INITIAL_DEBTS,
  INITIAL_INVESTMENTS
} from '../lib/mockData';
import { syncService, isSupabaseConfigured } from '../lib/supabase';

interface FamilyContextType {
  members: FamilyMember[];
  activeMember: FamilyMember;
  setActiveMemberId: (id: string) => void;
  isParent: boolean;
  addMember: (member: Omit<FamilyMember, 'id' | 'growthHistory'>) => void;
  editMember: (id: string, updated: Partial<FamilyMember>) => void;
  deleteMember: (id: string) => void;
  
  // Metas
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  editGoal: (id: string, updated: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  toggleGoalComplete: (id: string) => void;
  
  // Hábitos
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'history'>) => void;
  editHabit: (id: string, updated: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitToday: (id: string) => void;
  
  // Tarefas Gamificadas (Crianças)
  tasks: KidsTask[];
  addTask: (task: Omit<KidsTask, 'id' | 'completed' | 'verifiedByParent'>) => void;
  editTask: (id: string, updated: Partial<KidsTask>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  verifyTaskByParent: (id: string) => void;
  
  // Recompensas
  rewards: Reward[];
  addReward: (reward: Omit<Reward, 'id'>) => void;
  editReward: (id: string, updated: Partial<Reward>) => void;
  deleteReward: (id: string) => void;
  redemptions: RewardRedemption[];
  redeemReward: (rewardId: string) => boolean;
  updateRedemptionStatus: (id: string, status: 'aprovado' | 'entregue') => void;
  
  // Marcos Theo
  milestones: ChildMilestone[];
  addMilestone: (milestone: Omit<ChildMilestone, 'id' | 'notes'>) => void;
  editMilestone: (id: string, updated: Partial<ChildMilestone>) => void;
  deleteMilestone: (id: string) => void;
  updateMilestoneStatus: (id: string, status: ChildMilestone['status']) => void;
  addMilestoneNote: (milestoneId: string, text: string) => void;

  // Calendário Familiar & Pediatra
  calendarEvents: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  editEvent: (id: string, updated: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;

  // Lista de Compras (Preciso vs Quero)
  shoppingItems: ShoppingItem[];
  addShoppingItem: (item: Omit<ShoppingItem, 'id' | 'bought'>) => void;
  editShoppingItem: (id: string, updated: Partial<ShoppingItem>) => void;
  deleteShoppingItem: (id: string) => void;
  toggleShoppingBought: (id: string) => void;

  // Centro de Estudos & Evolução Acadêmica
  studies: StudySubject[];
  addStudySubject: (study: Omit<StudySubject, 'id' | 'lastUpdated'>) => void;
  editStudySubject: (id: string, updated: Partial<StudySubject>) => void;
  deleteStudySubject: (id: string) => void;
  toggleStudyTopic: (subjectId: string, topicId: string) => void;

  // Gestão Financeira: Dívidas & Investimentos
  debts: Debt[];
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  editDebt: (id: string, updated: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  amortizeDebt: (id: string) => void;

  investments: Investment[];
  addInvestment: (inv: Omit<Investment, 'id'>) => void;
  editInvestment: (id: string, updated: Partial<Investment>) => void;
  deleteInvestment: (id: string) => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado de Membros
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('family_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [activeMemberId, setActiveMemberId] = useState<string>(() => {
    return localStorage.getItem('family_active_member') || 'davi';
  });

  // Metas
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('family_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  // Hábitos
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('family_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  // Tarefas Gamificadas
  const [tasks, setTasks] = useState<KidsTask[]>(() => {
    const saved = localStorage.getItem('family_tasks');
    return saved ? JSON.parse(saved) : INITIAL_KIDS_TASKS;
  });

  // Recompensas
  const [rewards, setRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem('family_rewards');
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });

  const addReward = (rewardData: Omit<Reward, 'id'>) => {
    const newReward: Reward = {
      ...rewardData,
      id: `rew-${Date.now()}`
    };
    setRewards((prev) => [newReward, ...prev]);
  };

  const editReward = (id: string, updated: Partial<Reward>) => {
    setRewards((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
  };

  const deleteReward = (id: string) => {
    setRewards((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('family_rewards', JSON.stringify(rewards));
  }, [rewards]);

  const [redemptions, setRedemptions] = useState<RewardRedemption[]>(() => {
    const saved = localStorage.getItem('family_redemptions');
    return saved ? JSON.parse(saved) : [];
  });

  // Marcos de Desenvolvimento
  const [milestones, setMilestones] = useState<ChildMilestone[]>(() => {
    const saved = localStorage.getItem('family_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });

  // Calendário Familiar
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('family_calendar_events');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ev-1',
        title: 'Consulta Pediátrica de Rotina do Theo (Puericultura)',
        date: '2026-11-20',
        time: '14:30',
        memberId: 'theo',
        memberName: 'Theo',
        category: 'pediatra',
        location: 'Clínica Pediátrica Santa Maria - Dra. Camila',
        notes: 'Levar caderneta de vacinação e anotações sobre fala e desfralde.'
      },
      {
        id: 'ev-2',
        title: 'Reunião Pedagógica de Pais - Colégio do Benjamin',
        date: '2026-11-25',
        time: '18:30',
        memberId: 'benjamin',
        memberName: 'Benjamin',
        category: 'escola',
        location: 'Auditório Principal do Colégio',
        notes: 'Apresentação dos projetos do 3º trimestre.'
      }
    ];
  });

  // Lista de Compras (Preciso vs Quero)
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('family_shopping_items');
    return saved ? JSON.parse(saved) : [
      { id: 'sh-1', title: 'Fralda Pants G do Theo (Pacotão 80 unidades)', type: 'preciso', price: 95.0, memberId: 'theo', category: 'farmacia', bought: false },
      { id: 'sh-2', title: 'Vitamina D em gotas (Theo e Iris)', type: 'preciso', price: 42.0, memberId: 'theo', category: 'farmacia', bought: false },
      { id: 'sh-3', title: 'Tênis de Corrida para Prova de 10km (Davi)', type: 'quero', price: 480.0, memberId: 'davi', category: 'pessoal', bought: false },
      { id: 'sh-4', title: 'Tapete Extra para Pilates e Alongamento (Marina)', type: 'quero', price: 120.0, memberId: 'marina', category: 'casa', bought: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('family_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('family_shopping_items', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `ev-${Date.now()}`
    };
    setCalendarEvents((prev) => [...prev, newEvent]);
  };

  const editEvent = (id: string, updated: Partial<CalendarEvent>) => {
    setCalendarEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const addShoppingItem = (itemData: Omit<ShoppingItem, 'id' | 'bought'>) => {
    const newItem: ShoppingItem = {
      ...itemData,
      id: `sh-${Date.now()}`,
      bought: false
    };
    setShoppingItems((prev) => [newItem, ...prev]);
  };

  const editShoppingItem = (id: string, updated: Partial<ShoppingItem>) => {
    setShoppingItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updated } : i))
    );
  };

  const deleteShoppingItem = (id: string) => {
    setShoppingItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleShoppingBought = (id: string) => {
    setShoppingItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, bought: !i.bought } : i))
    );
  };

  // Salvar no localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem('family_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('family_active_member', activeMemberId);
  }, [activeMemberId]);

  useEffect(() => {
    localStorage.setItem('family_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('family_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('family_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('family_redemptions', JSON.stringify(redemptions));
  }, [redemptions]);

  useEffect(() => {
    localStorage.setItem('family_milestones', JSON.stringify(milestones));
  }, [milestones]);

  // Efeito de sincronização remota se o Supabase estiver configurado
  useEffect(() => {
    if (isSupabaseConfigured) {
      syncService.fetchMembers().then((remoteMembers) => {
        if (remoteMembers && remoteMembers.length > 0) {
          setMembers(remoteMembers);
        }
      });
    }
  }, []);

  const activeMember = members.find((m) => m.id === activeMemberId) || members[0];
  const isParent = activeMember.role === 'parent';

  // Operações de Membros e Biometria
  const addMember = (memberData: Omit<FamilyMember, 'id' | 'growthHistory'>) => {
    const today = new Date().toISOString().split('T')[0];
    const initialHistory = (memberData.heightCm || memberData.weightKg) ? [{
      date: today,
      heightCm: memberData.heightCm,
      weightKg: memberData.weightKg,
      note: 'Cadastro inicial'
    }] : [];

    const newMember: FamilyMember = {
      ...memberData,
      id: `member-${Date.now()}`,
      growthHistory: initialHistory
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const editMember = (id: string, updated: Partial<FamilyMember>) => {
    const today = new Date().toISOString().split('T')[0];

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const currentHistory = m.growthHistory || [];
          let updatedHistory = [...currentHistory];

          // Se altura ou peso mudaram, adiciona novo registro datado no histórico
          const hasHeightChanged = updated.heightCm !== undefined && updated.heightCm !== m.heightCm;
          const hasWeightChanged = updated.weightKg !== undefined && updated.weightKg !== m.weightKg;

          if (hasHeightChanged || hasWeightChanged) {
            updatedHistory.push({
              date: today,
              heightCm: updated.heightCm ?? m.heightCm,
              weightKg: updated.weightKg ?? m.weightKg,
              note: `Medição atualizada`
            });
          }

          return {
            ...m,
            ...updated,
            growthHistory: updatedHistory
          };
        }
        return m;
      })
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };
  const addGoal = (newGoalData: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...newGoalData,
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setGoals((prev) => [newGoal, ...prev]);
    syncService.saveGoal(newGoal);
  };

  const editGoal = (id: string, updated: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const updateGoalProgress = (id: string, progress: number) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              progress: clampedProgress,
              completed: clampedProgress === 100
            }
          : g
      )
    );
  };

  const toggleGoalComplete = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextCompleted = !g.completed;
          return {
            ...g,
            completed: nextCompleted,
            progress: nextCompleted ? 100 : g.progress === 100 ? 50 : g.progress
          };
        }
        return g;
      })
    );
  };

  // Operações de Hábitos
  const toggleHabitToday = (id: string) => {
    const todayStr = new Date().toISOString().split('T')[0];

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const isDone = !h.completedToday;
          let newStreak = h.streak;
          let newHistory = [...h.history];

          if (isDone) {
            newStreak += 1;
            if (!newHistory.includes(todayStr)) {
              newHistory.push(todayStr);
            }
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 }
            });
          } else {
            newStreak = Math.max(0, newStreak - 1);
            newHistory = newHistory.filter((d) => d !== todayStr);
          }

          return {
            ...h,
            completedToday: isDone,
            streak: newStreak,
            history: newHistory
          };
        }
        return h;
      })
    );
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'history'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: `habit-${Date.now()}`,
      streak: 0,
      completedToday: false,
      history: []
    };
    setHabits((prev) => [newHabit, ...prev]);
  };

  const editHabit = (id: string, updated: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updated } : h))
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // Operações de Gamificação (Crianças)
  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.7 }
            });
          }
          return {
            ...t,
            completed: nextState,
            // Se foi desmarcada, reseta a verificação do pai
            verifiedByParent: nextState ? t.verifiedByParent : false
          };
        }
        return t;
      })
    );
  };

  const verifyTaskByParent = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    // Se já estiver verificado, não credita pontos novamente
    if (task.verifiedByParent) return;

    // Marcar como verificado e concluído
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true, verifiedByParent: true } : t))
    );

    // Creditar pontos na conta da criança
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === task.memberId) {
          const updatedPoints = m.points + task.pointsReward;
          syncService.updateMemberPoints(m.id, updatedPoints);
          return { ...m, points: updatedPoints };
        }
        return m;
      })
    );

    syncService.saveTask({ ...task, completed: true, verifiedByParent: true });

    // Efeito comemorativo de recompensa familiar
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  const addTask = (taskData: Omit<KidsTask, 'id' | 'completed' | 'verifiedByParent'>) => {
    const newTask: KidsTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false,
      verifiedByParent: false
    };
    setTasks((prev) => [newTask, ...prev]);
    syncService.saveTask(newTask);
  };

  const editTask = (id: string, updated: Partial<KidsTask>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Operações de Recompensas
  const redeemReward = (rewardId: string): boolean => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return false;

    if (activeMember.points < reward.cost) {
      return false;
    }

    // Debitar pontos
    setMembers((prev) =>
      prev.map((m) =>
        m.id === activeMember.id ? { ...m, points: m.points - reward.cost } : m
      )
    );

    // Registrar resgate
    const newRedemption: RewardRedemption = {
      id: `redemp-${Date.now()}`,
      memberId: activeMember.id,
      rewardId: reward.id,
      rewardTitle: reward.title,
      cost: reward.cost,
      status: 'pendente',
      requestedAt: new Date().toISOString()
    };
    setRedemptions((prev) => [newRedemption, ...prev]);

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });

    return true;
  };

  const updateRedemptionStatus = (id: string, status: 'aprovado' | 'entregue') => {
    setRedemptions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  // Operações do Diário do Theo
  const updateMilestoneStatus = (id: string, status: ChildMilestone['status']) => {
    const today = new Date().toISOString().split('T')[0];
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status,
              achievedDate: status === 'concluido' ? today : m.achievedDate
            }
          : m
      )
    );
    if (status === 'concluido') {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const addMilestoneNote = (milestoneId: string, text: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      author: activeMember.name,
      text
    };

    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId ? { ...m, notes: [newNote, ...m.notes] } : m
      )
    );
  };

  const addMilestone = (data: Omit<ChildMilestone, 'id' | 'notes'>) => {
    const newMilestone: ChildMilestone = {
      ...data,
      id: `milestone-${Date.now()}`,
      notes: []
    };
    setMilestones((prev) => [newMilestone, ...prev]);
  };

  const editMilestone = (id: string, updated: Partial<ChildMilestone>) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  // Centro de Estudos e Evolução
  const [studies, setStudies] = useState<StudySubject[]>(() => {
    const saved = localStorage.getItem('family_studies');
    return saved ? JSON.parse(saved) : INITIAL_STUDIES;
  });

  useEffect(() => {
    localStorage.setItem('family_studies', JSON.stringify(studies));
  }, [studies]);

  const addStudySubject = (studyData: Omit<StudySubject, 'id' | 'lastUpdated'>) => {
    const newSubject: StudySubject = {
      ...studyData,
      id: `study-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setStudies((prev) => [newSubject, ...prev]);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
  };

  const editStudySubject = (id: string, updated: Partial<StudySubject>) => {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated, lastUpdated: new Date().toISOString().split('T')[0] } : s))
    );
  };

  const deleteStudySubject = (id: string) => {
    setStudies((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleStudyTopic = (subjectId: string, topicId: string) => {
    setStudies((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId || !s.topics) return s;
        const updatedTopics = s.topics.map((t) => {
          if (t.id === topicId) {
            const nextCompleted = !t.completed;
            if (nextCompleted) {
              confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
            }
            return { ...t, completed: nextCompleted };
          }
          return t;
        });
        return {
          ...s,
          topics: updatedTopics,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      })
    );
  };

  // Gestão Financeira: Dívidas & Investimentos
  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem('family_debts');
    return saved ? JSON.parse(saved) : INITIAL_DEBTS;
  });

  useEffect(() => {
    localStorage.setItem('family_debts', JSON.stringify(debts));
  }, [debts]);

  const addDebt = (debtData: Omit<Debt, 'id'>) => {
    const newDebt: Debt = {
      ...debtData,
      id: `deb-${Date.now()}`
    };
    setDebts((prev) => [newDebt, ...prev]);
  };

  const editDebt = (id: string, updated: Partial<Debt>) => {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
  };

  const deleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const amortizeDebt = (id: string) => {
    setDebts((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const newRemaining = Math.max(0, d.remainingInstallments - 1);
        const newBalance = Math.max(0, d.currentBalance - (d.monthlyPayment || 0));
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
        return {
          ...d,
          remainingInstallments: newRemaining,
          currentBalance: newBalance,
          status: newRemaining === 0 ? 'quitado' : d.status
        };
      })
    );
  };

  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem('family_investments');
    return saved ? JSON.parse(saved) : INITIAL_INVESTMENTS;
  });

  useEffect(() => {
    localStorage.setItem('family_investments', JSON.stringify(investments));
  }, [investments]);

  const addInvestment = (invData: Omit<Investment, 'id'>) => {
    const newInv: Investment = {
      ...invData,
      id: `inv-${Date.now()}`
    };
    setInvestments((prev) => [newInv, ...prev]);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const editInvestment = (id: string, updated: Partial<Investment>) => {
    setInvestments((prev) => prev.map((inv) => (inv.id === id ? { ...inv, ...updated } : inv)));
  };

  const deleteInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <FamilyContext.Provider
      value={{
        members,
        activeMember,
        setActiveMemberId,
        isParent,
        addMember,
        editMember,
        deleteMember,
        goals,
        addGoal,
        editGoal,
        deleteGoal,
        updateGoalProgress,
        toggleGoalComplete,
        habits,
        addHabit,
        editHabit,
        deleteHabit,
        toggleHabitToday,
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleTaskComplete,
        verifyTaskByParent,
        rewards,
        addReward,
        editReward,
        deleteReward,
        redemptions,
        redeemReward,
        updateRedemptionStatus,
        milestones,
        addMilestone,
        editMilestone,
        deleteMilestone,
        updateMilestoneStatus,
        addMilestoneNote,
        calendarEvents,
        addEvent,
        editEvent,
        deleteEvent,
        shoppingItems,
        addShoppingItem,
        editShoppingItem,
        deleteShoppingItem,
        toggleShoppingBought,
        studies,
        addStudySubject,
        editStudySubject,
        deleteStudySubject,
        toggleStudyTopic,
        debts,
        addDebt,
        editDebt,
        deleteDebt,
        amortizeDebt,
        investments,
        addInvestment,
        editInvestment,
        deleteInvestment
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily deve ser utilizado dentro de um FamilyProvider');
  }
  return context;
};
