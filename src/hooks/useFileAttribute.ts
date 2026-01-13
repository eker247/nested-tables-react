import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileAttribute } from '../types';
import { fileAttributeApi } from '../services/api';

export const useFileAttributes = () => {
  return useQuery({
    queryKey: ['fileAttributes'],
    queryFn: async () => {
      const response = await fileAttributeApi.getAll();
      return response.data;
    },
  });
};

export const useFileAttribute = (id: number) => {
  return useQuery({
    queryKey: ['fileAttribute', id],
    queryFn: async () => {
      const response = await fileAttributeApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateFileAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<FileAttribute>) => fileAttributeApi.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['fileAttributes'] });
      queryClient.invalidateQueries({ queryKey: ['dataFile', variables.dataFile?.id] });
      queryClient.invalidateQueries({ queryKey: ['dataFolder', variables.dataFile?.dataFolder?.id] });
    },
  });
};

export const useUpdateFileAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FileAttribute> }) =>
      fileAttributeApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['fileAttributes'] });
      queryClient.invalidateQueries({ queryKey: ['fileAttribute', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dataFile', variables.data.dataFile?.id] });
      queryClient.invalidateQueries({ queryKey: ['dataFolder', variables.data.dataFile?.dataFolder?.id] });
    },
  });
};

export const useDeleteFileAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {attributeToDeleteId: number, folderId: number}) => fileAttributeApi.delete(variables.attributeToDeleteId),
    onSuccess: (_, { folderId }) => {
      queryClient.invalidateQueries({ queryKey: ['fileAttributes'] });
      queryClient.invalidateQueries({ queryKey: ['dataFile'] });
      queryClient.invalidateQueries({ queryKey: ['dataFolder', folderId] });
      console.log('variables', folderId);
    },
  });
};
