import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message, isBot }) => {
    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isBot ? 'bg-indigo-100 text-indigo-600 mr-2' : 'bg-blue-100 text-blue-600 ml-2'}`}>
                    {isBot ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className={`p-4 rounded-2xl ${isBot ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm' : 'bg-blue-600 text-white rounded-tr-none shadow-md'}`}>
                    <p className="text-sm leading-relaxed">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
