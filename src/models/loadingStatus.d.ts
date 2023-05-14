declare namespace LoadingStatusType {
    interface LoadingStatus<T> {
        responseData: T,
        isLoading: boolean,
        isError: boolean,
    }
}