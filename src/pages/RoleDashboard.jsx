import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Star, Sparkles, GraduationCap, BookOpen, Share2, Compass, Users, ChevronRight } from 'lucide-react';

const RoleDashboard = () => {
    const { roleId } = useParams();
    const navigate = useNavigate();

    const roleData = {
        parent: {
            title: "Parent Dashboard",
            desc: "Helping your child's dreams take flight with the right guidance.",
            actions: ["Top career options", "Scholarship alerts", "College planning tips", "View Child's Progress"]
        },
        teacher: {
            title: "Teacher Dashboard",
            desc: "Direct your students to the most suitable career pathways.",
            actions: ["Career Resources Library", "Skill Recommendation Tools", "Student Counseling Guide", "Conduct Workshops"]
        },
        graduate: {
            title: "Graduate Dashboard",
            desc: "Bridge the gap between education and your first professional breakthrough.",
            actions: ["Mentor opportunities", "Career switch suggestions", "Industry Mentorship", "Job Interview Prep"]
        },
        mentor: {
            title: "Mentor / Guardian Dashboard",
            desc: "Empower the next generation by sharing your hard-earned wisdom.",
            actions: ["Manage Your Mentees", "Publish Career Journeys", "Host AMAs (Ask Me Anything)", "Guidance Best Practices"]
        }
    };

    const data = roleData[roleId] || roleData.parent;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100">
                                <Star size={12} />
                                Multi-Role Platform
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">{data.title}</h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">{data.desc}</p>

                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.actions.map((action, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-white hover:shadow-xl transition-all cursor-pointer group/item">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                                            <Sparkles size={18} />
                                        </div>
                                        <span className="font-bold text-slate-800 text-sm">{action}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block w-72 h-72 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-full relative animate-pulse flex items-center justify-center">
                            <Compass size={120} className="text-indigo-400 opacity-20" />
                            <Users size={80} className="absolute text-indigo-600" />
                        </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 transition-transform group-hover:scale-150"></div>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <RoleFeatureCard
                        icon={<GraduationCap className="text-blue-600" size={32} />}
                        title="Comprehensive Guidance"
                        desc="Access the same vertical roadmaps used by students to stay informed."
                        onClick={() => navigate('/explorer')}
                    />
                    <RoleFeatureCard
                        icon={<BookOpen className="text-purple-600" size={32} />}
                        title="Skill Resources"
                        desc="Learn what modern industries demand from new candidates."
                        onClick={() => navigate('/chat')}
                    />
                    <RoleFeatureCard
                        icon={<Share2 className="text-indigo-600" size={32} />}
                        title="Community Forum"
                        desc="Connect with other {roleId}s and share best practices."
                        onClick={() => navigate('/forum')}
                    />
                </div>
            </main>
        </div>
    );
};

const RoleFeatureCard = ({ icon, title, desc, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group"
    >
        <div className="mb-6">{icon}</div>
        <h3 className="text-2xl font-black text-slate-900 mb-2 leading-none">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

export default RoleDashboard;
