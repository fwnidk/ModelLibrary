export const debounce = (fn: any, wait: number) => {
    let timeout: any = null;
    return function (input: any) {
        input.persist()
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait, input);
    };
}
