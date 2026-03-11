import React from 'react';
import Navbar from '../components/Navbar';
import CareerRecommendation from '../components/CareerRecommendation';
import * as LucideIcons from 'lucide-react';

const CareerRecommendationPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                        <LucideIcons.Target size={14} />
                        AI Power
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
                        Career Recommendation Engine
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Let AI find your perfect match. Fill in your details below and discover careers customized to your unique profile.
                    </p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <CareerRecommendation />
                </div>
            </main>
        </div>
    );
};

export default CareerRecommendationPage;
