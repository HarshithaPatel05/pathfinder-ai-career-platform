import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GraduationCap, Search, Filter, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import { scholarships } from '../data/scholarships';
import { useLanguage } from '../context/LanguageContext';

const ScholarshipFinder = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [incomeFilter, setIncomeFilter] = useState('All');
    const [yearFilter, setYearFilter] = useState('All');

    const filteredScholarships = scholarships.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.description?.toLowerCase().includes(searchTerm.toLowerCase()) || s.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || s.category === filter;

        let matchesIncome = true;
        if (incomeFilter !== 'All') {
            if (incomeFilter === '< 2.5L') matchesIncome = s.eligibility.includes('2.5L') || s.eligibility.includes('income');
            if (incomeFilter === 'Any') matchesIncome = true;
        }

        let matchesYear = true;
        if (yearFilter !== 'All') {
            matchesYear = s.deadline.includes(yearFilter);
        }

        return matchesSearch && matchesFilter && matchesIncome && matchesYear;
    });

    const categories = ['All', 'Merit-based', 'Need-based', 'Minority', 'Excellence'];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <header className="bg-white border-b border-slate-100 py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <GraduationCap size={14} />
                            {t('scholarships')}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight uppercase">{t('scholarshipFinder')}</h1>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium">Find financial support to pursue your academic and professional dreams.</p>
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
                            className="w-full pl-16 pr-6 py-6 rounded-3xl bg-slate-50 border-2 border-slate-50 shadow-sm focus:border-blue-500 focus:bg-white outline-none transition-all text-lg font-medium"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 py-12">
                <div className="flex flex-col md:flex-row gap-6 mb-10 w-full justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1">
                        <Filter className="text-slate-400 shrink-0" size={20} />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2.5 rounded-xl font-black whitespace-nowrap transition-all text-[10px] uppercase tracking-[0.2em] ${filter === cat ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-blue-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4 items-center shrink-0">
                        <select
                            value={incomeFilter}
                            onChange={(e) => setIncomeFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <option value="All">Income: All</option>
                            <option value="< 2.5L">Income &lt; 2.5 LPA</option>
                        </select>
                        <select
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <option value="All">Year: All</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredScholarships.map((s) => (
                        <div key={s.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group flex flex-col">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Sparkles size={28} />
                                </div>
                                <div className="bg-slate-50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">
                                    {s.category}
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight">{s.name}</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-10 flex-1">{s.description}</p>

                            <div className="space-y-4 pt-6 mt-auto border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <Calendar size={14} className="text-blue-500" />
                                    Deadline: {s.deadline}
                                </div>
                                <button className="w-full py-4 bg-slate-50 text-blue-600 font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                    Apply Now
                                    <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredScholarships.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-slate-50">
                        <GraduationCap size={80} className="mx-auto text-slate-100 mb-6" />
                        <h2 className="text-2xl font-bold text-slate-300">No Scholarships Match Your Criteria</h2>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ScholarshipFinder;
