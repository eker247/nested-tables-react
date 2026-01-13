export interface DataFolder {
  id: number;
  name: string;
  createDate: string;
  publishDate: string | null;
  dataFiles?: DataFile[];
}

export interface DataFile {
  id: number;
  name: string;
  createDate: string;
  dataFolderId?: number;
  dataFolder?: Partial<DataFolder>;
  fileAttributes?: FileAttribute[];
}

export interface FileAttribute {
  id: number;
  name: string;
  include: boolean;
  required: boolean;
  dataFileId?: number;
  dataFile?: Partial<DataFile>;
  attributeFilters?: AttributeFilter[];
}

export interface AttributeFilter {
  id: number;
  name: string;
  description: string;
  parameters: Record<string, any>;
  fileAttributeId?: number;
  fileAttribute?: Partial<FileAttribute>;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
