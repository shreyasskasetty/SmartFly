export function timeStringToMinutes(timeStr) {
    // Split the time string by space to separate time and meridiem (AM/PM)
    const [time, meridiem] = timeStr.split(' ');

    // Split the time by colon to get hours and minutes
    let [hours, minutes] = time.split(':').map(Number);

    // Convert hours to 24-hour format if necessary
    if (meridiem.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
    } else if (meridiem.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
    }

    // Calculate total minutes
    return hours * 60 + minutes;
}

export function getCurrentTime() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    return hours*60 + minutes;
}