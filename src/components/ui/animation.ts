
// Animation utility constants for consistent animations across components
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const floating = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Enhanced animations for Orthodox-themed elements

// Cathedral arch reveal animation
export const archReveal = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1] // Spring-like effect
    }
  }
};

// Icon glow effect
export const iconGlow = {
  hidden: { opacity: 0.7, filter: "blur(3px) brightness(0.8)" },
  visible: {
    opacity: 1,
    filter: "blur(0px) brightness(1.1)",
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Candle flicker effect
export const candleFlicker = {
  initial: { opacity: 0.8, scale: 0.98 },
  animate: {
    opacity: [0.8, 1, 0.9, 1, 0.8],
    scale: [0.98, 1, 0.99, 1.01, 0.98],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Smooth transitions for sections
export const smoothSection = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Custom easing
    }
  }
};

// Page transitions
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
    transition: { duration: 0.3 } 
  }
};
