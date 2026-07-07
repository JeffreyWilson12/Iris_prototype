# IRIS

AI Powered Smart Classroom Intelligence System

VisionAi is an AI-driven classroom monitoring system designed to automate attendance tracking, analyze classroom behavior, and provide insightful dashboards for teachers and administrators.

This system uses computer vision, machine learning, and real-time analytics to improve classroom management and educational insights.

---

## Project Objective

The goal of EduVision is to build an intelligent system that can:

• Automatically record student attendance using facial recognition  
• Detect classroom behavior patterns using computer vision  
• Provide real-time analytics and dashboards for teachers and administrators  
• Reduce manual work in classroom management  

---

## Key Features

### Automated Attendance System
- Face recognition based attendance
- Automatic student identification
- Timestamped attendance logs
- Attendance history tracking

### Behavior Analysis
- Detect student engagement
- Identify distractions or unusual behavior
- Monitor classroom activity patterns

### Multi-Level Dashboards
Different dashboards for different users:

Teacher Dashboard
- Attendance summary
- Student participation insights
- Behavior alerts
- Class performance trends

Admin Dashboard
- School level analytics
- Attendance reports
- Department statistics
- Performance metrics

Student Dashboard
- Personal attendance record
- Performance insights
- Behavior feedback

---

## System Architecture

EduVision consists of the following main modules:

### 1. Camera Module
Captures classroom video feed.

### 2. Computer Vision Engine
Processes video frames using AI models.

### 3. Face Recognition System
Identifies students and records attendance.

### 4. Behavior Detection System
Analyzes classroom engagement and actions.

### 5. Backend Server
Handles authentication, data processing, and API communication.

### 6. Database System
Stores attendance records, user data, and analytics.

### 7. Dashboard Interface
Displays insights and visualizations for users.

---

## Technology Stack

### Frontend
- React
- TailwindCSS
- Chart.js / Recharts

### Backend
- Python
- FastAPI

### AI / Computer Vision
- OpenCV
- MediaPipe
- DeepFace
- TensorFlow / PyTorch

### Database
- PostgreSQL

### Version Control
- Git
- GitHub

---

## Project Structure

```

IRIS
│
├── frontend
│ ├── teacher-dashboard
│ ├── admin-dashboard
│ └── student-dashboard
│
├── backend
│ ├── auth
│ ├── attendance
│ ├── behaviour
│ └── camera
│
├── ai-models
│ ├── face-recognition
│ └── behaviour-detection
│
├── database
│ ├── ERD
│ └── schema
│
├── docs
│ ├── architecture
│ ├── research
│ └── wireframes
│
├── scripts
│
├── tests
│
├── requirements.txt
├── README.md
└── .gitignore

```

---

## Installation (Future Setup)

Clone the repository

```

git clone [https://github.com/yourusername/IRIS.git](https://github.com/yourusername/IRIS.git)

```

Navigate into the project directory

```

cd IRIS

```

Install dependencies

```

pip install -r requirements.txt

```

Run the backend server

```

uvicorn main:app --reload

```

---

## Development Workflow

1. Create a new branch for features
2. Implement changes
3. Commit code
4. Push branch to GitHub
5. Create pull request
6. Merge after review

---

## Team Members

• Aileen Pavey 
• Jeffrey Wilson 
• Vaishnavi Jadhav 
• Ziya Shaikh
• Janhavi 
• Aditya 
• Saad Javed 

---

## Project Status

Development Phase

Core architecture, research, and database design are currently in progress.

---

## Copyright

Copyright © 2026 EduVision Team

All rights reserved.

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software without explicit permission from the authors is strictly prohibited.
```

