import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SkillCard from '../components/SkillCard';

import { skillsData } from '../data/skills';

const categories = ["All", "Tech Skills", "Communication Skills", "Creative Skills", "Business Skills", "Life Skills"];

const SkillHub = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredSkills = selectedCategory === "All"
        ? skillsData
        : skillsData.filter(s => s.category === selectedCategory);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                        Skill Learning Hub
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Upgrade yourself. Explore handpicked skills sorted by category and difficulty to advance your career roadmap.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${selectedCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {filteredSkills.map((skill, idx) => (
                        <SkillCard key={idx} {...skill} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SkillHub;
