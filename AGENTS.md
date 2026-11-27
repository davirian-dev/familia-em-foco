# Regras do Projeto — Família em Foco (`family-growth-app`)

- **Documentação Base:** Consulte `docs/ARQUITETURA.md` e `docs/WORKFLOW-IA.md` antes de implementar novidades.
- **Estrutura de Camadas:**
  - Entrada e abas: `src/App.tsx`
  - Contextos globais: `src/context/FamilyContext.tsx`, `src/context/ThemeContext.tsx`
  - Componentes por domínio: `src/components/` (`common`, `dashboard`, `habits-goals`, `gamification`, `milestones`, `studies`, `finances`)
  - Tipos & Dados/Supabase: `src/types/index.ts`, `src/lib/supabase.ts`, `src/lib/mockData.ts`, `supabase/`
- **Padrões:** Manter fallback local funcional sem Supabase e preservar `.well-known/assetlinks.json` + PWA para compatibilidade com o APK Android.
- **Verificação Obrigatória:** Execute `npm run build` (`tsc && vite build`) após alterar arquivos TypeScript/React.

## Padrões de Qualidade & Engenharia (Antigravity Suite)
- **Rigor Técnico (Gravitas)**: Ler os componentes e seus chamadores antes de mutações; validar integridade com testes e checagem de sintaxe (
ode --check ou 
pm run build).
- **Design & UI Anti-Slop (Impeccable)**:
  - Usar /impeccable critique ou /impeccable polish antes de fechar alterações de interface.
  - Evitar gradientes genéricos roxo/violeta sem motivo, manter contraste WCAG AA (mínimo 4.5:1) e hierarquia tipográfica com saltos mínimos de 1.25x entre títulos.
  - Não aninhar cards dentro de cards desnecessariamente.
- **Arquitetura (Graphify)**: O projeto possui grafo AST indexado em graphify-out/. Para navegar por dependências ou refatorações de alto impacto, consulte o grafo ou execute graphify query.
