import axios, { AxiosInstance } from 'axios';
import { DataFolder, DataFile, FileAttribute, AttributeFilter } from '../types';

const API_BASE_URL = 'api'; // process.env.REACT_APP_API_URL || 'http://localhost:4220';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// DataFolder API
export const dataFolderApi = {
  getAll: () => apiClient.get<DataFolder[]>('/DataFolders'),
  getById: (id: number) => apiClient.get<DataFolder>(`/DataFolder?id=${id}`),
  create: (data: Partial<DataFolder>) => apiClient.post<DataFolder>('/DataFolder', data),
  update: (id: number, data: Partial<DataFolder>) => apiClient.put<DataFolder>(`/DataFolder/${id}`, data),
  delete: (id: number) => apiClient.delete(`/DataFolder/${id}`),
};

// DataFile API
export const dataFileApi = {
  getAll: () => apiClient.get<DataFile[]>('/DataFiles'),
  getById: (id: number) => apiClient.get<DataFile>(`/DataFile?id=${id}`),
  create: (data: Partial<DataFile>) => apiClient.post<DataFile>('/DataFile', data),
  update: (id: number, data: Partial<DataFile>) => apiClient.put<DataFile>(`/DataFile/${id}`, data),
  delete: (id: number) => apiClient.delete(`/DataFile/${id}`),
};

// FileAttribute API
export const fileAttributeApi = {
  getAll: () => apiClient.get<FileAttribute[]>('/FileAttributes'),
  getById: (id: number) => apiClient.get<FileAttribute>(`/FileAttribute?id=${id}`),
  create: (data: Partial<FileAttribute>) => apiClient.post<FileAttribute>('/FileAttribute', data),
  update: (id: number, data: Partial<FileAttribute>) => apiClient.put<FileAttribute>(`/FileAttribute/${id}`, data),
  delete: (id: number) => apiClient.delete(`/FileAttribute/${id}`),
};

// AttributeFilter API
export const attributeFilterApi = {
  getAll: () => apiClient.get<AttributeFilter[]>('/AttributeFilters'),
  getById: (id: number) => apiClient.get<AttributeFilter>(`/AttributeFilter?id=${id}`),
  create: (data: Partial<AttributeFilter>) => apiClient.post<AttributeFilter>('/AttributeFilter', data),
  update: (id: number, data: Partial<AttributeFilter>) => apiClient.put<AttributeFilter>(`/AttributeFilter/${id}`, data),
  delete: (id: number) => apiClient.delete(`/AttributeFilter/${id}`),
};

export default apiClient;
