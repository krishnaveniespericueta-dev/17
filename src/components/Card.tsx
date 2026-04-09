import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../data/cards';
import { cn } from '../lib/utils';

interface CardProps {
  card: CardData;
  index?: number;
  isFlipped?: boolean;
  onClick?: () => void;
  isNew?: boolean;
  className?: string;
  isBinderView?: boolean;
  unlocked?: boolean;
}

export const Card: React.FC<CardProps> = ({
  card,
  index = 0,
  isFlipped = true,
  onClick,
  isNew = false,
  className,
  isBinderView = false,
  unlocked = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle Mouse Move for 3D Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !unlocked) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top; // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -15; // Max 15 deg
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Glare
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleMouseEnter = () => {
    if (unlocked) setIsHovered(true);
  };

  // Device Orientation for Mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isHovered && unlocked && e.beta && e.gamma) {
        // e.beta (front-back tilt): -180 to 180
        // e.gamma (left-right tilt): -90 to 90
        const rX = Math.min(Math.max((e.beta - 45) / 3, -15), 15);
        const rY = Math.min(Math.max(e.gamma / 3, -15), 15);
        setRotateX(rX);
        setRotateY(rY);
        setGlarePosition({
          x: 50 + rY * 3,
          y: 50 + rX * 3,
        });
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isHovered, unlocked]);

  const rarityColors = {
    N: 'border-border text-text-muted shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8),_inset_0_0_0_2px_rgba(255,255,255,0.1)]',
    R: 'border-border text-rarity-r shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8),_inset_0_0_0_2px_rgba(0,255,255,0.2)]',
    SR: 'border-border text-rarity-sr shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8),_inset_0_0_0_2px_rgba(255,0,255,0.2)]',
    UR: 'border-border text-rarity-ur shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8),_inset_0_0_0_2px_rgba(255,204,0,0.2)]',
  };

  const isHolo = card.rarity === 'SR' || card.rarity === 'UR';

  return (
    <motion.div
      initial={isBinderView ? {} : { y: 100, opacity: 0, rotateZ: (Math.random() - 0.5) * 20 }}
      animate={isBinderView ? {} : { y: 0, opacity: 1, rotateZ: isFlipped ? 0 : (index - 2) * 5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: isBinderView ? 0 : index * 0.1 }}
      className={cn("perspective-1000 relative", className)}
      style={{
        width: isBinderView ? '100%' : '288px',
        height: isBinderView ? '100%' : '384px',
        aspectRatio: isBinderView ? '3/4' : 'auto',
      }}
    >
      <motion.div
        ref={cardRef}
        className="w-full h-full relative preserve-3d cursor-pointer card-container"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
      >
        {/* FRONT */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden flex flex-col p-5 overflow-hidden rounded-[20px] transition-colors bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-md border",
            unlocked ? rarityColors[card.rarity] : 'border-border text-text-muted shadow-none bg-bg',
            unlocked ? '' : 'border-dashed'
          )}
          style={{ transform: 'rotateY(0deg) translateZ(1px)' }}
        >
          {unlocked ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-auto font-orbitron font-black text-2xl z-20" style={{ transform: 'translateZ(30px)' }}>
                <span className={`text-shadow-[0_0_10px_var(--ur-color-1)] ${card.rarity === 'UR' ? 'text-accent-yellow' : card.rarity === 'SR' ? 'text-accent-indigo' : card.rarity === 'R' ? 'text-accent-cyan' : 'text-text-muted'}`}>
                  {card.rarity}
                </span>
                <span className="font-heading text-base bg-accent-indigo/10 border border-accent-indigo px-3 py-1 text-white shadow-[0_0_10px_rgba(255,0,255,0.5)] tracking-[2px] uppercase">
                  {card.tags[0] || '项目'}
                </span>
              </div>

              {/* Content */}
              <div className="z-20 text-center flex flex-col items-center" style={{ transform: 'translateZ(40px)' }}>
                <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center mb-5 border-2 shadow-[0_0_30px_rgba(255,0,255,0.4)] text-6xl"
                     style={{ 
                       background: 'linear-gradient(135deg, #2a0845 0%, #6441A5 100%)',
                       borderColor: card.rarity === 'UR' ? 'var(--ur-color-1)' : card.rarity === 'SR' ? 'var(--ur-color-1)' : card.rarity === 'R' ? 'var(--ur-color-3)' : '#888'
                     }}>
                  <span>{card.icon}</span>
                </div>
                <h3 className="font-heading text-4xl text-white tracking-[4px] mb-3 [text-shadow:0_0_10px_var(--ur-color-1),_2px_2px_0_rgba(0,255,255,0.5)]">{card.name}</h3>
                <p className="font-body text-[0.9rem] text-text-muted mb-4 line-clamp-3 text-left border-l-2 border-accent-indigo pl-[10px] bg-accent-indigo/5 leading-relaxed">{card.description}</p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4 z-20" style={{ transform: 'translateZ(20px)' }}>
                <div className="text-center">
                  <div className="font-orbitron font-bold text-accent-yellow text-xl">99</div>
                  <div className="font-heading text-text-muted uppercase tracking-[2px] text-sm">代码</div>
                </div>
                <div className="text-center">
                  <div className="font-orbitron font-bold text-accent-yellow text-xl">85</div>
                  <div className="font-heading text-text-muted uppercase tracking-[2px] text-sm">设计</div>
                </div>
                <div className="text-center">
                  <div className="font-orbitron font-bold text-accent-yellow text-xl">MAX</div>
                  <div className="font-heading text-text-muted uppercase tracking-[2px] text-sm">热情</div>
                </div>
              </div>

              {/* Holographic Overlay for SR/UR */}
              {isHolo && (
                <div 
                  className={cn("absolute -inset-[50%] pointer-events-none transition-transform duration-100 mix-blend-color-dodge z-10", 
                    card.rarity === 'UR' ? 'bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.4)_25%,rgba(255,0,255,0.2)_28%,transparent_33%)]' : 'bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.4)_25%,rgba(0,255,255,0.2)_28%,transparent_33%)]'
                  )}
                  style={{
                    transform: `translate(${glarePosition.x - 50}%, ${glarePosition.y - 50}%)`,
                  } as React.CSSProperties}
                />
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
              <span className="text-6xl mb-4 opacity-50">?</span>
              <span className="font-mono text-sm tracking-widest uppercase border border-border rounded-full px-4 py-1">已锁定</span>
            </div>
          )}
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 backface-hidden bg-surface border border-border rounded-2xl flex items-center justify-center shadow-xl"
          style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
        >
          <div className="w-16 h-16 border border-accent-indigo/30 flex items-center justify-center rounded-full animate-pulse">
            <div className="w-6 h-6 bg-accent-indigo/50 rounded-full" />
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMTExIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10 mix-blend-overlay rounded-2xl"></div>
        </div>
      </motion.div>
      
      {/* New Card Badge */}
      {isNew && isFlipped && unlocked && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute -top-3 -right-3 bg-accent-indigo text-white font-mono font-bold px-3 py-1 text-[10px] shadow-[0_0_10px_rgba(99,102,241,0.5)] z-30 rounded-full animate-pulse"
        >
          新数据!
        </motion.div>
      )}
    </motion.div>
  );
}