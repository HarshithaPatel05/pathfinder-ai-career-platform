import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ComparisonTable from '../components/ComparisonTable';
import { careers } from '../data/careers';
import { Layers, X } from 'lucide-react';

const CareerComparison = () => {
    const [selectedCareers, setSelectedCareers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCareers = careers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedCareers.find(sc => sc.id === c.id)
    );

    const handleSelect = (career) => {
        if (selectedCareers.length < 3) {
            setSelectedCareers([...selectedCareers, career]);
            setSearchTerm('');
        }
    };

    const handleRemove = (id) => {
        setSelectedCareers(selectedCareers.filter(c => c.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                        <Layers size={14} />
                        Career Comparison
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-none mb-4">
                        Weigh Your Options
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Select up to 3 careers to compare side-by-side. Analyze skills, paths, and salaries to make an informed decision.
                    </p>
                </div>

                {/* Selection Area */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-10 overflow-visible">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Selected Tags */}
                        <div className="flex-1 flex flex-wrap gap-3">
                            {selectedCareers.length === 0 && (
                                <div className="h-14 font-medium flex items-center text-slate-400 text-sm">
                                    No careers selected yet. Add up to 3 careers.
                                </div>
                            )}
                            {selectedCareers.map(sc => (
                                <div key={sc.id} className="flex items-center gap-3 bg-blue-50 text-blue-700 px-5 py-3 rounded-2xl animate-in zoom-in duration-300 shadow-sm border border-blue-100">
                                    <span className="font-bold text-sm">{sc.name}</span>
                                    <button
                                        onClick={() => handleRemove(sc.id)}
                                        className="p-1 hover:bg-blue-200 rounded-lg transition-colors text-blue-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Search Input for adding to comparison */}
                        <div className="w-full md:w-80 relative flex-shrink-0 z-50">
                            <input
                                type="text"
                                placeholder={selectedCareers.length >= 3 ? "Max 3 careers reached" : "Search to add career..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={selectedCareers.length >= 3}
                                className={`w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl outline-none font-medium transition-colors ${selectedCareers.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500'
                                    }`}
                            />

                            {/* Dropdown Results */}
                            {searchTerm && selectedCareers.length < 3 && (
                                <div className="absolute top-16 left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 max-h-60 overflow-y-auto z-[60]">
                                    {filteredCareers.slice(0, 10).map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => handleSelect(c)}
                                            className="w-full text-left font-bold text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors truncate"
                                        >
                                            {c.name} <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">{c.category}</span>
                                        </button>
                                    ))}
                                    {filteredCareers.length === 0 && (
                                        <div className="p-4 text-center text-sm font-medium text-slate-400">
                                            No matches found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table View */}
                {selectedCareers.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <ComparisonTable careers={selectedCareers} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default CareerComparison;
