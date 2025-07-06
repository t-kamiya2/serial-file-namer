import React, { useState, useCallback } from 'react';
import { FileItem } from './types';
import { getFileExtension, getFileNameWithoutExtension, downloadFilesAsZip } from './utils';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import DownloadSection from './components/DownloadSection';
import './App.css';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [baseName, setBaseName] = useState<string>('');

  const handleFilesUpload = useCallback((uploadedFiles: FileList) => {
    const newFiles: FileItem[] = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substring(2, 15),
      file,
      name: getFileNameWithoutExtension(file.name),
      originalName: file.name,
      extension: getFileExtension(file.name),
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleFileDelete = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const handleFileRename = useCallback((id: string, newName: string) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, name: newName } : file
    ));
  }, []);

  const handleBulkDelete = useCallback(() => {
    setFiles([]);
  }, []);

  const handleDownload = useCallback(async () => {
    if (files.length === 0 || !baseName.trim()) return;
    await downloadFilesAsZip(files, baseName.trim());
  }, [files, baseName]);

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Serial File Namer</h1>
        <p className="subtitle">Upload multiple files and download them with sequential naming</p>
        
        <FileUpload onFilesUpload={handleFilesUpload} />
        
        <div className="filename-input-section">
          <label htmlFor="basename" className="filename-label">
            Base filename:
          </label>
          <input
            id="basename"
            type="text"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            placeholder="Enter base filename"
            className="filename-input"
          />
        </div>

        {files.length > 0 && (
          <FileList
            files={files}
            baseName={baseName}
            onFileDelete={handleFileDelete}
            onFileRename={handleFileRename}
            onBulkDelete={handleBulkDelete}
          />
        )}

        <DownloadSection
          files={files}
          baseName={baseName}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
};

export default App;