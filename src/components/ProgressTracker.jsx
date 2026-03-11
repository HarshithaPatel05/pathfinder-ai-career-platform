import React, { useState, useEffect } from 'react';
import { CheckCircle2, UserCheck } from 'lucide-react';

const ProgressTracker = ({ careerId, roadmap }) => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(`progress_${careerId}`);
        if (saved) {
            setProgress(JSON.parse(saved));
        } else {
            setProgress(new Array(roadmap.length).fill(false));
        }
    }, [careerId, roadmap.length]);

    const toggleStep = (index) => {
        const newProgress = [...progress];
        newProgress[index] = !newProgress[index];
        setProgress(newProgress);
        localStorage.setItem(`progress_${careerId}`, JSON.stringify(newProgress));
    };

    const completedCount = progress.filter(Boolean).length;
    const progressPercentage = roadmap.length > 0 ? Math.round((completedCount / roadmap.length) * 100) : 0;

    return (
        <div className="relative">
            {/* Progress Header */}
            <div className="mb-12 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            Roadmap Progress
                        </span>
                        <span className="text-lg font-black text-slate-800">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-emerald-500 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            {/* Continuous Vertical Line */}
            <div className="absolute left-[23px] md:left-[35px] top-8 bottom-8 w-2 bg-gradient-to-b from-blue-600 via-indigo-600 to-slate-200 rounded-full"></div>

            <div className="space-y-16">
                {roadmap.map((step, index) => {
                    const isCompleted = progress[index];
                    return (
                        <div key={index} className="relative pl-16 md:pl-28 group">
                            {/* Node Bullet - Clickable */}
                            <button
                                onClick={() => toggleStep(index)}
                                className={`absolute left-0 md:left-4 top-2 w-[50px] h-[50px] md:w-[65px] md:h-[65px] bg-white border-4 rounded-[1.5rem] flex items-center justify-center z-10 shadow-2xl transition-all group-hover:scale-110 outline-none ${isCompleted
                                    ? 'border-emerald-500 shadow-emerald-100 bg-emerald-50'
                                    : 'border-slate-100 shadow-indigo-100 group-hover:border-blue-600'
                                    }`}
                                aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 size={28} className="text-emerald-500" />
                                ) : (
                                    <span className="text-lg md:text-xl font-black text-blue-600">{index + 1}</span>
                                )}
                            </button>

                            {/* Content Card */}
                            <div className={`rounded-[2.5rem] p-10 shadow-sm border transition-all relative overflow-hidden flex items-start gap-4 cursor-pointer ${isCompleted
                                ? 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-200 hover:shadow-emerald-50'
                                : 'bg-white border-slate-100 group-hover:shadow-2xl group-hover:shadow-indigo-900/5 group-hover:border-blue-100'
                                }`} onClick={() => toggleStep(index)}>
                                <div className={`absolute top-[-10px] right-[-10px] p-10 opacity-10 transition-all ${isCompleted ? 'text-emerald-600 opacity-5' : 'text-slate-50 group-hover:text-blue-600 group-hover:opacity-10'}`}>
                                    <UserCheck size={120} />
                                </div>
                                <div className="flex-1 relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className={`font-black text-2xl leading-tight uppercase tracking-wide ${isCompleted ? 'text-emerald-900' : 'text-slate-900'}`}>Phase {index + 1}</h4>
                                        {isCompleted && (
                                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-3 py-1 bg-opacity-80 rounded-full font-bold uppercase tracking-widest">
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-lg font-medium leading-relaxed ${isCompleted ? 'text-emerald-700/80 line-through' : 'text-slate-600'}`}>{step}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressTracker;
