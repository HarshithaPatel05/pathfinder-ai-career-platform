import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Briefcase, Target, Layers, BookOpen, GraduationCap, MessageSquare, Globe, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();

    return (
        <nav className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
                        <Compass size={24} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 hidden sm:block">
                        PathFinder AI
                    </span>
                </div>

                <div className="hidden lg:flex flex-wrap items-center gap-4">
                    <NavLink to="/explorer" icon={<Briefcase size={16} />} label={t('exploreCareers')} />
                    <NavLink to="/recommend" icon={<Target size={16} />} label="AI Match" />
                    <NavLink to="/compare" icon={<Layers size={16} />} label="Compare" />
                    <NavLink to="/skills" icon={<BookOpen size={16} />} label="Skills" />
                    <NavLink to="/scholarships" icon={<GraduationCap size={16} />} label={t('scholarships')} />
                    <NavLink to="/chat" icon={<MessageSquare size={16} />} label={t('aiMentor')} />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl items-center">
                        <Globe className="mx-2 text-slate-400" size={16} />
                        <div className="flex gap-1">
                            <LanguageBtn lang="en" current={language} setLang={setLanguage} label="EN" />
                            <LanguageBtn lang="hi" current={language} setLang={setLanguage} label="हिन्दी" />
                            <LanguageBtn lang="te" current={language} setLang={setLanguage} label="తెలుగు" />
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/selection')}
                        className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
                        title={t('dashboard')}
                    >
                        <Home size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

const LanguageBtn = ({ lang, current, setLang, label }) => (
    <button
        onClick={() => setLang(lang)}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${current === lang ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
    >
        {label}
    </button>
);

const NavLink = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">
        {icon}
        <span>{label}</span>
    </Link>
);

export default Navbar;
