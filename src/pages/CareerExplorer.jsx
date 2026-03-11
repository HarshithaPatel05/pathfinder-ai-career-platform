import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { careers, categories } from '../data/careers';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const CareerExplorer = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('none');

    const getSalaryLowerBound = (salaryStr) => {
        if (!salaryStr) return 0;
        const match = salaryStr.match(/₹(\d+)/);
        return match ? parseInt(match[1]) : 0;
    };

    const getDemandScore = (demandStr) => {
        const d = demandStr.toLowerCase();
        if (d.includes('elite') || d.includes('explosive') || d.includes('very high')) return 4;
        if (d.includes('high')) return 3;
        if (d.includes('steady') || d.includes('growing') || d.includes('rising') || d.includes('mid')) return 2;
        return 1;
    };

    const filteredCareers = careers.filter(career => {
        const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            career.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (sortBy === 'salary') {
        filteredCareers.sort((a, b) => getSalaryLowerBound(b.salaryRange) - getSalaryLowerBound(a.salaryRange));
    } else if (sortBy === 'demand') {
        filteredCareers.sort((a, b) => getDemandScore(b.demand) - getDemandScore(a.demand));
    }

    const categoryList = ['All', ...categories];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <LucideIcons.Compass size={14} />
                            {t('careerExplorer')}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight uppercase">{t('exploreCareers')}</h1>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium">Discover your potential career roadmap from our library of 120+ professional pathways across all major industries.</p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                            <LucideIcons.Search size={24} />
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
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-6 py-12">
                {/* Category Filters */}
                <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-10 scrollbar-hide">
                    <LucideIcons.Filter className="text-slate-400 shrink-0" size={20} />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-slate-100 text-slate-600 outline-none border-none hover:bg-slate-200 transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                        <option value="none">Sort By</option>
                        <option value="salary">Sort By Salary</option>
                        <option value="demand">Sort By Demand</option>
                    </select>
                    {categoryList.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-3 rounded-2xl font-black whitespace-nowrap transition-all text-[10px] uppercase tracking-[0.2em] ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' : 'bg-white text-slate-600 shadow-sm border border-slate-100 hover:border-blue-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCareers.map((career) => (
                        <div
                            key={career.id}
                            onClick={() => navigate(`/roadmap/${career.id}`)}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all cursor-pointer group flex flex-col justify-between h-[360px]"
                        >
                            <div className="overflow-hidden">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                                        <LucideIcons.Sparkles size={28} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-[8px] font-black text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded-lg mb-1">{career.category}</div>
                                        {career.demand === 'High' && (
                                            <div className="flex items-center gap-1 text-[8px] font-black text-orange-600 uppercase tracking-widest px-2 py-1 bg-orange-50 rounded-lg">
                                                <LucideIcons.TrendingUp size={10} />
                                                High Demand
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-none">{career.name}</h3>
                                <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6 line-clamp-3">{career.description}</p>
                            </div>

                            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-slate-900 font-black text-[10px] uppercase tracking-widest">{career.salaryRange}</span>
                                <div className="flex items-center text-blue-600 font-extrabold text-[10px] uppercase tracking-[0.2em] gap-2">
                                    {t('viewRoadmap')}
                                    <LucideIcons.ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCareers.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-slate-50 mt-10">
                        <LucideIcons.Compass className="mx-auto text-slate-200 mb-6" size={80} />
                        <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tight">No match found</h2>
                        <p className="text-slate-400 mt-2 font-medium">Try searching for other keywords or reset filters.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-8 px-10 py-4 bg-blue-50 text-blue-600 font-black rounded-2xl hover:bg-blue-100 transition-colors text-[10px] uppercase tracking-widest"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </main>

            {/* AI Advisor Sticky Label */}
            <div className="fixed bottom-10 right-10 z-50">
                <button
                    onClick={() => navigate('/chat')}
                    className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 rounded-[2rem] shadow-2xl shadow-indigo-100 transition-all transform hover:-translate-y-1 group active:scale-95"
                >
                    <div className="w-10 h-10 bg-indigo-400 rounded-xl flex items-center justify-center animate-pulse">
                        <LucideIcons.MessageCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] text-indigo-200 font-black uppercase tracking-widest text-left leading-none mb-1">Confused?</p>
                        <p className="font-extrabold text-lg uppercase leading-none">{t('askAiMentor')}</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default CareerExplorer;
