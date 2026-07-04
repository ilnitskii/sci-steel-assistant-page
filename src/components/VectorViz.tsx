import { motion } from 'framer-motion';
import { vectorPoints } from '../data/content';

const clusterColor: Record<string, string> = {
  articles: '#51e1b8',
  patents: '#f5b85a',
  reports: '#8d7cff',
};

export function VectorViz() {
  return (
    <section className="section-shell">
      <div className="section-heading">
        <p>Vector store visualization</p>
        <h2>Семантические кластеры документов</h2>
      </div>
      <div className="relative min-h-[430px] overflow-hidden rounded-md border border-white/10 bg-panel p-5">
        <div className="absolute inset-0 graph-grid opacity-40" />
        <motion.div
          className="absolute h-5 w-5 rounded-full border-2 border-cyanx bg-cyanx/20 shadow-glow"
          animate={{ left: ['18%', '39%', '62%'], top: ['72%', '46%', '36%'] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        {vectorPoints.map((point, index) => (
          <motion.div
            key={point.label}
            className="absolute rounded-md border bg-ink/80 px-3 py-2 text-xs text-white backdrop-blur"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              borderColor: clusterColor[point.cluster],
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: clusterColor[point.cluster] }} />
            {point.label}
          </motion.div>
        ))}
        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3 rounded bg-ink/75 p-3 text-xs text-slate-300 backdrop-blur">
          <span>query vector moves through embedding space</span>
          <span className="text-mintx">articles</span>
          <span className="text-amberx">patents</span>
          <span className="text-violetx">reports</span>
        </div>
      </div>
    </section>
  );
}
