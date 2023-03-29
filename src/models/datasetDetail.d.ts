declare namespace DatasetDetailType {

    interface Options {
        lastModified: number,
        lastModifiedInformation: string,
        name: string,
        author: string,
        downloads: number,
        id: string,
        type: string
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

    interface DatasetDetail {
        //dataset的字段（名字、更新日期、下载量、）
        activeFilters: DatasetType.ActiveFilters,
        options: Options,
        filesTable: FilesTable,
        activeMenu: string
    }

    type DatasetDetailKey = keyof DatasetDetail


}