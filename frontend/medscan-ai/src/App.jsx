import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import { MainLayout } from './components/layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { MedicineScan } from './pages/MedicineScan';
import { AnalysisResults } from './pages/AnalysisResults';
import { AnalysisHistory } from './pages/AnalysisHistory';
import { AIAssistant } from './pages/AIAssistant';
import { Medications } from './pages/Medications';
import { InteractionReports } from './pages/InteractionReports';
import { Patients } from './pages/Patients';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <AnalysisProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authenticated / App Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<MedicineScan />} />
            <Route path="/results/:id" element={<AnalysisResults />} />
            <Route path="/history" element={<AnalysisHistory />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/interaction-reports" element={<InteractionReports />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Settings />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AnalysisProvider>
  );
}
