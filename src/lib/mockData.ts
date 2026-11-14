import { FamilyMember, Goal, Habit, KidsTask, Reward, ChildMilestone } from '../types';

export const INITIAL_MEMBERS: FamilyMember[] = [
  {
    id: 'davi',
    name: 'Davi',
    age: 26,
    role: 'parent',
    avatar: '👨‍💻',
    themeColor: '#3B82F6',
    points: 0,
    bio: 'Engenheiro de Software Sênior. Foco em arquitetura de sistemas, saúde física, corrida e presença paterna ativa.'
  },
  {
    id: 'marina',
    name: 'Marina',
    age: 26,
    role: 'parent',
    avatar: '👩‍💼',
    themeColor: '#10B981',
    points: 0,
    bio: 'Gestora Estratégica. Foco em pós-graduação, finanças da família, pilates, nutrição saudável e acolhimento dos filhos.'
  },
  {
    id: 'benjamin',
    name: 'Benjamin',
    age: 8,
    role: 'child',
    avatar: '👦',
    themeColor: '#F59E0B',
    points: 140,
    bio: '8 anos (3º ano Fundamental). Desenvolvendo foco nos estudos, autonomia nas tarefas de casa, natação e controle de telas.'
  },
  {
    id: 'iris',
    name: 'Iris',
    age: 5,
    role: 'child',
    avatar: '👧',
    themeColor: '#EC4899',
    points: 85,
    bio: '5 anos (Pré-escola). Estimulando coordenação motora fina, organização dos brinquedos, autonomia no vestir e socialização.'
  },
  {
    id: 'theo',
    name: 'Theo',
    age: 2,
    role: 'child',
    avatar: '👶',
    themeColor: '#06B6D4',
    points: 0,
    bio: '2 anos (Fase de explosão da linguagem). Acompanhamento de desfralde diurno, fala, motricidade e rotina de sono.'
  }
];

export const INITIAL_HABITS: Habit[] = [
  // HÁBITOS DE DAVI (26 anos - Carreira, Saúde e Paternidade)
  {
    id: 'h-davi-1',
    memberId: 'davi',
    title: 'Bloco de Foco Profissional / Leitura Técnica (45 min)',
    category: 'carreira',
    frequency: 'dias_uteis',
    streak: 14,
    completedToday: true,
    history: ['2026-11-13', '2026-11-12', '2026-11-11']
  },
  {
    id: 'h-davi-2',
    memberId: 'davi',
    title: 'Treino de Corrida 10km ou Musculação',
    category: 'saude',
    frequency: 'dias_uteis',
    streak: 8,
    completedToday: false,
    history: ['2026-11-12', '2026-11-11']
  },
  {
    id: 'h-davi-3',
    memberId: 'davi',
    title: 'Meta de Hidratação (Mínimo 3 Litros de Água)',
    category: 'saude',
    frequency: 'diario',
    streak: 19,
    completedToday: true,
    history: ['2026-11-13', '2026-11-12']
  },
  {
    id: 'h-davi-4',
    memberId: 'davi',
    title: 'Conexão Paterna 1-a-1 (15 min de atenção plena sem celular com os filhos)',
    category: 'lazer',
    frequency: 'diario',
    streak: 11,
    completedToday: true,
    history: ['2026-11-13', '2026-11-12']
  },
  {
    id: 'h-davi-5',
    memberId: 'davi',
    title: 'Higiene do Sono: Desconectar de telas após às 22h30',
    category: 'saude',
    frequency: 'diario',
    streak: 5,
    completedToday: false,
    history: ['2026-11-12']
  },

  // HÁBITOS DE MARINA (26 anos - Estudos, Saúde e Gestão Familiar)
  {
    id: 'h-marina-1',
    memberId: 'marina',
    title: 'Dedicação ao TCC / Artigo da Pós-Graduação (45 min)',
    category: 'estudos',
    frequency: 'dias_uteis',
    streak: 16,
    completedToday: true,
    history: ['2026-11-13', '2026-11-12']
  },
  {
    id: 'h-marina-2',
    memberId: 'marina',
    title: 'Sessão de Pilates e Fortalecimento Postural',
    category: 'saude',
    frequency: 'dias_uteis',
    streak: 12,
    completedToday: true,
    history: ['2026-11-13', '2026-11-11']
  },
  {
    id: 'h-marina-3',
    memberId: 'marina',
    title: 'Ingestão de 2.5L de Água Diários',
    category: 'saude',
    frequency: 'diario',
    streak: 21,
    completedToday: true,
    history: ['2026-11-13', '2026-11-12']
  },
  {
    id: 'h-marina-4',
    memberId: 'marina',
    title: 'Planejamento Nutricional das Refeições da Semana',
    category: 'saude',
    frequency: 'fim_de_semana',
    streak: 7,
    completedToday: false,
    history: ['2026-11-08']
  },
  {
    id: 'h-marina-5',
    memberId: 'marina',
    title: 'Momento de Leitura Relaxante sem Telas antes de dormir',
    category: 'estudos',
    frequency: 'diario',
    streak: 9,
    completedToday: false,
    history: ['2026-11-12']
  }
];

