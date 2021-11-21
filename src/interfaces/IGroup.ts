export interface GroupBase {
    name: string;
    permissions: Permission[];
}

export interface Group extends GroupBase {
    id: string;
}

export enum Permission {
    Read = 'READ',
    Write = 'WRITE',
    Delete = 'DELETE',
    Share = 'SHARE',
    UploadFiles = 'UPLOAD_FILES',
}
