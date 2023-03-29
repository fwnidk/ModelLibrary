export const labelConversionArray = (type: string) => {
    if (type === 'model') {
        let res: Array<[string, ModelType.ActiveFiltersKey]> = [["Tasks", "task"], ["Libraries", "library"], ["Datasets", "dataset"], ["Other", "other"], ["Languages", "language"]]
        return res;
    } else {
        let res: Array<[string, DatasetType.ActiveFiltersKey]> = [["Tasks", "task"], ["Sizes", "size"], ["Languages", "language"], ["Other", "other"],];
        return res;
    }
}
