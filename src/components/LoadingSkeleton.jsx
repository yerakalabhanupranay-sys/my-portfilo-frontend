import React from 'react';
import { motion as Motion } from 'framer-motion';

/**
 * Skeleton loading component for better perceived performance
 */
const LoadingSkeleton = ({ type = 'card', count = 1, className = '' }) => {
    const skeletons = {
        card: (
            <div className={`glass p-8 md:p-12 rounded-[2.5rem] ${className}`}>
                <div className="animate-pulse space-y-6">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                    <div className="space-y-3">
                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-3/4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6"></div>
                    </div>
                </div>
            </div>
        ),
        project: (
            <div className={`glass rounded-[3rem] overflow-hidden ${className}`}>
                <div className="animate-pulse">
                    <div className="aspect-video bg-slate-200 dark:bg-slate-700"></div>
                    <div className="p-10 space-y-4">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-xl w-3/4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-4/5"></div>
                        <div className="flex gap-2 pt-4">
                            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        text: (
            <div className={`animate-pulse space-y-3 ${className}`}>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-4/5"></div>
            </div>
        ),
        stat: (
            <div className={`glass p-6 rounded-2xl ${className}`}>
                <div className="animate-pulse space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-3/4"></div>
                </div>
            </div>
        ),
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                >
                    {skeletons[type] || skeletons.card}
                </Motion.div>
            ))}
        </>
    );
};

export default LoadingSkeleton;
