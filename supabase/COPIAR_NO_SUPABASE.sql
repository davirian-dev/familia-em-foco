-- ============================================================
-- SCRIPT DE SINCRONIZAÇÃO EM NUVEM - FAMÍLIA EM FOCO
-- Cole este script no SQL Editor do Supabase e clique em RUN
-- ============================================================

-- 1. Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Sincronização em Nuvem (Estado Completo PWA & Android)
CREATE TABLE IF NOT EXISTS public.family_sync (
    family_email TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilitar Segurança com Acesso Liberado para o Aplicativo
ALTER TABLE public.family_sync ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura sync" ON public.family_sync;
CREATE POLICY "Permitir leitura sync" ON public.family_sync FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir salvar sync" ON public.family_sync;
CREATE POLICY "Permitir salvar sync" ON public.family_sync FOR ALL USING (true);

-- 4. Inserção Inicial de Teste
INSERT INTO public.family_sync (family_email, data, updated_at)
VALUES (
    'daviemari@gmail.com',
    '{"status": "conectado", "mensagem": "Banco Supabase configurado com sucesso!"}'::jsonb,
    NOW()
)
ON CONFLICT (family_email) DO NOTHING;
