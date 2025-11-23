"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger?: boolean;
}

export function ConfettiEffect({ trigger = false }: ConfettiEffectProps) {
  useEffect(() => {
    if (trigger) {
      // Gold and purple confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Gold confetti from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#D4AF37', '#E5C158', '#C5A028', '#FFD700'],
        });

        // Purple confetti from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#8B5CF6', '#A78BFA', '#6366F1'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  return null;
}

export function fireConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#D4AF37', '#E5C158', '#C5A028'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#8B5CF6', '#A78BFA', '#6366F1'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#D4AF37', '#8B5CF6'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FFD700', '#A78BFA'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#D4AF37', '#E5C158'],
  });
}
