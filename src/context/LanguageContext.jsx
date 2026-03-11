import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Use localStorage to persist language preference
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
        // Update document language for accessibility
        document.documentElement.lang = language;
    }, [language]);

    const t = (key) => {
        if (!translations[language]) return key;
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            <div className={`font-sans ${language === 'hi' ? 'font-devanagari' : language === 'te' ? 'font-telugu' : ''}`}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
