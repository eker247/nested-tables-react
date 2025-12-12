import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataFile } from '../types';
import { dataFileApi } from '../services/api';

export const useDataFiles = () => {
  return useQuery({
    queryKey: ['dataFiles'],
    queryFn: async () => {
      const response = await dataFileApi.getAll();
      return response.data;
    },
  });
};

export const useDataFile = (id: number) => {
  return useQuery({
    queryKey: ['dataFile', id],
    queryFn: async () => {
      const response = await dataFileApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateDataFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<DataFile>) => dataFileApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataFiles'] });
      queryClient.invalidateQueries({ queryKey: ['dataFolder'] });
    },
  });
};

export const useUpdateDataFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DataFile> }) =>
      dataFileApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dataFiles'] });
      queryClient.invalidateQueries({ queryKey: ['dataFile', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dataFolder'] });
    },
  });
};

export const useDeleteDataFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => dataFileApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataFiles'] });
      queryClient.invalidateQueries({ queryKey: ['dataFolder'] });
    },
  });
};
