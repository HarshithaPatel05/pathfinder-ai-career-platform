import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { careers } from '../data/careers';
import Navbar from '../components/Navbar';
import ProgressTracker from '../components/ProgressTracker';
import CareerFlow from '../components/CareerFlow';
import { useLanguage } from '../context/LanguageContext';

const CareerRoadmap = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const career = careers.find(c => c.id === id);

    if (!career) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-6 tracking-tight uppercase">Career Path Not Found</h2>
                    <button onClick={() => navigate('/explorer')} className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-3 mx-auto shadow-xl shadow-blue-200 uppercase tracking-widest text-xs">
                        <LucideIcons.ArrowLeft size={18} /> Explore All Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-32 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => navigate('/explorer')}
                        className="flex items-center gap-2 text-blue-600 font-black mb-10 hover:translate-x-[-4px] transition-transform lowercase tracking-widest text-[10px] uppercase"
                    >
                        <LucideIcons.ArrowLeft size={14} />
                        Back to Explorer
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shadow-sm">
                                    <LucideIcons.Sparkles size={24} />
                                </div>
                                <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">{t('careerRoadmap')}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 leading-none tracking-tighter uppercase">{career.name}</h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">{career.description}</p>
                        </div>

                        <div className="flex gap-4">
                            <button className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-50 text-slate-400 hover:text-blue-600 transition-all flex items-center justify-center shadow-sm">
                                <LucideIcons.Bookmark size={24} />
                            </button>
                            <button className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-50 text-slate-400 hover:text-blue-600 transition-all flex items-center justify-center shadow-sm">
                                <LucideIcons.Download size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Career Stats Bar */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <StatCard icon={<LucideIcons.DollarSign className="text-green-600" />} label={t('salaryRange')} value={career.salaryRange} />
                    <StatCard icon={<LucideIcons.TrendingUp className="text-orange-600" />} label={t('demandLevel')} value={career.demand} />
                    <StatCard icon={<LucideIcons.Building2 className="text-indigo-600" />} label={t('industriesHiring')} value={career.industries.join(", ").length > 30 ? career.industries.join(", ").substring(0, 30) + "..." : career.industries.join(", ")} />
                    <StatCard icon={<LucideIcons.GraduationCap className="text-blue-600" />} label={t('educationPath')} value={career.educationPath} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard icon={<LucideIcons.ChartBar className="text-emerald-600" />} label="Growth Rate" value="Positive (+8% YoY)" />
                    <StatCard icon={<LucideIcons.Globe className="text-cyan-600" />} label="Top Countries Hiring" value="India, USA, UK" />
                    <StatCard icon={<LucideIcons.Sparkles className="text-amber-600" />} label="Future Demand Indicator" value="Very High in 2030" />
                </div>
            </div>

            {/* Main Content Grid */}
            <main className="max-w-6xl mx-auto p-6 md:py-20 flex flex-col lg:flex-row gap-16">

                {/* Left Side: Roadmap */}
                <div className="flex-1 space-y-12">
                    <CareerFlow career={career} />

                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
                        <div className="w-8 h-[2px] bg-blue-600"></div>
                        Phase-by-Phase Timeline
                    </h3>

                    <ProgressTracker careerId={career.id} roadmap={career.roadmap} />
                </div>

                {/* Right Side: Skills & Details */}
                <aside className="lg:w-80 space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <LucideIcons.Wrench size={14} className="text-blue-600" />
                            {t('requiredSkills')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {career.skillsRequired.map((skill, i) => (
                                <span key={i} className="px-5 py-3 bg-slate-50 text-slate-800 rounded-2xl text-[10px] font-black border border-slate-50 uppercase tracking-wider">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-indigo-600 rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="font-extrabold text-2xl mb-6 leading-tight">Expert AI Consultation</h4>
                            <p className="text-indigo-100 text-sm leading-relaxed mb-10 font-medium">Have specific questions about becoming a {career.name}? Our AI Mentor has historical data to help you.</p>
                            <button
                                onClick={() => navigate('/chat')}
                                className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg active:scale-95"
                            >
                                Ask AI Mentor
                            </button>
                        </div>
                        <LucideIcons.Sparkles className="absolute right-[-20px] top-[-20px] text-white opacity-10 group-hover:scale-125 transition-transform" size={150} />
                    </div>
                </aside>
            </main>

            {/* Final Destination Card */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform">
                            <LucideIcons.Sparkles size={40} />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">{t('futureOpportunities')}</h2>
                        <p className="max-w-xl text-blue-100 text-xl font-medium leading-relaxed mb-12 opacity-80">
                            The journey to becoming a {career.name} is challenging but incredibly rewarding. Start Step 1 today and build your future.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => navigate('/chat')}
                                className="px-10 py-5 bg-white text-blue-800 font-extrabold rounded-3xl hover:bg-slate-50 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-blue-900/10 text-xs uppercase tracking-widest"
                            >
                                {t('askAiMentor')}
                            </button>
                            <button className="px-10 py-5 bg-blue-500/30 backdrop-blur-md border border-white/20 text-white font-extrabold rounded-3xl hover:bg-blue-500/50 transition-all transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest">
                                {t('resources')}
                            </button>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                        <LucideIcons.Share2 size={300} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 flex flex-col h-full hover:shadow-2xl transition-all">
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-6 shadow-inner">
            {icon}
        </div>
        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">{label}</h5>
        <p className="text-slate-900 font-black text-sm uppercase leading-tight">{value}</p>
    </div>
);

export default CareerRoadmap;
