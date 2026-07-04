import { motion } from 'framer-motion';
import { useState } from 'react';
import { rerankAfter, rerankBefore } from '../data/content';

export function RerankComparison() {
  const [after, setAfter] = useState(true);
  const data = after ? rerankAfter : rerankBefore;

  return (
    <section className="section-shell">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="section-heading mb-0">
          <p>Reranking</p>
          <h2>Retrieval находит кандидатов, ranking выбирает контекст</h2>
        </div>
        <div className="inline-flex w-fit rounded-md border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setAfter(false)}
            className={`rounded px-4 py-2 text-xs font-semibold ${!after ? 'bg-white text-ink' : 'text-slate-300'}`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setAfter(true)}
            className={`rounded px-4 py-2 text-xs font-semibold ${after ? 'bg-cyanx text-ink' : 'text-slate-300'}`}
          >
            After
          </button>
        </div>
      </div>
      <div className="mt-8 rounded-md border border-white/10 bg-panel p-6">
        <div className="grid gap-4">
          {data.map((item, index) => (
            <div key={item.title} className="grid gap-2 sm:grid-cols-[240px_1fr_58px] sm:items-center">
              <span className="text-sm text-white">{item.title}</span>
              <div className="h-3 overflow-hidden rounded bg-white/10">
                <motion.div
                  className="h-full rounded bg-cyanx"
                  initial={false}
                  animate={{ width: `${item.score * 100}%` }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                />
              </div>
              <span className="font-mono text-xs text-slate-400">{item.score.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
