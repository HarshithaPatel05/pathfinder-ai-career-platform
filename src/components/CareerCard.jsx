import React from "react";
import * as LucideIcons from "lucide-react";
import { Briefcase } from "lucide-react";

const CareerCard = ({ career, onClick }) => {
    const Icon =
        LucideIcons[career.icon] !== undefined
            ? LucideIcons[career.icon]
            : Briefcase;

    return (
        <div
            onClick={onClick}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 cursor-pointer group"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {Icon && <Icon size={24} />}
                </div>

                <h3 className="text-lg font-bold text-slate-800">{career.name}</h3>
            </div>

            <p className="text-slate-600 text-sm line-clamp-2">
                {career.description}
            </p>

            <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm">
                View Roadmap
                <LucideIcons.ChevronRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                />
            </div>
        </div>
    );
};

export default CareerCard;