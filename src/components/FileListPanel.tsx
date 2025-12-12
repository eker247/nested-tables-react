import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateDataFile, useDeleteDataFile, useUpdateDataFile } from '../hooks';
import { DataFile } from '../types';
import { FileAttributePanel } from './FileAttributePanel';

interface FileListPanelProps {
  folderId: number;
  files: DataFile[];
}

export const FileListPanel: React.FC<FileListPanelProps> = ({ folderId, files }) => {
  const createFileMutation = useCreateDataFile();
  const updateFileMutation = useUpdateDataFile();
  const deleteFileMutation = useDeleteDataFile();

  const [newFileName, setNewFileName] = useState('');
  const [newFileDate, setNewFileDate] = useState<Date>(new Date());
  const [expandedFileId, setExpandedFileId] = useState<number | null>(null);
  const [editingFileId, setEditingFileId] = useState<number | null>(null);
  const [editFileData, setEditFileData] = useState<{ name: string; createDate: Date }>({
    name: '',
    createDate: new Date(),
  });

  const handleCreateFile = async () => {
    if (!newFileName.trim()) return;

    await createFileMutation.mutateAsync({
      name: newFileName,
      createDate: newFileDate.toISOString(),
      dataFolder: { id: folderId },
    });
    setNewFileName('');
    setNewFileDate(new Date());
  };

  const handleEditFile = (file: DataFile) => {
    setEditingFileId(file.id);
    setEditFileData({
      name: file.name,
      createDate: new Date(file.createDate),
    });
    setExpandedFileId(null);
  };

  const handleSaveFileEdit = async () => {
    if (editingFileId && editFileData.name.trim()) {
      await updateFileMutation.mutateAsync({
        id: editingFileId,
        data: {
          name: editFileData.name,
          createDate: editFileData.createDate.toISOString(),
        },
      });
      setEditingFileId(null);
      setEditFileData({ name: '', createDate: new Date() });
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    if (window.confirm('Delete this file and all its attributes?')) {
      await deleteFileMutation.mutateAsync(fileId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add File Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add Data File</h2>
        <div className="space-y-3">
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateFile()}
            placeholder="File name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Create Date</label>
            <DatePicker
              selected={newFileDate}
              onChange={(date) => date && setNewFileDate(date)}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              showTimeSelect
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            onClick={handleCreateFile}
            disabled={createFileMutation.isPending}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Add File
          </button>
        </div>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Data Files ({files.length})</h2>
        {files.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No files yet. Add one above.</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* File Header */}
              <div
                className={`p-4 ${editingFileId !== file.id ? 'cursor-pointer hover:bg-gray-50' : ''} flex items-center justify-between`}
                onClick={() =>
                  editingFileId !== file.id && setExpandedFileId(expandedFileId === file.id ? null : file.id)
                }
              >
                <div className="flex-1">
                  {editingFileId === file.id ? (
                    <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editFileData.name}
                        onChange={(e) => setEditFileData({ ...editFileData, name: e.target.value })}
                        placeholder="File name"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Create Date</label>
                        <DatePicker
                          selected={editFileData.createDate}
                          onChange={(date) => date && setEditFileData({ ...editFileData, createDate: date })}
                          dateFormat="yyyy-MM-dd HH:mm:ss"
                          showTimeSelect
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg">{file.name}</h3>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(file.createDate).toLocaleString()} | {file.fileAttributes?.length || 0}{' '}
                        attributes
                      </p>
                    </>
                  )}
                </div>
                <div className="flex gap-2 ml-2">
                  {editingFileId === file.id ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveFileEdit();
                        }}
                        disabled={updateFileMutation.isPending}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:bg-gray-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingFileId(null);
                        }}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditFile(file);
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.id);
                        }}
                        disabled={deleteFileMutation.isPending}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:bg-gray-400"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {editingFileId !== file.id && (
                    <span className="text-gray-400 ml-2">{expandedFileId === file.id ? '▼' : '▶'}</span>
                  )}
                </div>
              </div>

              {/* File Attributes */}
              {expandedFileId === file.id && editingFileId !== file.id && (
                <FileAttributePanel fileId={file.id} attributes={file.fileAttributes} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
