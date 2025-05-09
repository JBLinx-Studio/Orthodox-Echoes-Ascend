
// Animation utility constants for consistent animations across components
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0] // Improved cubic bezier for smoother motion
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly faster staggering
      delayChildren: 0.1 // Add slight delay before starting
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
      stiffness: 260, // Spring physics for more natural motion
      damping: 20,
      duration: 0.4,
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
    repeatType: "mirror" // Use mirror for smoother infinite loops
  }
};

// Enhanced animations for Orthodox-themed elements

// Cathedral arch reveal animation - optimized
export const archReveal = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.7, // Slightly faster
      ease: [0.34, 1.25, 0.64, 1] // Adjusted spring-like effect
    }
  }
};

// Icon glow effect - optimized with hardware acceleration
export const iconGlow = {
  hidden: { opacity: 0.7, filter: "blur(3px) brightness(0.8)" },
  visible: {
    opacity: 1,
    filter: "blur(0px) brightness(1.1)",
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "mirror", // Use mirror instead of reverse for smoother loops
      ease: "easeInOut",
      times: [0, 0.5, 1] // More precise timing control
    }
  }
};

// Candle flicker effect - optimized
export const candleFlicker = {
  initial: { opacity: 0.8, scale: 0.98 },
  animate: {
    opacity: [0.8, 1, 0.9, 1, 0.8],
    scale: [0.98, 1, 0.99, 1.01, 0.98],
    transition: {
      duration: 3.5, // Slightly faster
      repeat: Infinity,
      type: "tween", // Use tween for more efficient animation
      ease: "easeInOut",
      // Use transform instead of filter for better performance
      transformTemplate: (props: any) => `scale(${props.scale})` 
    }
  }
};

// Smooth transitions for sections - optimized
export const smoothSection = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] // Custom easing that's GPU-friendly
    }
  }
};

// Page transitions - optimized
export const pageEnter = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5, // Slightly faster
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 } 
  }
};

// New optimized animations for deployment
export const deploymentFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

export const deploymentScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const deploymentSlide = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// GPU-optimized animations that avoid layout thrashing
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
