import { Database, FileCode2 } from 'lucide-react';
import type { ArchitectureNode } from '../types';

type InspectorPanelProps = {
  node: ArchitectureNode | null;
};

export function InspectorPanel({ node }: InspectorPanelProps) {
  if (!node) {
    return (
      <aside className="rounded-md border border-white/10 bg-white/[0.04] p-5">
        <p className="font-mono text-xs uppercase text-slate-500">Inspector</p>
        <h3 className="mt-3 text-lg font-semibold text-white">Выберите узел схемы</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Hover подсвечивает поток данных, click закрепляет описание компонента и ссылку на модуль проекта.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-md border border-cyanx/25 bg-cyanx/[0.07] p-5 shadow-glow">
      <p className="font-mono text-xs uppercase text-cyanx">{node.type}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{node.label}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{node.description}</p>
      <div className="mt-5 grid gap-3 text-sm text-slate-300">
        <div className="flex items-start gap-3">
          <Database className="mt-0.5 text-mintx" size={16} />
          <span>Layer: {node.layer}</span>
        </div>
        <div className="flex items-start gap-3">
          <FileCode2 className="mt-0.5 text-amberx" size={16} />
          <span className="font-mono text-xs leading-5">{node.evidence}</span>
        </div>
      </div>
    </aside>
  );
}
