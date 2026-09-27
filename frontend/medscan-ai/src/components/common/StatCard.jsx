import React from 'react';

export const StatCard = ({ title, value, icon: Icon, isDanger = false }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group">
      {/* Background Watermark Icon matching screenshot */}
      {Icon && (
        <div className={`absolute top-3 right-3 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity ${isDanger ? 'text-red-600' : 'text-slate-800'}`}>
          <Icon className="w-20 h-20" />
        </div>
      )}

      <div>
        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          {title}
        </p>
        <p className={`text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight ${isDanger ? 'text-[#c92a2a]' : 'text-slate-900'}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
};
