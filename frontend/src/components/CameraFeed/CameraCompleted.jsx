import "./CameraFeed.css";

function CameraCompleted({ nextLecture }) {

    return (

        <div className="camera-state completed-state">

            <div className="success-icon">

                ✓

            </div>

            <h2>Attendance Successfully Recorded</h2>

            <p>

                The attendance window has ended.

            </p>

            <div className="next-session-card">

                <h3>Next Session</h3>

                <strong>

                    {nextLecture

                        ? `${nextLecture.start} - ${nextLecture.end}`

                        : "No More Lectures"}

                </strong>

            </div>

        </div>

    );

}

export default CameraCompleted;