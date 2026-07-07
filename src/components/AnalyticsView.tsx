import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { WEEKLY_TREND_DATA, BEHAVIOUR_PIE_DATA } from '../data';
import { Calendar, TrendingUp, Users, Award, AlertCircle } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Attendance Analytics & Behavioral Trends</h2>
          <p className="text-sm text-slate-500 mt-1">
            Aggregated statistics derived from DeepFace recognition and MediaPipe pose telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Semester Period: Spring 2026</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Weekly Attendance Trend Line/Bar */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Weekly Attendance vs Department Target (%)</h3>
              <p className="text-xs text-slate-500">Tracking daily presence percentage across all 18 active classes</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#2563EB]">
                <span className="w-3 h-3 bg-[#2563EB] rounded-sm inline-block" /> Actual
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-1 bg-slate-400 inline-block" /> Target (90%)
              </span>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_TREND_DATA} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis domain={[60, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#60A5FA' }}
                />
                <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="attendance" stroke="#2563EB" strokeWidth={3} dot={{ r: 5, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Behavior Categorization Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-slate-800">AI Behavioral Distribution</h3>
            <p className="text-xs text-slate-500">Pose & eye-gaze telemetry breakdown</p>
          </div>

          <div className="h-64 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BEHAVIOUR_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {BEHAVIOUR_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', border: 'none', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">76%</span>
              <span className="text-[10px] uppercase font-mono text-slate-400">Attentive</span>
            </div>
          </div>

          <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-100">
            {BEHAVIOUR_PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Comparison Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h3 className="font-bold text-lg text-slate-800">Attentiveness vs Distraction by Academic Department</h3>
          <p className="text-xs text-slate-500">Correlating computer vision presence with classroom engagement metrics</p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { dept: 'Artificial Intelligence', attentive: 88, distracted: 12 },
                { dept: 'Computer Science', attentive: 81, distracted: 19 },
                { dept: 'Robotics', attentive: 92, distracted: 8 },
                { dept: 'Data Science', attentive: 79, distracted: 21 },
              ]}
              margin={{ top: 10, right: 30, left: -20, bottom: 5 }}
              barSize={32}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="dept" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff' }} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="attentive" name="Attentive (%)" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="distracted" name="Distracted / Fatigued (%)" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
