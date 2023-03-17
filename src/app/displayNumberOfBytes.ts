export function displayNumberOfBytes(bytes: string | number) {
    if (typeof bytes === 'string') {
        bytes = parseInt(bytes)
    }
    let i = Math.floor(Math.log(bytes) / Math.log(1024))
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2)  + ' ' + sizes[i];
}