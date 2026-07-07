import { 
  Student, 
  Teacher, 
  ClassItem, 
  AttendanceRecord, 
  CameraSession, 
  BehaviourLog, 
  AlertNotification,
  SystemStats 
} from './types';

export const INITIAL_STATS: SystemStats = {
  totalStudents: 1240,
  totalTeachers: 48,
  activeClasses: 18,
  todayAttendancePercent: 88.4,
  liveCamerasOnline: 14,
  totalCameras: 16
};

export const SAMPLE_CLASSES: ClassItem[] = [
  {
    id: 'c1',
    code: 'CV-401',
    name: 'Computer Vision & Deep Learning',
    teacherName: 'Dr. Alan Vance',
    department: 'Artificial Intelligence',
    room: 'Lab 3B (AI Core)',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    totalStudents: 42
  },
  {
    id: 'c2',
    code: 'GAI-202',
    name: 'Generative AI & LLM Architectures',
    teacherName: 'Prof. Sarah Lin',
    department: 'Computer Science',
    room: 'Hall A1',
    schedule: 'Tue, Thu 01:00 PM - 02:30 PM',
    totalStudents: 65
  },
  {
    id: 'c3',
    code: 'ROB-305',
    name: 'Autonomous Kinematics & YOLOv8 Vision',
    teacherName: 'Dr. Marcus Sterling',
    department: 'Robotics',
    room: 'Robotics Bay 2',
    schedule: 'Fri 09:00 AM - 12:00 PM',
    totalStudents: 28
  },
  {
    id: 'c4',
    code: 'DS-104',
    name: 'Statistical Pattern Recognition',
    teacherName: 'Dr. Elena Rostova',
    department: 'Data Science',
    room: 'Room 404',
    schedule: 'Mon, Wed 02:00 PM - 03:30 PM',
    totalStudents: 50
  }
];

