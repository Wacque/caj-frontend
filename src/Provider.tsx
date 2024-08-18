import React, {ReactNode} from "react";

interface ICajFile {
    file: File;
    uploadStatus: "uploading" | "uploaded" | "error";
    blobUrl: string;
}

export class CajFile implements ICajFile {
    file: File;
    uploadStatus: "uploading" | "uploaded" | "error";
    blobUrl: string;

    constructor(file: File, uploadStatus: "uploading" | "uploaded" | "error" = "uploading", blobUrl: string = "") {
        this.file = file;
        this.uploadStatus = uploadStatus;
        this.blobUrl = blobUrl;
    }
}

export interface TopContextType {
    viewCajFile?: CajFile;
    setViewCajFile: (cajFiles: CajFile) => void;
    uploadCAJFiles: Array<CajFile>
    appendUploadCAJFiles: (cajFile: CajFile) => void;
    setCajFileStatus: (cajFile: CajFile, status: "uploading" | "uploaded" | "error") => void;
    setCaJFileBlobUrl: (cajFile: CajFile, blobUrl: string) => void;
}

export const TopContext = React.createContext({} as TopContextType);

export const TopProvider = ({ children }: {children: ReactNode}) => {
    const [viewCajFile, setViewCajFile] = React.useState<CajFile>();
    const [uploadCAJFiles, setUploadCAJFiles] = React.useState<CajFile[]>([]);
    const appendUploadCAJFiles = (cajFile: CajFile) => {
        setUploadCAJFiles(prevState => [...prevState, cajFile]);
    };
    const setCajFileStatus = (cajFile: CajFile, status: "uploading" | "uploaded" | "error") => {
        cajFile.uploadStatus = status;
        setUploadCAJFiles(prevState => [...prevState]);
    }
    const setCaJFileBlobUrl = (cajFile: CajFile, blobUrl: string) => {
        cajFile.blobUrl = blobUrl;
        setUploadCAJFiles(prevState => [...prevState]);
    }
    return <TopContext.Provider value={{
        viewCajFile,
        setViewCajFile,
        uploadCAJFiles,
        appendUploadCAJFiles,
        setCajFileStatus,
        setCaJFileBlobUrl
    }}>{children}</TopContext.Provider>;
}
