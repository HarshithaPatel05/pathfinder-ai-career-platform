import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Briefcase, Layers, BookOpen, ChartBar, Users, TrendingUp, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center">
            {/* Visual background elements */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-blue-600/10 to-indigo-700/5 -z-10 rounded-b-[5rem] overflow-hidden">
                <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-white opacity-20 blur-3xl rounded-full"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full shadow-md text-sm font-extrabold uppercase tracking-widest mb-10 border border-blue-50">
                    <Sparkles size={16} />
                    {t('tagline')}
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                    {t('welcome').split(' ').slice(0, 2).join(' ')} <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                        {t('welcome').split(' ').slice(2).join(' ')}
                    </span>
                </h1>

                <p className="max-w-2xl text-xl text-slate-500 font-medium leading-relaxed mb-12">
                    Empowering the next generation to make informed career decisions through AI-driven insights, personalized roadmaps, and community mentorship.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-6 mb-24">
                    <button
                        onClick={() => navigate('/selection')}
                        className="px-12 py-6 bg-blue-600 text-white font-extrabold rounded-[2rem] text-xl transform transition-all hover:scale-105 hover:bg-blue-700 shadow-2xl shadow-blue-200 flex items-center gap-3 active:scale-95"
                    >
                        {t('getStarted')}
                        <ArrowRight />
                    </button>
                    <button
                        onClick={() => navigate('/explorer')}
                        className="px-12 py-6 bg-white text-slate-800 font-extrabold rounded-[2rem] text-xl shadow-xl transition-all hover:shadow-2xl border border-slate-100 flex items-center gap-3 active:scale-95"
                    >
                        {t('exploreCareers')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
                    <FeatureCard
                        icon={<Briefcase className="text-blue-500" size={32} />}
                        title="Interactive Flow"
                        desc="Visualize your entire career timeline from degree to senior management with our dynamic path graph."
                    />
                    <FeatureCard
                        icon={<Layers className="text-indigo-500" size={32} />}
                        title="Side-by-Side Comparison"
                        desc="Confused between two paths? Compare salary, growth, and requirements side-by-side instantly."
                    />
                    <FeatureCard
                        icon={<BookOpen className="text-blue-500" size={32} />}
                        title={t('aiMentor')}
                        desc="Get instant advice and clarity about entrance exams, colleges, or skill-sets from our smart AI."
                    />
                </div>

                {/* Analytics Section */}
                <div className="mt-32 w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <ChartBar size={14} />
                            Platform Insights
                        </div>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Real-Time Career Statistics</h2>
                        <p className="text-slate-500 font-medium mt-3">Discover what's trending to make data-driven decisions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Total Careers */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                <Layers size={32} />
                            </div>
                            <h4 className="text-5xl font-black text-slate-800 mb-2">120+</h4>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Available Careers</p>
                        </div>

                        {/* Most Popular */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                                <Users size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-slate-800 mb-2">Software Engineer & Doctor</h4>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Most Popular Tracks</p>
                        </div>

                        {/* Trending Skills */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                                <TrendingUp size={32} />
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center mb-2">
                                <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-xs">AI/ML</span>
                                <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-xs">Data Analysis</span>
                                <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-xs">Cloud</span>
                            </div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Trending Skills</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Branding */}
            <footer className="mt-auto py-12 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-4">
                <Compass size={14} />
                PathFinder AI — Build the Future
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-2xl hover:shadow-blue-900/5 transition-all">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-4">{title}</h3>
        <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
