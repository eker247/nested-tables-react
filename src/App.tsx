import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataFolderList, DataFolderEdit } from './components';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="container py-6">
            <h1 className="text-3xl font-bold text-gray-900">Nested Tables Manager</h1>
          </div>
        </header>

        <main className="container py-8">
          {selectedFolderId ? (
            <DataFolderEdit
              folderId={selectedFolderId}
              onBack={() => setSelectedFolderId(null)}
            />
          ) : (
            <DataFolderList onSelect={setSelectedFolderId} />
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
