export const problemCards = [
  {
    title: 'Наивный RAG теряет точные сигналы',
    body: 'Векторный поиск может пропустить патентный номер, код классификации или редкую аббревиатуру.',
    metric: 'keyword gap',
  },
  {
    title: 'Полнотекстовый поиск не понимает смысл',
    body: 'BM25 хорошо ищет слова, но плохо связывает близкие формулировки в статьях, патентах и отчетах.',
    metric: 'semantic gap',
  },
  {
    title: 'Документам не хватает связей между фактами',
    body: 'Эксперту важно видеть не только фрагмент текста, но и связанные сущности: марки стали, процессы, свойства, дефекты и оборудование.',
    metric: 'graph gap',
  },
];

export const retrievalTabs = [
  {
    id: 'bm25',
    label: 'BM25',
    title: 'Лексический контур',
    flow: ['query terms', 'Tantivy / Elasticsearch', 'document ids', 'highlighted fragments'],
    text: 'Применяется для точных фраз, обязательных слов, классификаторов, названий организаций и проектов.',
  },
  {
    id: 'dense',
    label: 'Dense Embeddings',
    title: 'Семантический контур',
    flow: ['query embedding', 'Chroma cosine HNSW', 'nearest chunks', 'metadata-rich context'],
    text: 'Используется для смысловой близости, когда пользователь и источник описывают одно явление разными словами.',
  },
  {
    id: 'fusion',
    label: 'Graph Facts',
    title: 'Обогащение графом знаний',
    flow: ['entity lookup', 'neighbor links', 'verified facts', 'context enrichment'],
    text: 'Система находит сущность в графе, подтягивает ее связи с соседями и добавляет эти факты к документному контексту.',
  },
];

export const lifecycleSteps = [
  'Запрос пользователя',
  'Нормализация и маршрутизация',
  'BM25 lookup',
  'Embedding запроса',
  'Vector search',
  'Graph facts enrichment',
  'Context selection',
  'LLM answer + sources',
];

export const agentResearchSteps = [
  'План ответа',
  'Самостоятельные поисковые запросы',
  'Гибридный поиск по документам',
  'Поиск сущностей в графе',
  'Проверка полноты данных',
  'Уточнение стратегии поиска',
  'Консультация с пользователем при лимитах',
  'Ответ с аргументами и источниками',
];

export const decisions = [
  {
    title: 'Почему hybrid, а не только векторы',
    text: 'Металлургия и патенты содержат номера, стандарты, формулы, марки и названия. Их нельзя надежно отдавать только семантическому поиску.',
    tradeoff: 'Несколько контуров поиска требуют синхронной индексации, зато снижают риск пропусков.',
  },
  {
    title: 'Почему нужен отбор контекста',
    text: 'Поиск возвращает кандидатов, но LLM нужен компактный контекст. В проекте секции имеют разные веса: abstract и description важнее служебных полей.',
    tradeoff: 'Логика отбора добавляет слой сложности, но контролирует стоимость и качество ответа.',
  },
  {
    title: 'Почему граф знаний - ключевой контур',
    text: 'Граф показывает связи между сущностями: материалами, процессами, свойствами, дефектами, оборудованием и источниками. Неподготовленный пользователь может двигаться по этим связям без ручной подготовки запросов.',
    tradeoff: 'Нужно извлекать и проверять сущности, зато ответы получают фактическую опору за пределами отдельных фрагментов текста.',
  },
  {
    title: 'Почему нужен ИИ-агент исследователь',
    text: 'Сложный вопрос редко закрывается одним поиском. Агент планирует работу, сам уточняет запросы, оценивает полноту найденного и при необходимости спрашивает пользователя, как изменить стратегию.',
    tradeoff: 'Автономный цикл требует контроля лимитов, зато аналитик получает аргументированный результат со ссылками на источники.',
  },
];

export const vectorPoints = [
  { x: 18, y: 32, cluster: 'articles', label: 'steel microstructure' },
  { x: 24, y: 47, cluster: 'articles', label: 'heat treatment' },
  { x: 31, y: 28, cluster: 'articles', label: 'alloy design' },
  { x: 62, y: 34, cluster: 'patents', label: 'coating patent' },
  { x: 71, y: 48, cluster: 'patents', label: 'claim fragment' },
  { x: 66, y: 61, cluster: 'patents', label: 'classification' },
  { x: 43, y: 72, cluster: 'reports', label: 'RDT&E note' },
  { x: 52, y: 67, cluster: 'reports', label: 'project update' },
];

export const rerankBefore = [
  { title: 'patent: coating claims', score: 0.42 },
  { title: 'article: alloy processing', score: 0.39 },
  { title: 'news: steel market', score: 0.36 },
  { title: 'article: unrelated furnace', score: 0.33 },
];

export const rerankAfter = [
  { title: 'article: alloy processing', score: 0.91 },
  { title: 'patent: coating claims', score: 0.87 },
  { title: 'RDT&E: project note', score: 0.73 },
  { title: 'news: steel market', score: 0.28 },
];
