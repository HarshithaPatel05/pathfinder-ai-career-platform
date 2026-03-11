import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import RoleCard from '../components/RoleCard';
import { useLanguage } from '../context/LanguageContext';

const RoleSelection = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleRoleSelect = (role) => {
        localStorage.setItem('userRole', role);
        if (role === 'student') {
            navigate('/setup');
        } else {
            navigate(`/dashboard/${role}`);
        }
    };

    const roles = [
        { id: 'student', name: t('student'), icon: 'User' },
        { id: 'parent', name: t('parent'), icon: 'Users' },
        { id: 'graduate', name: t('graduate'), icon: 'GraduationCap' },
        { id: 'teacher', name: t('teacher'), icon: 'BookOpen' },
        { id: 'mentor', name: t('mentor'), icon: 'Briefcase' },
        { id: 'user', name: t('user'), icon: 'ShieldCheck' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-20 px-6">
            <div className="max-w-7xl w-full">
                <div className="flex flex-col items-center text-center mb-16 px-6">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-[1.5rem] mb-6 shadow-sm">
                        <LucideIcons.User size={32} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 leading-tight tracking-tight mb-4">
                        {t('selectRole')}
                    </h2>
                    <p className="max-w-xl text-lg text-slate-400 font-medium">To provide you with the most relevant roadmaps and guidance, please choose your current status.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {roles.map((role) => (
                        <RoleCard
                            key={role.id}
                            role={role.name}
                            iconName={role.icon}
                            onClick={() => handleRoleSelect(role.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
