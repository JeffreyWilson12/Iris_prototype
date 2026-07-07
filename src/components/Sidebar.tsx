import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  UserCheck, 
  BarChart3, 
  AlertTriangle, 
  BrainCircuit, 
  Users, 
  GraduationCap, 
  Settings,
  ShieldAlert,
  Cpu
} from 'lucide-react';

export type NavTab = 
  | 'overview' 
  | 'live' 
  | 'attendance' 
  | 'analytics' 
  | 'alerts' 
  | 'behaviour' 
  | 'users' 
  | 'classes';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  unreadAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  unreadAlertsCount 
}) => {
  const menuItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'live', label: 'Live Cameras', icon: <Video className="w-5 h-5" /> },
    { id: 'attendance', label: 'Attendance Log', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics & Trends', icon: <BarChart3 className="w-5 h-5" /> },
    { 
      id: 'alerts', 
      label: 'System Alerts', 
      icon: <AlertTriangle className="w-5 h-5" />,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined 
    },
    { id: 'behaviour', label: 'AI Behaviour Insights', icon: <BrainCircuit className="w-5 h-5 text-indigo-400" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" /> },
    { id: 'classes', label: 'Class Management', icon: <GraduationCap className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-700/60 selection:bg-blue-600 selection:text-white">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-700/80 flex items-center gap-3 bg-[#182232]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Cpu className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
            Vision<span className="text-[#2563EB]">AI</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-medium">
            Admin Core v2.4
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-3">
          Dashboard Modules
        </p>
        {menuItems.slice(0, 6).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 text-xs font-bold bg-rose-500 text-white rounded-full animate-bounce">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase pt-6 mb-3">
          Administration
        </p>
        {menuItems.slice(6).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* System Status Footer */}
      <div className="p-4 m-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            YOLOv8 + DeepFace
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
            ONLINE
          </span>
        </div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full w-[94%]" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
          <span>GPU Load: 42%</span>
          <span>FPS: ~30.0</span>
        </div>
      </div>
    </aside>
  );
};
