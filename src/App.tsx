import { useEffect, useMemo, useRef, useState } from 'react';
import rawArchitecture from './data/architecture.json';
import rawSections from './data/sections.json';
import type { ArchitectureData, RetrievalMode, StorySection } from './types';
import { ArchitectureCanvas } from './components/ArchitectureCanvas';
import { DecisionLog } from './components/DecisionLog';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InspectorPanel } from './components/InspectorPanel';
import { ModeSwitcher } from './components/ModeSwitcher';
import { PipelineStepper } from './components/PipelineStepper';
import { ProblemSection } from './components/ProblemSection';
import { RerankComparison } from './components/RerankComparison';
import { RetrievalDeepDive } from './components/RetrievalDeepDive';
import { SystemSummary } from './components/SystemSummary';
import { VectorViz } from './components/VectorViz';

const architecture = rawArchitecture as ArchitectureData;
const storySections = rawSections as StorySection[];

function useHeaderSection() {
  const [activeId, setActiveId] = useState('top');

  useEffect(() => {
    const ids = ['problem', 'architecture', 'retrieval', 'lifecycle', 'summary'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.4, 0.8] },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return activeId;
}

export default function App() {
  const [mode, setMode] = useState<RetrievalMode>('hybrid');
  const [activeStoryId, setActiveStoryId] = useState(storySections[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('fusion');
  const storyRefs = useRef<Record<string, HTMLElement | null>>({});
  const headerSection = useHeaderSection();

  const activeStory = useMemo(
    () => storySections.find((section) => section.id === activeStoryId) ?? storySections[0],
    [activeStoryId],
  );

  const selectedNode = useMemo(
    () => architecture.nodes.find((node) => node.id === selectedNodeId) ?? null,
    [selectedNodeId],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute('data-story-id');
        const next = storySections.find((section) => section.id === id);
        if (next) {
          setActiveStoryId(next.id);
          setMode(next.mode);
          if (next.activeNodes[0]) setSelectedNodeId(next.activeNodes[0]);
        }
      },
      { rootMargin: '-28% 0px -38% 0px', threshold: [0.2, 0.5, 0.75] },
    );
    Object.values(storyRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <Header activeId={headerSection} />
      <main>
        <Hero data={architecture} />
        <ProblemSection />

        <section id="architecture" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-heading">
            <p>Interactive architecture explorer</p>
            <h2>Scroll меняет состояние схемы, click открывает детали узла</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <ModeSwitcher value={mode} onChange={setMode} />
                <p className="font-mono text-xs text-slate-500">active: {activeStory.id}</p>
              </div>
              <ArchitectureCanvas
                data={architecture}
                mode={mode}
                activeNodes={activeStory.activeNodes}
                selectedNodeId={selectedNodeId}
                onSelectNode={setSelectedNodeId}
              />
            </div>
            <div className="grid gap-5">
              <InspectorPanel node={selectedNode} />
              {storySections.map((section) => (
                <article
                  key={section.id}
                  data-story-id={section.id}
                  ref={(element) => {
                    storyRefs.current[section.id] = element;
                  }}
                  className={`min-h-[250px] rounded-md border p-6 transition ${
                    section.id === activeStory.id
                      ? 'border-cyanx/35 bg-cyanx/[0.07]'
                      : 'border-white/10 bg-white/[0.035]'
                  }`}
                >
                  <p className="font-mono text-xs uppercase text-cyanx">{section.eyebrow}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{section.title}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <RetrievalDeepDive />
        <PipelineStepper />
        <VectorViz />
        <RerankComparison />
        <DecisionLog />
        <SystemSummary />
      </main>
      <Footer />
    </div>
  );
}
