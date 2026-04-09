import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { ResumePanel } from './components/ResumePanel';
import { cardPool, CardData } from './data/cards';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [stage, setStage] = useState<'landing' | 'portfolio'>('landing');
  const [selectedProject, setSelectedProject] = useState<CardData | null>(null);
  const [sysLogText, setSysLogText] = useState('>>> 建立神经链接网络');

  const logMessages = [
    ">>> 建立神经链接网络",
    ">>> 加载核心全息模块 [OK]",
    ">>> 同步三维陀螺仪数据",
    ">>> 解密稀有度档案 [OK]",
    ">>> 神经链接稳定，系统就绪"
  ];

  useEffect(() => {
    if (stage !== 'landing') return;

    let currentLogIndex = 0;
    const chars = '!<>-_\\/[]{}—=+*^?#_';
    
    const scrambleText = (newText: string) => {
      let iteration = 0;
      const maxLength = newText.length;
      
      const interval = setInterval(() => {
        setSysLogText(prev => {
          return newText.split('').map((char, index) => {
            if (index < iteration) return newText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
        });
        
        if (iteration >= maxLength) clearInterval(interval);
        iteration += 1/3;
      }, 30);
    };

    const logInterval = setInterval(() => {
      currentLogIndex = (currentLogIndex + 1) % logMessages.length;
      scrambleText(logMessages[currentLogIndex]);
    }, 3000);

    return () => clearInterval(logInterval);
  }, [stage]);

  // We choose 3 specific projects for the Dossier Area
  const featuredProjects = cardPool.filter(c => ['ur-1', 'ur-2', 'sr-1'].includes(c.id));

  const handleEnter = () => {
    setStage('portfolio');
  };

  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col relative overflow-hidden font-body selection:bg-accent-cyan/30">
      
      {/* Synthwave Grid Background */}
      <div className="bg-grid"></div>

      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="text-center max-w-2xl px-6">
              <h1 className="text-5xl md:text-7xl mb-4 font-pixel font-black tracking-[8px] uppercase text-transparent bg-clip-text bg-gradient-to-br from-accent-yellow to-accent-indigo filter drop-shadow-[2px_2px_0_rgba(255,204,0,0.6)] drop-shadow-[-2px_-2px_0_rgba(255,0,255,0.6)]">
                NEO DECK 档案
              </h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-accent-indigo shadow-[0_0_30px_rgba(255,0,255,0.4)] mb-8 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#2a0845_0%,#6441A5_100%)] flex items-center justify-center text-4xl">
                    <span>🚀</span>
                  </div>
                  {/* Photo goes here. Use a placeholder for now */}
                  <img 
                    src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix&backgroundColor=0f172a" 
                    alt="My Avatar" 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500"
                  />
                  {/* Glitch Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] mix-blend-overlay z-10" />
                </div>

                <p className="text-xl md:text-2xl font-heading text-accent-yellow tracking-[4px] mb-12 flex justify-center w-full min-h-[2rem]" style={{ textShadow: '0 0 8px rgba(255, 204, 0, 0.8)' }}>
                  <span>{sysLogText}</span><span className="animate-pulse">_</span>
                </p>
                <button 
                  onClick={handleEnter}
                  className="px-12 py-4 bg-accent-yellow text-black border-2 border-accent-indigo font-heading text-2xl tracking-[2px] uppercase transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:bg-white hover:text-accent-indigo shadow-[5px_5px_0_var(--ur-color-1),_0_0_20px_rgba(255,204,0,0.4)]"
                >开启档案</button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === 'portfolio' && (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row relative z-40 p-6 md:p-12 gap-12 md:gap-16 items-center pointer-events-auto h-screen"
          >
            {/* Left: Resume Area */}
            <section className="flex-1 w-full flex items-center justify-center md:justify-start">
              <ResumePanel />
            </section>

            {/* Right: Project Area (3 Cards) */}
            <section className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-lg">
              {featuredProjects.map((project, idx) => (
                <div 
                  key={project.id} 
                  className={`relative w-full ${idx === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
                >
                  <Card 
                    card={project} 
                    isFlipped={true} 
                    unlocked={true} 
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg/90 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl w-full" onClick={e => e.stopPropagation()}>
              
              {/* Card display on the left of modal */}
              <div className="flex-shrink-0 w-full max-w-sm md:w-[400px]">
                <Card card={selectedProject} isFlipped={true} unlocked={true} />
              </div>
              
              {/* Project info panel on the right of modal */}
              <div className="flex-1 w-full bg-surface/80 p-8 rounded-2xl border border-border shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-indigo/20 rounded-full blur-3xl"></div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 font-orbitron font-bold text-lg bg-bg text-accent-cyan border border-accent-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]`}>
                    {selectedProject.rarity}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-heading mb-6 text-white tracking-[4px] uppercase [text-shadow:0_0_10px_var(--ur-color-1),_2px_2px_0_rgba(0,255,255,0.5)]">
                  {selectedProject.name}
                </h3>
                <p className="text-lg text-text-muted font-body mb-8 leading-relaxed border-l-2 border-accent-indigo pl-4 bg-accent-indigo/5 py-2">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-accent-indigo/10 border border-accent-indigo font-heading text-sm text-white tracking-widest uppercase shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 relative z-10">
                  <button className="flex-1 py-4 bg-accent-yellow text-bg border-2 border-accent-indigo font-heading text-xl tracking-[2px] uppercase transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:bg-white hover:text-accent-indigo shadow-[5px_5px_0_var(--ur-color-1),_0_0_20px_rgba(255,204,0,0.4)]">
                    查看详情
                  </button>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-8 py-4 border-2 border-border text-text-muted font-heading text-xl tracking-[2px] uppercase hover:text-white hover:border-white transition-colors"
                  >
                    返回
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;