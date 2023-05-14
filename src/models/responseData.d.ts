declare namespace ResponseDataType {
    interface ResponseData<T> {
        code: number,
        msg: string,
        data: T
    }
}