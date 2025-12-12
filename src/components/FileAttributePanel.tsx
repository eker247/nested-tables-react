import React, { useState } from 'react';
import { FileAttribute } from '../types';
import { useCreateFileAttribute, useDeleteFileAttribute } from '../hooks';

interface FileAttributePanelProps {
  fileId: number;
  attributes: FileAttribute[] | undefined;
}

export const FileAttributePanel: React.FC<FileAttributePanelProps> = ({ fileId, attributes }) => {
  const createAttrMutation = useCreateFileAttribute();
  const deleteAttrMutation = useDeleteFileAttribute();

  const [newAttrName, setNewAttrName] = useState('');
  const [newAttrInclude, setNewAttrInclude] = useState(true);
  const [newAttrRequired, setNewAttrRequired] = useState(false);

  const handleCreateAttribute = async () => {
    if (!newAttrName.trim()) return;

    await createAttrMutation.mutateAsync({
      name: newAttrName,
      incude: newAttrInclude,
      required: newAttrRequired,
      dataFile: { id: fileId },
    });
    setNewAttrName('');
    setNewAttrInclude(true);
    setNewAttrRequired(false);
  };

  const handleDeleteAttribute = async (attrId: number) => {
    if (window.confirm('Delete this attribute?')) {
      await deleteAttrMutation.mutateAsync(attrId);
    }
  };

  return (
    <div className="border-t bg-gray-50 p-4 space-y-4" onContextMenu={(e) => console.log(fileId)}>
      {/* Add Attribute */}
      <div>
        <h4 className="font-semibold mb-2">Add Attribute</h4>
        <div className="space-y-2">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Attribute Name</label>
            <input
              type="text"
              value={newAttrName}
              onChange={(e) => setNewAttrName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateAttribute()}
              placeholder="Attribute name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newAttrInclude}
                onChange={(e) => setNewAttrInclude(e.target.checked)}
                className="mr-2"
              />
              Include
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newAttrRequired}
                onChange={(e) => setNewAttrRequired(e.target.checked)}
                className="mr-2"
              />
              Required
            </label>
          </div>
          <button
            onClick={handleCreateAttribute}
            disabled={createAttrMutation.isPending}
            className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 text-sm"
          >
            Add Attribute
          </button>
        </div>
      </div>

      {/* Attributes List */}
      {attributes && attributes.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Attributes ({attributes.length})</h4>
          <div className="space-y-2">
            {attributes.map((attr) => (
              <div
                key={attr.id}
                className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{attr.name}</p>
                  <p className="text-xs text-gray-600">
                    {attr.incude ? '✓ Include' : '✗ Include'} |{' '}
                    {attr.required ? '★ Required' : '☆ Optional'}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteAttribute(attr.id)}
                  disabled={deleteAttrMutation.isPending}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs disabled:bg-gray-400"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!attributes || attributes.length === 0 ? (
        <p className="text-gray-500 text-center py-4 text-sm">No attributes yet. Add one above.</p>
      ) : null}
    </div>
  );
};
