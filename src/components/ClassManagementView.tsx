import React, { useState } from 'react';
import { GraduationCap, Plus, Users, Clock, MapPin, Trash2, BookOpen } from 'lucide-react';
import { ClassItem } from '../types';

interface ClassManagementViewProps {
  classes: ClassItem[];
}

export const ClassManagementView: React.FC<ClassManagementViewProps> = ({ classes }) => {
  const [classList, setClassList] = useState<ClassItem[]>(classes);
  const [showModal, setShowModal] = useState(false);

  // New class state
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('Dr. Alan Vance');
  const [room, setRoom] = useState('Lab 3B (AI Core)');
  const [schedule, setSchedule] = useState('Mon, Wed 10:00 AM');

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    const newCls: ClassItem = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase(),
      name,
      teacherName: teacher,
      department: 'Artificial Intelligence',
      room,
      schedule,
      totalStudents: 30
    };

    setClassList([newCls, ...classList]);
    setCode('');
    setName('');
    setShowModal(false);
  };

  const handleRemove = (id: string) => {
    setClassList(classList.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Academic Module & Camera Room Assignment</h2>
          <p className="text-sm text-slate-500 mt-1">
            Map academic courses to specific IP camera hardware and assigned faculty instructors.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          + Create Module
        </button>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {classList.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative flex flex-col justify-between group hover:border-[#2563EB]/50 transition-all">
            <div>
              <div className="flex items-start justify-between">
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#2563EB] font-mono text-xs font-black tracking-wider">
                  {cls.code}
                </span>
                <button 
                  onClick={() => handleRemove(cls.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                  title="Archive Module"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-3">{cls.name}</h3>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">{cls.department}</p>

              <div className="space-y-2 mt-5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Instructor: <strong className="text-slate-900">{cls.teacherName}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Camera Location: <strong className="font-mono text-slate-800">{cls.room}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Schedule: <span className="text-slate-700">{cls.schedule}</span></span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>{cls.totalStudents} Enrolled Students</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                ● YOLOv8 ROI Ready
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Create New Course Module</h3>
            <p className="text-xs text-slate-500 mb-5">Assign course parameters and link IP vision hardware.</p>

            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Course Code</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. NLP-501"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#2563EB] focus:bg-white font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Course Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Natural Language Processing"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Assigned Faculty</label>
                <input 
                  type="text" 
                  required
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Camera Lab Room</label>
                <input 
                  type="text" 
                  required
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Weekly Schedule</label>
                <input 
                  type="text" 
                  required
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2563EB] text-white font-semibold text-xs rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                >
                  Provision Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
