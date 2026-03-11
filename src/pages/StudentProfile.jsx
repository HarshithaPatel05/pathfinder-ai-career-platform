import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StudentProfile = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        currentClass: '',
        location: '',
        interest: '',
        breakTime: '',
        language: 'English'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('studentProfile', JSON.stringify(formData));
        navigate('/dashboard/student');
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-extrabold flex items-center gap-3 uppercase tracking-tighter">
                            <LucideIcons.User size={32} />
                            {t('profile')}
                        </h2>
                        <p className="text-blue-100 mt-2 text-lg font-medium opacity-80">Your journey to a dream career starts with a profile.</p>
                    </div>
                    <LucideIcons.Rocket className="absolute right-[-20px] top-[-20px] text-white opacity-10" size={150} />
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Rahul Sharma"
                                className="w-full p-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 bg-slate-50/50 transition-all outline-none font-bold"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Class</label>
                            <select
                                required
                                name="currentClass"
                                value={formData.currentClass}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 bg-slate-50/50 transition-all outline-none font-bold"
                            >
                                <option value="">Select Class</option>
                                <option value="9th Grade">9th Grade</option>
                                <option value="10th Grade">10th Grade</option>
                                <option value="11th Grade (Inter 1st Year)">11th Grade (Inter 1st Year)</option>
                                <option value="12th Grade (Inter 2nd Year)">12th Grade (Inter 2nd Year)</option>
                                <option value="Graduate (B.Tech/Degree)">Graduate (B.Tech/Degree)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Location</label>
                            <div className="relative">
                                <LucideIcons.MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City, State"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 bg-slate-50/50 transition-all outline-none font-bold"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Area of Interest</label>
                            <select
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 bg-slate-50/50 transition-all outline-none font-bold"
                            >
                                <option value="">Discovery Mode</option>
                                <option value="Technology">Technology & Software</option>
                                <option value="Science">Pure Science & Research</option>
                                <option value="Civil Services">Civil Services (IAS/IPS)</option>
                                <option value="Medicine">Medicine & Healthcare</option>
                                <option value="Arts">Arts & Designing</option>
                                <option value="Commerce">Business & Finance</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{t('breakTimeSkills')}</label>
                        <select
                            name="breakTime"
                            value={formData.breakTime}
                            onChange={handleChange}
                            className="w-full p-4 rounded-2xl border-2 border-slate-50 focus:border-blue-500 bg-slate-50/50 transition-all outline-none font-bold"
                        >
                            <option value="">None</option>
                            <option value="7 days">7 days</option>
                            <option value="15 days">15 days</option>
                            <option value="30 days">30 days</option>
                            <option value="90 days">90 days (Summer Break)</option>
                        </select>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-5 rounded-[1.5rem] shadow-2xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 text-lg uppercase tracking-widest"
                        >
                            <LucideIcons.ShieldCheck />
                            {t('saveProfile')}
                        </button>
                        <p className="text-center text-slate-300 text-[10px] mt-6 font-black uppercase tracking-[0.2em]">Safe & Local Data Storage</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentProfile;
