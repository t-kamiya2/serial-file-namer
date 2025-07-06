import React from 'react';
import { FileItem } from '../types';
import { generateSerialNumber, generateRenamedFileName } from '../utils';
import './DownloadSection.css';

interface DownloadSectionProps {
  files: FileItem[];
  baseName: string;
  onDownload: () => void;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  files,
  baseName,
  onDownload,
}) => {
  const canDownload = files.length > 0 && baseName.trim();

  return (
    <div className="download-section">
      {files.length > 0 && (
        <div className="preview-section">
          <h3>Download Preview</h3>
          <div className="preview-list">
            {files.slice(0, 5).map((file, index) => {
              const serialNumber = generateSerialNumber(index, files.length);
              const previewName = generateRenamedFileName(baseName.trim() || 'file', serialNumber, file.extension);
              return (
                <div key={file.id} className="preview-item">
                  <span className="preview-original">{file.originalName}</span>
                  <span className="preview-arrow">→</span>
                  <span className="preview-new">{previewName}</span>
                </div>
              );
            })}
            {files.length > 5 && (
              <div className="preview-more">
                ... and {files.length - 5} more files
              </div>
            )}
          </div>
        </div>
      )}
      
      <button
        onClick={onDownload}
        disabled={!canDownload}
        className="download-button"
      >
        <span className="download-icon">⬇️</span>
        Download Files as ZIP
        {files.length > 0 && (
          <span className="file-count">({files.length} files)</span>
        )}
      </button>
      
      {!canDownload && files.length > 0 && (
        <p className="download-hint">
          Enter a base filename to enable download
        </p>
      )}
      
      {files.length === 0 && (
        <p className="download-hint">
          Upload files to enable download
        </p>
      )}
    </div>
  );
};

export default DownloadSection;