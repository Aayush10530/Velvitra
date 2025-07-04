import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useState, useEffect } from "react";

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

export const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 flex items-center justify-center bg-background z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <LoadingSpinner size={60} />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className="min-h-screen"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 