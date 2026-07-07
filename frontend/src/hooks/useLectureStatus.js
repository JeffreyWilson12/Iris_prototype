import { useEffect, useState } from "react";

import { lectureSchedule } from "../utils/lectureSchedule";

import {
    convertToMinutes,
    convertToSeconds,
    formatCountdown
} from "../utils/timeUtils";

export default function useLectureStatus() {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    //---------------------------------------------------
    // Current Time
    //---------------------------------------------------

    const currentMinutes =
        currentTime.getHours() * 60 +
        currentTime.getMinutes();

    const currentSeconds =
        currentTime.getHours() * 3600 +
        currentTime.getMinutes() * 60 +
        currentTime.getSeconds();

    //---------------------------------------------------
    // Variables
    //---------------------------------------------------

    let currentLecture = null;

    let nextLecture = null;

    let previousLecture = null;

    let status = "Waiting";

    let countdown = "00:00";

    //---------------------------------------------------
    // Check Every Lecture
    //---------------------------------------------------

    for (let i = 0; i < lectureSchedule.length; i++) {

        const lecture = lectureSchedule[i];

        const startMinutes = convertToMinutes(lecture.start);
        const endMinutes = convertToMinutes(lecture.end);

        const startSeconds = convertToSeconds(lecture.start);
        const endSeconds = convertToSeconds(lecture.end);

        //---------------------------------------------------
        // BEFORE LECTURE
        //---------------------------------------------------

        if (currentMinutes < startMinutes) {

            nextLecture = lecture;

            countdown = formatCountdown(
                startSeconds - currentSeconds
            );

            status = "Waiting";

            break;

        }

        //---------------------------------------------------
        // DURING LECTURE
        //---------------------------------------------------

        if (
            currentMinutes >= startMinutes &&
            currentMinutes <= endMinutes
        ) {

            currentLecture = lecture;

            countdown = formatCountdown(
                endSeconds - currentSeconds
            );

            status = "Recording";

            break;

        }

        //---------------------------------------------------
        // AFTER LECTURE
        //---------------------------------------------------

        previousLecture = lecture;

    }

    //---------------------------------------------------
    // If today's lectures are finished
    //---------------------------------------------------

    if (

        !currentLecture &&
        !nextLecture &&
        previousLecture

    ) {

        status = "Completed";

    }

    //---------------------------------------------------
    // Return Everything
    //---------------------------------------------------

    return {

        currentTime,

        currentLecture,

        nextLecture,

        previousLecture,

        status,

        countdown

    };

}