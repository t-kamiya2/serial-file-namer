import React, { useCallback } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFilesUpload: (files: FileList) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesUpload }) => {
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesUpload(files);
    }
  }, [onFilesUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFilesUpload(files);
    }
  }, [onFilesUpload]);

  return (
    <div className="file-upload-container">
      <div
        className="file-upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="file-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="file-upload-label">
          <div className="upload-icon">📁</div>
          <div className="upload-text">
            <strong>Choose files</strong> or drag and drop
          </div>
          <div className="upload-subtext">
            Select multiple files to rename and download
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;