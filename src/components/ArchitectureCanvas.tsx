import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { ArchitectureData, ArchitectureNode, RetrievalMode } from '../types';

type ArchitectureCanvasProps = {
  data: ArchitectureData;
  mode: RetrievalMode;
  activeNodes: string[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
};

const nodeTone: Record<string, string> = {
  interface: 'border-cyanx/45 bg-cyanx/12 text-cyanx',
  orchestration: 'border-violetx/45 bg-violetx/12 text-violetx',
  retriever: 'border-mintx/45 bg-mintx/12 text-mintx',
  fusion: 'border-amberx/45 bg-amberx/12 text-amberx',
  ranking: 'border-amberx/45 bg-amberx/12 text-amberx',
  generation: 'border-rosex/45 bg-rosex/12 text-rosex',
  storage: 'border-slate-300/25 bg-slate-300/10 text-slate-300',
  visualization: 'border-cyanx/45 bg-cyanx/12 text-cyanx',
};

export function ArchitectureCanvas({
  data,
  mode,
  activeNodes,
  selectedNodeId,
  onSelectNode,
}: ArchitectureCanvasProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodeById = useMemo(() => new Map(data.nodes.map((node) => [node.id, node])), [data.nodes]);

  const relatedNodes = useMemo(() => {
    if (!hoveredNode) return new Set(activeNodes);
    const related = new Set([hoveredNode]);
    data.edges.forEach((edge) => {
      if (edge.from === hoveredNode) related.add(edge.to);
      if (edge.to === hoveredNode) related.add(edge.from);
    });
    return related;
  }, [activeNodes, data.edges, hoveredNode]);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-md border border-white/10 bg-panel/80 p-4 shadow-2xl shadow-black/30">
      <div className="absolute inset-0 graph-grid opacity-45" />
      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
        {data.layers.map((layer) => (
          <span key={layer.id} className="flex items-center gap-2 rounded bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: layer.color }} />
            {layer.label}
          </span>
        ))}
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L6,3.5 z" fill="rgba(148, 163, 184, 0.85)" />
          </marker>
        </defs>
        {data.edges.map((edge) => {
          const from = nodeById.get(edge.from);
          const to = nodeById.get(edge.to);
          if (!from || !to) return null;
          const edgeActive =
            edge.modes.includes(mode) &&
            relatedNodes.has(edge.from) &&
            relatedNodes.has(edge.to);
          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              markerEnd="url(#arrow)"
              stroke={edgeActive ? 'rgba(56, 213, 255, 0.95)' : 'rgba(100, 116, 139, 0.22)'}
              strokeWidth={edgeActive ? 0.45 : 0.25}
              strokeDasharray={edgeActive ? '2 2' : '0'}
              initial={false}
              animate={{ opacity: edgeActive ? 1 : 0.35 }}
              transition={{ duration: 0.25 }}
            />
          );
        })}
      </svg>

      {data.nodes.map((node: ArchitectureNode) => {
        const isActive = relatedNodes.has(node.id);
        const isSelected = selectedNodeId === node.id;
        return (
          <motion.button
            key={node.id}
            type="button"
            onClick={() => onSelectNode(node.id)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className={`absolute z-10 w-[138px] rounded-md border px-3 py-3 text-left backdrop-blur-xl transition ${
              nodeTone[node.type] ?? 'border-white/20 bg-white/10 text-white'
            } ${isSelected ? 'ring-2 ring-cyanx/70' : ''}`}
            style={{
              left: `calc(${node.x}% - 69px)`,
              top: `calc(${node.y}% - 34px)`,
            }}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0.42,
              scale: isSelected || hoveredNode === node.id ? 1.04 : 1,
              boxShadow: isActive ? '0 0 30px rgba(56, 213, 255, 0.16)' : '0 0 0 rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.22 }}
          >
            <span className="block font-mono text-[10px] uppercase text-current/70">{node.layer}</span>
            <span className="mt-1 block text-sm font-semibold text-white">{node.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
