import { motion } from 'framer-motion';
import { ArrowDown, Network, ShieldCheck, Sparkles } from 'lucide-react';
import type { ArchitectureData } from '../types';

type HeroProps = {
  data: ArchitectureData;
};

export function Hero({ data }: HeroProps) {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden pt-16">
      <img
        src="./media/metallurgy-hero.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,24,0.94)_0%,rgba(7,16,24,0.74)_42%,rgba(7,16,24,0.24)_100%),linear-gradient(180deg,rgba(7,16,24,0.12),#071018_88%)]" />
      <div className="relative mx-auto flex min-h-[calc(92vh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.p
            className="font-mono text-sm uppercase text-cyanx"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {data.version}
          </motion.p>
          <motion.h1
            className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] text-white sm:text-7xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            {data.systemName}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-xl leading-8 text-slate-300"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            {data.subtitle}: интерактивная демонстрация трехуровневого поиска, построения
            графа знаний и ответов с проверяемыми источниками.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
          >
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-md bg-cyanx px-5 py-3 text-sm font-semibold text-ink shadow-glow transition hover:brightness-110"
            >
              Смотреть архитектуру
              <ArrowDown size={16} />
            </a>
            <div className="flex items-center gap-5 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Network size={16} className="text-mintx" />
                Гибридный RAG
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-amberx" />
                Граф знаний
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles size={16} className="text-rosex" />
                ИИ-агент
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
