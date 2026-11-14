import { createClient } from '@supabase/supabase-js';
import { FamilyMember, Goal, KidsTask } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://seu-projeto.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Funções utilitárias de sincronização com Supabase (quando conectado)
export const syncService = {
  async fetchMembers(): Promise<FamilyMember[] | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.from('family_members').select('*');
      if (error || !data || data.length === 0) return null;
      return data.map((d: any) => ({
        id: d.id,
        name: d.name,
        age: d.age,
        role: d.role,
        avatar: d.avatar,
        themeColor: d.theme_color,
        points: d.points,
        bio: d.bio
      }));
    } catch {
      return null;
    }
  },

  async saveGoal(goal: Goal) {
    if (!supabase) return;
    try {
      await supabase.from('goals').upsert({
        id: goal.id,
        member_id: goal.memberId,
        title: goal.title,
        description: goal.description,
        category: goal.category,
        horizon: goal.horizon,
        target_date: goal.targetDate,
        progress: goal.progress,
        completed: goal.completed
      });
    } catch (err) {
      console.warn('Falha ao sincronizar meta com Supabase:', err);
    }
  },

  async saveTask(task: KidsTask) {
    if (!supabase) return;
    try {
      await supabase.from('kids_tasks').upsert({
        id: task.id,
        member_id: task.memberId,
        title: task.title,
        description: task.description,
        points_reward: task.pointsReward,
        category: task.category,
        completed: task.completed,
        verified_by_parent: task.verifiedByParent,
        due_date: task.dueDate
      });
    } catch (err) {
      console.warn('Falha ao sincronizar tarefa com Supabase:', err);
    }
  },

  async updateMemberPoints(memberId: string, newPoints: number) {
    if (!supabase) return;
    try {
      await supabase
        .from('family_members')
        .update({ points: newPoints })
        .eq('id', memberId);
    } catch (err) {
      console.warn('Falha ao atualizar pontos no Supabase:', err);
    }
  }
};


// Serviços de Autenticação com o Google
export const authService = {
  async signInWithGoogle() {
    if (!supabase) {
      console.warn('Supabase não conectado. Usando modo de autenticação local.');
      return { local: true, email: 'daviemari@gmail.com' };
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('family_google_auth_session');
  },

  async getCurrentUser() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
};
