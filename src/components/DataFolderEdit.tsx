import React from 'react';
import { useDataFolder } from '../hooks';
import { FileListPanel } from './FileListPanel';

interface DataFolderEditProps {
  folderId: number;
  onBack: () => void;
}

export const DataFolderEdit: React.FC<DataFolderEditProps> = ({ folderId, onBack }) => {
  const { data: folder, isLoading } = useDataFolder(folderId);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!folder) return <div className="text-center py-8">Folder not found</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{folder.name}</h1>
            <p className="text-gray-600">
              Created: {new Date(folder.createDate).toLocaleDateString()}
            </p>
            {folder.publishDate && (
              <p className="text-green-600">
                Published: {new Date(folder.publishDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>

      {/* File Management */}
      {folder?.dataFiles && <FileListPanel folderId={folderId} files={folder.dataFiles} />}
    </div>
  );
};
