import React from 'react';

export const RiskBadge = ({ level, className = '' }) => {
  const getStyles = () => {
    switch (level?.toLowerCase()) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-300 dot-rose-600';
      case 'high':
        return 'bg-[#fff0f0] text-[#c92a2a] border-[#ffc9c9] dot-[#c92a2a]';
      case 'moderate':
        return 'bg-amber-50 text-amber-800 border-amber-200 dot-amber-600';
      case 'low':
      case 'clear':
      default:
        return 'bg-emerald-50 text-[#006859] border-emerald-200 dot-[#006859]';
    }
  };

  const getDotColor = () => {
    switch (level?.toLowerCase()) {
      case 'critical':
        return 'bg-rose-600';
      case 'high':
        return 'bg-[#c92a2a]';
      case 'moderate':
        return 'bg-amber-600';
      case 'low':
      case 'clear':
      default:
        return 'bg-[#006859]';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${getStyles()} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${getDotColor()}`} />
      <span>{level}</span>
    </span>
  );
};
