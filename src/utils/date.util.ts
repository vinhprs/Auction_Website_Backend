export function formatTime(time: Date) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}