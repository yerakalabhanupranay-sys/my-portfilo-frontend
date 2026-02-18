import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Animated counter component with smooth counting animation
 */
const AnimatedCounter = ({ value, duration = 2, suffix = '', prefix = '', className = '' }) => {
    const [count, setCount] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            setCount(value);
            return;
        }

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [value, duration, prefersReducedMotion]);

    return (
        <Motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {prefix}{count}{suffix}
        </Motion.span>
    );
};

export default AnimatedCounter;