export const INITIAL_KIDS_TASKS: KidsTask[] = [
  // ============================================================
  // BENJAMIN (8 ANOS) - Foco em Autonomia, Estudos e Responsabilidade Doméstica
  // ============================================================
  {
    id: 't-ben-1',
    memberId: 'benjamin',
    title: 'Fazer a Lição de Casa e Revisar a Matéria (Sem Enrolar)',
    description: 'Completar todas as tarefas do caderno/apostila e deixar o estojo e livros organizados na mochila para o dia seguinte.',
    pointsReward: 20,
    category: 'escola',
    completed: true,
    verifiedByParent: true,
    dueDate: '2026-11-13'
  },
  {
    id: 't-ben-2',
    memberId: 'benjamin',
    title: 'Leitura de 15 Minutos de um Livro Físico',
    description: 'Ler um capítulo do livro de aventura escolhido e depois contar para o papai ou mamãe o que aconteceu.',
    pointsReward: 15,
    category: 'escola',
    completed: false,
    verifiedByParent: false,
    dueDate: '2026-11-13'
  },
  {
    id: 't-ben-3',
    memberId: 'benjamin',
    title: 'Arrumar a Própria Cama ao Acordar',
    description: 'Puxar o lençol, esticar o edredom e colocar o travesseiro no lugar logo cedo.',
    pointsReward: 10,
    category: 'casa',
    completed: true,
    verifiedByParent: true,
    dueDate: '2026-11-13'
  },
  {
    id: 't-ben-4',
    memberId: 'benjamin',
    title: 'Retirar o Prato da Mesa e Colocar Roupa Suja no Cesto',
    description: 'Após as refeições, levar o prato e copo para a pia, e colocar o uniforme/roupas usadas direto no cesto da lavanderia.',
    pointsReward: 10,
    category: 'casa',
    completed: true,
    verifiedByParent: false,
    dueDate: '2026-11-13'
  },
  {
    id: 't-ben-5',
    memberId: 'benjamin',
    title: 'Treino de Natação / Futebol com Uniforme Pronto',
    description: 'Participar com dedicação do esporte e cuidar dos próprios óculos/chuteira e toalha.',
    pointsReward: 20,
    category: 'esporte',
    completed: false,
    verifiedByParent: false,
    dueDate: '2026-11-14'
  },
  {
    id: 't-ben-6',
    memberId: 'benjamin',
    title: 'Desligar Telas e Videogame no Horário Combinado sem Reclamar',
    description: 'Cumprir o limite de tempo de tela de forma madura e respeitosa quando o alarme tocar.',
    pointsReward: 15,
    category: 'comportamento',
    completed: false,
    verifiedByParent: false,
    dueDate: '2026-11-13'
  },

  // ============================================================
  // IRIS (5 ANOS) - Foco em Coordenação Motora, Autonomia e Rotina Lúdica
  // ============================================================
  {
    id: 't-iri-1',
    memberId: 'iris',
    title: 'Guardar Brinquedos na Caixa após Brincar',
    description: 'Juntar as bonecas, pecinhas de montar e massinhas e guardar nos seus respectivos cestos coloridos antes do banho.',
    pointsReward: 15,
    category: 'casa',
    completed: true,
    verifiedByParent: true,
    dueDate: '2026-11-13'
  },
  {
    id: 't-iri-2',
    memberId: 'iris',
    title: 'Escovação dos Dentinhos com a Pasta do Unicórnio',
    description: 'Escovar bem na frente, atrás e a linguinha após o almoço e antes de dormir.',
    pointsReward: 10,
    category: 'comportamento',
    completed: true,
    verifiedByParent: true,
    dueDate: '2026-11-13'
  },
  {
    id: 't-iri-3',
    memberId: 'iris',
    title: 'Calçar o Sapatinho e Vestir o Pijama Sozinha',
    description: 'Praticar o encaixe do velcro do tênis e vestir a roupinha estimulando a autonomia.',
    pointsReward: 15,
    category: 'casa',
    completed: true,
    verifiedByParent: false,
    dueDate: '2026-11-13'
  },
  {
    id: 't-iri-4',
    memberId: 'iris',
    title: 'Atividade de Recorte (Tesoura sem Ponta) e Desenho Colorido',
    description: 'Praticar o recorte de figuras nas linhas e colorir sem sair muito da borda.',
    pointsReward: 15,
    category: 'escola',
    completed: false,
    verifiedByParent: false,
    dueDate: '2026-11-14'
  },
  {
    id: 't-iri-5',
    memberId: 'iris',
    title: 'Experimentar Frutas e Legumes do "Prato Arco-Íris"',
    description: 'Comer uma porção colorida de vegetais ou frutinhas no almoço/lanche.',
    pointsReward: 10,
    category: 'comportamento',
    completed: false,
    verifiedByParent: false,
    dueDate: '2026-11-13'
  },
  {
    id: 't-iri-6',
    memberId: 'iris',
    title: 'Ajudar a Colocar os Guardanapos na Mesa do Jantar',
    description: 'Participar alegremente da preparação da mesa com a família.',
    pointsReward: 10,
    category: 'casa',
    completed: false,
    verifiedByParent: false,
    dueDate: '2026-11-13'
  }
];

