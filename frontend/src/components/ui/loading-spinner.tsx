import { motion } from "framer-motion";
import { spinner } from "@/lib/animations";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner = ({ size = 40, color = "currentColor" }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        variants={spinner}
        animate="animate"
      >
        <div
          className="absolute inset-0 rounded-full border-2 border-t-transparent"
          style={{ borderColor: color }}
        />
        <div
          className="absolute inset-0 rounded-full border-2 border-t-transparent opacity-50"
          style={{ borderColor: color, transform: "rotate(45deg)" }}
        />
      </motion.div>
    </div>
  );
}; 