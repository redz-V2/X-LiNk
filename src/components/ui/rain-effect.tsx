import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Raindrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  opacity: number;
}

export const RainEffect = () => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const drops: Raindrop[] = [];
    for (let i = 0; i < 25; i++) {
      drops.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setRaindrops(drops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-0.5 bg-gradient-to-b from-blue-400 via-blue-300 to-transparent"
          style={{
            left: `${drop.x}%`,
            height: "120px",
            opacity: drop.opacity,
            filter: "blur(0.5px)",
          }}
          initial={{ y: -120 }}
          animate={{ y: "calc(100vh + 120px)" }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
