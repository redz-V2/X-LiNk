import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 35; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.7 + 0.2,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full shadow-sm"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: "blur(0.3px)",
            background: `radial-gradient(circle, 
              rgba(255, 255, 255, 0.9) 0%, 
              rgba(192, 192, 192, 0.7) 40%, 
              rgba(169, 169, 169, 0.5) 70%, 
              rgba(128, 128, 128, 0.3) 100%)`,
            boxShadow: `0 0 ${flake.size * 2}px rgba(192, 192, 192, 0.3)`,
          }}
          initial={{ y: -20 }}
          animate={{
            y: "calc(100vh + 20px)",
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: flake.duration * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        />
      ))}
    </div>
  );
};
