import { Github, Layers3 } from 'lucide-react';

type HeaderProps = {
  activeId: string;
};

const links = [
  ['problem', 'Problem'],
  ['architecture', 'Architecture'],
  ['retrieval', 'Retrieval'],
  ['lifecycle', 'Lifecycle'],
  ['summary', 'Summary'],
];

export function Header({ activeId }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/72 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-cyanx/40 bg-cyanx/10 text-cyanx">
            <Layers3 size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">Sci-Steel Assistant</span>
            <span className="block text-xs text-slate-400">RAG + knowledge graph</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-md px-3 py-2 text-xs font-medium transition ${
                activeId === id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="https://github.com/"
          className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-300 transition hover:border-cyanx/40 hover:text-cyanx"
          aria-label="GitHub"
        >
          <Github size={17} />
        </a>
      </div>
    </header>
  );
}
