import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { retrievalTabs } from '../data/content';

export function RetrievalDeepDive() {
  const [active, setActive] = useState(retrievalTabs[2]);

  return (
    <section id="retrieval" className="section-shell">
      <div className="section-heading">
        <p>Retrieval deep dive</p>
        <h2>Три режима поиска в одном интерфейсе</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {retrievalTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab)}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              active.id === tab.id
                ? 'border-cyanx bg-cyanx text-ink'
                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="mt-6 grid gap-6 rounded-md border border-white/10 bg-panel p-6 lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
          transition={{ duration: 0.24 }}
        >
          <div>
            <p className="font-mono text-xs uppercase text-cyanx">{active.label}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{active.title}</h3>
            <p className="mt-4 leading-7 text-slate-300">{active.text}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {active.flow.map((item, index) => (
              <motion.div
                key={item}
                className="relative min-h-28 rounded-md border border-white/10 bg-white/[0.04] p-4"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                <p className="mt-4 text-sm font-semibold text-white">{item}</p>
                {index < active.flow.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyanx/60 sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
