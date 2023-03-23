// export const labelConversionArray = (type: string) => {
//     if (type === 'model') {
//         return [["Tasks", "task"], ["Sizes", "size"], ["Languages", "language"], ["Other", "other"],];
//     } else {
//         return [["Tasks", "task"], ["Libraries", "library"], ["Datasets", "dataset"], ["Other", "other"], ["Languages", "language"]]

//     }
// }

export const datasetLabelConversionArray: Array<[string, DatasetType.ActiveFiltersKey]> = [["Tasks", "task"], ["Sizes", "size"], ["Languages", "language"], ["Other", "other"],]
export const modelLabelConversionArray: Array<[string, ModelType.ActiveFiltersKey]> = [["Tasks", "task"], ["Libraries", "library"], ["Datasets", "dataset"], ["Other", "other"], ["Languages", "language"]]
