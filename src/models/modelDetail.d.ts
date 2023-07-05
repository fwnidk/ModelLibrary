declare namespace ModelDetailType {

    interface Options {
        lastModified: string,
        lastModifiedInformation: string,
        name: string,
        author: string,
        avatar: string,
        downloads: number,
        id: string,
        type: string,
        isPrivate: boolean
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

    interface ModelDetail extends Options {
        //dataset的字段（名字、更新日期、下载量、）
        activeFilters: ModelType.ActiveFilters,
    }

    type ModelDetailKey = keyof ModelDetail


}