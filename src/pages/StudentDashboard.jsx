import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import Navbar from '../components/Navbar';
import BreakTimePlanner from '../components/BreakTimePlanner';
import CareerFlow from '../components/CareerFlow';
import { useLanguage } from '../context/LanguageContext';
import { exams } from '../data/exams';
import { skillsData } from '../data/skills';
import { careers } from '../data/careers';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [profile, setProfile] = useState(null);
    const [recentThreads, setRecentThreads] = useState([]);

    // Simulate finding the career object for active path
    const activeCareer = careers.find(c => c.name.toLowerCase().includes((profile?.interest || "").toLowerCase())) || careers[0];

    useEffect(() => {
        const savedProfile = localStorage.getItem('studentProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        } else {
            navigate('/setup');
        }

        const savedThreads = localStorage.getItem('forum_threads');
        if (savedThreads) {
            setRecentThreads(JSON.parse(savedThreads).slice(0, 2));
        }
    }, [navigate]);

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
                {/* Premium Hero Header */}
                <header className="relative mb-16 bg-white p-10 md:p-16 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-0"></div>
                    <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-indigo-50/30 rounded-full blur-3xl -z-0"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-200 group-hover:scale-105 transition-transform duration-500">
                                    <LucideIcons.User size={48} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                                    <LucideIcons.Trophy size={18} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 italic">Level 4 Scholar</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{profile.location}</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-1 uppercase">
                                    {t('hello')}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{profile.name}</span>
                                </h1>
                                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 mt-2">
                                    <LucideIcons.Layout size={12} className="text-indigo-500" />
                                    {profile.currentClass} • Goal: {profile.interest || "Technology"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/chat')}
                                className="px-10 py-5 bg-slate-900 border-2 border-slate-900 text-white font-black rounded-2xl shadow-2xl flex items-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs"
                            >
                                <LucideIcons.MessageCircle size={20} />
                                Ask AI Mentor
                            </button>
                            <button
                                onClick={() => navigate('/explorer')}
                                className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-2xl flex items-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs hover:border-blue-200"
                            >
                                <LucideIcons.Briefcase size={20} />
                                New Path
                            </button>
                        </div>
                    </div>
                </header>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <StatBox label="Skill Points" value="1,240" icon={<LucideIcons.Zap className="text-amber-500" />} />
                    <StatBox label="Certifications" value="03" icon={<LucideIcons.GraduationCap className="text-blue-500" />} />
                    <StatBox label="Community Likes" value="48" icon={<LucideIcons.MessageCircle className="text-pink-500" />} />
                    <StatBox label="Days Active" value="12" icon={<LucideIcons.Clock className="text-indigo-500" />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left & Middle Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Interactive Career Flow */}
                        <section>
                            <CareerFlow career={activeCareer} />
                        </section>

                        {/* Suggested Skills & Break Time Section */}
                        <section className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
                            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                                        <LucideIcons.Zap size={22} />
                                    </div>
                                    Skill Growth Hub
                                </div>
                                <button onClick={() => navigate('/skills')} className="text-[10px] font-black text-blue-600 border-b-2 border-blue-100 uppercase tracking-widest hover:text-blue-700 transition-colors">Explore All</button>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                {skillsData.slice(0, 2).map((skill, i) => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-50 hover:border-blue-100 transition-all group flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <LucideIcons.Layers size={22} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 text-sm mb-1 uppercase tracking-tight">{skill.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{skill.difficulty} Level</p>
                                            <span className="px-3 py-1 bg-white text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">Top Suggested</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <BreakTimePlanner />
                        </section>

                        {/* Recent Discussions */}
                        <section className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
                                        <LucideIcons.MessageCircle size={22} />
                                    </div>
                                    Recent Discussions
                                </div>
                                <button onClick={() => navigate('/forum')} className="text-[10px] font-black text-blue-600 border-b-2 border-blue-100 uppercase tracking-widest">Connect</button>
                            </h3>

                            <div className="space-y-4">
                                {recentThreads.length > 0 ? recentThreads.map((thread, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:shadow-lg transition-all">
                                                <LucideIcons.User size={18} />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-slate-800 text-sm">{thread.title}</h5>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{thread.author} • {thread.category}</p>
                                            </div>
                                        </div>
                                        <LucideIcons.ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-all" />
                                    </div>
                                )) : (
                                    <p className="text-center text-slate-400 py-6 font-bold text-sm italic">Join a discussion to see recent activity</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Sidebar Items) */}
                    <div className="space-y-12">
                        {/* Upcoming Exams Alerts */}
                        <section className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 border-t-4 border-t-red-500">
                            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                                <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                                    <LucideIcons.Bell size={18} />
                                </div>
                                Exam Alerts
                            </h3>
                            <div className="space-y-6">
                                {exams.slice(0, 3).map((exam, i) => (
                                    <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-200 before:rounded-full group hover:before:bg-red-500 before:transition-all">
                                        <h5 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1 group-hover:text-red-600 transition-colors">{exam.name}</h5>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                            <LucideIcons.Calendar size={10} />
                                            {exam.dates}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => navigate('/exams')} className="w-full mt-8 py-4 px-6 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                                View Exam Hub
                            </button>
                        </section>

                        {/* Navigation Shortcuts */}
                        <section className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter leading-none">Smart Search</h3>
                                <p className="text-blue-100/70 text-sm font-medium mb-12">Instantly compare colleges or scholarships based on your unique profile.</p>
                                <div className="space-y-4">
                                    <ShortcutBtn label="Compare Colleges" onClick={() => navigate('/colleges')} />
                                    <ShortcutBtn label="Find Scholarships" onClick={() => navigate('/scholarships')} />
                                </div>
                            </div>
                            <LucideIcons.Sparkles className="absolute right-[-40px] bottom-[-40px] opacity-10 group-hover:scale-150 transition-transform duration-700" size={250} />
                        </section>

                        {/* Recent Badges / Progress */}
                        <section className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                    <LucideIcons.Trophy size={18} />
                                </div>
                                Progress Tracking
                            </h3>
                            <div className="space-y-8">
                                <ProgressItem label="JEE Mock Score" value={72} color="bg-emerald-500" />
                                <ProgressItem label="C++ Certification" value={100} color="bg-blue-600" />
                                <ProgressItem label="Daily Streak" value={12} color="bg-orange-500" total={30} />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

const StatBox = ({ label, value, icon }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-lg transition-all">
        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner shrink-0 leading-none">
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className="text-xl font-black text-slate-800 leading-none">{value}</p>
        </div>
    </div>
);

const ShortcutBtn = ({ label, onClick }) => (
    <button onClick={onClick} className="w-full py-4 px-6 bg-white/10 backdrop-blur-md border border-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-indigo-900 transition-all text-left flex items-center justify-between">
        {label}
        <LucideIcons.ChevronRight size={14} />
    </button>
);

const ProgressItem = ({ label, value, color, total = 100 }) => (
    <div className="space-y-3">
        <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
            <span className="text-sm font-black text-slate-800">{value}{total === 100 ? '%' : `/${total}`}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${(value / total) * 100}%` }}></div>
        </div>
    </div>
);

export default StudentDashboard;

