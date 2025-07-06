import React from 'react';
import { FileItem } from '../types';
import { generateSerialNumber, generateRenamedFileName } from '../utils';
import FileListItem from './FileListItem';
import './FileList.css';

interface FileListProps {
  files: FileItem[];
  baseName: string;
  onFileDelete: (id: string) => void;
  onFileRename: (id: string, newName: string) => void;
  onBulkDelete: () => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  baseName,
  onFileDelete,
  onFileRename,
  onBulkDelete,
}) => {
  return (
    <div className="file-list-container">
      <div className="file-list-header">
        <h3>Files ({files.length})</h3>
        <button
          onClick={onBulkDelete}
          className="bulk-delete-button"
        >
          Delete All
        </button>
      </div>
      
      <div className="file-list">
        {files.map((file, index) => {
          const serialNumber = generateSerialNumber(index, files.length);
          const previewName = baseName.trim() 
            ? generateRenamedFileName(baseName.trim(), serialNumber, file.extension)
            : `${file.name}_${serialNumber}${file.extension}`;
          
          return (
            <FileListItem
              key={file.id}
              file={file}
              previewName={previewName}
              onDelete={() => onFileDelete(file.id)}
              onRename={(newName) => onFileRename(file.id, newName)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FileList;