export const INITIAL_GOALS: Goal[] = [
  // Davi
  {
    id: 'g-davi-1',
    memberId: 'davi',
    title: 'Certificação Avançada de Arquitetura Cloud',
    description: 'Concluir simulados e obter a certificação até o final do trimestre.',
    category: 'carreira',
    horizon: 'curto',
    targetDate: '2026-12-15',
    progress: 70,
    completed: false,
    createdAt: '2026-10-01'
  },
  {
    id: 'g-davi-2',
    memberId: 'davi',
    title: 'Completar Prova de Corrida de 10km abaixo de 50min',
    description: 'Treinos progressivos 3x por semana com foco em capacidade cardiorrespiratória.',
    category: 'saude',
    horizon: 'medio',
    targetDate: '2027-03-30',
    progress: 45,
    completed: false,
    createdAt: '2026-09-15'
  },
  {
    id: 'g-davi-3',
    memberId: 'davi',
    title: 'Aporte de Reserva Financeira e Ações Familiares',
    description: 'Atingir meta semestral de investimentos em renda fixa e variável.',
    category: 'financas',
    horizon: 'longo',
    targetDate: '2027-12-31',
    progress: 35,
    completed: false,
    createdAt: '2026-01-10'
  },

  // Marina
  {
    id: 'g-marina-1',
    memberId: 'marina',
    title: 'Conclusão da Pós-Graduação em Gestão Estratégica',
    description: 'Entregar o TCC e finalizar as 2 últimas disciplinas pendentes com nota máxima.',
    category: 'estudos',
    horizon: 'medio',
    targetDate: '2027-04-15',
    progress: 60,
    completed: false,
    createdAt: '2026-08-01'
  },
  {
    id: 'g-marina-2',
    memberId: 'marina',
    title: 'Consistência no Pilates e Fortalecimento (4x/semana)',
    description: 'Manter regularidade para fortalecimento muscular, postura e vitalidade.',
    category: 'saude',
    horizon: 'curto',
    targetDate: '2026-12-30',
    progress: 80,
    completed: false,
    createdAt: '2026-10-10'
  },
  {
    id: 'g-marina-3',
    memberId: 'marina',
    title: 'Planejamento e Reserva da Viagem de Férias em Família',
    description: 'Pesquisar hospedagens e estruturar roteiro para as férias de julho com as crianças.',
    category: 'lazer',
    horizon: 'medio',
    targetDate: '2027-06-01',
    progress: 40,
    completed: false,
    createdAt: '2026-10-20'
  }
];

