import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { problemCards } from '../data/content';

export function ProblemSection() {
  return (
    <section id="problem" className="section-shell">
      <div className="section-heading">
        <p>Problem framing</p>
        <h2>Почему одного retrieval-подхода недостаточно</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {problemCards.map((card, index) => (
          <motion.article
            key={card.title}
            className="rounded-md border border-white/10 bg-white/[0.04] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.07 }}
          >
            <p className="font-mono text-xs uppercase text-amberx">{card.metric}</p>
            <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{card.body}</p>
          </motion.article>
        ))}
      </div>
      <div className="mt-8 grid gap-4 rounded-md border border-white/10 bg-panel p-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="rounded bg-rosex/10 p-5">
          <p className="font-mono text-xs uppercase text-rosex">Naive RAG</p>
          <p className="mt-3 text-sm text-slate-300">Один retrieval-канал, слабая трассировка, непредсказуемые источники.</p>
        </div>
        <div className="grid h-10 w-10 place-items-center justify-self-center rounded-md border border-white/10 text-cyanx">
          <ArrowLeftRight size={18} />
        </div>
        <div className="rounded bg-mintx/10 p-5">
          <p className="font-mono text-xs uppercase text-mintx">Hybrid system</p>
          <p className="mt-3 text-sm text-slate-300">BM25 + vector search + RRF + context selection + graph trace.</p>
        </div>
      </div>
    </section>
  );
}
