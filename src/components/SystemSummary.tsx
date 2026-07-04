import { Download } from 'lucide-react';
import { MermaidDiagram } from './MermaidDiagram';

const summaryChart = `
flowchart LR
  User["User / Analyst"] --> UI["Streamlit UI + Django templates"]
  UI --> Router["Query Router"]
  Router --> BM25["Tantivy BM25 / Elasticsearch"]
  Router --> Vector["ChromaDB Vector Search"]
  CSV["CSV corpus"] --> Indexing["Chunking + metadata"]
  DjangoDB["SQLite / MS SQL / Patent DB"] --> ES["Elasticsearch index"]
  Indexing --> BM25
  Indexing --> Embeddings["Embeddings backend"]
  Embeddings --> Vector
  BM25 --> RRF["Reciprocal Rank Fusion"]
  Vector --> RRF
  DjangoDB --> Graph["Knowledge Graph"]
  Indexing --> Graph
  Graph --> Facts["Связи сущностей + факты"]
  RRF --> Context["Context selection"]
  Facts --> Context
  Context --> LLM["OpenAI-compatible LLM"]
  Router --> Agent["ИИ-агент исследователь"]
  Agent --> Plan["План ответа"]
  Agent --> Queries["Самостоятельные запросы"]
  Agent --> BM25
  Agent --> Vector
  Agent --> Graph
  Plan --> Report["Аргументированный ответ"]
  Queries --> Report
  LLM --> Answer["Answer with sources"]
  Report --> Answer
`;

export function SystemSummary() {
  const exportPng = async () => {
    const svg = document.querySelector('.mermaid-shell svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width * 2;
      canvas.height = image.height * 2;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.fillStyle = '#071018';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = 'sci-steel-assistant-architecture.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      URL.revokeObjectURL(url);
    };
    image.src = url;
  };

  return (
    <section id="summary" className="section-shell pb-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="section-heading mb-0">
          <p>System architecture summary</p>
          <h2>Полная схема для финального слайда</h2>
        </div>
        <button
          type="button"
          onClick={exportPng}
          className="inline-flex w-fit items-center gap-2 rounded-md border border-cyanx/40 bg-cyanx/10 px-4 py-2 text-sm font-semibold text-cyanx transition hover:bg-cyanx hover:text-ink"
        >
          <Download size={16} />
          Export diagram PNG
        </button>
      </div>
      <div className="mt-8 overflow-hidden rounded-md border border-white/10 bg-panel p-4">
        <MermaidDiagram chart={summaryChart} />
      </div>
    </section>
  );
}