export const INITIAL_REWARDS: Reward[] = [
  {
    id: 'rew-1',
    title: '1 Hora Extra de Videogame / Tablet no Fim de Semana',
    description: 'Tempo especial de jogos eletrônicos após cumprir as tarefas da semana.',
    cost: 50,
    icon: '🎮'
  },
  {
    id: 'rew-2',
    title: 'Picolé ou Sobremesa Especial no Passeio',
    description: 'Escolher um doce ou picolé favorito no final de semana.',
    cost: 35,
    icon: '🍦'
  },
  {
    id: 'rew-3',
    title: 'Escolher o Filme e Sabor da Pizza de Sexta-feira',
    description: 'Poder de decisão para a noite especial de cinema e pizza em família!',
    cost: 60,
    icon: '🍕'
  },
  {
    id: 'rew-4',
    title: 'Tarde no Parque de Trampolim / Pula-Pula',
    description: 'Muita diversão e saltos radicais com a família no sábado.',
    cost: 150,
    icon: '🤸‍♂️'
  },
  {
    id: 'rew-5',
    title: 'Livro Novo Escolhido na Livraria ou Gibi',
    description: 'Um novo livro para a estante escolhido pela própria criança.',
    cost: 90,
    icon: '📚'
  },
  {
    id: 'rew-6',
    title: 'Passeio Especial de Bicicleta / Patinete no Parque',
    description: 'Piquenique e circuito ao ar livre com o papai e a mamãe.',
    cost: 80,
    icon: '🚲'
  }
];

export const INITIAL_MILESTONES: ChildMilestone[] = [
  // THEO (2 ANOS) - Marcos pediátricos e pedagógicos essenciais
  {
    id: 'm-theo-1',
    memberId: 'theo',
    title: 'Construir frases simples com 2 a 3 palavras',
    category: 'fala',
    status: 'concluido',
    achievedDate: '2026-10-18',
    expectedAgeMonths: 24,
    description: 'Consegue dizer "Theo quer água", "Papai vem cá" e "Carro correu". Vocabulário em rápida expansão.',
    notes: [
      {
        id: 'n-1',
        date: '2026-10-18',
        author: 'Marina',
        text: 'Theo falou claramente "Mamãe dá uva por favor" na cozinha! Ficamos emocionados.'
      }
    ],
    photos: []
  },
  {
    id: 'm-theo-2',
    memberId: 'theo',
    title: 'Desfralde Diurno (Reconhecimento da vontade do xixi/cocô)',
    category: 'desfralde',
    status: 'em_progresso',
    expectedAgeMonths: 26,
    description: 'Já avisa antes de fazer e senta no troninho com auxílio dos pais e reforço positivo.',
    notes: [
      {
        id: 'n-2',
        date: '2026-11-05',
        author: 'Davi',
        text: 'Conseguiu avisar antes de acontecer pela 3ª vez consecutiva hoje! Usou o troninho com alegria.'
      }
    ],
    photos: []
  },
  {
    id: 'm-theo-3',
    memberId: 'theo',
    title: 'Chutar a bola para a frente e subir degraus com apoio',
    category: 'motora',
    status: 'concluido',
    achievedDate: '2026-09-12',
    expectedAgeMonths: 22,
    description: 'Equilíbrio motor excelente: chuta a bola sem cair e sobe degraus segurando no corrimão.',
    notes: [
      {
        id: 'n-3',
        date: '2026-09-12',
        author: 'Davi',
        text: 'Chutou a bola no golzinho com o Benjamin! Equilíbrio ótimo.'
      }
    ],
    photos: []
  },
  {
    id: 'm-theo-4',
    memberId: 'theo',
    title: 'Dormir a noite toda no bercinho (Rotina do Sono até 20h30)',
    category: 'sono',
    status: 'em_progresso',
    expectedAgeMonths: 24,
    description: 'Rotina previsível: banho morno, ruído branco, historinha e deitar sem telas.',
    notes: [
      {
        id: 'n-4',
        date: '2026-11-10',
        author: 'Marina',
        text: 'Dormiu 5 noites seguidas direto com ruído branco e historinha do ursinho.'
      }
    ],
    photos: []
  },
  {
    id: 'm-theo-5',
    memberId: 'theo',
    title: 'Empilhar torre com 6 ou mais bloquinhos de madeira',
    category: 'cognitiva',
    status: 'concluido',
    achievedDate: '2026-10-30',
    expectedAgeMonths: 24,
    description: 'Coordenação óculo-manual e paciência para alinhar os bloquinhos sem derrubar.',
    notes: [
      {
        id: 'n-5',
        date: '2026-10-30',
        author: 'Marina',
        text: 'Montou com o Benjamin uma torre de 8 blocos de madeira!'
      }
    ],
    photos: []
  },
  {
    id: 'm-theo-6',
    memberId: 'theo',
    title: 'Comer com a colherzinha de forma mais independente',
    category: 'motora',
    status: 'em_progresso',
    expectedAgeMonths: 24,
    description: 'Levar a colher com frutinhas ou papa até a boca com menos derramamentos.',
    notes: [
      {
        id: 'n-6',
        date: '2026-11-12',
        author: 'Davi',
        text: 'Comeu o potinho de iogurte e banana quase sem sujar o babador!'
      }
    ],
    photos: []
  }
];


