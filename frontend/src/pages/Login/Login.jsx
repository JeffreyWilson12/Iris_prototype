import "./Login.css";
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

function Login() {
  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>IRIS</h1>
        <h2>AI-Powered Classroom Intelligence System</h2>
        <p>
          Smart Attendance • Behaviour Analysis • Analytics • AI Insights
        </p>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue</p>

        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className="input-group">
            <label>Login As</label>

            <div className="roles">
              <div className="role-card">
                <FaChalkboardTeacher />
                <span>Teacher</span>
              </div>

              <div className="role-card">
                <FaUserGraduate />
                <span>Student</span>
              </div>

              <div className="role-card">
                <FaUserShield />
                <span>Admin</span>
              </div>
            </div>
          </div>

          <div className="extra">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="/">Forgot Password?</a>
          </div>

          <button className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;