export const SAMPLE_STUDENTS: Student[] = [
  {
    id: 's1',
    studentId: 'STU-2024001',
    name: 'Alex Rivera',
    email: 'arivera@univ.edu',
    department: 'Artificial Intelligence',
    enrolledClasses: ['CV-401', 'GAI-202'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    overallAttendance: 95.2
  },
  {
    id: 's2',
    studentId: 'STU-2024002',
    name: 'Liam Chen',
    email: 'lchen@univ.edu',
    department: 'Computer Science',
    enrolledClasses: ['GAI-202', 'DS-104'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    overallAttendance: 72.0 // Trigger low warning
  },
  {
    id: 's3',
    studentId: 'STU-2024003',
    name: 'Sophia Patel',
    email: 'spatel@univ.edu',
    department: 'Robotics',
    enrolledClasses: ['ROB-305', 'CV-401'],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    overallAttendance: 91.5
  },
  {
    id: 's4',
    studentId: 'STU-2024004',
    name: 'Noah Williams',
    email: 'nwilliams@univ.edu',
    department: 'Data Science',
    enrolledClasses: ['DS-104'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    overallAttendance: 68.4 // Trigger low warning
  },
  {
    id: 's5',
    studentId: 'STU-2024005',
    name: 'Mia Takahashi',
    email: 'mtakahashi@univ.edu',
    department: 'Artificial Intelligence',
    enrolledClasses: ['CV-401', 'ROB-305'],
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    overallAttendance: 98.0
  },
  {
    id: 's6',
    studentId: 'STU-2024006',
    name: 'Ethan Hunt',
    email: 'ehunt@univ.edu',
    department: 'Computer Science',
    enrolledClasses: ['GAI-202'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    overallAttendance: 84.5
  }
];

export const SAMPLE_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'a1',
    studentId: 'STU-2024001',
    studentName: 'Alex Rivera',
    classCode: 'CV-401',
    className: 'Computer Vision & Deep Learning',
    date: '2026-06-27',
    timestamp: '10:01:14 AM',
    status: 'Present',
    confidenceScore: 99.4,
    cameraSessionId: 'CAM-01'
  },
  {
    id: 'a2',
    studentId: 'STU-2024003',
    studentName: 'Sophia Patel',
    classCode: 'CV-401',
    className: 'Computer Vision & Deep Learning',
    date: '2026-06-27',
    timestamp: '10:02:05 AM',
    status: 'Present',
    confidenceScore: 98.8,
    cameraSessionId: 'CAM-01'
  },
  {
    id: 'a3',
    studentId: 'STU-2024005',
    studentName: 'Mia Takahashi',
    classCode: 'CV-401',
    className: 'Computer Vision & Deep Learning',
    date: '2026-06-27',
    timestamp: '10:00:42 AM',
    status: 'Present',
    confidenceScore: 99.7,
    cameraSessionId: 'CAM-01'
  },
  {
    id: 'a4',
    studentId: 'STU-2024002',
    studentName: 'Liam Chen',
    classCode: 'GAI-202',
    className: 'Generative AI & LLM Architectures',
    date: '2026-06-27',
    timestamp: '01:18:22 PM',
    status: 'Late',
    confidenceScore: 94.2,
    cameraSessionId: 'CAM-02'
  },
  {
    id: 'a5',
    studentId: 'STU-2024004',
    studentName: 'Noah Williams',
    classCode: 'DS-104',
    className: 'Statistical Pattern Recognition',
    date: '2026-06-27',
    timestamp: '-',
    status: 'Absent',
    confidenceScore: 0,
    cameraSessionId: 'CAM-04'
  },
  {
    id: 'a6',
    studentId: 'STU-2024006',
    studentName: 'Ethan Hunt',
    classCode: 'GAI-202',
    className: 'Generative AI & LLM Architectures',
    date: '2026-06-26',
    timestamp: '01:03:10 PM',
    status: 'Present',
    confidenceScore: 97.5,
    cameraSessionId: 'CAM-02'
  }
];

export const SAMPLE_CAMERAS: CameraSession[] = [
  {
    id: 'CAM-01',
    cameraId: 'CAM-DEV-AI3B',
    room: 'Lab 3B (AI Core)',
    classCode: 'CV-401',
    status: 'Online',
    fps: 29.8,
    facesDetected: 38,
    lastActive: 'Just now',
    streamUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'CAM-02',
    cameraId: 'CAM-DEV-HALLA1',
    room: 'Hall A1',
    classCode: 'GAI-202',
    status: 'Online',
    fps: 30.0,
    facesDetected: 58,
    lastActive: '2s ago',
    streamUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'CAM-03',
    cameraId: 'CAM-DEV-ROB2',
    room: 'Robotics Bay 2',
    classCode: 'ROB-305',
    status: 'Connecting',
    fps: 12.4,
    facesDetected: 4,
    lastActive: '1m ago',
    streamUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'CAM-04',
    cameraId: 'CAM-DEV-RM404',
    room: 'Room 404',
    classCode: 'DS-104',
    status: 'Maintenance',
    fps: 0,
    facesDetected: 0,
    lastActive: '35m ago'
  }
];

export const SAMPLE_BEHAVIOURS: BehaviourLog[] = [
  {
    id: 'b1',
    studentId: 'STU-2024001',
    studentName: 'Alex Rivera',
    classCode: 'CV-401',
    timestamp: '10:15 AM',
    behaviourType: 'Attentive',
    durationSeconds: 1800,
    confidence: 96.2
  },
  {
    id: 'b2',
    studentId: 'STU-2024002',
    studentName: 'Liam Chen',
    classCode: 'GAI-202',
    timestamp: '01:25 PM',
    behaviourType: 'Distracted',
    durationSeconds: 420,
    confidence: 88.5
  },
  {
    id: 'b3',
    studentId: 'STU-2024004',
    studentName: 'Noah Williams',
    classCode: 'DS-104',
    timestamp: '02:10 PM',
    behaviourType: 'Drowsy',
    durationSeconds: 300,
    confidence: 91.0
  },
  {
    id: 'b4',
    studentId: 'STU-2024005',
    studentName: 'Mia Takahashi',
    classCode: 'CV-401',
    timestamp: '10:45 AM',
    behaviourType: 'Attentive',
    durationSeconds: 2400,
    confidence: 98.4
  }
];

export const SAMPLE_ALERTS: AlertNotification[] = [
  {
    id: 'alt-1',
    type: 'attendance_warning',
    title: 'Low Attendance Alert (<75%)',
    message: 'Liam Chen (STU-2024002) has dropped to 72.0% overall attendance across 2 enrolled modules.',
    timestamp: '10 mins ago',
    read: false,
    severity: 'high'
  },
  {
    id: 'alt-2',
    type: 'attendance_warning',
    title: 'Critical Absence Threshold',
    message: 'Noah Williams (STU-2024004) has 3 consecutive unexcused absences in Statistical Pattern Recognition.',
    timestamp: '1 hour ago',
    read: false,
    severity: 'high'
  },
  {
    id: 'alt-3',
    type: 'camera_error',
    title: 'Camera Connection Dropped',
    message: 'CAM-DEV-RM404 (Room 404) entered maintenance mode due to frame rate degradation.',
    timestamp: '3 hours ago',
    read: true,
    severity: 'medium'
  },
  {
    id: 'alt-4',
    type: 'ai_insight',
    title: 'Gemini Behaviour Summary',
    message: 'Classroom engagement in CV-401 peaked at 94% during live coding demonstrations.',
    timestamp: 'Yesterday',
    read: true,
    severity: 'low'
  }
];

export const WEEKLY_TREND_DATA = [
  { day: 'Mon', attendance: 92, target: 90, attentive: 85, distracted: 15 },
  { day: 'Tue', attendance: 89, target: 90, attentive: 82, distracted: 18 },
  { day: 'Wed', attendance: 94, target: 90, attentive: 88, distracted: 12 },
  { day: 'Thu', attendance: 86, target: 90, attentive: 79, distracted: 21 },
  { day: 'Fri', attendance: 81, target: 90, attentive: 74, distracted: 26 },
];

export const BEHAVIOUR_PIE_DATA = [
  { name: 'Attentive', value: 76, fill: '#10B981' }, // emerald
  { name: 'Distracted (Phone/Chat)', value: 14, fill: '#F59E0B' }, // amber
  { name: 'Drowsy / Fatigued', value: 6, fill: '#6366F1' }, // indigo
  { name: 'Absent-Minded', value: 4, fill: '#EF4444' }, // red
];