import { StudySubject } from '../types';

export const INITIAL_STUDIES: StudySubject[] = [
  // DAVI - FACULDADE / GRADUAÇÃO & ALTA PERFORMANCE TECH
  {
    id: 'study-davi-1',
    memberId: 'davi',
    name: 'Engenharia de Software & Sistemas Distribuídos',
    category: 'faculdade',
    institution: 'Faculdade de Tecnologia',
    currentTopic: 'Arquiteturas Orientadas a Eventos, Microsserviços e Cache Redis',
    masteryLevel: 'dominado',
    grade: 9.8,
    weeklyGoalHours: 8,
    hoursStudied: 6.5,
    notes: 'Trabalho prático da disciplina entregue com nota máxima. Foco no exame final.',
    lastUpdated: '2026-11-13',
    topics: [
      { id: 't-d1', title: 'Fundamentos de Concorrência e Threads', completed: true, score: 10 },
      { id: 't-d2', title: 'Padrão CQRS e Event Sourcing', completed: true, score: 9.5 },
      { id: 't-d3', title: 'Resiliência com Circuit Breaker e Retry', completed: true, score: 10 },
      { id: 't-d4', title: 'Observabilidade com OpenTelemetry', completed: false, score: 8.5 }
    ]
  },
  {
    id: 'study-davi-2',
    memberId: 'davi',
    name: 'Estruturas de Dados Avançadas & Algoritmos',
    category: 'faculdade',
    institution: 'Faculdade de Tecnologia',
    currentTopic: 'Grafos, Caminho Mínimo (Dijkstra) e Programação Dinâmica',
    masteryLevel: 'em_desenvolvimento',
    grade: 9.2,
    weeklyGoalHours: 6,
    hoursStudied: 4.5,
    notes: 'Praticando 3 problemas semanais de leetcode para consolidar complexidade O(n log n).',
    lastUpdated: '2026-11-12',
    topics: [
      { id: 't-d5', title: 'Árvores Binárias de Busca e AVL', completed: true, score: 9.0 },
      { id: 't-d6', title: 'Tabelas Hash e Algoritmos de Colisão', completed: true, score: 9.5 },
      { id: 't-d7', title: 'Grafos: DFS, BFS e TopoSort', completed: false, score: 8.0 }
    ]
  },

  // MARINA - FACULDADE / PÓS-GRADUAÇÃO & GESTÃO
  {
    id: 'study-marina-1',
    memberId: 'marina',
    name: 'Gestão Estratégica & Liderança de Pessoas',
    category: 'faculdade',
    institution: 'Pós-Graduação / MBA',
    currentTopic: 'Cultura Organizacional de Alto Desempenho e Retenção de Talentos',
    masteryLevel: 'dominado',
    grade: 9.9,
    weeklyGoalHours: 7,
    hoursStudied: 5.5,
    notes: 'Apresentação do case de liderança humanizada muito elogiada pela banca.',
    lastUpdated: '2026-11-13',
    topics: [
      { id: 't-m1', title: 'Modelos de Gestão Ágil e OKRs', completed: true, score: 10 },
      { id: 't-m2', title: 'Segurança Psicológica em Equipes Híbridas', completed: true, score: 9.8 },
      { id: 't-m3', title: 'Gestão de Mudanças e Resolução de Conflitos', completed: true, score: 9.9 }
    ]
  },
  {
    id: 'study-marina-2',
    memberId: 'marina',
    name: 'Planejamento Financeiro & Controladoria',
    category: 'faculdade',
    institution: 'Pós-Graduação / MBA',
    currentTopic: 'Análise de Fluxo de Caixa, DRE e Indicadores EBITDA',
    masteryLevel: 'em_desenvolvimento',
    grade: 9.4,
    weeklyGoalHours: 5,
    hoursStudied: 3.5,
    notes: 'Módulo prático de orçamentos e simulações financeiras em andamento.',
    lastUpdated: '2026-11-11',
    topics: [
      { id: 't-m4', title: 'Contabilidade Gerencial Básica', completed: true, score: 9.5 },
      { id: 't-m5', title: 'Elaboração e Acompanhamento Orçamentário', completed: false, score: 9.0 }
    ]
  },

  // BENJAMIN - 8 ANOS (3º ANO DO FUNDAMENTAL)
  {
    id: 'study-benjamin-1',
    memberId: 'benjamin',
    name: 'Matemática (Tabuada e Resolução de Problemas)',
    category: 'escola',
    institution: 'Colégio (3º Ano)',
    currentTopic: 'Tabuada do 6 ao 9 e continhas de multiplicação com reserva',
    masteryLevel: 'em_desenvolvimento',
    grade: 9.0,
    weeklyGoalHours: 4,
    hoursStudied: 3.5,
    notes: 'Benjamin está muito rápido no cálculo mental! Treinando com joguinhos.',
    lastUpdated: '2026-11-13',
    topics: [
      { id: 't-b1', title: 'Adição e Subtração com milhares', completed: true, score: 9.5 },
      { id: 't-b2', title: 'Tabuada do 2 ao 5', completed: true, score: 10 },
      { id: 't-b3', title: 'Tabuada do 6 ao 9', completed: false, score: 8.5 },
      { id: 't-b4', title: 'Problemas de lógica matemática com historinhas', completed: true, score: 9.0 }
    ]
  },
  {
    id: 'study-benjamin-2',
    memberId: 'benjamin',
    name: 'Língua Portuguesa & Produção de Texto',
    category: 'escola',
    institution: 'Colégio (3º Ano)',
    currentTopic: 'Parágrafos, pontuação (travessão e dois pontos) e interpretação de texto',
    masteryLevel: 'dominado',
    grade: 9.5,
    weeklyGoalHours: 3.5,
    hoursStudied: 3.0,
    notes: 'Escreveu uma redação linda sobre astronautas. Vocabulário muito rico.',
    lastUpdated: '2026-11-12',
    topics: [
      { id: 't-b5', title: 'Ortografia: uso de R, RR, S e SS', completed: true, score: 9.0 },
      { id: 't-b6', title: 'Substantivos próprios e comuns', completed: true, score: 10 },
      { id: 't-b7', title: 'Produção de texto narrativo com início, meio e fim', completed: true, score: 9.5 }
    ]
  },

  // IRIS - 5 ANOS (PRÉ-ESCOLA)
  {
    id: 'study-iris-1',
    memberId: 'iris',
    name: 'Alfabetização Inicial & Fonemas',
    category: 'escola',
    institution: 'Escola Infantil (Pré II)',
    currentTopic: 'Reconhecimento das letras do alfabeto, escrita do próprio nome e rimas',
    masteryLevel: 'em_desenvolvimento',
    grade: 10,
    weeklyGoalHours: 3,
    hoursStudied: 2.5,
    notes: 'Iris já reconhece todos os nomes da família e adora caçar letrinhas nos livros.',
    lastUpdated: '2026-11-13',
    topics: [
      { id: 't-i1', title: 'Vogais (A, E, I, O, U) e sons', completed: true, score: 10 },
      { id: 't-i2', title: 'Escrever o próprio nome (IRIS) sem ajuda', completed: true, score: 10 },
      { id: 't-i3', title: 'Sons iniciais das palavras (consciência fonológica)', completed: false, score: 9.0 }
    ]
  },
  {
    id: 'study-iris-2',
    memberId: 'iris',
    name: 'Coordenação Motora Fina & Cores / Formas',
    category: 'escola',
    institution: 'Escola Infantil (Pré II)',
    currentTopic: 'Recorte com tesoura sem ponta, desenho da figura humana e massinha',
    masteryLevel: 'dominado',
    grade: 10,
    weeklyGoalHours: 2.5,
    hoursStudied: 2.5,
    notes: 'Pegada no lápis muito firme e traçado bem delimitado.',
    lastUpdated: '2026-11-12',
    topics: [
      { id: 't-i4', title: 'Círculo, quadrado, triângulo e retângulo', completed: true, score: 10 },
      { id: 't-i5', title: 'Segurar a tesoura e cortar em linha reta e curva', completed: true, score: 9.5 }
    ]
  },

  // THEO - 2 ANOS (DESENVOLVIMENTO & ESTIMULAÇÃO PRECOCE)
  {
    id: 'study-theo-1',
    memberId: 'theo',
    name: 'Estímulo da Linguagem & Vocabulário',
    category: 'desenvolvimento_infantil',
    institution: 'Estímulos em Casa com Papai e Mamãe',
    currentTopic: 'Frases de 2 a 3 palavras ("Dá bola", "Quero água"), nomeação de animais e sons',
    masteryLevel: 'em_desenvolvimento',
    grade: 10,
    weeklyGoalHours: 3,
    hoursStudied: 3.0,
    notes: 'Theo já imita o som do cachorro (au-au), gato (miau) e carro (vrum-vrum)!',
    lastUpdated: '2026-11-13',
    topics: [
      { id: 't-th1', title: 'Imitação de sons e onomatopeias', completed: true, score: 10 },
      { id: 't-th2', title: 'Nomear partes do corpo (olho, nariz, boca)', completed: true, score: 10 },
      { id: 't-th3', title: 'Formar frases com verbo + substantivo ("papai vem")', completed: false, score: 8.5 }
    ]
  },
  {
    id: 'study-theo-2',
    memberId: 'theo',
    name: 'Percepção Sensorial e Cores Primárias',
    category: 'desenvolvimento_infantil',
    institution: 'Estímulos em Casa',
    currentTopic: 'Separar objetos por cores (vermelho, azul e amarelo) e encaixe de formas',
    masteryLevel: 'iniciando',
    grade: 10,
    weeklyGoalHours: 2,
    hoursStudied: 1.5,
    notes: 'Brincadeira diária de 15 minutos com blocos coloridos e livros sensoriais.',
    lastUpdated: '2026-11-11',
    topics: [
      { id: 't-th4', title: 'Identificar a cor azul e vermelho', completed: false, score: 8.0 },
      { id: 't-th5', title: 'Encaixar o círculo e o quadrado no brinquedo de formas', completed: true, score: 10 }
    ]
  }
];


