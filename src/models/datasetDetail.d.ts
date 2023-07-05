declare namespace DatasetDetailType {

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

    interface DatasetDetail extends Options {
        //dataset的字段（名字、更新日期、下载量、）
        activeFilters: DatasetType.ActiveFilters,
    }

    type DatasetDetailKey = keyof DatasetDetail


}