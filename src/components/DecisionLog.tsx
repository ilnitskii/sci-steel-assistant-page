import { decisions } from '../data/content';

export function DecisionLog() {
  return (
    <section className="section-shell">
      <div className="section-heading">
        <p>Architecture decision log</p>
        <h2>Решения, которые стоит защищать на демо</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {decisions.map((decision) => (
          <article key={decision.title} className="rounded-md border border-white/10 bg-white/[0.035] p-6">
            <h3 className="text-lg font-semibold text-white">{decision.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{decision.text}</p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="font-mono text-xs uppercase text-amberx">Tradeoff</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{decision.tradeoff}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
