import { motion } from "framer-motion";

interface XLogoProps {
  size?: number;
  className?: string;
}

export const XLogo = ({ size = 32, className = "" }: XLogoProps) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100" height="100" rx="20" fill="rgba(0,0,0,0.8)" />
        <path
          d="M25 25 L75 75 M75 25 L25 75"
          stroke="url(#xGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#glow)"
        />
      </svg>
    </motion.div>
  );
};
