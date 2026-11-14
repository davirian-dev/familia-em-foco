export type MemberRole = 'parent' | 'child';

export interface GrowthRecord {
  date: string;
  heightCm?: number;
  weightKg?: number;
  note?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  role: MemberRole;
  profession?: string;
  avatar: string;
  themeColor: string;
  points: number; // Para as crianças (Benjamin e Iris)
  bio: string;
  heightCm?: number;
  weightKg?: number;
  growthHistory?: GrowthRecord[];
}

export type EventCategory = 'pediatra' | 'vacina' | 'escola' | 'esporte' | 'familia' | 'trabalho';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  memberId: string;
  memberName: string;
  category: EventCategory;
  location?: string;
  notes?: string;
}

export type ShoppingType = 'preciso' | 'dia_a_dia' | 'quero';

export interface ShoppingItem {
  id: string;
  title: string;
  type: ShoppingType; // 'preciso' ou 'quero'
  price?: number;
  memberId: string;
  category: 'farmacia' | 'supermercado' | 'escola' | 'casa' | 'pessoal' | 'lazer';
  bought: boolean;
}

export type GoalCategory = 'carreira' | 'saude' | 'financas' | 'estudos' | 'lazer';
export type GoalHorizon = 'curto' | 'medio' | 'longo';

export interface Goal {
  id: string;
  memberId: string;
  title: string;
  description: string;
  category: GoalCategory;
  horizon: GoalHorizon;
  targetDate: string;
  progress: number; // 0 - 100
  completed: boolean;
  createdAt: string;
}

export interface Habit {
  id: string;
  memberId: string;
  title: string;
  category: GoalCategory;
  frequency: 'diario' | 'dias_uteis' | 'fim_de_semana';
  streak: number; // Ofensiva
  completedToday: boolean;
  history: string[]; // Lista de datas ISO completadas
}

export interface KidsTask {
  id: string;
  memberId: string;
  title: string;
  description: string;
  pointsReward: number;
  category: 'escola' | 'casa' | 'esporte' | 'comportamento';
  completed: boolean;
  verifiedByParent: boolean;
  dueDate: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  assignedToRole?: 'child' | 'all';
}

export interface RewardRedemption {
  id: string;
  memberId: string;
  rewardId: string;
  rewardTitle: string;
  cost: number;
  status: 'pendente' | 'aprovado' | 'entregue';
  requestedAt: string;
}

export type MilestoneCategory = 'fala' | 'motora' | 'desfralde' | 'sono' | 'cognitiva';
export type MilestoneStatus = 'concluido' | 'em_progresso' | 'aguardando';

export interface MilestoneNote {
  id: string;
  date: string;
  text: string;
  author: string;
}

export interface ChildMilestone {
  id: string;
  memberId: string; // Theo
  title: string;
  category: MilestoneCategory;
  status: MilestoneStatus;
  achievedDate?: string;
  expectedAgeMonths?: number;
  description: string;
  notes: MilestoneNote[];
  photos: string[];
}

export type StudyCategory = 'faculdade' | 'escola' | 'desenvolvimento_infantil' | 'curso_livre';
export type MasteryLevel = 'iniciando' | 'em_desenvolvimento' | 'dominado';

export interface StudyTopic {
  id: string;
  title: string;
  completed: boolean;
  score?: number; // 0 a 10
}

export interface StudySubject {
  id: string;
  memberId: string;
  name: string;
  category: StudyCategory;
  institution?: string;
  currentTopic: string;
  masteryLevel: MasteryLevel;
  grade?: number; // Nota atual / Média
  weeklyGoalHours?: number;
  hoursStudied?: number;
  notes?: string;
  lastUpdated: string;
  topics?: StudyTopic[];
}


export interface GoogleAuthSession {
  isLoggedIn: boolean;
  email?: string;
  name?: string;
  avatar?: string;
  lastSync?: string;
}

export interface MuralNote {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  color: 'amber' | 'pink' | 'indigo' | 'emerald';
  text: string;
  likes: number;
}

export interface PomodoroState {
  studentId: string;
  subject: string;
  minutes: number;
  secondsLeft: number;
  isRunning: boolean;
  completedSessionsToday: number;
}


export type DebtCategory = 'imobiliario' | 'veiculo' | 'cartao' | 'pessoal';

export interface Debt {
  id: string;
  name: string;
  institution?: string;
  category: DebtCategory;
  totalAmount: number;
  currentBalance: number;
  monthlyPayment: number;
  totalInstallments: number;
  remainingInstallments: number;
  interestRate?: string;
  dueDate?: string;
  status: 'em_dia' | 'quitado';
  notes?: string;
}

export type InvestmentCategory = 'reserva' | 'fiis' | 'renda_fixa' | 'acoes' | 'filhos';

export interface Investment {
  id: string;
  name: string;
  institution?: string;
  category: InvestmentCategory;
  currentAmount: number;
  targetAmount?: number;
  monthlyContribution: number;
  expectedReturn?: string;
  notes?: string;
}
