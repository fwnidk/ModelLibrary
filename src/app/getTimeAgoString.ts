export function getTimeAgoString(date: number): string {
    const ONE_MINUTE = 60 * 1000; // 每分钟的毫秒数
    const ONE_HOUR = 60 * ONE_MINUTE; // 每小时的毫秒数
    const ONE_DAY = 24 * ONE_HOUR; // 每天的毫秒数
    const ONE_MONTH = 30 * ONE_DAY; // 每个月的毫秒数
    const ONE_YEAR = 12 * ONE_MONTH; // 每个月的毫秒数

    const now = new Date().getTime();
    const diff = now - date;

    if (diff < ONE_MINUTE) {
        return "刚刚";
    } else if (diff < ONE_HOUR) {
        const minutes = Math.floor(diff / ONE_MINUTE);
        return `${minutes}分钟前`;
    } else if (diff < ONE_DAY) {
        const hours = Math.floor(diff / ONE_HOUR);
        return `${hours}小时前`;
    } else if (diff < ONE_MONTH) {
        const days = Math.floor(diff / ONE_DAY);
        return `${days}天前`;
    } else if (diff < ONE_YEAR) {
        const months = Math.floor(diff / ONE_MONTH);
        return `${months}个月前`;
    } else {
        const years = Math.floor(diff / ONE_YEAR);
        return `${years}年前`;
    }
}