declare namespace LoadingStatusType {
    interface Wrapper<T> {
        data: T,
        isLoading: boolean,
        isError: boolean,
    }
}