import { Debt, Investment } from '../types';

export const INITIAL_DEBTS: Debt[] = [
  {
    id: 'deb-1',
    name: 'Financiamento Imobiliário Residencial (Casa da Família)',
    institution: 'Caixa Econômica',
    category: 'imobiliario',
    totalAmount: 280000.0,
    currentBalance: 215400.0,
    monthlyPayment: 2180.0,
    totalInstallments: 360,
    remainingInstallments: 275,
    interestRate: '8.9% a.a. + TR',
    dueDate: 'Dia 10 de cada mês',
    status: 'em_dia',
    notes: 'Amortizações extraordinárias semestrais com bônus e 13º salário.'
  },
  {
    id: 'deb-2',
    name: 'Financiamento do Carro SUV da Família',
    institution: 'Banco do Brasil',
    category: 'veiculo',
    totalAmount: 75000.0,
    currentBalance: 28900.0,
    monthlyPayment: 1350.0,
    totalInstallments: 48,
    remainingInstallments: 18,
    interestRate: '1.29% a.m.',
    dueDate: 'Dia 15 de cada mês',
    status: 'em_dia',
    notes: 'Meta: Quitar antecipadamente nos próximos 12 meses.'
  },
  {
    id: 'deb-3',
    name: 'Fatura Consolidada dos Cartões de Crédito',
    institution: 'Nubank / XP',
    category: 'cartao',
    totalAmount: 4850.0,
    currentBalance: 4850.0,
    monthlyPayment: 4850.0,
    totalInstallments: 1,
    remainingInstallments: 1,
    interestRate: '0.0% (pago em dia)',
    dueDate: 'Dia 20 de cada mês',
    status: 'em_dia',
    notes: 'Despesas correntes do mês, sempre pago 100% no vencimento.'
  }
];

