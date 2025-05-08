
// Animation utility constants for consistent animations across components
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut"
    }
  }
};

export const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const floatingEffect = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pulseEffect = {
  scale: [1, 1.05, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const glowEffect = {
  opacity: [0.5, 0.8, 0.5],
  filter: ["blur(5px)", "blur(10px)", "blur(5px)"],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const shineEffect = {
  x: ["0%", "100%"],
  transition: {
    duration: 1.5,
    ease: "easeInOut"
  }
};

export const candleFlicker = {
  opacity: [0.7, 0.9, 0.7],
  scale: [1, 1.1, 1],
  filter: ["blur(1px)", "blur(2px)", "blur(1px)"],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
    repeatType: "mirror"
  }
};

export const cinematic = {
  transition: {
    duration: 1.2,
    ease: [0.43, 0.13, 0.23, 0.96]
  }
};

// New animations for improved transitions

export const sectionFadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

export const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const dividerExpand = {
  hidden: { width: "0%", opacity: 0 },
  visible: { 
    width: "100%", 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

export const iconPulse = {
  scale: [1, 1.1, 1],
  opacity: [0.7, 1, 0.7],
  filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const gradientShift = {
  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Smoother transition for sections
export const smoothScroll = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};
