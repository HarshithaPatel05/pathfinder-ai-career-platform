import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import StudentProfile from './pages/StudentProfile';
import StudentDashboard from './pages/StudentDashboard';
import CareerExplorer from './pages/CareerExplorer';
import CareerRoadmap from './pages/CareerRoadmap';
import ScholarshipFinder from './pages/ScholarshipFinder';
import CollegeExplorer from './pages/CollegeExplorer';
import EntranceExams from './pages/EntranceExams';
import DiscussionForum from './pages/DiscussionForum';
import RoleDashboard from './pages/RoleDashboard';
import AIChat from './pages/AIChat';
import CareerRecommendationPage from './pages/CareerRecommendationPage';
import SkillHub from './pages/SkillHub';
import CareerComparison from './pages/CareerComparison';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen font-sans text-slate-900 bg-slate-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/selection" element={<RoleSelection />} />
            <Route path="/setup" element={<StudentProfile />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/:roleId" element={<RoleDashboard />} />
            <Route path="/explorer" element={<CareerExplorer />} />
            <Route path="/roadmap/:id" element={<CareerRoadmap />} />
            <Route path="/scholarships" element={<ScholarshipFinder />} />
            <Route path="/colleges" element={<CollegeExplorer />} />
            <Route path="/exams" element={<EntranceExams />} />
            <Route path="/forum" element={<DiscussionForum />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/recommend" element={<CareerRecommendationPage />} />
            <Route path="/skills" element={<SkillHub />} />
            <Route path="/compare" element={<CareerComparison />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
