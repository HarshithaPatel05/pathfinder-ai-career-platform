import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Landmark, Search, Sparkles, Info, Calendar, ArrowUpRight } from 'lucide-react';
import { exams } from '../data/exams';
import { useLanguage } from '../context/LanguageContext';

const EntranceExams = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredExams = exams.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <header className="bg-white border-b border-slate-100 py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <Landmark size={14} />
                            {t('entranceExams')}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 uppercase tracking-tight">{t('examsGuidance')}</h1>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium">Preparation guides and important dates for major competitive entrance exams.</p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={24} />
                        </div>
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-6 py-6 rounded-3xl bg-slate-50 border-2 border-slate-50 shadow-sm focus:border-indigo-600 focus:bg-white outline-none transition-all text-lg font-medium"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredExams.map((e) => (
                        <div key={e.id} className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group flex flex-col">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                                    <Sparkles size={28} />
                                </div>
                                <span className="bg-slate-50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">Competitive Exam</span>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-tight">{e.name}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-1">{e.description}</p>

                            <div className="space-y-6 pt-8 border-t border-slate-50">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-50">
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Info size={14} className="text-indigo-600" />
                                        Eligibility
                                    </h5>
                                    <p className="text-sm font-bold text-slate-700 leading-relaxed">{e.eligibility}</p>
                                </div>

                                <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-50">
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Sparkles size={14} className="text-orange-600" />
                                        Preparation Tips
                                    </h5>
                                    <p className="text-sm font-bold text-slate-700 leading-relaxed">{e.suggestions}</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-50">
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Calendar size={14} className="text-green-600" />
                                        Important Dates
                                    </h5>
                                    <p className="text-sm font-bold text-slate-700 leading-relaxed">{e.dates}</p>
                                </div>

                                <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl border-2 border-slate-50 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                                    View Detailed Syllabus
                                    <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default EntranceExams;
