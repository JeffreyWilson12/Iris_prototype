import "./CameraPlaceholder.css";

function CameraPlaceholder() {
  return (
    <div className="camera-placeholder">

      {/* Top Overlay */}
      <div className="camera-overlay">

        <div className="live-status">
          <span className="live-dot"></span>
          LIVE
        </div>

        <div className="camera-time">
          08:43:15
        </div>

      </div>

      {/* Camera Area */}

      <div className="camera-screen">

      <div className="camera-frame">

        <img
            src="http://127.0.0.1:5000/video"
            alt="Live Camera"
            className="live-camera"
        />

      </div>

      </div>

      {/* Bottom Overlay */}

      <div className="camera-footer-overlay">

        <div>
          <strong>Faces</strong>
          <span>0</span>
        </div>

        <div>
          <strong>Unknown</strong>
          <span>0</span>
        </div>

        <div>
          <strong>FPS</strong>
          <span>--</span>
        </div>

        <div>
          <strong>Status</strong>
          <span className="waiting">Waiting</span>
        </div>

      </div>

    </div>
  );
}

export default CameraPlaceholder;