import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  GraduationCap, 
  Video, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Activity,
  UserCheck,
  BrainCircuit
} from 'lucide-react';
import { SystemStats, AttendanceRecord, AlertNotification, CameraSession } from '../types';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 1.2, 
  decimals = 0, 
  suffix = '', 
  prefix = '' 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const endValue = end;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
      setCount(easeProgress * endValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    const animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

interface AuroraBackgroundProps {
  color1: string;
  color2: string;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ color1, color2 }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-0 group-hover:opacity-15 dark:group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
      <div 
        className="aurora-blob w-[220px] h-[220px] -top-12 -left-12 opacity-80"
        style={{
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`
        }}
      />
      <div 
        className="aurora-blob-2 w-[220px] h-[220px] -bottom-12 -right-12 opacity-80"
        style={{
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`
        }}
      />
    </div>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOutCubic
      delay: i * 0.1,
    }
  })
};

interface OverviewViewProps {
  stats: SystemStats;
  attendance: AttendanceRecord[];
  cameras: CameraSession[];
  alerts: AlertNotification[];
  onNavigateTab: (tab: any) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  stats,
  attendance,
  cameras,
  alerts,
  onNavigateTab
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            System Overview Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time computer vision attendance telemetry and AI behavioral observations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigateTab('live')}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-xs transition-all flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-[#2563EB]" />
            Inspect Cameras
          </button>
          <button 
            onClick={() => onNavigateTab('behaviour')}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
          >
            <BrainCircuit className="w-4 h-4" />
            AI Analytics Layer
          </button>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Enrolled Students */}
        <motion.div 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          onClick={() => onNavigateTab('users')}
          className="stats-card stats-card-students p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
        >
          <AuroraBackground color1="#2563EB" color2="#06B6D4" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Enrolled Students</span>
            <div className="relative">
              <div 
                className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15), transparent)' }}
              />
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 relative z-10 transition-transform duration-300 group-hover:scale-[1.08] group-hover:rotate-[2deg]">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-4 relative z-10">
            <CountUp end={stats.totalStudents} />
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium relative z-10">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.2% from last semester</span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <ArrowUpRight className="w-4 h-4 text-blue-500" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#2563EB] bg-[size:200%_auto] opacity-0 group-hover:opacity-100 group-hover:bg-[100%_0] transition-all duration-500 ease-out z-10" />
        </motion.div>

        {/* Card 2: Attendance Rate */}
        <motion.div 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          onClick={() => onNavigateTab('attendance')}
          className="stats-card stats-card-attendance p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
        >
          <AuroraBackground color1="#10B981" color2="#34D399" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Today's Attendance Rate</span>
            <div className="relative">
              <div 
                className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent)' }}
              />
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 relative z-10 transition-transform duration-300 group-hover:scale-[1.08] group-hover:rotate-[2deg]">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-4 relative z-10">
            <CountUp end={stats.todayAttendancePercent} decimals={1} suffix="%" />
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 dark:text-slate-400 relative z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Target: &gt;85.0% threshold met</span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-[size:200%_auto] opacity-0 group-hover:opacity-100 group-hover:bg-[100%_0] transition-all duration-500 ease-out z-10" />
        </motion.div>

        {/* Card 3: Live Cameras */}
        <motion.div 
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          onClick={() => onNavigateTab('live')}
          className="stats-card stats-card-cameras p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
        >
          <AuroraBackground color1="#8B5CF6" color2="#6366F1" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Live Cameras Online</span>
            <div className="relative">
              <div 
                className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)' }}
              />
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 relative z-10 transition-transform duration-300 group-hover:scale-[1.08] group-hover:rotate-[2deg]">
                <Video className="w-5 h-5" />
              </div>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-4 relative z-10">
            <CountUp end={stats.liveCamerasOnline} /> <span className="text-lg font-normal text-slate-400 dark:text-slate-500">/ <CountUp end={stats.totalCameras} /></span>
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium relative z-10">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>2 units in maintenance check</span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <ArrowUpRight className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#4F46E5] bg-[size:200%_auto] opacity-0 group-hover:opacity-100 group-hover:bg-[100%_0] transition-all duration-500 ease-out z-10" />
        </motion.div>

        {/* Card 4: Active Modules */}
        <motion.div 
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          onClick={() => onNavigateTab('classes')}
          className="stats-card stats-card-courses p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
        >
          <AuroraBackground color1="#F59E0B" color2="#FBBF24" />
          <div className="flex items-center justify-between relative z-10">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Modules Today</span>
            <div className="relative">
              <div 
                className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent)' }}
              />
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 relative z-10 transition-transform duration-300 group-hover:scale-[1.08] group-hover:rotate-[2deg]">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-4 relative z-10">
            <CountUp end={stats.activeClasses} />
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 dark:text-slate-400 relative z-10">
            <span>Across 4 Academic Departments</span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <ArrowUpRight className="w-4 h-4 text-amber-500" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] via-[#FBBF24] to-[#D97706] bg-[size:200%_auto] opacity-0 group-hover:opacity-100 group-hover:bg-[100%_0] transition-all duration-500 ease-out z-10" />
        </motion.div>
      </div>


    </div>
  );
};
