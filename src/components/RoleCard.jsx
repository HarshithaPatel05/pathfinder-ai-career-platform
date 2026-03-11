import React from 'react';
import * as LucideIcons from 'lucide-react';

const RoleCard = ({ role, iconName, onClick }) => {
    const Icon = LucideIcons[iconName] || LucideIcons.User;

    return (
        <div
            onClick={onClick}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-50 flex flex-col items-center group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-10 text-slate-50 opacity-10 group-hover:scale-125 group-hover:text-blue-600 transition-all pointer-events-none">
                <Icon size={150} />
            </div>

            <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-[1.5rem] flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-700 transition-all duration-500 shadow-inner group-hover:shadow-xl group-hover:shadow-blue-200">
                <Icon size={36} />
            </div>

            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-wide text-center">{role}</h3>
            <p className="text-slate-400 text-xs font-bold mt-3 uppercase tracking-[0.2em] group-hover:text-blue-500 transition-colors">Navigation Portal</p>

            <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-blue-600 font-black text-sm uppercase tracking-widest">Enter Dashboard</span>
                <LucideIcons.ArrowRight size={16} className="text-blue-600" />
            </div>
        </div>
    );
};

export default RoleCard;
