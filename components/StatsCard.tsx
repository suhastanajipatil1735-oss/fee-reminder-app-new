import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
  subValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, colorClass, subValue }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex items-center justify-between transition-transform hover:scale-[1.02] duration-300">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        {subValue && <p className="text-xs text-gray-400 mt-2">{subValue}</p>}
      </div>
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon size={32} className="text-white" />
      </div>
    </div>
  );
};

export default StatsCard;