//文件内容
declare namespace FileContentType {

    interface FileContentNotNull {
        lastModified: number,
        lastModifiedInformation: string,
        size: number,
        fileURL: string,
        displayable: boolean,
        displayData?: string,
    }

    type FileContent = FileContentNotNull | null
}