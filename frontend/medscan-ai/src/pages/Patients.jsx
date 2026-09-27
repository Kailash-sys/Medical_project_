import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../data/mockData';
import { Users, Search, Plus, Calendar, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Patients = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.primaryCondition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-8 h-8 text-[#006859]" />
            Patient Registry
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Clinical profiles, active prescriptions, and documented allergies.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient name, ID, or condition..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#006859]"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-[#f8faf9] text-slate-500 font-bold text-xs">
                <th className="py-4 px-6">Patient Name</th>
                <th className="py-4 px-6">Age / Sex</th>
                <th className="py-4 px-6">Primary Condition</th>
                <th className="py-4 px-6">Allergies</th>
                <th className="py-4 px-6">Active Rx</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-[#f7faf9] transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <div>{p.name}</div>
                    <span className="text-[11px] font-semibold text-[#006859]">{p.id}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{p.age} yrs / {p.gender}</td>
                  <td className="py-4 px-6 text-slate-700">{p.primaryCondition}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {p.allergies.map((a, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-md border border-rose-200">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">{p.activePrescriptions}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => navigate('/history')}
                      className="p-2 text-[#006859] hover:bg-[#e6f4f1] rounded-xl transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
