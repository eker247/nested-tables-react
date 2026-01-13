import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DataFolderPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="container py-6">
            <h1 className="text-3xl font-bold text-gray-900">Nested Tables Manager</h1>
          </div>
        </header>

        <main className="container py-8">
          <Routes>
            <Route path="/" element={<DataFolderPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