export const INITIAL_INVESTMENTS: Investment[] = [
  {
    id: 'inv-1',
    name: 'Reserva de Emergência Familiar (Liquidez Diária)',
    institution: 'Nubank 100% CDI / Tesouro Selic',
    category: 'reserva',
    currentAmount: 48500.0,
    monthlyContribution: 1000.0,
    targetAmount: 60000.0,
    expectedReturn: '100% do CDI (~10.75% a.a.)',
    notes: '6 meses de custo fixo familiar garantidos para imprevistos.'
  },
  {
    id: 'inv-2',
    name: 'Fundos Imobiliários (FIIs - Renda Passiva Mensal)',
    institution: 'Rico / XP Investimentos',
    category: 'fiis',
    currentAmount: 32400.0,
    monthlyContribution: 1200.0,
    targetAmount: 150000.0,
    expectedReturn: '0.85% a.m. isento de IR (~R$ 275/mês pingando)',
    notes: 'Dividendos mensais reinvestidos automaticamente.'
  },
  {
    id: 'inv-3',
    name: 'Tesouro IPCA+ 2035 (Proteção contra Inflação)',
    institution: 'Tesouro Direto',
    category: 'renda_fixa',
    currentAmount: 26800.0,
    monthlyContribution: 800.0,
    targetAmount: 200000.0,
    expectedReturn: 'IPCA + 6.35% a.a.',
    notes: 'Construção da aposentadoria e liberdade financeira dos pais.'
  },
  {
    id: 'inv-4',
    name: 'Ações Brasileiras & ETFs Globais (S&P 500)',
    institution: 'BTG Pactual / Avenue',
    category: 'acoes',
    currentAmount: 18500.0,
    monthlyContribution: 600.0,
    targetAmount: 100000.0,
    expectedReturn: '12% a.a. histórico',
    notes: 'Empresas líderes globais para crescimento no longo prazo.'
  },
  {
    id: 'inv-5',
    name: 'Futuro das Crianças (Faculdade Benjamin, Iris e Theo)',
    institution: 'Tesouro Educa+ / Fundo Previdência',
    category: 'filhos',
    currentAmount: 15200.0,
    monthlyContribution: 600.0,
    targetAmount: 150000.0,
    expectedReturn: 'IPCA + 6.1% a.a.',
    notes: 'Reserva para faculdade e intercâmbio aos 18 anos dos 3 filhos.'
  }
];
