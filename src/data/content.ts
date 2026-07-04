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
    title: 'LLM нужен проверяемый контекст',
    body: 'Без ранжирования, источников и трассировки ответ нельзя уверенно защищать перед экспертами.',
    metric: 'trust gap',
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
    label: 'Hybrid Fusion',
    title: 'Reciprocal Rank Fusion',
    flow: ['BM25 ranking', 'vector ranking', '1 / (k + rank)', 'stable merged top-k'],
    text: 'RRF не требует нормализации разных score и устойчиво объединяет результаты двух независимых retrieval-контуров.',
  },
];

export const lifecycleSteps = [
  'Запрос пользователя',
  'Нормализация и маршрутизация',
  'BM25 lookup',
  'Embedding запроса',
  'Vector search',
  'RRF merge',
  'Context selection',
  'LLM answer + sources',
];

export const deepResearchSteps = [
  'RU -> EN перевод',
  'Определение темы и стран',
  'Поисковые фразы',
  'Elasticsearch по массивам',
  'Country + semantic filter',
  'LLM entity extraction',
  'Embedding clustering',
  'Deduplication + report',
];

export const decisions = [
  {
    title: 'Почему hybrid, а не pure vector',
    text: 'Металлургия и патенты содержат номера, стандарты, формулы, марки и названия. Их нельзя надежно отдавать только dense retrieval.',
    tradeoff: 'Два индекса требуют синхронной индексации, зато снижают риск пропусков.',
  },
  {
    title: 'Почему нужен rerank/context selection',
    text: 'Retrieval возвращает кандидатов, но LLM нужен компактный контекст. В проекте секции имеют разные веса: abstract и description важнее служебных полей.',
    tradeoff: 'Логика отбора добавляет слой сложности, но контролирует стоимость и качество ответа.',
  },
  {
    title: 'Почему Deep Research выделен отдельно',
    text: 'Отчет по теме - это не один RAG-вызов, а управляемый workflow с этапами, прогрессом, графом документов и дедупликацией сущностей.',
    tradeoff: 'Асинхронность сложнее UI-синхронного чата, зато исследование становится трассируемым.',
  },
  {
    title: 'Почему graph trace повышает доверие',
    text: 'DocumentMetaData и ProcessedDocuments позволяют показать путь от промта до источников, сущностей, кластеров и финального отчета.',
    tradeoff: 'Нужно хранить метаданные обработки, но судьи и аналитики видят происхождение вывода.',
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
