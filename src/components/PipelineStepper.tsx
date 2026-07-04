import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { agentResearchSteps, lifecycleSteps } from '../data/content';

export function PipelineStepper() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStep((value) => (value + 1) % lifecycleSteps.length), 1200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="lifecycle" className="section-shell">
      <div className="section-heading">
        <p>Query lifecycle</p>
        <h2>От вопроса до ответа с источниками</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-md border border-white/10 bg-panel p-6">
          <div className="grid gap-3">
            {lifecycleSteps.map((item, index) => {
              const active = index <= step;
              return (
                <div key={item} className="grid grid-cols-[34px_1fr] items-center gap-3">
                  <motion.span
                    className={`grid h-8 w-8 place-items-center rounded-md border font-mono text-xs ${
                      active ? 'border-cyanx bg-cyanx text-ink' : 'border-white/10 bg-white/[0.04] text-slate-500'
                    }`}
                    animate={{ scale: index === step ? 1.08 : 1 }}
                  >
                    {index + 1}
                  </motion.span>
                  <div className="h-10 rounded bg-white/[0.03] px-4 py-2">
                    <span className={active ? 'text-white' : 'text-slate-500'}>{item}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
          <p className="font-mono text-xs uppercase text-mintx">Research agent route</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Автономное исследование вопроса</h3>
          <div className="mt-5 grid gap-2">
            {agentResearchSteps.map((item, index) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-mintx" />
                <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
