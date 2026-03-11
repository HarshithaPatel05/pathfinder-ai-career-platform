import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const initialThreads = [
    {
        id: 1,
        author: "Ananya",
        role: "Student",
        title: "Confused between JEE and NEET",
        content: "I'm in 10th and I love both Maths and Biology equally. Any advice on which path has more future potential?",
        upvotes: 24,
        comments: 8,
        category: "Career Guidance"
    },
    {
        id: 2,
        author: "Pranay",
        role: "Mentor",
        title: "Preparation tips for UPSC",
        content: "Start reading newspapers early. Current affairs is the backbone of the preparation. Don't stress too much about optional subjects yet.",
        upvotes: 45,
        comments: 12,
        category: "Exam Prep"
    },
    {
        id: 3,
        author: "Sunil",
        role: "Graduate",
        title: "Life after B.Tech in CSE",
        content: "Industry expectations vs College learning. Here's a quick thread on what skills you actually need at work.",
        upvotes: 56,
        comments: 20,
        category: "Skill Building"
    }
];

const DiscussionForum = () => {
    const { t } = useLanguage();
    const [threads, setThreads] = useState(() => {
        const saved = localStorage.getItem('forum_threads');
        return saved ? JSON.parse(saved) : initialThreads;
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Topics');
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Career Guidance' });

    useEffect(() => {
        localStorage.setItem('forum_threads', JSON.stringify(threads));
    }, [threads]);

    const handleUpvote = (id) => {
        setThreads(threads.map(th => th.id === id ? { ...th, upvotes: th.upvotes + 1 } : th));
    };

    const handleDownvote = (id) => {
        setThreads(threads.map(th => th.id === id ? { ...th, upvotes: th.upvotes - 1 } : th));
    };

    const handlePostSubmit = () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            const newThread = {
                id: Date.now(),
                author: "You",
                role: "Student",
                title: newPost.title,
                content: newPost.content,
                upvotes: 1,
                comments: 0,
                category: newPost.category
            };
            setThreads([newThread, ...threads]);
            setShowNewPost(false);
            setNewPost({ title: '', content: '', category: 'Career Guidance' });
        }
    };

    const filteredThreads = threads.filter(th =>
        (activeCategory === 'All Topics' || th.category === activeCategory) &&
        (th.title.toLowerCase().includes(searchTerm.toLowerCase()) || th.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 px-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <LucideIcons.MessageSquare size={14} />
                            {t('communityForum')}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight uppercase tracking-tight">{t('discussionForum')}</h1>
                        <p className="text-lg text-slate-500 font-medium mt-2 leading-relaxed">Ask questions, share experiences, and learn from our community of mentors.</p>
                    </div>

                    <button
                        onClick={() => setShowNewPost(!showNewPost)}
                        className={`flex items-center gap-3 px-10 py-5 font-extrabold rounded-[2rem] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest ${showNewPost ? 'bg-slate-200 text-slate-700 shadow-slate-200' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'}`}
                    >
                        {showNewPost ? <LucideIcons.X size={24} /> : <LucideIcons.Plus size={24} />}
                        {showNewPost ? "Cancel" : "Start Discussion"}
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <LucideIcons.Filter size={14} />
                                Categories
                            </h4>
                            <nav className="space-y-2">
                                {['All Topics', 'Career Guidance', 'Exam Prep', 'Internships', 'Skill Building'].map(cat => (
                                    <div
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all font-bold text-xs uppercase tracking-widest ${activeCategory === cat ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 translate-x-1' : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1'}`}
                                    >
                                        {cat}
                                        {activeCategory === cat && <LucideIcons.ChevronUp className="rotate-90" size={16} />}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <LucideIcons.Sparkles size={18} />
                                    AI Top Picks
                                </h4>
                                <p className="text-indigo-100 text-sm leading-relaxed mb-6 italic font-medium">"Trending: Preparation for GATE 2027 is picking up pace."</p>
                                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Explore Trending</button>
                            </div>
                            <LucideIcons.Sparkles className="absolute right-[-20px] top-[-20px] text-white opacity-10 group-hover:scale-125 transition-transform" size={150} />
                        </div>
                    </aside>

                    <div className="lg:col-span-3 space-y-6">
                        {showNewPost && (
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 mb-6 animate-in fade-in slide-in-from-top-4">
                                <h3 className="font-bold text-lg mb-4 text-slate-800 uppercase tracking-widest">Create New Discussion</h3>
                                <input value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Title of your discussion" className="w-full mb-4 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                                <textarea value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} placeholder="What's your question or insight?" className="w-full mb-4 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none font-medium"></textarea>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-600">
                                        <option value="Career Guidance">Career Guidance</option>
                                        <option value="Exam Prep">Exam Prep</option>
                                        <option value="Internships">Internships</option>
                                        <option value="Skill Building">Skill Building</option>
                                    </select>
                                    <button onClick={handlePostSubmit} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Post Discussion</button>
                                </div>
                            </div>
                        )}

                        {filteredThreads.map(thread => (
                            <div key={thread.id} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 flex gap-8 items-start hover:shadow-2xl hover:shadow-indigo-900/5 transition-all group">
                                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
                                    <button onClick={() => handleUpvote(thread.id)} className="text-slate-400 hover:text-blue-600 transition-colors p-1"><LucideIcons.ChevronUp size={24} /></button>
                                    <span className="font-black text-slate-800 text-lg leading-tight my-1">{thread.upvotes}</span>
                                    <button onClick={() => handleDownvote(thread.id)} className="text-slate-400 hover:text-red-600 transition-colors p-1"><LucideIcons.ChevronDown size={24} /></button>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shadow-inner group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                                            <LucideIcons.User size={20} />
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-slate-800 text-sm leading-none">{thread.author}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Role: {thread.role} • 2h ago</p>
                                        </div>
                                        <span className="ml-auto bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer">{thread.category}</span>
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight uppercase tracking-tight">{thread.title}</h2>
                                    <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">{thread.content}</p>

                                    <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] transition-all">
                                            <LucideIcons.MessageSquare size={16} />
                                            {thread.comments} Comments
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] transition-all">
                                            <LucideIcons.Send size={16} />
                                            Share Topic
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DiscussionForum;
