declare namespace ModelDetailType {

    interface Options {
        lastModified: number,
        lastModifiedInformation: string,
        name: string,
        author: string,
        avatar: string,
        downloads: number,
        id: string,
        type: string
    }

    interface ActiveFilters {
        task: Array<string>,
        library: Array<string>,
        dataset: Array<string>,
        language: Array<string>,
        other: Array<string>,
    }

    type ActiveFiltersKey = keyof ActiveFilters;

    interface FilesItem {
        key: string,
        fileName: string,
        isAFolder: boolean,
        lastModified: string,
        lastModifiedInformation: string,
        size: number | undefined,
        fileURL: string | undefined,
    }

    type FilesTable = Array<FilesItem>

    interface ModelDetail {
        //dataset的字段（名字、更新日期、下载量、）
        activeFilters: ActiveFilters,
        options: Options,
        filesTable: FilesTable,
        activeMenu: string
    }

    type ModelDetailKey = keyof ModelDetail


}