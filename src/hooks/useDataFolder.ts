import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataFolder } from '../types';
import { dataFolderApi } from '../services/api';

export const useDataFolders = () => {
  return useQuery({
    queryKey: ['dataFolders'],
    queryFn: async () => {
      const response = await dataFolderApi.getAll();
      return response.data;
    },
  });
};

export const useDataFolder = (id: number) => {
  return useQuery({
    queryKey: ['dataFolder', id],
    queryFn: async () => {
      const response = await dataFolderApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateDataFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<DataFolder>) => dataFolderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataFolders'] });
    },
  });
};

export const useUpdateDataFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DataFolder> }) =>
      dataFolderApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dataFolders'] });
      queryClient.invalidateQueries({ queryKey: ['dataFolder', variables.id] });
    },
  });
};

export const useDeleteDataFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => dataFolderApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataFolders'] });
    },
  });
};
