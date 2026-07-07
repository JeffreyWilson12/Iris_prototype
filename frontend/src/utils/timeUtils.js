export function convertToMinutes(time) {

    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;

}

export function convertToSeconds(time) {

    const [hours, minutes] = time.split(":").map(Number);

    return (hours * 60 + minutes) * 60;

}

export function formatCountdown(seconds) {

    if (seconds < 0) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

}