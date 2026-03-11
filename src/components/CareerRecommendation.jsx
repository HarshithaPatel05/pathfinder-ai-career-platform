import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { careers } from '../data/careers';
import { Link } from 'react-router-dom';

const CareerRecommendation = () => {
    const [formData, setFormData] = useState({
        interest: '',
        subject: '',
        skills: '',
        education: ''
    });

    const [recommendations, setRecommendations] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSuggest = (e) => {
        e.preventDefault();

        const { interest, subject, skills, education } = formData;

        if (!interest && !subject && !skills && !education) {
            setRecommendations([]);
            return;
        }

        const queryText = `${interest} ${subject} ${skills} ${education}`.toLowerCase();

        // Simple scoring algorithm based on keywords
        const scoredCareers = careers.map(career => {
            let score = 0;
            const careerText = `${career.name} ${career.category} ${career.description} ${career.skillsRequired.join(' ')} ${career.educationPath} ${career.industries.join(' ')}`.toLowerCase();

            const keywords = queryText.split(/[,\s]+/).filter(k => k.trim().length > 2);
            keywords.forEach(keyword => {
                if (careerText.includes(keyword)) {
                    score += 1;
                }
            });

            return { ...career, score };
        });

        // Sort by score
        const sorted = scoredCareers.filter(c => c.score > 0).sort((a, b) => b.score - a.score);

        // Return top 5, or random top 5 if many have same score
        setRecommendations(sorted.slice(0, 5));
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <LucideIcons.Brain className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800">AI Career Matchmaker</h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Tell us about yourself to get personalized career suggestions.</p>
                </div>
            </div>

            <form onSubmit={handleSuggest} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Interests (e.g., Space, Art, Coding)</label>
                    <input
                        type="text"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="What do you enjoy doing?"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Favorite Subjects</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="Math, Physics, History..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="Communication, Python, Drawing..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Education Level</label>
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="10th, 12th, B.Tech..."
                    />
                </div>

                <div className="md:col-span-2 mt-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200"
                    >
                        <LucideIcons.Sparkles size={20} />
                        FIND MATCHING CAREERS
                    </button>
                </div>
            </form>

            {recommendations.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Top Matches</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {recommendations.map(career => (
                            <Link
                                to={`/roadmap/${career.id}`}
                                key={career.id}
                                className="group flex flex-col p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{career.name}</h4>
                                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider">
                                        Match Score: {career.score}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2">{career.description}</p>

                                <div className="mt-auto flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                                    View Roadmap <LucideIcons.ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerRecommendation;
