import "./TeacherDashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import AttendanceChart from "../../components/AttendanceChart/AttendanceChart";
import CameraFeed from "../../components/CameraFeed/CameraFeed";
import RecentActivityTable from "../../components/RecentActivityTable/RecentActivityTable";

import {
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaBullseye
} from "react-icons/fa";

function TeacherDashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        {/* Summary Cards */}
        <div className="cards">

          <SummaryCard
            title="Total Students"
            value="60"
            icon={<FaUserGraduate />}
            color="#2563EB"
          />

          <SummaryCard
            title="Present Today"
            value="54"
            icon={<FaCheckCircle />}
            color="#10B981"
          />

          <SummaryCard
            title="Absent Today"
            value="6"
            icon={<FaTimesCircle />}
            color="#EF4444"
          />

          <SummaryCard
            title="Recognition Accuracy"
            value="98.4%"
            icon={<FaBullseye />}
            color="#8B5CF6"
          />

        </div>

        {/* Camera Feed */}
        <div className="camera-section">
          <CameraFeed />
        </div>

        {/* Attendance Trend */}
        <div className="chart-section">
          <AttendanceChart />
        </div>

        {/* Recent Activity */}
        <div className="table-section">
          <RecentActivityTable />
        </div>

      </div>

    </div>
  );
}

export default TeacherDashboard;