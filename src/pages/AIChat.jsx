import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, User, Send, Compass, GraduationCap } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { careers } from '../data/careers';

const predefinedResponses = [
    { keywords: ['hi', 'hello', 'hey', 'greetings', 'namaste', 'howdy'], response: "Hello there! 👋 I'm your PathFinder AI Mentor. How can I help you today? You can ask me about different careers, subject choices, or specific skills you want to learn!" },
    { keywords: ['thanks', 'thank you', 'ok', 'awesome', 'great', 'cool'], response: "You're welcome! Let me know if you have any other questions about your career journey or roadmaps." },
    { keywords: ['who are you', 'what are you', 'your name'], response: "I'm PathFinder AI, your dedicated digital mentor! My goal is to guide you through various career paths, colleges, and skills based on real-world data." },
    { keywords: ['space', 'astronomy', 'universe'], response: "That's exciting! For someone interested in Space Science, I recommend exploring: 1. Aerospace Engineering 2. Astrophysics 3. Becoming an ISRO/NASA Scientist 4. Space Research." },
    { keywords: ['software', 'coding', 'programming', 'computer'], response: "Great choice! The tech world is vast. Consider: 1. Computer Science Engineering 2. Data Science 3. Cybersecurity 4. AI/ML Engineering." },
    { keywords: ['doctor', 'medicine', 'neet', 'biology'], response: "A noble path! To become a Doctor, you'll need to focus on Biology (BiPC) and prepare for NEET. Specialized paths include MBBS, BDS, or Veterinary Science." },
    { keywords: ['ias', 'upsc', 'government', 'civil service'], response: "For Civil Services, you first need a graduation in any field. Start reading newspapers daily and focus on history, geography, and polity. UPSC is the main gateway." },
    { keywords: ['10th', 'after 10'], response: "After 10th, you have three main streams: 1. Science (MPC for Engineering, BiPC for Medicine) 2. Commerce (for Finance/Business) 3. Arts/Humanities (for Law, Design, Social Sciences)." },
    { keywords: ['art', 'painter', 'creative'], response: "Creative paths are wonderful! Consider: 1. Fine Arts (BFA) 2. Graphic Design 3. Animation & VFX 4. Architecture if you like structure with design." },
    { keywords: ['business', 'owner', 'startup'], response: "Entrepreneurship is a mindset! You can pursue BBA/MBA, or start with a problem you want to solve. B.Com or Economics are also great foundations." }
];

const AIChat = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your PathFinder AI Career Mentor. I'm here to help you navigate your future, discover your passions, and build your roadmap. What's on your mind today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);

        const userInput = input.toLowerCase();
        setInput('');

        // Simulate thinking
        setTimeout(() => {
            let botResponse = "";
            let found = false;

            // Normalize user input for better matching
            const cleanInput = userInput.replace(/[^\w\s]/g, ' ').trim();
            const inputWords = cleanInput.split(/\s+/);

            // 1. Check conversational predefined rules first
            for (const item of predefinedResponses) {
                if (item.keywords.some(k => {
                    // Whole word matching for conversational keywords
                    const regex = new RegExp(`\\b${k}\\b`, 'i');
                    return regex.test(userInput);
                })) {
                    botResponse = item.response;
                    found = true;
                    break;
                }
            }

            // 2. Dynamic DB search if no conversational match found
            if (!found) {
                const stopWords = ['what', 'how', 'who', 'where', 'when', 'why', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'like', 'want', 'become', 'good', 'best', 'career', 'job', 'path'];

                const searchWords = inputWords.filter(w => w.length > 2 && !stopWords.includes(w));

                if (searchWords.length > 0) {
                    const matchedCareers = careers.filter(c => {
                        const cText = `${c.name} ${c.category} ${c.description} ${c.skillsRequired.join(" ")}`.toLowerCase();
                        return searchWords.some(w => cText.includes(w));
                    });

                    if (matchedCareers.length > 0) {
                        const c = matchedCareers[0];
                        botResponse = `That sounds very closely related to the **${c.category}** sector! Let's talk about becoming a **${c.name}**. 

Generally, you'd pursue an education path like: **${c.educationPath}**.
Essential skills you should develop: **${c.skillsRequired.join(", ")}**.
Market demand: **${c.demand}** with starting salaries roughly **${c.salaryRange}**.

Would you like me to link you to its full roadmap?`;
                        found = true;
                    }
                }
            }

            // 3. Fallback
            if (!found) {
                botResponse = "That's an interesting thought! While I don't have a specific roadmap for that exact phrase right now, you might find something closely matching if you use our **Career Explorer**. Could you tell me what your favorite school subject is?";
            }

            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        }, 800);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            <Navbar />

            <main className="flex-1 overflow-y-auto p-4 md:p-10">
                <div className="max-w-4xl mx-auto space-y-8 pb-10">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-5 duration-500`}>
                            <div className={`flex max-w-[85%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0 shadow-lg ${msg.isBot ? 'bg-indigo-600 text-white mr-4' : 'bg-blue-600 text-white ml-4'}`}>
                                    {msg.isBot ? <Bot size={24} /> : <User size={24} />}
                                </div>
                                <div className={`p-6 rounded-[2rem] shadow-sm border border-slate-100 ${msg.isBot ? 'bg-white text-slate-800 rounded-tl-none font-medium' : 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-900/10 font-bold'}`}>
                                    <p className="text-lg leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="bg-white border-t border-slate-100 p-6 md:p-10 sticky bottom-0 z-50 shadow-2xl">
                <div className="max-w-4xl mx-auto relative flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="I like space science... / What should I do after 10th?"
                            className="w-full pl-8 pr-20 py-6 rounded-[2rem] bg-slate-50 border-2 border-slate-50 focus:border-indigo-600 focus:bg-white outline-none transition-all text-lg font-medium shadow-inner"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="absolute right-3 top-3 bottom-3 w-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 hover:bg-indigo-700 shadow-xl shadow-indigo-200 active:scale-95"
                        >
                            <Send size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide md:max-w-[40%]">
                        <QuickAction label={t('careerRoadmap')} icon={<Compass size={14} />} onClick={() => navigate('/explorer')} />
                        <QuickAction label={t('scholarships')} icon={<GraduationCap size={14} />} onClick={() => navigate('/scholarships')} />
                    </div>
                </div>
            </footer>
        </div>
    );
};

const QuickAction = ({ label, icon, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100 whitespace-nowrap shadow-sm"
    >
        {icon}
        {label}
    </button>
);

export default AIChat;
