import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import TeacherDashboard from "../pages/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/teacher-dashboard"
          element={<TeacherDashboard />}
        />

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;