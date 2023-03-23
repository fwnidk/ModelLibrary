declare namespace DatasetType {

    interface DatasetItem {
        lastModified: number,
        name: string,
        author: string,
        downloads: number,
        id: string,
        type: string
    }

    interface ActiveFilters {
        task: Array<string>,
        size: Array<string>,
        language: Array<string>,
        other: Array<string>,

    }
    type ActiveFiltersKey = keyof ActiveFilters;

    interface ActiveFiltersPost {
        task?: string,
        other?: string,
        language?: string,
        size?: string,
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

    interface DatasetList {
        //dataset的字段（名字、更新日期、下载量、）
        allFilters:AllFilters,
        activeFilters: ActiveFilters,
        otherOptions: OtherOptions,
        datasets: Array<DatasetList>,
        numTotalItems: number,
    }

    type Task =
        'Natural Language Processing' |
        'Computer Vision' |
        'Multimodal' |
        'Audio'

    interface DatasetLabelData {
        task: Array<[string, Task]>,
        size: Array<string>,
        language: Array<string>,
        other: Array<string>
    }
    interface AllFilters {
        task: Array<[string, Task]>,
        size: Array<string>,
        language: Array<string>,
        other: Array<string>
    }
}