import "./CameraFeed.css";

function CameraFooter({

    lecture,
    status,
    countdown

}) {

    return (

        <div className="camera-footer">

            <div>

                <small>Subject</small>

                <h4>

                    {lecture?.subject || "--"}

                </h4>

            </div>

            <div>

                <small>Status</small>

                <h4>

                    {status}

                </h4>

            </div>

            <div>

                <small>Timer</small>

                <h4>

                    {countdown}

                </h4>

            </div>

        </div>

    );

}

export default CameraFooter;