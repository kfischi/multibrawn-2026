'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.css';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats: Stat[] = [
    { value: 9, suffix: '+', label: 'שנות ניסיון', icon: '🏆' },
    { value: 500, suffix: '+', label: 'לקוחות מרוצים', icon: '😊' },
    { value: 200, suffix: '+', label: 'נכסים במאגר', icon: '🏡' },
    { value: 100, suffix: '%', label: 'שביעות רצון', icon: '⭐' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.floor(current);
          return newValues;
        });
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${styles.statCard} ${isVisible ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={styles.icon}>{stat.icon}</div>
              <div className={styles.value}>
                {animatedValues[index]}
                {stat.suffix}
              </div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
