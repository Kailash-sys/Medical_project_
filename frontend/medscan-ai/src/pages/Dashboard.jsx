import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { StatCard } from '../components/common/StatCard';
import { RiskBadge } from '../components/common/RiskBadge';
import { 
  Users, 
  FileText, 
  Pill, 
  AlertTriangle, 
  Plus, 
  History, 
  ArrowRight,
  PieChart,
  Eye
} from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, analyses } = useAnalysis();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header & CTA Button matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Overview of clinical analyses and potential interaction risks.
          </p>
        </div>

        {/* Primary CTA button matching screenshot */}
        <button
          onClick={() => navigate('/scan')}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#006859] hover:bg-[#005246] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Analyze New Prescription</span>
        </button>
      </div>

      {/* 4 Stat Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="TOTAL PATIENTS"
          value={stats.totalPatients}
          icon={Users}
        />
        <StatCard
          title="PRESCRIPTIONS ANALYZED"
          value={stats.prescriptionsAnalyzed}
          icon={FileText}
        />
        <StatCard
          title="MEDICINES ANALYZED"
          value={stats.medicinesAnalyzed}
          icon={Pill}
        />
        <StatCard
          title="POTENTIAL INTERACTIONS"
          value={stats.potentialInteractions}
          icon={AlertTriangle}
          isDanger={true}
        />
      </div>

      {/* Lower Main Grid (Recent Analyses + Risk Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Analyses Table (2 Cols width) matching screenshot */}
        <div className="lg:col-span-2 glass rounded-3xl border border-[#e2e8f0]/60 p-6 shadow-sm hover-lift flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-[#006859]" />
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Recent Analyses
                </h2>
              </div>
              <Link
                to="/history"
                className="text-xs font-bold text-[#006859] hover:text-[#004d42] flex items-center gap-1 hover:underline"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold text-xs">
                    <th className="py-3 px-3">Patient</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Medicines</th>
                    <th className="py-3 px-3 text-center">Risk</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {analyses.slice(0, 5).map((item) => (
                    <tr 
                      key={item.id}
                      onClick={() => navigate(`/results/${item.id}`)}
                      className="hover:bg-[#f7faf9] transition-colors cursor-pointer group"
                    >
                      {/* Patient Name */}
                      <td className="py-4 px-3 font-semibold text-slate-900 group-hover:text-[#006859] whitespace-nowrap">
                        {item.patientName}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-3 text-slate-500 text-xs whitespace-nowrap">
                        {item.date}
                      </td>

                      {/* Medicines Tags matching screenshot pill design */}
                      <td className="py-4 px-3">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {item.medicines.map((m, idx) => (
                            <span 
                              key={idx} 
                              className="px-2.5 py-1 bg-slate-100 text-slate-700 font-medium text-xs rounded-md border border-slate-200"
                            >
                              {m.tag || m.name}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Risk Badge matching screenshot outline pill */}
                      <td className="py-4 px-3 text-center whitespace-nowrap">
                        <RiskBadge level={item.riskLevel} />
                      </td>

                      {/* Action */}
                      <td className="py-4 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/results/${item.id}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-[#006859] hover:bg-[#e6f4f1] rounded-lg transition-colors"
                          title="View Analysis Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Distribution Card matching screenshot */}
        <div className="glass rounded-3xl border border-[#e2e8f0]/60 p-6 shadow-sm hover-lift flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
              <PieChart className="w-5 h-5 text-[#006859]" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Risk Distribution
              </h2>
            </div>

            {/* Horizontal Multi-colored Progress Bar matching screenshot */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex mb-8">
              <div 
                style={{ width: `${stats.riskDistribution.lowRisk}%` }} 
                className="bg-[#006859] h-full" 
                title={`Low Risk: ${stats.riskDistribution.lowRisk}%`}
              />
              <div 
                style={{ width: `${stats.riskDistribution.moderate}%` }} 
                className="bg-[#964b22] h-full" 
                title={`Moderate: ${stats.riskDistribution.moderate}%`}
              />
              <div 
                style={{ width: `${stats.riskDistribution.highRisk}%` }} 
                className="bg-[#c92a2a] h-full" 
                title={`High Risk: ${stats.riskDistribution.highRisk}%`}
              />
              <div 
                style={{ width: `${stats.riskDistribution.critical}%` }} 
                className="bg-[#800000] h-full" 
                title={`Critical: ${stats.riskDistribution.critical}%`}
              />
            </div>

            {/* Risk Breakdown Legend List matching screenshot */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#006859]" />
                  <span className="font-semibold text-slate-700">Low Risk</span>
                </div>
                <span className="font-bold text-slate-900">{stats.riskDistribution.lowRisk}%</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#964b22]" />
                  <span className="font-semibold text-slate-700">Moderate</span>
                </div>
                <span className="font-bold text-slate-900">{stats.riskDistribution.moderate}%</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#c92a2a]" />
                  <span className="font-semibold text-slate-700">High Risk</span>
                </div>
                <span className="font-bold text-slate-900">{stats.riskDistribution.highRisk}%</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#800000]" />
                  <span className="font-semibold text-slate-700">Critical</span>
                </div>
                <span className="font-bold text-slate-900">{stats.riskDistribution.critical}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Summary */}
          <div className="mt-8 pt-4 border-t border-slate-100 bg-[#f8faf9] p-4 rounded-2xl border border-[#e2ece9] text-xs text-slate-600">
            <span className="font-bold text-slate-800">Clinical Recommendation:</span> High and Critical risk cases require immediate pharmacist/doctor sign-off before dispensing.
          </div>
        </div>

      </div>
    </div>
  );
};
