import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 a 100
  colorClass?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  colorClass = 'bg-indigo-600',
  showPercentage = false,
  size = 'md'
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className="w-full flex items-center space-x-2">
      <div className={`w-full bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`${heightClasses[size]} ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 min-w-[2.5rem] text-right">
          {clamped}%
        </span>
      )}
    </div>
  );
};
