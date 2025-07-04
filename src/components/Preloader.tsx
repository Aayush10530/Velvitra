import { motion } from "framer-motion";
import { preloaderAnimation } from "@/lib/animations";

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      variants={preloaderAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onLoadingComplete}
    >
      <motion.div
        className="relative w-24 h-24"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
      </motion.div>
    </motion.div>
  );
};

export default Preloader; 