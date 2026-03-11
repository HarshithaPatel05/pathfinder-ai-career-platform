import React, { useState } from 'react';
import { colleges } from '../data/colleges';
import Navbar from '../components/Navbar';
import * as LucideIcons from 'lucide-react';

const CollegeExplorer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [compareList, setCompareList] = useState([]);
    const [sortBy, setSortBy] = useState('Rating'); // 'Rating' or 'Fees'

    const toggleCompare = (college) => {
        if (compareList.find(c => c.id === college.id)) {
            setCompareList(compareList.filter(c => c.id !== college.id));
        } else if (compareList.length < 3) {
            setCompareList([...compareList, college]);
        }
    };

    const extractFees = (feesStr) => {
        const numbers = feesStr.replace(/[^0-9]/g, '');
        return numbers ? parseInt(numbers) : 0;
    };

    const filtered = colleges.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === 'Rating') {
            return b.rating - a.rating;
        } else {
            return extractFees(a.fees) - extractFees(b.fees);
        }
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-10">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">College Explorer</h1>
                        <p className="text-slate-600 text-lg">Find the best institution for your dreams.</p>
                    </div>
                    {compareList.length > 0 && (
                        <div className="bg-white p-4 rounded-2xl shadow-lg border border-indigo-100 flex items-center gap-4 animate-in slide-in-from-right">
                            <div className="flex -space-x-3">
                                {compareList.map(c => (
                                    <div key={c.id} className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                                        {c.name.substring(0, 2)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-bold text-slate-700">{compareList.length}/3 to compare</span>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Compare Now</button>
                        </div>
                    )}
                </header>

                <div className="relative mb-12">
                    <LucideIcons.Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                    <input
                        type="text"
                        placeholder="Search by college name, course or city..."
                        className="w-full pl-16 pr-6 py-4 rounded-xl bg-white border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex justify-end mb-12">
                    <div className="flex items-center gap-4 min-w-[250px]">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
                        >
                            <option value="Rating">Top Rated (High to Low)</option>
                            <option value="Fees">Lowest Fees (Low to High)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(college => (
                        <div key={college.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-xl transition-all group">
                            <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative">
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                                    <LucideIcons.Star size={16} fill="currentColor" />
                                    {college.rating}
                                </div>
                                <div className="absolute -bottom-6 left-8 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600">
                                    <LucideIcons.GraduationCap size={28} />
                                </div>
                            </div>

                            <div className="p-8 pt-10 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors uppercase">{college.name}</h3>

                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                    <LucideIcons.MapPin size={16} />
                                    {college.location}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Top Course</p>
                                        <p className="text-sm font-bold text-slate-800">{college.course}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Approx. Fees</p>
                                        <p className="text-sm font-bold text-slate-800">{college.fees}</p>
                                    </div>
                                </div>

                                <div className="mt-auto flex gap-3">
                                    <button
                                        onClick={() => toggleCompare(college)}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${compareList.some(c => c.id === college.id) ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        <LucideIcons.Layers size={18} />
                                        {compareList.some(c => c.id === college.id) ? 'Added' : 'Add to Compare'}
                                    </button>
                                    <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 transition-all">
                                        <LucideIcons.ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main >
        </div >
    );
};

export default CollegeExplorer;
