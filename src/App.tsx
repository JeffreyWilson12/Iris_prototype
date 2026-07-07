import React, { useState } from 'react';
import { NavTab } from './components/Sidebar';
import { SessionNavBar } from '@/components/ui/sidebar';
import { OverviewView } from './components/OverviewView';
import { LiveMonitoringView } from './components/LiveMonitoringView';
import { AttendanceView } from './components/AttendanceView';
import { AnalyticsView } from './components/AnalyticsView';
import { BehaviourSummaryView } from './components/BehaviourSummaryView';
import { UserManagementView } from './components/UserManagementView';
import { ClassManagementView } from './components/ClassManagementView';

import { 
  INITIAL_STATS, 
  SAMPLE_ATTENDANCE, 
  SAMPLE_CAMERAS, 
  SAMPLE_ALERTS, 
  SAMPLE_BEHAVIOURS, 
  SAMPLE_STUDENTS, 
  SAMPLE_CLASSES 
} from './data';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [alerts, setAlerts] = useState(SAMPLE_ALERTS);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved as "light" | "dark";
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 selection:bg-[#2563EB] selection:text-white">
      {/* Sidebar Navigation */}
      <SessionNavBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadAlertsCount={unreadAlertsCount} 
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dynamic View Renderer */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewView 
              stats={INITIAL_STATS}
              attendance={SAMPLE_ATTENDANCE}
              cameras={SAMPLE_CAMERAS}
              alerts={alerts}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'live' && (
            <LiveMonitoringView cameras={SAMPLE_CAMERAS} />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView records={SAMPLE_ATTENDANCE} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}

          {activeTab === 'behaviour' && (
            <BehaviourSummaryView logs={SAMPLE_BEHAVIOURS} />
          )}

          {activeTab === 'users' && (
            <UserManagementView students={SAMPLE_STUDENTS} teachers={[]} />
          )}

          {activeTab === 'classes' && (
            <ClassManagementView classes={SAMPLE_CLASSES} />
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">System Alert Notifications</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Automated low-attendance warnings (&lt;75% threshold), camera maintenance flags, and AI telemetry logs.
                  </p>
                </div>
                {unreadAlertsCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Mark All as Read
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {alerts.map((alt) => (
                  <div 
                    key={alt.id}
                    className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                      !alt.read ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-500/10' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${
                      alt.severity === 'high' ? 'bg-rose-100 text-rose-600' :
                      alt.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-indigo-100 text-indigo-600'
                    }`}>
                      {alt.severity === 'high' ? <ShieldAlert className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-base">{alt.title}</h4>
                        <span className="text-xs font-mono text-slate-400 shrink-0">{alt.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{alt.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
