import "./Sidebar.css";
import {
  FaHome,
  FaUserGraduate,
  FaClipboardCheck,
  FaChartLine,
  FaBrain,
  FaFileAlt,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        <h2>IRIS</h2>
        <p>Teacher Portal</p>
      </div>

      <div className="menu">

        <div className="menu-item active">
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div className="menu-item">
          <FaClipboardCheck />
          <span>Attendance</span>
        </div>

        <div className="menu-item">
          <FaUserGraduate />
          <span>Students</span>
        </div>

        <div className="menu-item">
          <FaChartLine />
          <span>Analytics</span>
        </div>

        <div className="menu-item">
          <FaBrain />
          <span>Behaviour Analysis</span>
        </div>

        <div className="menu-item">
          <FaFileAlt />
          <span>Reports</span>
        </div>

        <div className="menu-item">
          <FaCog />
          <span>Settings</span>
        </div>

      </div>

      <div className="logout">
        <FaSignOutAlt />
        <span>Logout</span>
      </div>

    </div>
  );
}

export default Sidebar;