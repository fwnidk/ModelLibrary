declare namespace ModelType {

    interface ModelItem {
        lastModified: number,
        name: string,
        author: string,
        downloads: number,
        id: string,
        type: string
    }

    interface ActiveFilters {
        task: Array<string>,
        library: Array<string>,
        dataset: Array<string>,
        other: Array<string>,
        language: Array<string>
    }
    type ActiveFiltersKey = keyof ActiveFilters;

    interface ActiveFiltersPost {
        task?: string,
        library?: string,
        dataset?: string,
        other?: string,
        language?: string
    }

    interface OtherOptions {
        pageIndex: number,
        sortType: string,
        filterByName: string
    }

    interface PostFilter {
        activeFilters: ActiveFiltersPost,
        otherOptions: OtherOptions,
        first: boolean
    }

    interface ModelList {
        //dataset的字段（名字、更新日期、下载量、）
        activeFilters: ActiveFilters,
        otherOptions: OtherOptions,
        models: Array<ModelItem>,
        numTotalItems: number,
        loadingCompleted: boolean 
    }

    type Task =
        'Natural Language Processing' |
        'Computer Vision' |
        'Multimodal' |
        'Audio'

    interface ModelLabelData {
        task: Array<[string, Task]>,
        library: Array<string>,
        dataset: Array<string>,
        other: Array<string>,
        language: Array<string>
    }

}