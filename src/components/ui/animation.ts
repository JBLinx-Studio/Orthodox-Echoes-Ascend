
// Animation utility constants for consistent animations across components
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.5,
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const floating = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
    repeatType: "mirror" as const
  }
};

// Enhanced animations for Orthodox-themed elements
export const archReveal = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.25, 0.64, 1]
    }
  }
};

export const iconGlow = {
  hidden: { opacity: 0.7, filter: "blur(2px) brightness(0.8)" },
  visible: {
    opacity: 1,
    filter: "blur(0px) brightness(1.2)",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut"
    }
  }
};

export const candleFlicker = {
  initial: { opacity: 0.8, scale: 0.98 },
  animate: {
    opacity: [0.8, 1, 0.9, 1, 0.8],
    scale: [0.98, 1, 0.99, 1.01, 0.98],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const smoothSection = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const pageEnter = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4 } 
  }
};

// Performance-optimized animations
export const performantFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
};

export const performantScale = {
  hidden: { opacity: 0, transform: "scale(0.95)" },
  visible: {
    opacity: 1,
    transform: "scale(1)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};
