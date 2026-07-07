import "./CameraFeed.css";

function CameraLive() {

    return (

        <div className="camera-live">

            <img

                src="http://127.0.0.1:5000/video"

                alt="Live Camera"

                className="live-camera"

            />

        </div>

    );

}

export default CameraLive;