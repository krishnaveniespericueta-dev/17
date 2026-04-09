import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypewriterText = () => {
  const text1 = ">_ Hello, World";
  const text2 = "欢迎来到我的数字空间。\n这里记录了我的过往项目与技能。\n很高兴遇见你。";
  
  const [displayed1, setDisplayed1] = useState('');
  const [displayed2, setDisplayed2] = useState('');
  const [stage, setStage] = useState(0); // 0: text1, 1: text2, 2: done

  useEffect(() => {
    if (stage === 0) {
      if (displayed1.length < text1.length) {
        const timer = setTimeout(() => {
          setDisplayed1(text1.slice(0, displayed1.length + 1));
        }, 50); // fast typing
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setStage(1), 500); // pause before next line
        return () => clearTimeout(timer);
      }
    } else if (stage === 1) {
      if (displayed2.length < text2.length) {
        const timer = setTimeout(() => {
          setDisplayed2(text2.slice(0, displayed2.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setStage(2);
      }
    }
  }, [displayed1, displayed2, stage]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="z-10 w-full max-w-2xl px-6 text-center md:text-left mb-8 pointer-events-none"
    >
      <div className="flex flex-col gap-4 items-center md:items-start bg-surface p-8 border border-border rounded-2xl backdrop-blur-md shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8),_inset_0_0_0_2px_rgba(0,255,255,0.2)]">
        <h2 className="text-xl md:text-2xl font-heading font-normal text-text-main tracking-[4px] uppercase [text-shadow:0_0_10px_var(--ur-color-3),_2px_2px_0_rgba(255,0,255,0.5)]">
          {displayed1}
          {stage === 0 && <span className="animate-pulse inline-block w-3 h-5 bg-accent-cyan ml-1 align-middle"></span>}
        </h2>
        <div className="h-24 mt-2">
          <p className="text-base md:text-lg text-text-muted leading-relaxed whitespace-pre-line text-left font-body tracking-[2px]">
            {displayed2}
            {stage === 1 && <span className="animate-pulse inline-block w-3 h-4 bg-accent-yellow ml-1 align-middle"></span>}
            {stage === 2 && <span className="animate-pulse inline-block w-3 h-4 bg-accent-indigo ml-1 align-middle opacity-50"></span>}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
