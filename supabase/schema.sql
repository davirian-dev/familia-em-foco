-- ============================================================
-- ESQUEMA COMPLETO DO BANCO DE DADOS - SUPABASE (POSTGRESQL)
-- APLICATIVO FAMÍLIA EM FOCO
-- ============================================================

-- Habilitar extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Membros da Família
CREATE TABLE IF NOT EXISTS public.family_members (
    id TEXT PRIMARY KEY, -- 'davi', 'marina', 'benjamin', 'iris', 'theo' ou UUID
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('parent', 'child')),
    profession VARCHAR(150),
    avatar VARCHAR(50) NOT NULL DEFAULT '👤',
    theme_color VARCHAR(20) NOT NULL DEFAULT '#3B82F6',
    points INT NOT NULL DEFAULT 0,
    bio TEXT,
    height_cm NUMERIC(5, 2),
    weight_kg NUMERIC(5, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Calendário Familiar e Pediatria
CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    member_id TEXT NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('pediatra', 'vacina', 'escola', 'esporte', 'familia', 'trabalho')),
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    location TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Lista de Compras (Preciso vs Quero)
CREATE TABLE IF NOT EXISTS public.shopping_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('preciso', 'quero')),
    price NUMERIC(10, 2) DEFAULT 0,
    member_id TEXT,
    category VARCHAR(50) NOT NULL,
    bought BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Histórico de Crescimento (Biometria Datada)
CREATE TABLE IF NOT EXISTS public.growth_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id TEXT NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    height_cm NUMERIC(5, 2),
    weight_kg NUMERIC(5, 2),
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabela de Metas (Davi e Marina)
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id TEXT NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('carreira', 'saude', 'financas', 'estudos', 'lazer')),
    horizon VARCHAR(20) NOT NULL CHECK (horizon IN ('curto', 'medio', 'longo')),
    target_date DATE NOT NULL,
    progress INT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Tabela de Hábitos (Ofensivas/Streaks)
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id TEXT NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('carreira', 'saude', 'financas', 'estudos', 'lazer')),
    frequency VARCHAR(30) NOT NULL CHECK (frequency IN ('diario', 'dias_uteis', 'fim_de_semana')),
    streak INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Tabela de Registros de Hábitos Diários
CREATE TABLE IF NOT EXISTS public.habit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(habit_id, date)
);

-- 5. Tabela de Tarefas Gamificadas (Benjamin e Iris)
CREATE TABLE IF NOT EXISTS public.kids_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id TEXT NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    points_reward INT NOT NULL DEFAULT 10,
    category VARCHAR(50) NOT NULL CHECK (category IN ('escola', 'casa', 'esporte', 'comportamento')),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    verified_by_parent BOOLEAN NOT NULL DEFAULT FALSE,
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Tabela de Recompensas na Loja Virtual
CREATE TABLE IF NOT EXISTS public.rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cost INT NOT NULL CHECK (cost > 0),
    icon VARCHAR(50) NOT NULL DEFAULT '🎁',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Tabela de Resgates de Recompensas
CREATE TABLE IF NOT EXISTS public.reward_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id TEXT NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    reward_id UUID NOT NULL REFERENCES public.rewards(id) ON DELETE RESTRICT,
    reward_title VARCHAR(255) NOT NULL,
    cost INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'entregue')),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Tabela de Marcos de Desenvolvimento (Theo)
CREATE TABLE IF NOT EXISTS public.child_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id TEXT NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('fala', 'motora', 'desfralde', 'sono', 'cognitiva')),
    status VARCHAR(30) NOT NULL DEFAULT 'aguardando' CHECK (status IN ('concluido', 'em_progresso', 'aguardando')),
    achieved_date DATE,
    expected_age_months INT,
    description TEXT,
    photos TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Tabela de Notas e Anotações do Diário de Bordo
CREATE TABLE IF NOT EXISTS public.milestone_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID NOT NULL REFERENCES public.child_milestones(id) ON DELETE CASCADE,
    author VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================
