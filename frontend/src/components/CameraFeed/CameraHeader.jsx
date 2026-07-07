import "./CameraHeader.css";
import useLectureStatus from "../../hooks/useLectureStatus";

function CameraHeader() {

    const {

        currentTime,
        currentLecture,
        nextLecture,
        status,
        countdown

    } = useLectureStatus();

    const time = currentTime.toLocaleTimeString([], {

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"

    });

    return (

        <div className="camera-header">

            <div>

                <h2>Live Attendance Camera</h2>

                <p>

                    {

                        currentLecture

                        ? `${currentLecture.subject} • ${currentLecture.start} - ${currentLecture.end}`

                        : `Next Session : ${nextLecture?.start || "--:--"}`

                    }

                </p>

            </div>

            <div className="header-right">

                <div className="clock">

                    {time}

                </div>

                <div className={`recording ${status}`}>

                    <span className="dot"></span>

                    {status}

                </div>

                {

                    currentLecture &&

                    <div className="countdown">

                        {countdown} Left

                    </div>

                }

            </div>

        </div>

    );

}

export default CameraHeader;
