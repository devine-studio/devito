export interface Player {
  id: string;
  name: string;
  color: string;
  number: number;
}

export interface GameState {
  theme: string;
  players: Player[];
  currentPhase: 'setup' | 'distribution' | 'playing' | 'finished';
  currentPlayerIndex: number;
  revealedNumbers: boolean[];
  cardsOrder: string[];
  gameWon: boolean | null;
  autoAdvance: boolean;
  enableTextBox: boolean;
}

export const PLAYER_COLORS = [
  '#FFB3BA', // Rosa pastel
  '#BAFFC9', // Verde pastel
  '#BAE1FF', // Azul pastel
  '#FFFFBA', // Amarelo pastel
  '#FFDFBA', // Pêssego pastel
  '#E0BBE4', // Roxo pastel
  '#DFD8C8', // Bege pastel
  '#B5EAD7', // Menta pastel
  // Additional 16 colors:
  '#FFDAC1', // Coral pastel
  '#CBAACB', // Lilás pastel
  '#BFD8B8', // Verde claro pastel
  '#F1E3DD', // Areia pastel
  '#AED9E0', // Azul céu pastel
  '#FAF3DD', // Limão pastel
  '#B8B8FF', // Azul violeta pastel
  '#D8E2DC', // Rosa pó pastel
];

export const THEME_SUGGESTIONS = [
  // 🍔 Comida & Bebida
  'Salgadinhos',
  'Molhos de churrasco',
  'Comidas de café da manhã',
  'Doces',
  'Marcas de cerveja',
  'Pratos típicos brasileiros',
  'Bebidas que combinam com festa',
  'Comidas que ficam boas frias',
  'Melhores Fast Foods',
  'Sobremesas de Natal',
  'Comidas de festa infantil',
  'Lanches de boteco',
  'Pratos que só brasileiro entende',
  'Piores combinações gastronômicas',
  'Comidas com nomes engraçados',
  'Comidas que parecem nojentas',
  'Frutas tropicais',
  'Sabores de pizza',
  'Sorvetes',
  'Refeições de rodízio',

  // 📱 Marcas / Produtos
  'Marcas de celular',
  'Modelos de carros',
  'Marcas de perfume',
  'Lojas de departamento',
  'Marcas de tênis de corrida',
  'Aplicativos mais inúteis',
  'Melhores invenções da humanidade',
  'Produtos de farmácia',
  'Logotipos',
  'Marcas esportivas famosas',
  'Redes sociais',
  'Eletrônicos antigos',
  'Marcas de computador',
  'Jogos de tabuleiro modernos',
  'Produtos que todo mundo já comprou errado',

  // 🎬 Filmes & Séries
  'Vilões de filmes',
  'Heróis',
  'Personagens de desenho',
  'Filmes que todo mundo já viu',
  'Trilogias famosas',
  'Cenas de cinema marcantes',
  'Séries que todo mundo maratonou',
  'Filmes que viraram meme',
  'Desenhos do Cartoon Network',
  'Personagens de sitcom',
  'Filmes da Pixar',
  'Clássicos da Disney',
  'Filmes da Marvel',
  'Filmes da DC',
  'Filmes de terror trash',
  'Personagens de Harry Potter',
  'Vilões da Disney',
  'Filmes que fizeram chorar',
  'Filmes brasileiros icônicos',
  'Séries de infância',

  // 🎵 Música
  'Bandas que só têm um hit',
  'Clipes musicais icônicos',
  'Músicas que grudam na cabeça',
  'Cantores brasileiros clássicos',
  'Estilos musicais estranhos',
  'Músicas de karaokê',
  'DJs mais famosos',
  'Bandas de rock antigas',
  'Músicas que lembram a infância',
  'Rappers internacionais',
  'Músicas de novela',
  'Hits do verão',
  'Músicas brasileiras mais tocadas',
  'Músicas internacionais dos anos 2000',
  'Cantores que todo mundo imita',
  'Bandas de colégio',
  'Trilhas sonoras famosas',

  // 🎮 Games & Geek
  'Pokémons mais conhecidos',
  'Personagens do Mario',
  'Itens clássicos de videogame',
  'Jogos de tabuleiro da infância',
  'Cartas do Uno',
  'Armas de jogos famosos',
  'Personagens de anime',
  'Vilões de games',
  'Superpoderes inventados',
  'Bosses mais apelões',
  'Personagens de Dragon Ball',
  'Jogos de celular famosos',
  'Jogos da infância',
  'Consoles de videogame',
  'Personagens da Marvel',
  'Personagens da DC',
  'Vilões de anime',
  'Cenários de videogame icônicos',

  // 😂 Situações Cotidianas
  'Desculpas para faltar na aula',
  'Tarefas domésticas chatas',
  'Coisas que irritam no trânsito',
  'Tipos de vizinho',
  'Tipos de colega de trabalho',
  'Situações de vergonha alheia',
  'Motivos para terminar um namoro',
  'Frases clichê de professor',
  'Coisas que se perdem em casa',
  'Coisas que atrasam a vida',
  'Coisas que todo mundo tem em casa',
  'Coisas que todo mundo odeia fazer',
  'Coisas que todo mundo já fez escondido',
  'Coisas que nunca se deve dizer pro chefe',
  'Mensagens de WhatsApp irritantes',
  'Coisas que atrasam a vida',
  'Coisas que todo mundo já esqueceu',
  'Tipos de crush',
  'Planos que nunca saem do papel',
  'Situações constrangedoras em família',

  // ⚽ Esportes
  'Times brasileiros',
  'Esportes estranhos',
  'Atletas mais conhecidos',
  'Jogos de Olimpíada',
  'Momentos marcantes do futebol',
  'Esportes que cansam mais',
  'Jogadores da seleção brasileira',
  'Esportes de praia',
  'Campeonatos lendários',
  'Times internacionais',
  'Ídolos do futebol',
  'Jogadores de vôlei',
  'Esportes de inverno',
  'Esportes de luta',
  'Times da NBA',

  // 🌍 Mundo & Aleatórios
  'Países que todo mundo conhece',
  'Cidades turísticas',
  'Capitais improváveis',
  'Monumentos famosos',
  'Maravilhas do mundo',
  'Signos do zodíaco',
  'Fenômenos naturais',
  'Planetas do sistema solar',
  'Animais exóticos',
  'Lugares pra lua de mel',
  'Países do mundo',
  'Lugares para viajar sozinho',
  'Feriados brasileiros',
  'Feriados internacionais',
  'Tradições de Ano Novo',
  'Lugares para primeiro encontro',
  'Presentes de amigo secreto',
  'Cidades do Brasil',
  'Festivais famosos',
  'Profissões do futuro',

  // 🤣 Humor & Zoação
  'Melhores números de 1 a 10',
  'Memes brasileiros',
  'Piores cantadas',
  'Personagens de TV brasileira',
  'Celebridades canceladas',
  'Gírias',
  'Coisas que só existem no Brasil',
  'Itens inúteis que compramos',
  'Personagens de novela',
  'Propagandas antigas',
  'Programas de TV antigos',
  'Brinquedos da infância',
  'Coisas de escola',
  'Coisas de faculdade',
  'Frases de mãe clássicas',
  'Coisas que todo mundo odeia ouvir',
  'Situações que dão preguiça',
  'Piores modas que já existiram',
  'Coisas de criança anos 2000',
  'Coisas que nunca funcionam direito',
];
