import type { RetrievalMode } from '../types';

type ModeSwitcherProps = {
  value: RetrievalMode;
  onChange: (mode: RetrievalMode) => void;
};

const modes: Array<{ id: RetrievalMode; label: string; hint: string }> = [
  { id: 'lexical', label: 'Lexical', hint: 'BM25 / exact terms' },
  { id: 'semantic', label: 'Semantic', hint: 'Embeddings / meaning' },
  { id: 'hybrid', label: 'Hybrid', hint: 'RRF fusion' },
];

export function ModeSwitcher({ value, onChange }: ModeSwitcherProps) {
  return (
    <div className="inline-flex rounded-md border border-white/10 bg-white/5 p-1">
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          title={mode.hint}
          className={`rounded px-3 py-2 text-xs font-semibold transition sm:px-4 ${
            value === mode.id
              ? 'bg-cyanx text-ink shadow-glow'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
