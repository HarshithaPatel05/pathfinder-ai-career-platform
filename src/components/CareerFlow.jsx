import React from 'react';
import { GraduationCap, Zap, Briefcase, TrendingUp, ChevronRight } from 'lucide-react';

const CareerFlow = ({ career }) => {
    if (!career) return null;

    const steps = [
        { icon: <GraduationCap size={20} />, label: "Education", value: career.educationPath },
        { icon: <Zap size={20} />, label: "Core Skills", value: career.skillsRequired.slice(0, 2).join(", ") },
        { icon: <Briefcase size={20} />, label: "First Job", value: career.name },
        { icon: <TrendingUp size={20} />, label: "Growth", value: "Senior Role / Management" }
    ];

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
                <TrendingUp size={14} className="text-blue-600" />
                Interactive Career Path Flow
            </h3>

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4">
                {/* Connection Line */}
                <div className="absolute left-[23px] md:left-0 md:top-1/2 md:w-full h-full md:h-[2px] bg-slate-100 -z-0"></div>

                {steps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-row md:flex-col items-center gap-6 md:gap-4 group">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${idx === 0 ? 'bg-blue-600 text-white' :
                            idx === 1 ? 'bg-indigo-600 text-white' :
                                idx === 2 ? 'bg-indigo-700 text-white' : 'bg-slate-900 text-white'
                            } group-hover:scale-110 group-hover:rotate-3`}>
                            {step.icon}
                        </div>

                        <div className="text-left md:text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{step.label}</p>
                            <p className="text-sm font-bold text-slate-800 leading-tight md:max-w-[120px]">{step.value}</p>
                        </div>

                        {idx < steps.length - 1 && (
                            <div className="hidden md:block absolute right-[-20%] top-1/2 -translate-y-1/2 text-slate-200">
                                <ChevronRight size={20} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Timeline</p>
                    <p className="text-sm font-bold text-slate-700">6 - 8 Years to Mastery</p>
                </div>
                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-800 font-bold rounded-xl text-xs hover:bg-slate-50 transition-all uppercase tracking-widest">
                    View Market Trends
                </button>
            </div>
        </div>
    );
};

export default CareerFlow;
