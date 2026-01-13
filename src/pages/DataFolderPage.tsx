import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
// import '../App.css';
import { DataFolderEdit, DataFolderList } from '../components';

const queryClient = new QueryClient();

export const DataFolderPage: React.FC<{}> = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-wrap gap-6">
        <DataFolderList onSelect={setSelectedFolderId} />
        {
          !!selectedFolderId &&
          <div>
            <DataFolderEdit
              folderId={selectedFolderId || 0}
              onBack={() => setSelectedFolderId(null)}
            />
          </div>
        }
      </div>
    </QueryClientProvider>
  );
}
