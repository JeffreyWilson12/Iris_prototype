import React, { useState } from 'react';
import { Users, UserPlus, Trash2, Shield, Search, Mail, GraduationCap, Edit, Check } from 'lucide-react';
import { Student, Teacher } from '../types';

interface UserManagementViewProps {
  students: Student[];
  teachers: Teacher[];
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ students, teachers }) => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New user state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState<any>('Artificial Intelligence');

  const [studentList, setStudentList] = useState<Student[]>(students);
  const [teacherList, setTeacherList] = useState<Teacher[]>(teachers);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    if (activeTab === 'students') {
      const newStu: Student = {
        id: `s-${Date.now()}`,
        studentId: `STU-2026${Math.floor(100 + Math.random() * 900)}`,
        name: newName,
        email: newEmail,
        department: newDept,
        enrolledClasses: ['CV-401'],
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
        overallAttendance: 100
      };
      setStudentList([newStu, ...studentList]);
    } else {
      const newTch: Teacher = {
        id: `t-${Date.now()}`,
        teacherId: `FAC-2026${Math.floor(10 + Math.random() * 90)}`,
        name: newName,
        email: newEmail,
        department: newDept,
        assignedClasses: ['CV-401']
      };
      setTeacherList([newTch, ...teacherList]);
    }

    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleRemoveStudent = (id: string) => {
    setStudentList(studentList.filter(s => s.id !== id));
  };

  const handleRemoveTeacher = (id: string) => {
    setTeacherList(teacherList.filter(t => t.id !== id));
  };

  const filteredStudents = studentList.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTeachers = teacherList.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.teacherId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">User & Role Administration</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage face embedding profiles, enrolled modules, and administrative access control.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          + Provision {activeTab === 'students' ? 'Student' : 'Faculty'}
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 sm:flex-initial px-6 py-2 rounded-lg font-semibold text-xs transition-all ${
              activeTab === 'students' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Students ({studentList.length})
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`flex-1 sm:flex-initial px-6 py-2 rounded-lg font-semibold text-xs transition-all ${
              activeTab === 'teachers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Faculty Teachers ({teacherList.length})
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder={`Search ${activeTab === 'students' ? 'student' : 'teacher'} name or ID...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {activeTab === 'students' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-xs uppercase">
                <tr>
                  <th className="py-3.5 px-6">Student ID</th>
                  <th className="py-3.5 px-6">Profile & Name</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Enrolled Modules</th>
                  <th className="py-3.5 px-6">Overall Attendance</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredStudents.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-slate-700">
                      {stu.studentId}
                    </td>
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img src={stu.avatarUrl} alt={stu.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900">{stu.name}</p>
                        <p className="text-xs text-slate-400">{stu.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-medium text-slate-700">
                      {stu.department}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1.5 flex-wrap">
                        {stu.enrolledClasses.map(c => (
                          <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-xs font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs font-bold">
                      <span className={stu.overallAttendance < 75 ? 'text-rose-600 bg-rose-50 px-2 py-1 rounded' : 'text-emerald-600'}>
                        {stu.overallAttendance}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleRemoveStudent(stu.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Revoke User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-xs uppercase">
                <tr>
                  <th className="py-3.5 px-6">Faculty ID</th>
                  <th className="py-3.5 px-6">Name & Contact</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Assigned Modules</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredTeachers.map((tch) => (
                  <tr key={tch.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-slate-700">
                      {tch.teacherId}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        {tch.name} <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                      </p>
                      <p className="text-xs text-slate-400">{tch.email}</p>
                    </td>
                    <td className="py-4 px-6 text-xs font-medium text-slate-700">
                      {tch.department}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1.5 flex-wrap">
                        {tch.assignedClasses.map(c => (
                          <span key={c} className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-mono text-xs font-bold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleRemoveTeacher(tch.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove Faculty"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Provisioning Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Provision New {activeTab === 'students' ? 'Student' : 'Faculty'} Profile
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Enrolls user identity into SQLite store and prepares DeepFace vector template.
            </p>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Maya Lin"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Institutional Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. mlin@univ.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#2563EB] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">Academic Department</label>
                <select 
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2563EB] text-white font-semibold text-xs rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                >
                  Complete Provisioning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
