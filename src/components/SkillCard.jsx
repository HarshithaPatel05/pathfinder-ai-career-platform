import React from 'react';
import * as LucideIcons from 'lucide-react';

const SkillCard = ({ name, description, platforms, difficulty, category, icon }) => {
    // Determine colors
    const Icon = LucideIcons[icon] || LucideIcons.Target;
    const colors = {
        'Tech Skills': 'blue',
        'Communication Skills': 'purple',
        'Creative Skills': 'pink',
        'Business Skills': 'emerald',
        'Life Skills': 'amber'
    };

    const cName = colors[category] || 'slate';

    return (
        <div className={`group relative bg-white rounded-3xl p-6 border border-${cName}-100 shadow-sm hover:shadow-xl hover:shadow-${cName}-100 transition-all duration-300 flex flex-col h-full overflow-hidden`}>

            <div className={`absolute top-0 right-0 p-8 text-${cName}-50 opacity-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none`}>
                <Icon size={120} />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-${cName}-50 text-${cName}-600`}>
                    {category}
                </span>
                <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md`}>
                    <LucideIcons.Activity size={12} className={difficulty === 'Hard' ? 'text-rose-500' : difficulty === 'Medium' ? 'text-amber-500' : 'text-emerald-500'} />
                    {difficulty}
                </span>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-2 relative z-10">{name}</h3>
            <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed relative z-10 flex-grow">
                {description}
            </p>

            <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <LucideIcons.BookOpen size={12} /> Where to Learn
                </p>
                <div className="flex flex-wrap gap-2">
                    {platforms.map((p, idx) => (
                        <a
                            key={idx}
                            href={p.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 group/btn"
                        >
                            {p.name}
                            <LucideIcons.ArrowUpRight size={12} className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-all" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillCard;
