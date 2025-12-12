import React, { useState } from 'react';
import { useDataFolders, useCreateDataFolder, useUpdateDataFolder, useDeleteDataFolder } from '../hooks';
import { DataFolder } from '../types';

export const DataFolderList: React.FC<{ onSelect: (id: number) => void }> = ({ onSelect }) => {
  const { data: folders = [], isLoading } = useDataFolders();
  const createMutation = useCreateDataFolder();
  const updateMutation = useUpdateDataFolder();
  const deleteMutation = useDeleteDataFolder();
  const [newFolderName, setNewFolderName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const handleCreate = async () => {
    if (!newFolderName.trim()) return;
    
    await createMutation.mutateAsync({
      name: newFolderName,
      createDate: new Date().toISOString(),
      publishDate: null,
    });
    setNewFolderName('');
  };

  const handlePublish = async (folder: DataFolder) => {
    await updateMutation.mutateAsync({
      id: folder.id,
      data: {
        publishDate: folder.publishDate ? null : new Date().toISOString(),
      },
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleEdit = (folder: DataFolder) => {
    setEditingId(folder.id);
    setEditName(folder.name);
  };

  const handleSaveEdit = async () => {
    if (editingId && editName.trim()) {
      await updateMutation.mutateAsync({
        id: editingId,
        data: { name: editName },
      });
      setEditingId(null);
      setEditName('');
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Create New Folder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Data Folder</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Folder name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleCreate}
            disabled={createMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Create
          </button>
        </div>
      </div>

      {/* Folders List */}
      <div className="space-y-3">
        {folders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No folders yet. Create one to get started!</p>
        ) : (
          folders.map((folder) => (
            <div
              key={folder.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingId === folder.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <div>
                      <h3 className="font-semibold text-lg">{folder.name}</h3>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(folder.createDate).toLocaleDateString()}
                      </p>
                      {folder.publishDate && (
                        <p className="text-sm text-green-600">
                          Published: {new Date(folder.publishDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {editingId === folder.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onSelect(folder.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handlePublish(folder)}
                        className={`px-3 py-1 rounded text-white text-sm ${
                          folder.publishDate
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {folder.publishDate ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleEdit(folder)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => handleDelete(folder.id)}
                        disabled={deleteMutation.isPending}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:bg-gray-400"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
