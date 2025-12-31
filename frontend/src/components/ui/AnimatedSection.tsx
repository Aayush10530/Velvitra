import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, parallax } from "@/lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "parallax";
  delay?: number;
  threshold?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold,
  });

  const variants = {
    fadeUp,
    parallax,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}; 