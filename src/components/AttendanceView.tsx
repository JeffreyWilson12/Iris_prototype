import React, { useState } from 'react';
import { Filter, Download, CheckCircle2, XCircle, Clock, AlertCircle, Search, Calendar } from 'lucide-react';
import { AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceViewProps {
  records: AttendanceRecord[];
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ records }) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredRecords = records.filter(r => {
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchClass = classFilter === 'All' || r.classCode === classFilter;
    const matchSearch = r.studentName.toLowerCase().includes(search.toLowerCase()) || 
                        r.studentId.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchClass && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Student Attendance Audit Log</h2>
          <p className="text-sm text-slate-500 mt-1">
            Immutable recognition records verified by DeepFace computer vision layer.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-xs transition-all flex items-center gap-2">
            <Download className="w-4 h-4 text-[#2563EB]" />
            Export CSV / PDF
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Filter by student name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          {['All', 'Present', 'Absent', 'Late', 'Excused'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st 
                  ? 'bg-[#1E293B] text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <select 
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Modules</option>
            <option value="CV-401">CV-401 (Computer Vision)</option>
            <option value="GAI-202">GAI-202 (Generative AI)</option>
            <option value="ROB-305">ROB-305 (Robotics)</option>
            <option value="DS-104">DS-104 (Data Science)</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-xs uppercase">
              <tr>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6">Student Information</th>
                <th className="py-3.5 px-6">Class Code & Title</th>
                <th className="py-3.5 px-6">Camera Source</th>
                <th className="py-3.5 px-6">Recognition Status</th>
                <th className="py-3.5 px-6 text-right">Match Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-600 whitespace-nowrap">
                      <div>{rec.date}</div>
                      <div className="text-slate-400 font-medium">{rec.timestamp}</div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{rec.studentName}</p>
                      <p className="text-xs font-mono text-slate-400">{rec.studentId}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-mono text-xs font-bold inline-block mb-1">
                        {rec.classCode}
                      </span>
                      <p className="text-xs text-slate-600 truncate max-w-xs">{rec.className}</p>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">
                      {rec.cameraSessionId}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        rec.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                        rec.status === 'Late' ? 'bg-amber-100 text-amber-800' :
                        rec.status === 'Excused' ? 'bg-blue-100 text-blue-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {rec.status === 'Present' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {rec.status === 'Late' && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                        {rec.status === 'Absent' && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono">
                      {rec.confidenceScore > 0 ? (
                        <div className="inline-flex items-center gap-2">
                          <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className="bg-emerald-500 h-full rounded-full" 
                              style={{ width: `${rec.confidenceScore}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-800">{rec.confidenceScore}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">MANUAL / ABSENT</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No attendance records match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
