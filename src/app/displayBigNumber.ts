export const displayBigNumber = (num: number): string => {
    if (num < 1000) {
        return num.toString()
    }
    let prevNum = num;
    let strArr = ['K', 'M', 'B']
    let strIndex = 0
    while (num > 1 && strIndex < 3) {
        prevNum = num
        num /= 1000
        strIndex++;
    }
    return prevNum.toFixed(2) + strArr[strIndex - 1]
}