import React from 'react';
import { TypewriterText } from './TypewriterText';

export function ResumePanel() {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'TailwindCSS', 
    'Framer Motion', 'WebGL', 'Next.js', 'System Design'
  ];

  return (
    <div className="flex flex-col justify-center h-full max-w-2xl text-left pointer-events-auto">
      <TypewriterText />
      
      <div className="mt-8 bg-surface border border-border p-6 backdrop-blur-md relative shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8),_inset_0_0_0_2px_rgba(255,0,255,0.2)] rounded-2xl">
        <h2 className="text-2xl font-heading font-normal text-text-main tracking-[4px] uppercase mb-4 relative z-10 [text-shadow:0_0_10px_var(--ur-color-1),_2px_2px_0_rgba(0,255,255,0.5)]">
          个人档案 // PROFILE
        </h2>
        <p className="text-text-muted text-sm leading-relaxed font-body mb-6 relative z-10 border-l-2 border-accent-indigo pl-3 bg-accent-indigo/5 p-2">
          资深前端工程师，专注于构建高性能、高交互的现代 Web 应用。
          深谙 React 架构设计，擅长将复杂业务逻辑转化为直观的交互体验。
          这里是我的核心数据阵列，请查阅。
        </p>
        
        <h3 className="text-sm font-mono font-bold text-accent-yellow tracking-widest uppercase mb-3 relative z-10">
          技能矩阵 // TECH_STACK
        </h3>
        <div className="flex flex-wrap gap-2 relative z-10">
          {skills.map((skill) => (
            <span 
              key={skill}
              className="px-3 py-1 bg-accent-indigo/10 border border-accent-indigo text-text-main font-heading text-sm uppercase hover:bg-white hover:text-accent-indigo transition-colors cursor-default shadow-[0_0_10px_rgba(255,0,255,0.5)] tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
