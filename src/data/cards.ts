export interface CardData {
  id: string;
  name: string;
  rarity: 'N' | 'R' | 'SR' | 'UR';
  description: string;
  tags: string[];
  icon: string;
}

export const cardPool: CardData[] = [
  // UR
  { id: 'ur-1', name: 'THE DECK OF ME', rarity: 'UR', description: 'Interactive 3D Portfolio built with React, Framer Motion, and CSS3D.', tags: ['React', '3D', 'Cyberpunk'], icon: '✨' },
  { id: 'ur-2', name: 'CONTACT ME', rarity: 'UR', description: 'Open to new opportunities. Let us build something amazing together.', tags: ['Email', 'GitHub', 'LinkedIn'], icon: '🚀' },
  
  // SR
  { id: 'sr-1', name: 'FRONTEND WIZARD', rarity: 'SR', description: 'Expert in modern frontend architecture and performance optimization.', tags: ['Architecture', 'Performance'], icon: '🧙' },
  { id: 'sr-2', name: 'WEBGL VOYAGER', rarity: 'SR', description: 'Exploring the boundaries of 3D on the web.', tags: ['Three.js', 'WebGL', 'Shaders'], icon: '🌌' },
  { id: 'sr-3', name: 'SYSTEM DESIGN', rarity: 'SR', description: 'Designing scalable and maintainable frontend systems.', tags: ['Design', 'Scalability'], icon: '🏗️' },
  
  // R
  { id: 'r-1', name: 'UI COMPONENT LIB', rarity: 'R', description: 'Built a comprehensive UI component library used across 10+ projects.', tags: ['Storybook', 'Design System'], icon: '📚' },
  { id: 'r-2', name: 'NODE.JS BACKEND', rarity: 'R', description: 'Developed robust REST and GraphQL APIs.', tags: ['Express', 'GraphQL', 'NestJS'], icon: '⚙️' },
  { id: 'r-3', name: 'STATE MANAGER', rarity: 'R', description: 'Deep understanding of React state management ecosystems.', tags: ['Zustand', 'Redux', 'Context'], icon: '🧠' },
  { id: 'r-4', name: 'NEXT.JS SSR', rarity: 'R', description: 'Implemented SSR/SSG for SEO and performance.', tags: ['Next.js', 'SEO', 'React'], icon: '⚡' },
  
  // N
  { id: 'n-1', name: 'HTML5 & CSS3', rarity: 'N', description: 'Solid foundation in semantic markup and modern styling.', tags: ['Flexbox', 'Grid', 'A11y'], icon: '🌐' },
  { id: 'n-2', name: 'TYPESCRIPT', rarity: 'N', description: 'Strongly typed code for better maintainability.', tags: ['Types', 'Interfaces'], icon: '📘' },
  { id: 'n-3', name: 'GIT WORKFLOW', rarity: 'N', description: 'Proficient in version control and collaborative development.', tags: ['Git', 'GitHub Actions'], icon: '🔀' },
  { id: 'n-4', name: 'RESPONSIVE UI', rarity: 'N', description: 'Creating interfaces that work seamlessly across all devices.', tags: ['Mobile First', 'Media Queries'], icon: '📱' },
  { id: 'n-5', name: 'TAILWIND CSS', rarity: 'N', description: 'Rapid UI development with utility-first CSS.', tags: ['Utility', 'Styling'], icon: '🎨' },
  { id: 'n-6', name: 'VITE TOOLING', rarity: 'N', description: 'Modern, lightning-fast frontend build tooling.', tags: ['Vite', 'Build', 'HMR'], icon: '🛠️' },
];