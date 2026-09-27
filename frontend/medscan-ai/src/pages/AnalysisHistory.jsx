import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { 
  History, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Plus, 
  Calendar, 
  FileText, 
  User
} from 'lucide-react';

export const AnalysisHistory = () => {
  const { analyses, deleteAnalysis, searchTerm } = useAnalysis();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('search') || '';

  const [localSearch, setLocalSearch] = useState(queryParam || searchTerm || '');
  const [riskFilter, setRiskFilter] = useState('All');
  const navigate = useNavigate();

  const filteredAnalyses = analyses.filter(item => {
    const matchesSearch = item.patientName.toLowerCase().includes(localSearch.toLowerCase()) ||
      item.medicines.some(m => m.name.toLowerCase().includes(localSearch.toLowerCase()));
    
    const matchesRisk = riskFilter === 'All' || item.riskLevel.toLowerCase() === riskFilter.toLowerCase();

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-8 h-8 text-[#006859]" />
            Analysis History
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Complete archive of patient prescription scans and risk reports.
          </p>
        </div>

        <button
          onClick={() => navigate('/scan')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006859] hover:bg-[#005044] text-white font-bold text-xs rounded-full shadow-md transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Prescription Scan</span>
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Filter by patient or drug name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#006859]"
          />
        </div>

        {/* Risk Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Risk Tier:
          </span>
          {['All', 'Low', 'Moderate', 'High', 'Critical'].map((tier) => (
            <button
              key={tier}
              onClick={() => setRiskFilter(tier)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                riskFilter === tier
                  ? 'bg-[#006859] border-[#006859] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* History Grid / List */}
      {filteredAnalyses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Analysis History Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            No matching prescription scans found. Try adjusting your search query or upload a new scan.
          </p>
          <button
            onClick={() => navigate('/scan')}
            className="px-6 py-2.5 bg-[#006859] text-white font-bold text-xs rounded-full shadow-md"
          >
            Start First Scan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnalyses.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/results/${item.id}`)}
              className="bg-white rounded-3xl border border-[#e2e8f0] hover:border-[#006859] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#006859]" />
                    <span className="font-bold text-slate-900 group-hover:text-[#006859] transition-colors">
                      {item.patientName}
                    </span>
                  </div>
                  <RiskBadge level={item.riskLevel} />
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>

                {/* Medicines Tags */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Prescribed Medicines:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.medicines.map((m, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#f0f7f5] text-[#006859] font-semibold text-xs rounded-lg border border-[#cce3dd]"
                      >
                        {m.name} ({m.dose})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-[#006859] group-hover:underline flex items-center gap-1">
                  <Eye className="w-4 h-4" /> View Full Report
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAnalysis(item.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
