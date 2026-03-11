import React, { useState } from 'react';
import { Clock, Zap, Rocket } from 'lucide-react';

const BreakTimePlanner = () => {
    const [freeDays, setFreeDays] = useState(7);

    const suggestions = {
        7: [
            { title: "Typing Practice", desc: "Boost words per minute online." },
            { title: "Productivity Tools", desc: "Learn Notion or Trello basics." },
            { title: "Email Etiquette", desc: "Write professional emails effectively." }
        ],
        15: [
            { title: "Excel / Sheets Basics", desc: "Learn formulas and pivot tables." },
            { title: "Communication Skills", desc: "Improve speaking and presentation." },
            { title: "Basic Graphic Design", desc: "Learn Canva for quick designs." }
        ],
        30: [
            { title: "Python Basics", desc: "Start coding with simple scripts." },
            { title: "Advanced UI/UX", desc: "Design tools like Figma." },
            { title: "Financial Literacy", desc: "Learn about stocks and savings." }
        ],
        90: [
            { title: "Web Development", desc: "Build a complete portfolio website." },
            { title: "Data Analysis", desc: "Master SQL and Tableau." },
            { title: "Start a Blog/Vlog", desc: "Create content consistently." }
        ]
    };

    return (
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                <div>
                    <h4 className="font-black text-amber-800 uppercase tracking-widest text-sm flex items-center gap-2 mb-2">
                        <Clock size={18} />
                        Smart Break-Time Planner
                    </h4>
                    <p className="text-amber-700/70 text-sm font-bold">Turn your free days into high-value skills.</p>
                </div>

                <div className="flex bg-white rounded-xl p-1 border border-amber-200 shadow-sm shrink-0">
                    {[7, 15, 30, 90].map(days => (
                        <button
                            key={days}
                            onClick={() => setFreeDays(days)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${freeDays === days ? 'bg-amber-500 text-white shadow-md' : 'text-amber-700 hover:bg-amber-50'}`}
                        >
                            {days} Days
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions[freeDays].map((s, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all">
                            <Zap size={20} />
                        </div>
                        <h5 className="font-bold text-slate-800 mb-1">{s.title}</h5>
                        <p className="text-xs text-slate-500 font-medium">{s.desc}</p>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-amber-200 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <Rocket size={16} />
                Generate Custom Plan
            </button>
        </div>
    );
};

export default BreakTimePlanner;
