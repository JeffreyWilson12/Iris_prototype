import "./CameraFeed.css";

function CameraWaiting({ nextLecture, countdown }) {

    return (

        <div className="camera-state waiting-state">

            <div className="camera-icon-box">

            <div className="camera-circle">
                <Camera size={55}/>
            </div>

            </div>

            <h2>Attendance Session Not Started</h2>

            <p>

                The camera will automatically activate during the attendance window.

            </p>

            <div className="next-session-card">

                <h3>Next Session</h3>

                <span>

                    {nextLecture
                        ? `${nextLecture.subject}` 
                        : "No More Lectures Today"}

                </span>

                <strong>

                    {nextLecture
                        ? `${nextLecture.start} - ${nextLecture.end}`
                        : "--"}

                </strong>

            </div>

            <div className="countdown-box">

                Starts In

                <h1>{countdown}</h1>

            </div>

        </div>

    );

}

export default CameraWaiting;