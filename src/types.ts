export type Department = 'Computer Science' | 'Artificial Intelligence' | 'Robotics' | 'Data Science';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export type BehaviourCategory = 'Attentive' | 'Distracted' | 'Drowsy' | 'Absen-Minded';

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  department: Department;
  enrolledClasses: string[];
  avatarUrl: string;
  overallAttendance: number; // percentage
}

export interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  department: Department;
  email: string;
  assignedClasses: string[];
}

export interface ClassItem {
  id: string;
  code: string;
  name: string;
  teacherName: string;
  department: Department;
  room: string;
  schedule: string;
  totalStudents: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classCode: string;
  className: string;
  date: string;
  timestamp: string;
  status: AttendanceStatus;
  confidenceScore: number; // DeepFace recognition confidence 0 - 100
  cameraSessionId: string;
}

export interface CameraSession {
  id: string;
  cameraId: string;
  room: string;
  classCode: string;
  status: 'Online' | 'Connecting' | 'Offline' | 'Maintenance';
  fps: number;
  facesDetected: number;
  lastActive: string;
  streamUrl?: string;
}

export interface BehaviourLog {
  id: string;
  studentId: string;
  studentName: string;
  classCode: string;
  timestamp: string;
  behaviourType: BehaviourCategory;
  durationSeconds: number;
  confidence: number;
}

export interface AlertNotification {
  id: string;
  type: 'attendance_warning' | 'camera_error' | 'ai_insight';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: 'low' | 'medium' | 'high';
}

export interface SystemStats {
  totalStudents: number;
  totalTeachers: number;
  activeClasses: number;
  todayAttendancePercent: number;
  liveCamerasOnline: number;
  totalCameras: number;
}
