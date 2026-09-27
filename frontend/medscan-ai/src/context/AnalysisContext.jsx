import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ANALYSES, INITIAL_STATS } from '../data/mockData';

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analyses, setAnalyses] = useState(() => {
    const saved = localStorage.getItem('mediscan_analyses');
    return saved ? JSON.parse(saved) : INITIAL_ANALYSES;
  });

  const [stats, setStats] = useState(INITIAL_STATS);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [doctorMode, setDoctorMode] = useState(true); // Default to Doctor Mode as shown in header screenshot
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'High Interaction Alert', text: 'Eleanor Rigby prescription flagged for severe bleeding risk.', time: '10 min ago', unread: true },
    { id: 2, title: 'Analysis Complete', text: 'Arthur Pendelton antibiotic scan verified clear.', time: '1 hour ago', unread: true },
    { id: 3, title: 'Critical Alert', text: 'James Montgomery Digoxin toxicity warning.', time: 'Yesterday', unread: false }
  ]);
  const [settings, setSettings] = useState({
    aiModel: 'Gemini 1.5 Pro (Clinical Fine-Tuned)',
    apiKey: '',
    autoFlagHighRisk: true,
    enableNotifications: true,
    hospitalOrg: 'St. Jude Clinical Precision Network'
  });

  useEffect(() => {
    localStorage.setItem('mediscan_analyses', JSON.stringify(analyses));
  }, [analyses]);

  const addAnalysis = (newScan) => {
    const formatted = {
      id: `analysis-${Date.now()}`,
      date: 'Just now',
      timestamp: new Date().toISOString(),
      status: newScan.riskLevel === 'High' || newScan.riskLevel === 'Critical' ? 'Flagged for Review' : 'Verified Clear',
      ...newScan
    };
    setAnalyses(prev => [formatted, ...prev]);
    setCurrentAnalysis(formatted);
    
    // Update stats counts dynamically
    setStats(prev => ({
      ...prev,
      prescriptionsAnalyzed: prev.prescriptionsAnalyzed + 1,
      medicinesAnalyzed: prev.medicinesAnalyzed + (newScan.medicines?.length || 1),
      potentialInteractions: newScan.riskLevel === 'High' || newScan.riskLevel === 'Critical' ? prev.potentialInteractions + 1 : prev.potentialInteractions
    }));

    return formatted;
  };

  const getAnalysisById = (id) => {
    return analyses.find(a => a.id === id) || analyses[0];
  };

  const deleteAnalysis = (id) => {
    setAnalyses(prev => prev.filter(a => a.id !== id));
  };

  const toggleDoctorMode = () => {
    setDoctorMode(prev => !prev);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <AnalysisContext.Provider
      value={{
        analyses,
        stats,
        currentAnalysis,
        setCurrentAnalysis,
        addAnalysis,
        getAnalysisById,
        deleteAnalysis,
        doctorMode,
        toggleDoctorMode,
        searchTerm,
        setSearchTerm,
        notifications,
        markNotificationsRead,
        settings,
        setSettings
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