-- REGRAS DE SEGURANÇA POR LINHA (ROW LEVEL SECURITY - RLS)
-- ============================================================
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kids_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestone_notes ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_history ENABLE ROW LEVEL SECURITY;

-- Políticas restritas a usuários autenticados
CREATE POLICY "Permitir leitura geral para membros autenticados" ON public.family_members FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura geral de metas" ON public.goals FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir gestão de metas" ON public.goals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de hábitos" ON public.habits FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir registro de hábitos" ON public.habits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de tarefas das crianças" ON public.kids_tasks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir atualização de tarefas" ON public.kids_tasks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de recompensas" ON public.rewards FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir resgates" ON public.reward_redemptions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de marcos" ON public.child_milestones FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir gestão de marcos" ON public.child_milestones FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir notas do diário" ON public.milestone_notes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado agenda" ON public.calendar_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado compras" ON public.shopping_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado crescimento" ON public.growth_history FOR ALL USING (auth.role() = 'authenticated');


-- ==============================================================================
-- 9. CENTRO DE ESTUDOS & EVOLUÇÃO ACADÊMICA
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.study_subjects (
    id TEXT PRIMARY KEY,
    member_id TEXT REFERENCES public.family_members(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('faculdade', 'escola', 'desenvolvimento_infantil', 'curso_livre')),
    institution TEXT,
    current_topic TEXT NOT NULL,
    mastery_level TEXT DEFAULT 'em_desenvolvimento' CHECK (mastery_level IN ('iniciando', 'em_desenvolvimento', 'dominado')),
    grade NUMERIC(4, 2),
    weekly_goal_hours NUMERIC(4, 1) DEFAULT 4.0,
    hours_studied NUMERIC(4, 1) DEFAULT 0.0,
    notes TEXT,
    last_updated DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.study_topics (
    id TEXT PRIMARY KEY,
    subject_id TEXT REFERENCES public.study_subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score NUMERIC(4, 2)
);

-- Políticas RLS para Estudos
ALTER TABLE public.study_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura de matérias" ON public.study_subjects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir gestão de matérias" ON public.study_subjects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de tópicos de estudo" ON public.study_topics FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir gestão de tópicos de estudo" ON public.study_topics FOR ALL USING (auth.role() = 'authenticated');


-- ==============================================================================
-- 10. GESTÃO FINANCEIRA: DÍVIDAS E INVESTIMENTOS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.family_debts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    institution TEXT,
    category TEXT NOT NULL CHECK (category IN ('imobiliario', 'veiculo', 'cartao', 'pessoal')),
    total_amount NUMERIC(12, 2) NOT NULL,
    current_balance NUMERIC(12, 2) NOT NULL,
    monthly_payment NUMERIC(10, 2) NOT NULL,
    total_installments INT NOT NULL DEFAULT 1,
    remaining_installments INT NOT NULL DEFAULT 1,
    interest_rate TEXT,
    due_date TEXT,
    status TEXT DEFAULT 'em_dia' CHECK (status IN ('em_dia', 'quitado')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.family_investments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    institution TEXT,
    category TEXT NOT NULL CHECK (category IN ('reserva', 'fiis', 'renda_fixa', 'acoes', 'filhos')),
    current_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    target_amount NUMERIC(12, 2),
    monthly_contribution NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    expected_return TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.family_debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura de dívidas" ON public.family_debts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir gestão de dívidas" ON public.family_debts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura de investimentos" ON public.family_investments FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir gestão de investimentos" ON public.family_investments FOR ALL USING (auth.role() = 'authenticated');

-- 10. Tabela de Sincronização em Nuvem em Tempo Real (Estado Completo PWA & Android)
CREATE TABLE IF NOT EXISTS public.family_sync (
    family_email TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.family_sync ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura sync" ON public.family_sync FOR SELECT USING (auth.jwt() ->> 'email' = family_email);
CREATE POLICY "Permitir salvar sync" ON public.family_sync FOR ALL USING (auth.jwt() ->> 'email' = family_email);

