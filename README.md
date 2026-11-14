# 👨‍👩‍👧‍👦 Família em Foco - Gestão & Crescimento Familiar (PWA)

Aplicação Web e Mobile (Progressive Web App) completa desenvolvida com **React 18 + TypeScript + Vite + Tailwind CSS + Supabase/Offline-first**, projetada para o desenvolvimento pessoal, gestão de metas e acompanhamento dos marcos de crescimento para toda a família.

---

## 👥 Perfis Integrados

1. **Davi (26 anos) - Administrador / Pai**: Metas de carreira (Cloud, Engenharia), treinos (10km), finanças e consistência de hábitos.
2. **Marina (26 anos) - Administradora / Mãe**: Metas de pós-graduação, finanças estratégicas, rotina de pilates/treinos e bem-estar familiar.
3. **Benjamin (8 anos) - Criança**: Gamificação com tarefas escolares, responsabilidades de casa, pontuação e recompensas reais.
4. **Iris (5 anos) - Criança**: Atividades lúdicas, comportamento, tarefas infantis simples e moedas virtuais.
5. **Theo (2 anos) - Bebê**: Diário de bordo 100% gerenciado pelos pais com marcos de fala, coordenação motora, sono e desfralde.

---

## 🚀 Como Rodar Localmente

### 1. Pré-requisitos
- Node.js instalado (v18 ou superior)
- Gerenciador de pacotes `npm`, `yarn` ou `pnpm`

### 2. Instalação das Dependências
```bash
npm install
```

### 3. Execução em Modo de Desenvolvimento
```bash
npm run dev
```
Abra o navegador no endereço exibido no terminal (geralmente `http://localhost:5173`).

### 4. Build de Produção e PWA
```bash
npm run build
npm run preview
```

---

## 🗄️ Integração com Supabase (Opcional)
O aplicativo possui persistência imediata local (Offline-first com `localStorage`). Para conectar com o Supabase em nuvem:
1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Execute o script contido em `supabase/schema.sql` no Editor SQL do seu painel do Supabase.
3. Copie o arquivo `.env.example` para `.env` e preencha suas chaves:
```env
VITE_SUPABASE_URL=https://seu-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```
