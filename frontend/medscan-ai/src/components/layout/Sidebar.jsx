import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  FileCheck2, 
  Pill, 
  AlertTriangle, 
  Users, 
  History, 
  Bot, 
  Settings, 
  HelpCircle,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { name: 'Analyze Prescription', path: '/scan', icon: FileCheck2 },
    { name: 'Medications', path: '/medications', icon: Pill },
    { name: 'Interaction Reports', path: '/interaction-reports', icon: AlertTriangle },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'Analysis History', path: '/history', icon: History },
    { name: 'AI Assistant', path: '/assistant', icon: Sparkles },
  ];

  const bottomNavItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#f2f6f5] border-r border-[#e2ece9] flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Brand Header matching screenshot */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006859] to-[#0f766e] flex items-center justify-center text-white shadow-md shadow-[#006859]/20 border border-teal-400/30">
              {/* Faceted/3D Icon effect */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-teal-100" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-800 leading-tight tracking-tight">
                MediSafe AI
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Clinical Precision
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-2 space-y-1.5">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-[#e5f0ed] text-[#006859] shadow-xs border border-[#cce3dd]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#006859]' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Links */}
        <div className="p-4 border-t border-[#e2ece9] space-y-1.5">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150
                  ${isActive 
                    ? 'bg-[#e5f0ed] text-[#006859]' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }
                `}
              >
                <Icon className="w-5 h-5 text-slate-500" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
};
