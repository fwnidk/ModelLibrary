export const getTimeYMD = (time: string) => {
    const date = new Date(Date.parse(time));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}