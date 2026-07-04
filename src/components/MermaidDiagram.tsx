import { useEffect, useMemo, useRef, useState } from 'react';

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const id = useMemo(() => `mermaid-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    let cancelled = false;
    import('mermaid')
      .then((module) => {
        const mermaid = module.default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          flowchart: {
            curve: 'basis',
            htmlLabels: true,
          },
          themeVariables: {
            background: '#0e1722',
            primaryColor: '#122235',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#38d5ff',
            lineColor: '#64748b',
            secondaryColor: '#142619',
            tertiaryColor: '#241f3a',
          },
        });
        return mermaid.render(id, chart);
      })
      .then(({ svg }) => {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      })
      .catch((err) => setError(String(err)));
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return <pre className="overflow-auto rounded-md bg-rosex/10 p-4 text-xs text-rosex">{error}</pre>;
  }

  return <div ref={ref} className="mermaid-shell" />;
}
