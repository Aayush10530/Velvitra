import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { buttonHover } from "@/lib/animations";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
}

export const AnimatedButton = ({
  variant = "default",
  size = "default",
  children,
  className,
  ...props
}: AnimatedButtonProps) => {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipple({ x, y });

      // Clear ripple after animation
      setTimeout(() => setRipple(null), 600);
    }
  };

  return (
    <motion.div
      variants={buttonHover}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className="relative inline-block"
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripple && (
          <motion.span
            className="absolute block rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "20px",
              height: "20px",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </Button>
    </motion.div>
  );
}; 