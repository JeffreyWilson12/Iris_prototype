import "./Navbar.css";
import { FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">

      <div>
        <h2>Good Morning, Professor 👋</h2>
        <p>Welcome back to IRIS</p>
      </div>

      <div className="profile-section">
        <FaBell className="bell" />

        <div className="profile">
          <img
            src="https://i.pravatar.cc/50"
            alt=""
          />

          <div>
            <h4>Dr. John Doe</h4>
            <p>Teacher</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;