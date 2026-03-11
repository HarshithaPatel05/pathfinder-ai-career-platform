import React from 'react';
import * as LucideIcons from 'lucide-react';

const ComparisonTable = ({ careers }) => {
    if (!careers || careers.length === 0) return null;

    return (
        <div className="w-full overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-100">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-6 w-1/4 font-black text-slate-400 uppercase tracking-widest text-xs">Features</th>
                        {careers.map(career => (
                            <th key={career.id} className="p-6 w-1/4">
                                <span className="block text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{career.category}</span>
                                <span className="block text-xl font-black text-slate-800">{career.name}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 text-sm font-bold text-slate-600">Education Path</td>
                        {careers.map(career => (
                            <td key={career.id} className="p-6 text-sm font-medium text-slate-700">
                                <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg">
                                    {career.educationPath}
                                </span>
                            </td>
                        ))}
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 text-sm font-bold text-slate-600">Key Skills</td>
                        {careers.map(career => (
                            <td key={career.id} className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    {career.skillsRequired.map(skill => (
                                        <span key={skill} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-bold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </td>
                        ))}
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 text-sm font-bold text-slate-600">Average Salary</td>
                        {careers.map(career => (
                            <td key={career.id} className="p-6 font-black text-emerald-600">
                                {career.salaryRange || 'N/A'}
                            </td>
                        ))}
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 text-sm font-bold text-slate-600">Demand Level</td>
                        {careers.map(career => (
                            <td key={career.id} className="p-6">
                                <span className={`inline-flex items-center gap-1 font-bold text-xs uppercase px-2 py-1 rounded-md ${career.demand.includes('High') || career.demand.includes('Explosive') || career.demand.includes('Elite')
                                    ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                    {career.demand}
                                </span>
                            </td>
                        ))}
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 text-sm font-bold text-slate-600">Top Industries</td>
                        {careers.map(career => (
                            <td key={career.id} className="p-6 text-sm font-medium text-slate-700">
                                {career.industries.join(' • ')}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonTable;
