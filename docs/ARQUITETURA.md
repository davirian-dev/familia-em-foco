# Família em Foco — Arquitetura & Documentação

> Documento vivo em Markdown (compatível com Obsidian e agentes de IA) para o app web/PWA **Família em Foco**.

## 1. Visão Geral
- **Nome:** Família em Foco (`family-growth-app`)
- **URL Oficial:** https://family-growth-app-dusky.vercel.app/
- **Repositório GitHub:** https://github.com/davirian-dev/familia-em-foco
- **Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3, `lucide-react`, `canvas-confetti`, Supabase (`@supabase/supabase-js`), PWA (`vite-plugin-pwa`, `.well-known/assetlinks.json` para Android TWA).

## 2. Estrutura Real (`src/` e Raiz)
- `src/App.tsx`: Shell principal com abas (`dashboard`, `studies`, hábitos/metas, gamificação infantil, conquistas/marcos, finanças).
- `src/context/`: `FamilyContext.tsx` (estado da família, membros e sincronização) e `ThemeContext.tsx`.
- `src/components/`:
  - `common/` (`Header.tsx`, `Sidebar.tsx`, `BottomNav.tsx`)
  - `dashboard/` (`DashboardOverview.tsx`)
  - `habits-goals/` (`HabitsTracker.tsx`, `GoalsManager.tsx`)
  - `gamification/` (`KidsTaskManager.tsx`, `RewardStore.tsx`)
  - `milestones/` (`MilestonesDiary.tsx`)
  - `studies/` (`StudiesManager.tsx`)
  - `finances/` (`FinancesManager.tsx`)
- `src/lib/`: `supabase.ts`, `mockData.ts`.
- `src/types/index.ts`: Contratos TypeScript principais.
- `supabase/`: `schema.sql` e `COPIAR_NO_SUPABASE.sql`.
- *(Builds APK e vídeos brutos também ficam organizados em `C:\Projetos\familia em foco`.)*

## 3. Regras de Ouro para IA
1. **Contratos em `src/types/index.ts`:** Novas entidades de hábitos, tarefas infantis, recompensas ou finanças devem começar em `src/types/index.ts`.
2. **Modo Offline/Mock + Supabase:** Garantir que toda funcionalidade continue operando em modo local/`localStorage` mesmo se as chaves `VITE_SUPABASE_*` não estiverem presentes.
3. **Integridade PWA/TWA:** Preservar `public/manifest.json`, `vite.config.ts` (PWA) e `.well-known/assetlinks.json` (necessário para o APK Android).
4. **Verificação Obrigatória:** Rodar `npm run build` (`tsc && vite build`) após qualquer alteração de código.
