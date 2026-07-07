import "./CameraFeed.css";

import CameraHeader from "./CameraHeader";

import CameraWaiting from "./CameraWaiting";

import CameraLive from "./CameraLive";

import CameraCompleted from "./CameraCompleted";

import CameraFooter from "./CameraFooter";

import useLectureStatus from "../../hooks/useLectureStatus";

function CameraFeed() {

    const {

        currentLecture,

        nextLecture,

        previousLecture,

        status,

        countdown

    } = useLectureStatus();

    return (

        <section className="camera-feed">

            {/* Header */}

            <CameraHeader />

            {/* Main Camera Area */}

            {

                status === "Waiting" && (

                    <CameraWaiting

                        nextLecture={nextLecture}

                        countdown={countdown}

                    />

                )

            }

            {

                status === "Recording" && (

                    <CameraLive />

                )

            }

            {

                status === "Completed" && (

                    <CameraCompleted

                        nextLecture={nextLecture}

                        previousLecture={previousLecture}

                    />

                )

            }

            {/* Footer */}

            <CameraFooter

                lecture={

                    currentLecture ||

                    nextLecture ||

                    previousLecture

                }

                status={status}

                countdown={countdown}

            />

        </section>

    );

}

export default CameraFeed;