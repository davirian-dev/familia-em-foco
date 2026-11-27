# Workflow de Desenvolvimento com IA — Família em Foco

1. **Contexto:** Leia `docs/ARQUITETURA.md`, `AGENTS.md` e `src/types/index.ts` antes de alterar qualquer módulo.
2. **Prompts Atômicos:** Trabalhe módulo por módulo (`habits-goals`, `gamification`, `studies`, `finances`, `milestones`, `FamilyContext.tsx`).
3. **Banco Supabase:** Ao criar ou alterar tabelas, atualizar `supabase/schema.sql` e `supabase/COPIAR_NO_SUPABASE.sql`.
4. **Validação:** Rodar `npm run build` (`tsc && vite build`) ao final de cada alteração.
