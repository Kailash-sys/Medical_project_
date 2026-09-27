import React, { useState } from 'react';
import { useAnalysis } from '../../context/AnalysisContext';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Plus, Menu, X, UserCheck, Stethoscope, CheckCircle2 } from 'lucide-react';

export const Header = ({ setMobileOpen }) => {
  const { 
    doctorMode, 
    toggleDoctorMode, 
    searchTerm, 
    setSearchTerm, 
    notifications,
    markNotificationsRead 
  } = useAnalysis();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/history?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#f6f9f8]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#e2ece9] transition-all">
      {/* Left Mobile Menu Toggle + Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden hover:bg-slate-200/60"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search Input matching screenshot */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients, medications..."
            className="w-full pl-11 pr-4 py-2 bg-[#edf3f1] hover:bg-[#e6eee9] focus:bg-white text-slate-800 placeholder-slate-400 text-sm rounded-full border border-[#d8e5e1] focus:border-[#006859] focus:ring-2 focus:ring-[#006859]/20 transition-all outline-none"
          />
        </form>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) markNotificationsRead();
            }}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-full relative transition-all"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-semibold text-sm text-slate-800">Clinical Alerts</h3>
                <span className="text-xs bg-teal-50 text-[#006859] font-medium px-2 py-0.5 rounded-full">
                  {notifications.length} Total
                </span>
              </div>
              <div className="space-y-3 pt-3 max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="text-xs p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50/50 transition-all border border-slate-100">
                    <div className="font-semibold text-slate-800 flex items-center justify-between">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 mt-1">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-300 hidden sm:block" />

        {/* Doctor Mode Button matching screenshot */}
        <button
          onClick={toggleDoctorMode}
          className={`
            flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 shadow-2xs
            ${doctorMode
              ? 'bg-[#e0f2fe] border-[#38bdf8] text-[#0369a1] hover:bg-[#bae6fd]'
              : 'bg-[#e6f4f1] border-[#70c2b4] text-[#006859] hover:bg-[#d5ede7]'
            }
          `}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Doctor Mode</span>
          {doctorMode && (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] ml-0.5" />
          )}
        </button>

        {/* Doctor Avatar */}
        <div 
          onClick={() => navigate('/profile')}
          className="cursor-pointer group flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full ring-2 ring-[#006859]/20 group-hover:ring-[#006859]/50 overflow-hidden transition-all shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
              alt="Doctor Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
